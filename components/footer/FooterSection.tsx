// import Image from "next/image";
// import { socialMedia } from "@/data/Data";
import { useTranslations } from "next-intl";

const FooterSection = ({ locale }: { locale: string }) => {
  const translations = useTranslations("FooterSection");

  // const socialHrefs: Record<number, string> = {
  //   1: "https://github.com/ShadowCraftsmanCoder",
  //   2: "mailto:pentaonprivatepc@gmail.com",
  //   3: "https://il.linkedin.com/in/fentahun-modawo-3a23a822b",
  // };

  // const socialLabels: Record<number, string> = {
  //   1: "GitHub",
  //   2: "Email",
  //   3: "LinkedIn",
  // };

  return (
    <footer className="container w-full pb-10 pt-20 max-md:pt-4 max-sm:pt-10">
      <div className="mt-16 flex flex-col items-center justify-center md:flex-row">
        <p
          className={`${locale === "en" ? "ltr" : "rtl"} text-sm font-light backdrop-blur-lg backdrop-filter max-sm:text-center md:text-base md:font-normal`}
        >
          {translations("copyrightPart1")} &copy; {new Date().getFullYear()}{" "}
          {translations("copyrightPart2")}
        </p>
        {/* 
        <p
          className={`${locale === "en" ? "ltr" : "rtl"} text-sm font-light backdrop-blur-lg backdrop-filter max-sm:text-center md:text-base md:font-normal`}
        >
          This site was made by Me
        </p> */}

        {/* <div className="flex items-center gap-6 max-md:mt-6 md:gap-3">
          {socialMedia.map((info) => (
            <a
              key={info.id}
              href={socialHrefs[info.id] ?? "#"}
              target={info.id === 2 ? undefined : "_blank"}
              rel={info.id === 2 ? undefined : "noreferrer"}
              aria-label={socialLabels[info.id] ?? "Social link"}
              className="saturate-180 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-black-300 bg-black-200 bg-opacity-75 backdrop-blur-lg backdrop-filter transition-colors hover:border-[var(--purple)]"
            >
              <Image
                src={info.img}
                alt={socialLabels[info.id] ?? "Social icon"}
                width={info.id === 1 ? 19 : 16}
                height={info.id === 1 ? 18 : 16}
                loading="lazy"
              />
            </a>
          ))}
        </div> */}
      </div>
    </footer>
  );
};

export default FooterSection;
