import { z } from "zod";

type ContactFormTranslationsData = {
  [key: string]: string;
};
const nameRegex = /^[a-zA-Z\u0590-\u05FF]+([ '-][a-zA-Z\u0590-\u05FF]+)*$/;

const defaultTranslations: ContactFormTranslationsData = {
  firstNameRequired: "First name is required",
  firstNameInvalid: "First name is invalid",
  lastNameRequired: "Last name is required",
  lastNameInvalid: "Last name is invalid",
  emailRequired: "Email is required",
  emailInvalid: "Email is invalid",
  phoneNumberInvalid: "Phone number is invalid",
  messageRequired: "Message is required",
  messageInvalid: "Message is invalid",
};

export const getContactFormSchema = (
  contactFormTranslationsData?: ContactFormTranslationsData,
): z.ZodObject<{
  firstName: z.ZodString;
  lastName: z.ZodString;
  email: z.ZodString;
  phoneNumber?: z.ZodOptional<z.ZodString>;
  message: z.ZodString;
}> => {
  const translations = contactFormTranslationsData || defaultTranslations;

  return z.object({
    firstName: z
      .string()
      .min(2, {
        message: translations["firstNameRequired"]?.toString(),
      })
      .regex(nameRegex, {
        message: translations["firstNameInvalid"]?.toString(),
      }),

    lastName: z
      .string()
      .min(2, {
        message: translations["lastNameRequired"]?.toString(),
      })
      .regex(nameRegex, {
        message: translations["lastNameInvalid"]?.toString(),
      }),
    email: z
      .string()
      .min(1, {
        message: translations["emailRequired"]?.toString(),
      })
      .email({
        message: translations["emailInvalid"]?.toString(),
      }),

    phoneNumber: z
      .string()
      .regex(/^[0-9]*$/, {
        message: translations["phoneNumberInvalid"]?.toString(),
      })
      .optional(),

    message: z
      .string()
      .min(1, {
        message: translations["messageRequired"]?.toString(),
      })
      .regex(/^[^<>]*$/, {
        message: translations["messageInvalid"]?.toString(),
      }),
  });
};

export type contactFormSchemaType = z.infer<
  ReturnType<typeof getContactFormSchema>
>;
