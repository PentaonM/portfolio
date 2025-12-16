import Image from "next/image";
import HeroLink from "../HeroLink";
import ContactHeroLink from "../ContactHeroLink";
import dynamic from "next/dynamic";
import { memo, useMemo } from "react";
import Ripple from "../ui/ripple-effect";
import { useTranslations } from "next-intl";
import styles from "./hero-section.module.css";
import { TextGenerateEffect } from "../ui/text-generate-effect";

import heroLink5Png from "@/public/linkedIn.png";
import heroImgPng from "@/public/profile-v2-3.png";
import heroLink6Png from "@/public/github-mark.png";
import heroLink1Png from "@/public/banner-link-1.png";
import heroLink2Png from "@/public/banner-link-2.png";
import heroLink3Png from "@/public/banner-link-3.png";
import heroLink4Png from "@/public/banner-link-4.png";
import heroLinkArrowPng from "@/public/banner-link-arrow.png";

const TickerTextSlider = dynamic(() => import("../slider/TickerTextSlider"), {
  ssr: false,
});

const HeroSection = memo(function HeroSection({ locale }: { locale: string }) {
  const translations = useTranslations("HeroSection");

  const tickerTextTranslations = useMemo(
    () => ({
      text1: translations("TickerText.Text1"),
      text2: translations("TickerText.Text2"),
      text3: translations("TickerText.Text3"),
      text4: translations("TickerText.Text4"),
      text5: translations("TickerText.Text5"),
      text6: translations("TickerText.Text6"),
      text7: translations("TickerText.Text7"),
      text8: translations("TickerText.Text8"),
      text9: translations("TickerText.Text9"),
      text10: translations("TickerText.Text10"),
    }),
    [translations],
  );

  const leftLinks = useMemo(
    () => [
      <HeroLink
        key="resume"
        href={`/cv/FULL-STACK-WEB-DEVELOPMENT-${locale === "en" ? "ENGLISH" : "HEBREW"}-CV.pdf`}
        buttonText={translations("Resume")}
        leftIconSrc={heroLink2Png}
        rightIconSrc={heroLinkArrowPng}
        otherClasses={`${styles.heroLink} hover:text-[var(--purple)] hover:border-[var(--purple)]`}
      />,
      <HeroLink
        key="about"
        href="#about"
        buttonText={translations("About Me")}
        leftIconSrc={heroLink1Png}
        rightIconSrc={heroLinkArrowPng}
        otherClasses={`${styles.heroLink} hover:text-[var(--purple)] hover:border-[var(--purple)]`}
      />,
      <HeroLink
        key="projects"
        href="#projects"
        buttonText={translations("My Works")}
        leftIconSrc={heroLink3Png}
        rightIconSrc={heroLinkArrowPng}
        otherClasses={`${styles.heroLink} hover:text-[var(--purple)] hover:border-[var(--purple)]`}
      />,
    ],
    [translations],
  );

  const rightLinks = useMemo(
    () => [
      <ContactHeroLink
        key="contact"
        href="#contact"
        buttonText={translations("Message")}
        leftIconSrc={heroLink4Png}
        rightIconSrc={heroLinkArrowPng}
        otherClasses={`${styles.heroLink} hover:text-[var(--purple)] hover:border-[var(--purple)]`}
      />,
      <ContactHeroLink
        key="linkedin"
        href="https://il.linkedin.com/in/fentahun-modawo-3a23a822b"
        buttonText={translations("LinkedIn")}
        leftIconSrc={heroLink5Png}
        rightIconSrc={heroLinkArrowPng}
        otherClasses={`${styles.heroLink} hover:text-[var(--purple)] hover:border-[var(--purple)]`}
      />,
      <ContactHeroLink
        key="github"
        href="https://github.com/ShadowCraftsmanCoder"
        buttonText={translations("GitHub")}
        leftIconSrc={heroLink6Png}
        rightIconSrc={heroLinkArrowPng}
        otherClasses={`${styles.heroLink} bg-black hover:text-[var(--purple)] hover:border-[var(--purple)]`}
      />,
    ],
    [translations],
  );

  return (
    <div className={`pb-20 ${styles.heroSection}`}>
      <div className="container">
        <div className="relative z-10 my-20 flex justify-center max-md:my-6">
          <div className="flex max-w-[89vw] flex-col items-center justify-center md:max-w-3xl lg:max-w-[73vw]">
            <h1 className="max-w-100 text-center text-lg uppercase tracking-widest text-blue-100 max-sm:pb-3">
              {translations("title")}
            </h1>
            <TextGenerateEffect
              words={translations("sub-title")}
              className={`${locale === "en" ? "ltr" : "rtl"} text-center text-[32px] md:text-5xl lg:text-6xl`}
            />
          </div>
        </div>
        <div className="-mx-3 flex flex-wrap">
          <div className="w-full p-3 sm:w-[50%] md:w-1/3 lg:w-1/4">
            <div className={`${styles.heroLinksContainer} text-end`}>
              {leftLinks}
            </div>
          </div>

          <div className="order-2 w-full p-3 md:order-1 md:w-1/3 lg:w-1/2">
            <div className={styles.heroImageContainer}>
              <Image
                src={heroImgPng}
                width={655}
                height={781}
                sizes="(max-width: 640px) 70vw, (max-width: 1024px) 50vw, 33vw"
                priority
                alt="Banner Image"
                className={`z-20 ${styles.heroImage}`}
              />

              <Ripple />
            </div>
          </div>

          <div className="order-1 w-full p-3 pt-0 sm:w-[50%] md:order-2 md:w-1/3 lg:w-1/4">
            <div
              className={`${styles.heroLinksContainer} mt-[-10px] sm:mt-[10px]`}
            >
              {rightLinks}
            </div>
          </div>
        </div>
      </div>

      <TickerTextSlider
        locale={locale}
        tickerTextTranslations={tickerTextTranslations}
      />
    </div>
  );
});

export default HeroSection;
