import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";
import { client } from "@/sanity/lib/client";
import { normaliseEmail, validateEmail } from "@/lib/email-validation";

/**
 * POST /api/newsletter — newsletter subscription endpoint.
 *
 * Flow:
 *   1. Parse JSON body.
 *   2. Honeypot — if `website` is non-empty, accept silently and bail.
 *   3. Per-IP rate-limit (5 attempts / 5 min) — guards against spam loops.
 *   4. Validate email (format + disposable-domain block-list) using the
 *      same util the client uses, so messages are consistent.
 *   5. Dedup against existing Sanity subscribers (case-insensitive — email
 *      is normalised before lookup AND storage).
 *   6. Persist a `newsletterSubscriber` document with email, source, and
 *      subscribedAt.
 *
 * Responses:
 *   200 { ok: true, id, alreadySubscribed }   — new or repeat-but-known
 *   400 { ok: false, message }                — bad JSON
 *   422 { ok: false, message, reason }        — email failed validation
 *   429 { ok: false, message }                — rate-limited
 *   503 { ok: false, message }                — CMS not configured
 *   500 { ok: false, message }                — Sanity write failure
 */

// In-memory rate limiter. Sufficient for a single Next.js instance — for a
// horizontally-scaled deployment, swap this for Upstash/Redis with the same
// API. Module-scoped Map persists across requests in the same Node worker.
const RATE_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const RATE_MAX = 5;
const rateMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const stamps = (rateMap.get(ip) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS
  );
  if (stamps.length >= RATE_MAX) {
    rateMap.set(ip, stamps);
    return true;
  }
  stamps.push(now);
  rateMap.set(ip, stamps);
  return false;
}

function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

type Payload = {
  email?: unknown;
  source?: unknown;
  /** Honeypot — must be empty. */
  website?: unknown;
};

export async function POST(req: Request) {
  let payload: Payload;
  try {
    payload = (await req.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON" },
      { status: 400 }
    );
  }

  // Honeypot — bots fill every field they see; this hidden one must stay empty.
  // We accept silently so the bot doesn't learn the trap exists.
  if (typeof payload.website === "string" && payload.website.length > 0) {
    return NextResponse.json({
      ok: true,
      id: null,
      alreadySubscribed: false,
    });
  }

  // Validate first (cheap), then rate-limit (slightly less cheap), so a bad
  // payload doesn't waste a rate-limit slot.
  const rawEmail =
    typeof payload.email === "string" ? payload.email : "";
  const check = validateEmail(rawEmail);
  if (!check.ok) {
    return NextResponse.json(
      { ok: false, message: check.message, reason: check.reason },
      { status: 422 }
    );
  }

  if (isRateLimited(clientIp(req))) {
    return NextResponse.json(
      {
        ok: false,
        message: "Too many requests. Please try again in a few minutes.",
      },
      { status: 429 }
    );
  }

  const email = normaliseEmail(rawEmail);
  const source =
    typeof payload.source === "string"
      ? payload.source.trim().slice(0, 80)
      : "unknown";

  if (!writeClient || !client) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Newsletter service is temporarily unavailable. Please try again shortly.",
      },
      { status: 503 }
    );
  }

  try {
    // Dedup — exact match on the normalised email.
    const existing = await client.fetch<{ _id: string } | null>(
      `*[_type == "newsletterSubscriber" && email == $email][0]{ _id }`,
      { email }
    );
    if (existing?._id) {
      return NextResponse.json({
        ok: true,
        id: existing._id,
        alreadySubscribed: true,
      });
    }

    const doc = await writeClient.create({
      _type: "newsletterSubscriber",
      email,
      source,
      subscribedAt: new Date().toISOString(),
      status: "active",
    });
    return NextResponse.json({
      ok: true,
      id: doc._id,
      alreadySubscribed: false,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, message: (err as Error).message },
      { status: 500 }
    );
  }
}
