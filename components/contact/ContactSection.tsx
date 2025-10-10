import React from "react";
import dynamic from "next/dynamic";
import { LampContainer } from "../ui/lamp";
import styles from "./contact-section.module.css";
import { ClientOnlyBackgroundWrapper } from "../ClientOnlyBackgroundWrapper";
import { MemoizedLucideReactIcons } from "../common/memoizedIcons/MemoizedLucideReactIcons";

const ContactForm = dynamic(() => import("../form/ContactForm"), {
  ssr: false,
});

const ContactInfoCard = ({
  icon,
  title,
  value,
  link,
  locale,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  link: string;
  locale: string;
}) => (
  <div className={`${styles.contactInfo} ${locale === "en" ? "ltr" : "rtl"}`}>
    <div className={styles.contactInfoIcon}>{icon}</div>
    <div className={styles.contactInfoTxt}>
      <h4 className={styles.contactInfoTitle}>{title}</h4>
      <h5 className={`${styles.contactInfoValue} dark:text-white`}>
        <a href={link}>{value}</a>
      </h5>
    </div>
  </div>
);

const ContactSection = ({
  locale,
  contactSectionTranslationsData,
  myInfoTranslationsData,
  contactFormTranslationsData,
}: {
  locale: string;
  contactSectionTranslationsData: {
    [key: string]: string;
  };
  myInfoTranslationsData: {
    [key: string]: string;
  };
  contactFormTranslationsData: {
    [key: string]: string;
  };
}) => {
  return (
    <LampContainer>
      <div className={styles.contactSection}>
        {/* Title & Subtitle */}
        <div className="mb-16 flex flex-col items-center">
          <h2
            className={`heading ${locale === "en" ? "ltr" : "rtl"} lg:max-w-[75vw]`}
          >
            {contactSectionTranslationsData["titlePart1"]}{" "}
            <span className="text-purple">
              {contactSectionTranslationsData["titlePart2"]}
            </span>{" "}
            {contactSectionTranslationsData["titlePart3"]}
          </h2>
          <p
            className={`${locale === "en" ? "ltr" : "rtl"} my-5 text-center text-white-200 md:mt-10`}
          >
            {contactSectionTranslationsData["subTitle"]}
          </p>
        </div>

        {/* Main Content: Info + Form */}
        <div className="flex flex-col justify-between space-y-5 lg:flex-row lg:space-x-6 lg:space-y-0">
          {/* Contact Info Section */}
          <div className="mx-auto w-full max-w-[40rem] p-4 md:px-8 md:py-0 lg:w-1/2">
            <ClientOnlyBackgroundWrapper className="w-full rounded-[22px] bg-white p-4 dark:bg-black-100 sm:p-10">
              <div className="contact__txt h-full rounded-2xl bg-white shadow-input dark:bg-black sm:p-4">
                <div className="section__heading w-full text-left">
                  <h3
                    className={`${locale === "en" ? "ltr" : "rtl"} flex justify-center text-xl font-bold text-neutral-800 dark:text-neutral-200`}
                  >
                    {myInfoTranslationsData["title"]}
                  </h3>
                  <p
                    className={`${locale === "en" ? "ltr" : "rtl"} mt-2 flex w-full items-center justify-center text-sm text-neutral-600 dark:text-neutral-300`}
                  >
                    {myInfoTranslationsData["subTitle"]}
                  </p>
                </div>
                <div className={styles.contactInfos}>
                  <ContactInfoCard
                    icon={
                      <MemoizedLucideReactIcons.Phone width={40} height={40} />
                    }
                    title={myInfoTranslationsData["Phone"] ?? ""}
                    value="+1800 - 800 - 9000"
                    link="tel:+18008009000"
                    locale={locale}
                  />
                  <ContactInfoCard
                    icon={
                      <MemoizedLucideReactIcons.Mail width={40} height={40} />
                    }
                    title={myInfoTranslationsData["Email"] ?? ""}
                    value="contact@mydomain.com"
                    link="mailto:contact@mydomain.com"
                    locale={locale}
                  />

                  <ContactInfoCard
                    icon={
                      <MemoizedLucideReactIcons.Phone width={40} height={40} />
                    }
                    title={myInfoTranslationsData["Phone"] ?? ""}
                    value="+1800 - 800 - 9000"
                    link="tel:+18008009000"
                    locale={locale}
                  />
                </div>
              </div>
            </ClientOnlyBackgroundWrapper>
          </div>

          {/* Contact Form Section */}
          <div className="mx-auto w-full max-w-[40rem] p-4 md:px-8 md:py-0 lg:w-1/2">
            <ClientOnlyBackgroundWrapper className="w-full rounded-[22px] bg-white p-4 dark:bg-black-100 sm:p-10">
              <div className="h-full">
                <ContactForm
                  locale={locale}
                  contactFormTranslationsData={contactFormTranslationsData}
                />
              </div>
            </ClientOnlyBackgroundWrapper>
          </div>
        </div>
      </div>
    </LampContainer>
  );
};

export default ContactSection;
