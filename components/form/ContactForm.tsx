"use client";

import React from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import confetti from "canvas-confetti";
import { SpinnerButton } from "../SpinnerButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  getContactFormSchema,
  contactFormSchemaType,
} from "@/zodSchemas/contact-form";
type ToastType = "success" | "error";

const ContactForm = ({
  locale,
  contactFormTranslationsData,
}: {
  locale: string;
  contactFormTranslationsData: {
    [key: string]: string;
  };
}) => {
  const requiredText = locale === "he" ? "שדה חובה" : "required";
  const RequiredAsterisk = () => (
    <>
      <span aria-hidden="true" className="text-red-500">
        *
      </span>
      <span className="sr-only"> {requiredText}</span>
    </>
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<contactFormSchemaType>({
    resolver: zodResolver(getContactFormSchema(contactFormTranslationsData)),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const showToast = (
    type: ToastType,
    message?: string,
    description?: string,
  ) => {
    const toastStyle =
      type === "success"
        ? {
            backgroundColor: "#4CAF50", // Green background for success
            color: "white", // White text
            border: "2px solid #4CAF50", // Same green border
          }
        : {
            backgroundColor: "#C41E3A", // Red background for error
            color: "white", // White text
            border: "2px solid #C41E3A", // Same red border
          };

    const toastId = toast(message, {
      description: description,
      style: toastStyle,
      cancel: {
        label: "Close",
        onClick: () => toast.dismiss(toastId), // Dismiss the toast on cancel button click
      },
    });
  };

  const onSubmit: SubmitHandler<contactFormSchemaType> = async (
    data: contactFormSchemaType,
  ) => {
    // Perform any additional actions before or after submitting data
    try {
      const result = await fetch(`/${locale}/api/form-submission`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      if (result.errors) {
        result.errors.forEach((error: any) => {
          showToast("error", error.message);
        });
      } else {
        showToast(
          "success",
          contactFormTranslationsData["successToastTitle"]?.toString(),
        );
        const end = Date.now() + 3 * 1000; // 3 seconds
        const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

        const frame = () => {
          if (Date.now() > end) return;

          confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            startVelocity: 60,
            origin: { x: 0, y: 0.5 },
            colors: colors,
          });
          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            startVelocity: 60,
            origin: { x: 1, y: 0.5 },
            colors: colors,
          });

          requestAnimationFrame(frame);
        };

        frame();
        reset();
      }
    } catch (error) {
      showToast(
        "error",
        contactFormTranslationsData["errorToastDescription"]?.toString(),
      );
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl rounded-2xl bg-white p-4 shadow-input dark:bg-black md:px-8 md:pb-1 md:pt-8">
      <h2
        className={`${locale === "en" ? "ltr" : "rtl"} flex justify-center text-xl font-bold text-neutral-800 dark:text-neutral-200`}
      >
        {contactFormTranslationsData["title"]}
      </h2>
      <p
        className={`${locale === "en" ? "ltr" : "rtl"} mt-2 flex w-full items-center justify-center text-sm text-neutral-600 dark:text-neutral-300`}
      >
        {contactFormTranslationsData["subTitle"]}
      </p>

      <form className="my-8" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <LabelInputContainer className={`${locale === "en" ? "ltr" : "rtl"}`}>
            <Label htmlFor="firstName">
              {contactFormTranslationsData["firstName"]} <RequiredAsterisk />
            </Label>
            <Input
              id="firstName"
              placeholder={contactFormTranslationsData["firstNamePlaceholder"]}
              type="text"
              autoComplete="given-name"
              aria-required="true"
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby={errors.firstName ? "firstName-error" : undefined}
              className={errors.firstName ? "ring-2 ring-red-500" : undefined}
              {...register("firstName")}
            />
            {errors.firstName && (
              <p
                id="firstName-error"
                role="alert"
                aria-live="polite"
                className="text-sm text-red-500"
              >
                {String(errors.firstName.message)}
              </p>
            )}
          </LabelInputContainer>
          <LabelInputContainer className={`${locale === "en" ? "ltr" : "rtl"}`}>
            <Label htmlFor="lastName">
              {contactFormTranslationsData["lastName"]} <RequiredAsterisk />
            </Label>
            <Input
              id="lastName"
              placeholder={contactFormTranslationsData["lastNamePlaceholder"]}
              type="text"
              autoComplete="family-name"
              maxLength={35}
              aria-required="true"
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
              className={errors.lastName ? "ring-2 ring-red-500" : undefined}
              {...register("lastName")}
            />
            {errors.lastName && (
              <p
                id="lastName-error"
                role="alert"
                aria-live="polite"
                className="text-sm text-red-500"
              >
                {String(errors.lastName.message)}
              </p>
            )}
          </LabelInputContainer>
        </div>
        <LabelInputContainer
          className={`${locale === "en" ? "ltr" : "rtl"} mb-4`}
        >
          <Label htmlFor="email">
            {contactFormTranslationsData["email"]} <RequiredAsterisk />
          </Label>
          <Input
            id="email"
            placeholder="your.email@example.org"
            type="email"
            autoComplete="email"
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={errors.email ? "ring-2 ring-red-500" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p
              id="email-error"
              role="alert"
              aria-live="polite"
              className="text-sm text-red-500"
            >
              {String(errors.email.message)}
            </p>
          )}
        </LabelInputContainer>

        <LabelInputContainer
          className={`${locale === "en" ? "ltr" : "rtl"} mb-4`}
        >
          <Label htmlFor="phoneNumber">
            {contactFormTranslationsData["phoneNumber"]}
          </Label>
          <Input
            id="phoneNumber"
            placeholder={contactFormTranslationsData["phoneNumberPlaceholder"]}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phoneNumber)}
            aria-describedby={
              errors.phoneNumber ? "phoneNumber-error" : undefined
            }
            className={errors.phoneNumber ? "ring-2 ring-red-500" : undefined}
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <p
              id="phoneNumber-error"
              role="alert"
              aria-live="polite"
              className="text-sm text-red-500"
            >
              {String(errors.phoneNumber.message)}
            </p>
          )}
        </LabelInputContainer>

        <LabelInputContainer
          className={`${locale === "en" ? "ltr" : "rtl"} mb-4`}
        >
          <Label htmlFor="message">
            {contactFormTranslationsData["message"]} <RequiredAsterisk />
          </Label>
          <textarea
            id="message"
            rows={4}
            placeholder={contactFormTranslationsData["messagesPlaceholder"]}
            maxLength={1000}
            aria-required="true"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(
              "block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",
              errors.message
                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                : undefined,
            )}
            {...register("message")}
          ></textarea>
          {errors.message && (
            <p
              id="message-error"
              role="alert"
              aria-live="polite"
              className="text-sm text-red-500"
            >
              {String(errors.message.message)}
            </p>
          )}
        </LabelInputContainer>

        <SpinnerButton
          name="Submit"
          locale={locale}
          contactFormTranslationsData={contactFormTranslationsData}
          state={isSubmitting}
          type="submit"
        />
      </form>
    </div>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

export default ContactForm;
