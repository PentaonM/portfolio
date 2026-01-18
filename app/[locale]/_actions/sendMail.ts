// lib/server/sendMail.ts
"use server";

import {
  sendMail,
  compileWelcomeTemplate,
  compileAdminSubmissionTemplate,
} from "@/lib/mail";

export async function sendEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  phoneNumber?: unknown;
  locale?: string;
}) {
  const locale = data.locale === "he" ? "he" : "en";

  // SMTP settings
  const autoReplyEmail = process.env.MAIN_SMTP_EMAIL;
  const autoReplyPassword = process.env.MAIN_SMTP_PASSWORD;

  const adminEmail = process.env.SECONDARY_SMTP_EMAIL;
  const adminPassword = process.env.SECONDARY_SMTP_PASSWORD;


  if (
    !autoReplyEmail ||
    !autoReplyPassword ||
    !adminEmail ||
    !adminPassword
  ) {
    throw new Error("SMTP settings are not properly configured");
  }

  // Import the translation files directly to avoid nested key issues
  const enTranslations = await import("@/dictionaries/en.json");
  const heTranslations = await import("@/dictionaries/he.json");

  const localeTranslations =
    locale === "he" ? heTranslations.default : enTranslations.default;
  const emailTranslations = {
    EmailTemplate: localeTranslations.EmailTemplate,
  };

  const autoReplySmtpConfig = {
    email: autoReplyEmail,
    password: autoReplyPassword,
  };

  const adminSmtpConfig = {
    email: adminEmail,
    password: adminPassword,
  };

  const fullName = `${data.firstName} ${data.lastName}`.trim();
  const siteUrl = `https://portfolio-lime-ten-w11xgq4wcc.vercel.app/${locale}`;
  const phoneText =
    typeof data.phoneNumber === "string"
      ? data.phoneNumber.trim()
      : typeof data.phoneNumber === "number"
        ? String(data.phoneNumber)
        : "";

  // 1) Admin notification (includes the actual message content)
  await sendMail({
    to: adminEmail,
    name: "Admin",
    subject: `New message (${locale}) from ${fullName}`,
    body: compileAdminSubmissionTemplate({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      message: data.message,
      locale,
      baseUrl: "https://portfolio-lime-ten-w11xgq4wcc.vercel.app",
    }),
    replyTo: data.email,
    text: `New message from ${fullName}
First name: ${data.firstName}
Last name: ${data.lastName}
Email: ${data.email}
Phone: ${phoneText || "—"}
Locale: ${locale}

Message:
${data.message}
`,
    smtpConfig: adminSmtpConfig,
  });

  // 2) Auto-reply to user (locale-matched)
  await sendMail({
    to: data.email,
    name: fullName,
    subject: emailTranslations.EmailTemplate.subject,
    body: compileWelcomeTemplate(
      fullName,
      siteUrl,
      locale,
      emailTranslations,
    ),
    text: `Hi ${fullName},\n\nThanks for reaching out. I received your message and will get back to you within 24 hours.\n\nPortfolio: ${siteUrl}\nCV: https://portfolio-lime-ten-w11xgq4wcc.vercel.app/cv/FULL-STACK-WEB-DEVELOPMENT-${
      locale === "he" ? "HEBREW" : "ENGLISH"
    }-CV.pdf`,
    smtpConfig: autoReplySmtpConfig,
  });
}
