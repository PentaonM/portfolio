import { useTranslations } from "next-intl";
import { BentoGrid } from "../ui/bento-grid";
import { skillData, useGridItems } from "@/data/Data";
import { BentoGridItem } from "../ui/bento-grid-item";

function AboutSection({ locale }: { locale: string }) {
  const gridItems = useGridItems();
  const translations = useTranslations("AboutSection");

  return (
    <>
      <div className="section__heading">
        <h2 className="section__sub-title text-animate">
          {translations("title")}
        </h2>
        <h3 className="section__title text-animate max-lg:text-[26px] max-md:text-[22px] max-sm:text-[16px] lg:text-[28px]">
          {translations("sub-title")}
        </h3>
      </div>
      <BentoGrid className="w-full py-20">
        {gridItems.map((item, index) => (
          <BentoGridItem
            id={item.id}
            img={item.img}
            locale={locale}
            title={item.title}
            skillData={skillData}
            spareImg={item.spareImg}
            className={item.className}
            key={`about-item-${index}`}
            description={item.description}
            imgClassName={item.imgClassName}
            titleClassName={item.titleClassName}
          />
        ))}
      </BentoGrid>
    </>
  );
}

export default AboutSection;
