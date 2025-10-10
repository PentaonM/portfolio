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

export function compileWelcomeTemplate(name: string, url: string) {
  const template = handlebars.compile(welcomeTemplate);
  const htmlBody = template({
    name: name,
    url: url,
  });
  return htmlBody;
}
