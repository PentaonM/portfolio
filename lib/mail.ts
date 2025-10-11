// lib/mail.ts
import nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import { welcomeTemplate } from "./mail-templates/welcome";

export async function sendMail({
  to,
  name,
  subject,
  body,
  smtpConfig,
}: {
  to: string;
  name: string;
  subject: string;
  body: string;
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
  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.error({ error });
    return;
  }

  try {
    const sendResult = await transport.sendMail({
      from: smtpConfig.email,
      to,
      subject,
      html: body,
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
}

export function compileWelcomeTemplate(
  name: string,
  url: string,
  locale: string = "en",
  translations: any,
) {
  const template = handlebars.compile(welcomeTemplate);

  // Get translations based on locale
  const emailTranslations = translations?.EmailTemplate || {};

  // Get the base URL from environment or use a fallback
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://fentahunmodawo.com";
  const profileImageUrl = `${baseUrl}/profile-v2-3.png`;

  const htmlBody = template({
    name: name,
    url: url,
    profileImageUrl: profileImageUrl,
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
    ctaUrl: emailTranslations.ctaUrl || url,
    footer: {
      title:
        emailTranslations.footer?.title ||
        "Let's Build Something Amazing Together",
      subtitle:
        emailTranslations.footer?.subtitle ||
        "Ready to bring your ideas to life?",
      social: emailTranslations.footer?.social || "Follow Me",
      unsubscribe:
        emailTranslations.footer?.unsubscribe ||
        "Changed your mind? You can unsubscribe at any time.",
    },
    signature: {
      name: emailTranslations.signature?.name || "Fentahun Modawo",
      title:
        emailTranslations.signature?.title ||
        "Full Stack Developer & Creative Designer",
      location: emailTranslations.signature?.location || "Jerusalem, Israel",
    },
  });
  return htmlBody;
}
