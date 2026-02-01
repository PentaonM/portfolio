import React from "react";
import ProjectCard from "./ProjectCard";
import { useTranslations } from "next-intl";
import { useProjectsData } from "@/data/Data";
import styles from "./recent-projects.module.css";

function RecentProjects({ locale }: { locale: string }) {
  const projects = useProjectsData();
  const translations = useTranslations("RecentProjectsSection");

  return (
    <div className="py-20">
      <h1 className={`heading ${locale === "en" ? "ltr" : "rtl"}`}>
        {translations("Title-part-1")}{" "}
        <span className="text-purple"> {translations("Title-part-2")}</span>
      </h1>
      <div
        className={`${styles.pinContainerWrapper} mt-10 flex flex-wrap justify-center max-xl:items-center ${locale === "en" ? "2xl:justify-start" : "2xl:justify-end"} gap-x-16 gap-y-12 p-4 max-lg:gap-y-10 max-md:gap-y-8 max-sm:mt-4 max-sm:gap-y-6`}
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            locale={locale}
            callToAction={translations("callToAction")}
          />
        ))}
      </div>
    </div>
  );
}

export default RecentProjects;
