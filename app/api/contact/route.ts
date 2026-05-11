import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";
import { contactSchema } from "@/lib/contact-schema";

/**
 * POST /api/contact — validate + persist a contact submission to Sanity.
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

  const parsed = contactSchema.safeParse(payload);
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
    const doc = await writeClient.create({
      _type: "contactSubmission",
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      organisation: parsed.data.organisation,
      inquiryType: parsed.data.inquiryType,
      message: parsed.data.message,
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
