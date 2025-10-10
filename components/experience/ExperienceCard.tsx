"use client";

import clsx from "clsx";
import { memo } from "react";
import dynamic from "next/dynamic";
import IconRenderer from "./IconRenderer";
import styles from "./experience-and-education.module.css";

export const ExperienceCard = memo(function ExperienceCard({
  type,
  item,
  locale,
  translations,
}: {
  type: "education" | "work";
  item: any;
  locale: string;
  translations?: { [key: string]: string };
}) {
  const isComingSoon =
    item.position === "coming soon" || item.position === "בקרוב";

  const GlareCard = dynamic(() => import("../ui/glare-card"), {
    ssr: false,
  });

  return (
    <GlareCard
      className="flex flex-col items-center justify-center max-lg:h-[250px]"
      locale={locale}
    >
      <div
        className={clsx(
          styles.experiencesAndEducationInfo,
          styles.experiencesAndEducationSkill,
          "dark:bg-black-100",
        )}
      >
        {type === "work" && isComingSoon ? (
          <span className="flex items-center justify-center text-center text-xl leading-10 max-sm:text-[20px]">
            {translations?.["coming-soon-description"]}
          </span>
        ) : (
          <>
            <span className={styles.experiencesAndEducationInfoTimespan}>
              {type === "education" ? item.timespan : item.timespan}
            </span>
            <div className={styles.experiencesAndEducationInfoDetails}>
              <h5 className={styles.experiencesAndEducationInfoTitle}>
                {type === "education" ? item.degree : item.position}
              </h5>
              <h6 className={styles.experiencesAndEducationInfoSubTitle}>
                {type === "education" ? item.school : item.company}
              </h6>
            </div>
            <div
              className={clsx(
                "rounded-[25%]",
                styles.experiencesAndEducationSkillImage,
                {
                  "bg-[#ECCEAE] p-4": item.id === 1 && type === "education",
                  "bg-white p-4": item.id === 3 && type === "education",
                  "bg-[#0F67B1] p-4": item.id === 1 && type === "work",
                },
              )}
            >
              <IconRenderer
                type={type}
                id={item.id}
                img={item.img}
                altText={item.company || item.school}
              />
            </div>
          </>
        )}
      </div>
    </GlareCard>
  );
});
