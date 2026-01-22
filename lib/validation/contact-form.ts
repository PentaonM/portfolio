export const contactFormPatterns = {
  // Hebrew: \u0590-\u05FF
  // English: A-Z a-z
  name: /^[A-Za-z\u0590-\u05FF]+(?:[ -][A-Za-z\u0590-\u05FF]+)*$/u,

  // If some other layer later decodes HTML entities, these become "<" / ">".
  // We reject these to avoid "encoded tag" bypasses.
  htmlAngleBracketsOrEntities:
    /[<>]|&(lt|gt);|&#0*60;|&#x0*3c;|&#0*62;|&#x0*3e;/i,

  phoneAllowedChars: /^\+?[0-9\s()-]*$/,
  inlineEventHandler: /\bon[a-z]+\s*=/i,
  jsProtocol: /\bjavascript\s*:/i,
  vbProtocol: /\bvbscript\s*:/i,
  jsSnippet:
    /\b(?:eval|Function|setTimeout|setInterval)\s*\(|\b(?:alert|prompt|confirm)\s*\(/i,

  sqlKeyword: /\b(?:select|drop|insert|update|delete|union|alter|create|truncate)\b/i,
  sqlContext: /\b(?:from|into|table|where|values|join)\b/i,
  sqlCommentOrTerminator: /(--|\/\*|\*\/|;)/,
};

function asString(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (value == null) return "";
  return String(value);
}

function normalizeUnicode(value: string): string {
  // NFKC helps reduce weird lookalikes / compatibility chars.
  // Older engines can throw on invalid sequences; fall back safely.
  try {
    return value.normalize("NFKC");
  } catch {
    return value;
  }
}

function normalizeHyphens(value: string): string {
  // Normalize common unicode hyphens to ASCII "-"
  return value.replace(/[\u2010\u2011\u2012\u2013\u2014\u2212]/g, "-");
}

export function sanitizePersonName(value: unknown): string {
  const s = normalizeHyphens(normalizeUnicode(asString(value)));
  // Collapse whitespace to a single ASCII space, then trim.
  return s.replace(/\s+/g, " ").trim();
}

export function sanitizeEmail(value: unknown): string {
  const s = normalizeUnicode(asString(value));
  return s.trim();
}

export function sanitizePhoneNumber(value: unknown): string {
  const s = normalizeHyphens(normalizeUnicode(asString(value)));
  return s.replace(/\s+/g, " ").trim();
}

export function sanitizeMessage(value: unknown): string {
  let s = normalizeUnicode(asString(value));

  // Normalize newlines (\r\n and \r) to \n.
  s = s.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // Strip ASCII control chars except TAB and LF.
  // (Avoids obfuscation / weird payloads; keeps copy/paste sane.)
  s = s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");

  return s.trim();
}

export function isValidHebrewEnglishName(value: string): boolean {
  // Only Hebrew/English letters, plus single separators (space or hyphen) between words.
  // No leading/trailing separators (enforced by regex shape).
  return contactFormPatterns.name.test(value);
}

function looksLikeHtmlMarkupInBrowser(value: string): boolean {
  // Non-regex check when running in a browser.
  // Safe on server: DOMParser won't exist there.
  const DOMParserImpl = (globalThis as any)?.DOMParser as
    | (new () => DOMParser)
    | undefined;

  if (!DOMParserImpl) return false;
  if (!/[<>]/.test(value)) return false;

  try {
    const parser = new DOMParserImpl();
    const doc = parser.parseFromString(value, "text/html");
    return Boolean(doc.body && doc.body.querySelector("*"));
  } catch {
    return false;
  }
}

export function isSafePlainText(value: string): boolean {
  // Reject any attempt to send markup or "encoded markup".
  if (contactFormPatterns.htmlAngleBracketsOrEntities.test(value)) return false;

  // Extra defense-in-depth in the browser (non-regex).
  if (looksLikeHtmlMarkupInBrowser(value)) return false;

  return true;
}

export function isValidInternationalEmail(value: string): boolean {
  const email = value.trim();
  if (email.length === 0) return false;
  if (email.length > 254) return false;
  if (/\s/.test(email)) return false;
  if (!isSafePlainText(email)) return false;

  const firstAt = email.indexOf("@");
  const lastAt = email.lastIndexOf("@");
  if (firstAt <= 0 || firstAt !== lastAt || lastAt === email.length - 1)
    return false;

  const local = email.slice(0, firstAt);
  const domain = email.slice(firstAt + 1);

  if (local.length === 0 || local.length > 64) return false;
  if (domain.length === 0 || domain.length > 253) return false;

  // Local part: pragmatic (not a full RFC parser). No spaces, no angle brackets/entities.
  if (local.startsWith(".") || local.endsWith(".") || local.includes(".."))
    return false;
  if (!/^[^\s<>]+$/u.test(local)) return false;

  // Domain: support IDN labels via unicode properties.
  // Require at least one dot to avoid "localhost".
  if (!domain.includes(".")) return false;
  if (domain.endsWith(".")) return false;

  const labels = domain.split(".");
  if (labels.some((l) => l.length === 0 || l.length > 63)) return false;

  const unicodeLabel =
    /^[\p{L}\p{M}\p{N}](?:[\p{L}\p{M}\p{N}-]{0,61}[\p{L}\p{M}\p{N}])?$/u;
  const asciiLabel =
    /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i; // includes punycode xn--

  for (const label of labels) {
    if (label.toLowerCase().startsWith("xn--")) {
      if (!asciiLabel.test(label)) return false;
    } else {
      if (!unicodeLabel.test(label)) return false;
    }
  }

  return true;
}

export function isValidInternationalPhone(value: string): boolean {
  const phone = value.trim();
  if (phone.length === 0) return true; // optional field

  if (!contactFormPatterns.phoneAllowedChars.test(phone)) return false;

  const plusCount = (phone.match(/\+/g) || []).length;
  if (plusCount > 1) return false;
  if (plusCount === 1 && !phone.startsWith("+")) return false;

  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7;
}

export type MessageDisallowedCode =
  | "markup"
  | "event_handler"
  | "js_protocol"
  | "js_snippet"
  | "sql_like";

export function detectDisallowedMessageContent(
  message: string,
): MessageDisallowedCode | null {
  // Hard block: markup / encoded markup.
  if (!isSafePlainText(message)) return "markup";

  // Script-like patterns.
  if (
    contactFormPatterns.jsProtocol.test(message) ||
    contactFormPatterns.vbProtocol.test(message)
  ) {
    return "js_protocol";
  }

  if (contactFormPatterns.inlineEventHandler.test(message)) {
    return "event_handler";
  }

  if (contactFormPatterns.jsSnippet.test(message)) {
    return "js_snippet";
  }

  // SQL injection-ish heuristics: keyword + typical SQL context/terminators.
  if (
    contactFormPatterns.sqlKeyword.test(message) &&
    (contactFormPatterns.sqlContext.test(message) ||
      contactFormPatterns.sqlCommentOrTerminator.test(message))
  ) {
    return "sql_like";
  }

  return null;
}

