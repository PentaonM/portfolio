// lib/server/sendMail.ts
"use server";

import { sendMail, compileWelcomeTemplate } from "@/lib/mail";

export async function sendEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  phoneNumber?: unknown;
}) {
  // Get SMTP settings for user email from environment variables
  const userEmail = process.env.SECONDARY_SMTP_EMAIL;
  const userPassword = process.env.SECONDARY_SMTP_PASSWORD;

  // Get SMTP settings for admin email from environment variables
  const adminEmail = process.env.MAIN_SMTP_EMAIL;
  const adminPassword = process.env.MAIN_SMTP_PASSWORD;

  // Check if SMTP settings are defined
  if (!userEmail || !userPassword || !adminEmail || !adminPassword) {
    throw new Error("SMTP settings are not properly configured");
  }

  // SMTP settings for user email
  const userSmtpConfig = {
    email: userEmail,
    password: userPassword,
  };

  // SMTP settings for admin email
  const adminSmtpConfig = {
    email: adminEmail,
    password: adminPassword,
  };

  // Send email to the admin
  await sendMail({
    to: userSmtpConfig.email,
    name: "Full stack admin",
    subject: `New Job Application from ${data.firstName} ${data.lastName} has been submitted`,
    body: compileWelcomeTemplate("Full stack admin", "https://www.google.com/"),
    smtpConfig: userSmtpConfig,
  });

  // Send email to the user
  await sendMail({
    to: data.email,
    name: `${data.firstName} ${data.lastName}`,
    subject: `Thank You for Reaching Out To Me - ${data.firstName} ${data.lastName}!`,
    body: compileWelcomeTemplate("Full stack admin", "https://www.google.com/"),
    smtpConfig: adminSmtpConfig,
  });
}
