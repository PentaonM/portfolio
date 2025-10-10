import {
  useEducationData,
  useNavItems,
  useTestimonialData,
  useWorkExperienceData,
} from "@/data/Data";
import { useTranslations } from "next-intl";

export const useSectionsTranslations = () => {
  const navItems = useNavItems();
  const LanguageOptions = useTranslations("NavigationItems")("LanguageOptions");

  const educationData = useEducationData();
  const workExperienceData = useWorkExperienceData();
  const testimonialData = useTestimonialData();

  const testimonialSectionTranslations = useTranslations("TestimonialSection");
  const experienceAndEducationSectionTranslations = useTranslations(
    "ExperienceAndEducationSection",
  );
  const workExperienceTranslations = useTranslations(
    "ExperienceAndEducationSection.workExperienceData",
  );
  const contactSectionTranslations = useTranslations("ContactSection");
  const myInfoTranslations = useTranslations("ContactSection.MyInfo");
  const contactFormTranslations = useTranslations("ContactSection.ContactForm");

  const testimonialSectionTranslationsData = {
    title: testimonialSectionTranslations("title"),
    subTitle: testimonialSectionTranslations("subTitle"),
  };

  const experienceAndEducationSectionData = {
    "first-title": experienceAndEducationSectionTranslations("first-title"),
    "second-title": experienceAndEducationSectionTranslations("second-title"),
  };

  const workExperienceDataTranslations = {
    position1: workExperienceTranslations("position1"),
    company1: workExperienceTranslations("company1"),
    position2: workExperienceTranslations("position2"),
    company2: workExperienceTranslations("company2"),
    "coming-soon": workExperienceTranslations("coming-soon"),
    "coming-soon-description": workExperienceTranslations(
      "coming-soon-description",
    ),
  };

  const contactSectionTranslationsData = {
    titlePart1: contactSectionTranslations("titlePart1"),
    titlePart2: contactSectionTranslations("titlePart2"),
    titlePart3: contactSectionTranslations("titlePart3"),
    subTitle: contactSectionTranslations("subTitle"),
  };

  const myInfoTranslationsData = {
    title: myInfoTranslations("title"),
    subTitle: myInfoTranslations("subTitle"),
    Phone: myInfoTranslations("Phone"),
    Email: myInfoTranslations("Email"),
  };

  const contactFormTranslationsData = {
    title: contactFormTranslations("title"),
    subTitle: contactFormTranslations("subTitle"),
    firstName: contactFormTranslations("firstName"),
    firstNamePlaceholder: contactFormTranslations("firstNamePlaceholder"),
    lastName: contactFormTranslations("lastName"),
    lastNamePlaceholder: contactFormTranslations("lastNamePlaceholder"),
    phoneNumber: contactFormTranslations("phoneNumber"),
    phoneNumberPlaceholder: contactFormTranslations("phoneNumberPlaceholder"),
    email: contactFormTranslations("email"),
    message: contactFormTranslations("message"),
    messagesPlaceholder: contactFormTranslations("messagesPlaceholder"),
    submit: contactFormTranslations("submit"),

    firstNameRequired: contactFormTranslations(
      "formValidation.firstNameRequired",
    ),
    firstNameInvalid: contactFormTranslations(
      "formValidation.firstNameInvalid",
    ),
    lastNameRequired: contactFormTranslations(
      "formValidation.lastNameRequired",
    ),
    lastNameInvalid: contactFormTranslations("formValidation.lastNameInvalid"),
    emailRequired: contactFormTranslations("formValidation.emailRequired"),
    emailInvalid: contactFormTranslations("formValidation.emailInvalid"),
    phoneNumberInvalid: contactFormTranslations(
      "formValidation.phoneNumberInvalid",
    ),
    messageRequired: contactFormTranslations("formValidation.messageRequired"),
    messageInvalid: contactFormTranslations("formValidation.messageInvalid"),

    successToastTitle: contactFormTranslations(
      "toastMessages.successToastTitle",
    ),
    successToastDescription: contactFormTranslations(
      "toastMessages.successToastDescription",
    ),
    errorToastTitle: contactFormTranslations("toastMessages.errorToastTitle"),
    errorToastDescription: contactFormTranslations(
      "toastMessages.errorToastDescription",
    ),
  };

  return {
    navItems,
    LanguageOptions,

    educationData,
    workExperienceData,
    experienceAndEducationSectionData,
    workExperienceDataTranslations,

    testimonialData,
    testimonialSectionTranslationsData,

    contactSectionTranslationsData,
    myInfoTranslationsData,
    contactFormTranslationsData,
  };
};
