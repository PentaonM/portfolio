// lib/mail.ts
import nodemailer from "nodemailer";
import { welcomeTemplate } from "./mail-templates/welcome";

function normalizeBaseUrl(input: string) {
  return input.replace(/\/+$/, "");
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendMail({
  to,
  name,
  subject,
  body,
  replyTo,
  text,
  smtpConfig,
}: {
  to: string;
  name: string;
  subject: string;
  body: string;
  replyTo?: string;
  text?: string;
  smtpConfig: {
    email: string;
    password: string;
  };
}) {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: smtpConfig.email,
      pass: smtpConfig.password,
    },
  });

  // Fail fast: if SMTP creds are wrong, we want the API to return 500 (not "success").
  await transport.verify();

  const sendResult = await transport.sendMail({
    from: `"Fentahun Modawo" <${smtpConfig.email}>`,
    to,
    subject,
    replyTo,
    html: body,
    text,
  });

  return sendResult;
}

export function compileWelcomeTemplate(
  name: string,
  url: string,
  locale: string = "en",
  translations: any,
) {
  const emailTranslations = translations?.EmailTemplate || {};

  const baseUrl = normalizeBaseUrl(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://fentahunmodawo.com",
  );

  // Must be absolute for email clients, and NOT locale-prefixed.
  const profileImageUrl = `${baseUrl}/${locale}/profile-v2-3.png`;

  const safeLocale = locale === "he" ? "he" : "en";
  const cvUrl = `${baseUrl}/${locale}/cv/FULL-STACK-WEB-DEVELOPMENT-${
    safeLocale === "he" ? "HEBREW" : "ENGLISH"
  }-CV.pdf`;

  const cvLabel =
    safeLocale === "he" ? "להורדת קורות החיים (PDF)" : "Download CV (PDF)";

  const values: Record<string, string> = {
    name,
    url,
    profileImageUrl,
    greeting:
      emailTranslations.greeting?.replace("{{name}}", name) || `Hi ${name}`,
    title: emailTranslations.title || "Thank you for your interest!",
    subtitle:
      emailTranslations.subtitle ||
      "I'm excited to connect with you and discuss how we can work together.",
    message:
      emailTranslations.message ||
      "I've received your message and will get back to you within 24 hours.",
    cta: emailTranslations.cta || "Explore My Portfolio",
    // Force your deployed base URL (translations can still control the label).
    ctaUrl: url,
    cvButton: `
      <div style="margin-top: 14px;">
        <a href="${cvUrl}" target="_blank" style="text-decoration:none;display:inline-block;background: rgba(255,255,255,0.18);border-radius:8px;width:auto;border:1px solid rgba(255,255,255,0.28);padding:12px 24px;font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;font-size:14px;font-weight:600;text-align:center;word-break:keep-all;color:#ffffff;">
          ${cvLabel}
        </a>
      </div>
    `.trim(),
    "footer.title":
      emailTranslations.footer?.title ||
      "Let's Build Something Amazing Together",
    "footer.subtitle":
      emailTranslations.footer?.subtitle ||
      "Ready to bring your ideas to life?",
    "footer.social": emailTranslations.footer?.social || "Follow Me",
    "footer.unsubscribe":
      emailTranslations.footer?.unsubscribe ||
      "Changed your mind? You can unsubscribe at any time.",
    "signature.name": emailTranslations.signature?.name || "Fentahun Modawo",
    "signature.title":
      emailTranslations.signature?.title ||
      "Full Stack Developer & Creative Designer",
    "signature.location":
      emailTranslations.signature?.location || "Jerusalem, Israel",
  };

  const htmlBody = welcomeTemplate.replace(/{{\s*([^}]+)\s*}}/g, (_m, key) => {
    const k = String(key).trim();
    return values[k] ?? "";
  });

  return htmlBody;
}

