/**
 * Email validation — shared between the Newsletter API and the client form,
 * so the rules stay identical on both sides of the wire.
 *
 * `validateEmail` returns a discriminated result rather than throwing so the
 * client can render the same `message` text the server would have returned.
 */

/**
 * Pragmatic RFC-5322-ish regex. Matches what 99.9% of real-world signups
 * actually look like; rejects obvious typos (no @, no TLD, trailing space).
 * Avoids the full RFC monster regex — that lets through addresses no email
 * provider would accept anyway.
 */
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

/**
 * Block-list of throwaway / disposable email domains. Curated from the
 * commonly-cited public lists. Keep additions lowercase; lookup is exact.
 *
 * If a domain shows up in real signups that we want to allow, remove it.
 * If a new disposable provider appears, add it here.
 */
const DISPOSABLE_DOMAINS: ReadonlySet<string> = new Set([
  // tempmail family
  "tempmail.com",
  "tempmail.net",
  "tempmail.org",
  "temp-mail.org",
  "temp-mail.io",
  "tempmailo.com",
  "tempinbox.com",
  "tempmailaddress.com",
  // yopmail family
  "yopmail.com",
  "yopmail.fr",
  "yopmail.net",
  "yopmail.gq",
  "yopmail.in",
  // mailinator family
  "mailinator.com",
  "mailinator.net",
  "mailinator2.com",
  "mailinator.org",
  "notmailinator.com",
  // guerrillamail family
  "guerrillamail.com",
  "guerrillamail.net",
  "guerrillamail.org",
  "guerrillamail.biz",
  "guerrillamail.de",
  "sharklasers.com",
  "grr.la",
  // 10minutemail family
  "10minutemail.com",
  "10minutemail.net",
  "10minutemail.de",
  "10minemail.com",
  "10minutesmail.com",
  "minutemail.com",
  // dropbox-style
  "maildrop.cc",
  "mailnesia.com",
  "fakeinbox.com",
  "fakemailgenerator.com",
  "fakemail.net",
  "dispostable.com",
  "throwaway.email",
  "throwawaymail.com",
  "trashmail.com",
  "trashmail.net",
  "trashmail.de",
  "spamgourmet.com",
  "spam4.me",
  "wegwerfemail.de",
  "discardmail.com",
  // mohmal / moakt / tmpmail family
  "mohmal.com",
  "moakt.com",
  "tmpmail.org",
  "tmpmail.net",
  "tmpeml.com",
  "tmpbox.net",
  // getnada / getairmail
  "getnada.com",
  "getairmail.com",
  // tempr / mintemail / mailtemp
  "tempr.email",
  "mintemail.com",
  "mailtemp.info",
  "emailondeck.com",
  "mytemp.email",
]);

export type EmailValidationOk = { ok: true };
export type EmailValidationFailure = {
  ok: false;
  reason: "format" | "disposable";
  message: string;
};
export type EmailValidationResult = EmailValidationOk | EmailValidationFailure;

/**
 * Trim + lowercase. Used both before validation and before storage to keep
 * `email == $email` GROQ lookups deterministic.
 */
export function normaliseEmail(input: string): string {
  return input.trim().toLowerCase();
}

/**
 * Validate an email string. Returns a tagged result so callers can branch on
 * `reason` without re-deriving the failure category from a stringly-typed
 * message.
 */
export function validateEmail(input: string): EmailValidationResult {
  const email = normaliseEmail(input);

  if (!email || !EMAIL_REGEX.test(email)) {
    return {
      ok: false,
      reason: "format",
      message: "Please enter a valid email address.",
    };
  }

  const domain = email.slice(email.indexOf("@") + 1);
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return {
      ok: false,
      reason: "disposable",
      message: "Please enter a valid business or personal email address.",
    };
  }

  return { ok: true };
}

/**
 * Convenience boolean — for places (like a `disabled` button prop) where the
 * caller just needs "is this submittable?" and not the failure detail.
 */
export function isValidEmail(input: string): boolean {
  return validateEmail(input).ok;
}
