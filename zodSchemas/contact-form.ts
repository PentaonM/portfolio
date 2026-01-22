import { z } from "zod";
import {
  detectDisallowedMessageContent,
  isSafePlainText,
  isValidHebrewEnglishName,
  isValidInternationalEmail,
  isValidInternationalPhone,
  sanitizeEmail,
  sanitizeMessage,
  sanitizePersonName,
  sanitizePhoneNumber,
} from "@/lib/validation/contact-form";

type ContactFormTranslationsData = {
  [key: string]: string;
};

const defaultTranslations: ContactFormTranslationsData = {
  firstNameRequired: "First name is required",
  firstNameTooShort: "First name must be at least 2 characters",
  firstNameInvalid: "First name is invalid",
  lastNameRequired: "Last name is required",
  lastNameTooShort: "Last name must be at least 2 characters",
  lastNameTooLong: "Last name must be at most 35 characters",
  lastNameInvalid: "Last name is invalid",
  emailRequired: "Email is required",
  emailInvalid: "Email is invalid",
  phoneNumberInvalid: "Phone number is invalid",
  messageRequired: "Message is required",
  messageTooShort: "Message must be at least 10 characters",
  messageTooLong: "Message must be at most 1000 characters",
  messageDisallowed:
    "Message contains disallowed content (HTML, scripts, or code-like patterns)",
  messageInvalid: "Message is invalid",
};

export const getContactFormSchema = (
  contactFormTranslationsData?: ContactFormTranslationsData,
 ) => {
  const translations = contactFormTranslationsData || defaultTranslations;

  const t = (key: string) =>
    (translations[key] ?? defaultTranslations[key] ?? "").toString();

  const firstName = z
    .preprocess(sanitizePersonName, z.string())
    .pipe(
      z
        .string()
        .min(1, { message: t("firstNameRequired") })
        .min(2, { message: t("firstNameTooShort") })
        .refine((v) => isSafePlainText(v) && isValidHebrewEnglishName(v), {
          message: t("firstNameInvalid"),
        }),
    );

  const lastName = z
    .preprocess(sanitizePersonName, z.string())
    .pipe(
      z
        .string()
        .min(1, { message: t("lastNameRequired") })
        .min(2, { message: t("lastNameTooShort") })
        .max(35, { message: t("lastNameTooLong") })
        .refine((v) => isSafePlainText(v) && isValidHebrewEnglishName(v), {
          message: t("lastNameInvalid"),
        }),
    );

  const email = z
    .preprocess(sanitizeEmail, z.string())
    .pipe(
      z
        .string()
        .min(1, { message: t("emailRequired") })
        .refine((v) => isValidInternationalEmail(v), {
          message: t("emailInvalid"),
        }),
    );

  const phoneNumber = z
    .preprocess((v) => {
      const s = sanitizePhoneNumber(v);
      return s.length === 0 ? undefined : s;
    }, z.string().optional())
    .pipe(
      z
        .string()
        .optional()
        .refine((v) => (v == null ? true : isValidInternationalPhone(v)), {
          message: t("phoneNumberInvalid"),
        }),
    );

  const message = z
    .preprocess(sanitizeMessage, z.string())
    .pipe(
      z
        .string()
        .min(1, { message: t("messageRequired") })
        .min(10, { message: t("messageTooShort") })
        .max(1000, { message: t("messageTooLong") })
        .superRefine((value, ctx) => {
          const disallowed = detectDisallowedMessageContent(value);
          if (disallowed) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: t("messageDisallowed"),
            });
            return;
          }

          // Safety fallback: still require "plain text".
          if (!isSafePlainText(value)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: t("messageInvalid"),
            });
          }
        }),
    );

  return z.object({
    firstName,
    lastName,
    email,
    phoneNumber,
    message,
  });
};

export type contactFormSchemaType = z.infer<
  ReturnType<typeof getContactFormSchema>
>;