export function compileAdminSubmissionTemplate(input: {
  baseUrl?: string;
  locale: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: unknown;
  message: string;
}) {
  const baseUrl = normalizeBaseUrl(
    input.baseUrl ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://fentahunmodawo.com",
  );
  const safeLocale = input.locale === "he" ? "he" : "en";
  const siteUrl = `${baseUrl}/${safeLocale}`;
  const profileImageUrl = `${baseUrl}/profile-v2-3.png`;

  const cvUrl = `${baseUrl}/cv/FULL-STACK-WEB-DEVELOPMENT-${
    safeLocale === "he" ? "HEBREW" : "ENGLISH"
  }-CV.pdf`;

  const fullName = `${input.firstName} ${input.lastName}`.trim();
  const phoneRaw =
    typeof input.phoneNumber === "string"
      ? input.phoneNumber.trim()
      : typeof input.phoneNumber === "number"
        ? String(input.phoneNumber)
        : "";
  const phone = phoneRaw.length > 0 ? phoneRaw : "—";

  const messageHtml = escapeHtml(input.message).replace(/\n/g, "<br/>");

  const title =
    safeLocale === "he"
      ? "התקבלה פנייה חדשה מהטופס באתר"
      : "New contact form submission";

  const labelName = safeLocale === "he" ? "שם" : "Name";
  const labelEmail = safeLocale === "he" ? "אימייל" : "Email";
  const labelPhone = safeLocale === "he" ? "טלפון" : "Phone";
  const labelLocale = safeLocale === "he" ? "שפה" : "Locale";
  const labelMessage = safeLocale === "he" ? "הודעה" : "Message";
  const viewSite = safeLocale === "he" ? "פתח אתר" : "Open site";
  const viewCv = safeLocale === "he" ? "הורד קו״ח (PDF)" : "Download CV (PDF)";

  return `
<!doctype html>
<html lang="${safeLocale}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:0;background:#0f0f23;color:#ffffff;font-family:Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#0f0f23;padding:24px 12px;">
      <tr>
        <td align="center">
          <table width="640" cellpadding="0" cellspacing="0" role="presentation" style="max-width:640px;width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:22px 22px 14px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);">
                <div style="display:flex;align-items:center;gap:14px;">
                  <img src="${profileImageUrl}" width="56" height="56" alt="Fentahun Modawo" style="display:block;border-radius:50%;border:2px solid rgba(255,255,255,0.28);" />
                  <div>
                    <div style="font-size:18px;font-weight:700;line-height:1.2;">${title}</div>
                    <div style="font-size:12px;opacity:.85;line-height:1.4;">${escapeHtml(
                      fullName,
                    )}</div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 22px 22px;">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;">
                  <tr>
                    <td style="padding:8px 0;color:rgba(255,255,255,.75);font-size:13px;width:140px;">${labelName}</td>
                    <td style="padding:8px 0;font-size:13px;font-weight:600;">${escapeHtml(
                      fullName,
                    )}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:rgba(255,255,255,.75);font-size:13px;">${labelEmail}</td>
                    <td style="padding:8px 0;font-size:13px;font-weight:600;"><a href="mailto:${escapeHtml(
                      input.email,
                    )}" style="color:#ffffff;text-decoration:underline;">${escapeHtml(
                      input.email,
                    )}</a></td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:rgba(255,255,255,.75);font-size:13px;">${labelPhone}</td>
                    <td style="padding:8px 0;font-size:13px;font-weight:600;">${escapeHtml(
                      phone,
                    )}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:rgba(255,255,255,.75);font-size:13px;">${labelLocale}</td>
                    <td style="padding:8px 0;font-size:13px;font-weight:600;">${escapeHtml(
                      safeLocale,
                    )}</td>
                  </tr>
                </table>

                <div style="margin-top:18px;padding:14px 14px;border-radius:12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);">
                  <div style="font-size:13px;color:rgba(255,255,255,.75);margin-bottom:8px;">${labelMessage}</div>
                  <div style="font-size:14px;line-height:1.55;white-space:normal;">${messageHtml}</div>
                </div>

                <div style="margin-top:18px;">
                  <a href="${siteUrl}" target="_blank" style="display:inline-block;padding:10px 14px;border-radius:10px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#ffffff;text-decoration:none;font-weight:700;font-size:13px;margin-right:10px;">${viewSite}</a>
                  <a href="${cvUrl}" target="_blank" style="display:inline-block;padding:10px 14px;border-radius:10px;background:rgba(255,255,255,0.16);border:1px solid rgba(255,255,255,0.22);color:#ffffff;text-decoration:none;font-weight:700;font-size:13px;">${viewCv}</a>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
}
