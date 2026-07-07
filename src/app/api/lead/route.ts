import { business } from "@/lib/site-data";
import { buildLeadEmail, buildMailto, leadSchema } from "@/lib/lead";

const RATE_LIMIT = 5;
const WINDOW_MS = 60_000;
const hits = new Map<string, { count: number; reset: number }>();

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "anonymous";
  return ip;
}

function rateLimited(key: string) {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.reset < now) {
    hits.set(key, { count: 1, reset: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

export async function POST(request: Request) {
  const key = clientKey(request);

  if (rateLimited(key)) {
    return Response.json(
      { ok: false, message: "Too many requests. Please try again in a moment." },
      { status: 429 },
    );
  }

  let payload;

  try {
    payload = leadSchema.parse(await request.json());
  } catch (error) {
    console.error("[lead] validation failed", error);
    return Response.json(
      { ok: false, message: "Please check the required fields and try again." },
      { status: 400 },
    );
  }

  if (payload.website && payload.website.length > 0) {
    console.warn("[lead] honeypot tripped", { ip: key });
    return Response.json({ ok: true, message: "Thank you. We will be in touch." });
  }

  const mailto = buildMailto(payload, business.email);
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    return Response.json({
      ok: true,
      mailto,
      message: "Email provider is not configured yet. Open a prepared email to the studio.",
    });
  }

  try {
    const { subject, body } = buildLeadEmail(payload);
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.LEADS_FROM_EMAIL || "Techno Car Studio <onboarding@resend.dev>",
        to: [process.env.LEADS_TO_EMAIL || business.email],
        reply_to: payload.email,
        subject,
        text: body,
      }),
    });

    if (!response.ok) {
      console.error("[lead] resend non-ok", response.status, await response.text().catch(() => ""));
      return Response.json(
        {
          ok: true,
          mailto,
          message: "Email delivery could not be confirmed. Open a prepared email fallback.",
        },
        { status: 202 },
      );
    }

    return Response.json({ ok: true, message: "Request sent. Techno Car Studio will follow up shortly." });
  } catch (error) {
    console.error("[lead] resend threw", error);
    return Response.json(
      {
        ok: true,
        mailto,
        message: "Email delivery failed. Open a prepared email fallback.",
      },
      { status: 202 },
    );
  }
}
