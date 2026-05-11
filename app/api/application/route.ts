import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";
import { applicationSchema } from "@/lib/application-schema";

/**
 * POST /api/application — validate + persist a job application to Sanity.
 * On success: 200 { ok: true, id }.
 * On validation error: 422 { ok: false, errors }.
 * On server error: 500 { ok: false, message }.
 */
export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }

  const parsed = applicationSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  // Honeypot — silently accept without persisting.
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true, id: null });
  }

  if (!writeClient) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "CMS write client not configured. Set SANITY_API_WRITE_TOKEN (or grant write scope to SANITY_API_READ_TOKEN).",
      },
      { status: 500 }
    );
  }

  try {
    // Resolve the role slug → role document _id (best-effort; safe if not found)
    let roleRef: string | null = null;
    if (parsed.data.roleSlug) {
      const role = await writeClient.fetch<{ _id: string } | null>(
        `*[_type == "career" && slug.current == $slug][0]{ _id }`,
        { slug: parsed.data.roleSlug }
      );
      roleRef = role?._id ?? null;
    }

    const doc = await writeClient.create({
      _type: "jobApplication",
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      currentRole: parsed.data.currentRole,
      cvUrl: parsed.data.cvUrl,
      coverNote: parsed.data.coverNote,
      howDidYouHear: parsed.data.howDidYouHear,
      role: roleRef ? { _type: "reference", _ref: roleRef } : undefined,
      submittedAt: new Date().toISOString(),
      status: "new",
    });
    return NextResponse.json({ ok: true, id: doc._id });
  } catch (err) {
    return NextResponse.json(
      { ok: false, message: (err as Error).message },
      { status: 500 }
    );
  }
}
