// Client-safe validators shared by the Dealer and Contact forms. Plain
// functions (no "use server") since both forms now submit straight to
// Web3Forms from the browser instead of through a server action.

const CONTROL_CHARS = /[\x00-\x08\x0B\x0C\x0E-\x1F]/g;

/** Trim, strip control characters and cap length — for any user text. */
export function cleanText(value: string, max: number): string {
  return value.replace(CONTROL_CHARS, "").trim().slice(0, max);
}

export function isValidEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 12;
}

// ABR-published ABN checksum (weighted modulus 89). Confirms the number is
// well-formed — it does not check the ABN is actually registered, which
// would require the ABR Lookup web service (abr.business.gov.au) and a GUID.
export function isValidAbn(raw: string): boolean {
  const digits = raw.replace(/\s+/g, "");
  if (!/^\d{11}$/.test(digits)) return false;
  const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  const nums = digits.split("").map(Number);
  nums[0] -= 1;
  const sum = nums.reduce((acc, n, i) => acc + n * weights[i], 0);
  return sum % 89 === 0;
}

export const FORM_FAILURE_MESSAGE =
  "Sorry — we couldn't send that just now. Please call 03 9116 5787 or email info@ssswheels.com.au and we'll take care of it.";

type SubmitResult = { ok: true } | { ok: false };

/**
 * Submit a lead straight to Web3Forms from the browser (no server involved —
 * Web3Forms' free tier only supports client-side submission; server-to-server
 * needs a paid plan + IP whitelisting, which doesn't fit Vercel's serverless
 * IPs). The access key is meant to be public: Web3Forms rate-limits and can
 * restrict it by domain from their dashboard.
 */
export async function submitToWeb3Forms(
  subject: string,
  replyTo: string,
  fields: Record<string, string>
): Promise<SubmitResult> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.error("[web3forms] NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not set.");
    return { ok: false };
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `[SSS website] ${subject}`.slice(0, 200),
        replyto: replyTo,
        ...fields,
      }),
    });
    const data = (await res.json().catch(() => null)) as
      | { success?: boolean }
      | null;
    if (res.ok && data?.success) return { ok: true };
    console.error("[web3forms] submission not accepted", res.status, data);
    return { ok: false };
  } catch (err) {
    console.error("[web3forms] request failed", err);
    return { ok: false };
  }
}
