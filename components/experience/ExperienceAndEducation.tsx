import { ExperienceCard } from "./ExperienceCard";
import styles from "./experience-and-education.module.css";

interface EducationData {
  id: number;
  img: string;
  degree: string;
  school: string;
  timespan: string;
}

interface WorkExperienceData {
  id: number;
  img: string;
  company: string;
  timespan: string;
  position: string;
}

export default function ExperienceAndEducation({
  locale,
  educationData,
  workExperienceData,
  workExperienceDataTranslations,
  experienceAndEducationSectionData,
}: {
  locale: string;
  educationData: EducationData[];
  workExperienceData: WorkExperienceData[];
  workExperienceDataTranslations: { [key: string]: string };
  experienceAndEducationSectionData: { [key: string]: string };
}) {
  return (
    <div className="container">
      <div
        className={`${styles.experiencesAndEducationRow} grid grid-cols-1 gap-4 max-sm:gap-24 sm:grid-cols-2`}
      >
        <div className="infos col-span-1 flex flex-col items-center justify-center">
          <h4
            className={`${locale === "en" ? "ltr" : "rtl"} section__sub-title animate-pulse pb-6 lg:text-4xl`}
          >
            {experienceAndEducationSectionData["first-title"]}
          </h4>
          {educationData.map((item) => (
            <ExperienceCard
              item={item}
              key={item.id}
              locale={locale}
              type="education"
            />
          ))}
        </div>

        <div className="infos col-span-1 flex flex-col items-center justify-center">
          <h4 className="section__sub-title animate-pulse pb-6 lg:text-4xl">
            {experienceAndEducationSectionData["second-title"]}
          </h4>
          {workExperienceData.map((item) => (
            <ExperienceCard
              type="work"
              item={item}
              key={item.id}
              locale={locale}
              translations={workExperienceDataTranslations}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
