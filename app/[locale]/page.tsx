import dynamic from "next/dynamic";
const Toaster = dynamic(
  () => import("@/components/ui/sonner").then((m) => m.Toaster),
  { ssr: false },
);
import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/hero/HeroSection";
import { FloatingNav } from "@/components/ui/floating-navbar";
import AboutSection from "@/components/about-me/AboutSection";
import FooterSection from "@/components/footer/FooterSection";
import ContactSection from "@/components/contact/ContactSection";
import { useSectionsTranslations } from "@/dictionaries/translations";
import RecentProjects from "@/components/recent-projects/RecentProjects";
import TestimonialSection from "@/components/testimonials/TestimonialsSection";
import ExperienceAndEducation from "@/components/experience/ExperienceAndEducation";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  const {
    navItems,
    educationData,
    testimonialData,
    LanguageOptions,
    workExperienceData,
    myInfoTranslationsData,
    contactFormTranslationsData,
    workExperienceDataTranslations,
    contactSectionTranslationsData,
    experienceAndEducationSectionData,
    testimonialSectionTranslationsData,
  } = useSectionsTranslations();

  return (
    <main className="relative">
      <FloatingNav
        items={navItems}
        locale={locale}
        LanguageOptions={LanguageOptions}
      />

      <section className="items-center justify-center" id="header">
        <HeroSection locale={locale} />
      </section>

      <section className="container relative" id="about">
        <AboutSection locale={locale} />
      </section>

      <section className="section-spacing relative py-20">
        <ExperienceAndEducation
          locale={locale}
          educationData={educationData}
          workExperienceData={workExperienceData}
          workExperienceDataTranslations={workExperienceDataTranslations}
          experienceAndEducationSectionData={experienceAndEducationSectionData}
        />
      </section>

      <section className="container relative" id="projects">
        <RecentProjects locale={locale} />
      </section>

      {/* <section className="section-spacing py-20" id="testimonials">
        <TestimonialSection
          locale={locale}
          testimonialData={testimonialData}
          testimonialSectionTranslationsData={
            testimonialSectionTranslationsData
          }
        />
      </section> */}

      <section className="container pt-16" id="contact">
        <ContactSection
          locale={locale}
          myInfoTranslationsData={myInfoTranslationsData}
          contactFormTranslationsData={contactFormTranslationsData}
          contactSectionTranslationsData={contactSectionTranslationsData}
        />
      </section>

      <section id="footer">
        <FooterSection locale={locale} />
      </section>

      <Toaster />
    </main>
  );
}
