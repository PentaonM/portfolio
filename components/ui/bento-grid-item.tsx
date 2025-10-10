"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import MagicButton from "./magic-button";
import { useEffect, useMemo, useState } from "react";
import { MemoizedLucideReactIcons } from "../common/memoizedIcons/MemoizedLucideReactIcons";

export const BentoGridItem = ({
  id,
  img,
  title,
  locale,
  spareImg,
  skillData,
  className,
  description,
  imgClassName,
  titleClassName,
}: {
  id: number;
  img?: string;
  locale: string;
  spareImg?: string;
  className?: string;
  imgClassName?: string;
  icon?: React.ReactNode;
  titleClassName?: string;
  header?: React.ReactNode;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  skillData: {
    id: number;
    title: string;
    imgSrc: string;
    mastery: number;
  }[];
}) => {
  const [copied, setCopied] = useState(false);
  const firstPart = useMemo(() => skillData.slice(0, 27), [skillData]);
  const secondPart = useMemo(() => skillData.slice(27, 54), [skillData]);

  const handleCopy = () => {
    const text = "hsu@testing.pro";
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timeout);
    }

    return;
  }, [copied]);

  const GridGlobe = dynamic(() => import("./grid-globe"), { ssr: false });
  const FileTreeDemo = dynamic(() => import("../FileTreeDemo"), { ssr: false });
  const Particles = dynamic(() => import("./particles-effect"), { ssr: false });
  const InfiniteMovingCards = dynamic(() => import("./infinite-moving-cards"), {
    ssr: false,
  });
  const BackgroundGradientAnimation = dynamic(
    () => import("./background-gradient-animation"),
    { ssr: false },
  );

  return (
    <div
      className={cn(
        "group/bento relative row-span-1 flex flex-col justify-between space-y-4 overflow-hidden rounded-3xl border border-white/[0.1] shadow-input transition duration-200 hover:shadow-xl dark:shadow-none",
        className,
        { "max-lg:hidden max-md:block": id === 2 },
        { rtl: id === 1 && locale === "he" },
      )}
      style={{
        background:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <div
        className={`${id === 1 && "max-lg:h-[730px] max-md:h-[640px]"} ${id === 5 && "max-md:h-[460px] max-sm:h-[590px]"} ${id === 6 && "flex justify-center"} h-full`}
      >
        <div className="absolute h-full w-full">
          {id === 1 && (
            <>
              <Particles className="h-full w-full" />
              <GridGlobe locale={locale} />
            </>
          )}

          {id === 5 && img && (
            <Image
              src={img}
              alt={img}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={cn(imgClassName, "object-cover object-center")}
              loading="lazy"
            />
          )}
        </div>

        {spareImg && (
          <div
            className={`${
              id !== 5
                ? "absolute -bottom-5 right-0 flex w-full items-end justify-end opacity-80"
                : "relative -bottom-14 flex w-full items-end justify-end"
            } `}
          >
            {id === 5 ? (
              <FileTreeDemo />
            ) : (
              <Image
                src={spareImg}
                alt={spareImg}
                width={208}
                height={96}
                loading="lazy"
              />
            )}
          </div>
        )}

        {id === 6 && (
          // add background animation , remove the p tag
          <BackgroundGradientAnimation>
            <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center px-4 text-center text-3xl font-bold text-white md:text-4xl lg:text-7xl"></div>
          </BackgroundGradientAnimation>
        )}

        <div
          className={cn(
            titleClassName,
            `flex min-h-40 flex-col p-5 px-5 transition duration-200 group-hover/bento:translate-x-2 md:h-full ${id === 5 ? "absolute top-0 max-xl:max-w-[345px] max-lg:max-w-[190px] max-md:max-w-[310px] lg:p-5" : "relative max-md:h-full lg:p-10"}`,
          )}
        >
          <div
            className={`${locale === "en" ? "ltr" : "rtl"} z-10 font-sans text-[16px] font-extralight text-[#C1C2D3] max-sm:text-[18px] lg:text-base`}
          >
            {description}
          </div>
          <div
            className={`${locale === "en" ? "ltr" : "rtl"} z-10 font-sans ${id === 1 && "max-lg:text-3xl"} ${id === 2 ? "flex items-center justify-center text-center text-xl font-medium max-sm:text-[16px]" : "font-bold max-lg:text-xl lg:text-2xl"} ${id === 5 && "max-w-96"}`}
          >
            {title}
          </div>

          {id === 3 && (
            <div className="flex w-fit flex-col gap-1 lg:-right-2 lg:gap-5">
              {/* tech stack lists */}
              {/* <div className="flex flex-col gap-3 md:gap-3 lg:gap-8"> */}
              <div>
                <InfiniteMovingCards
                  items={firstPart}
                  direction="left"
                  speed="normal"
                  cardType="techStack"
                  locale={locale}
                />
              </div>
              {/* <div className="flex flex-col gap-3 md:gap-3 lg:gap-8"> */}
              <div>
                <InfiniteMovingCards
                  items={secondPart}
                  direction="right"
                  speed="normal"
                  cardType="techStack"
                  locale={locale}
                />
              </div>
            </div>
          )}

          {id === 6 && (
            <div className="relative mt-10">
              <div
                className={`absolute -bottom-5 right-0 ${
                  copied ? "block" : "block"
                }`}
              ></div>

              <MagicButton
                buttonText={
                  copied ? "Email is Copied!" : "Copy my email address"
                }
                displayLeftIcon={false}
                displayRightIcon={true}
                rightIcon={<MemoizedLucideReactIcons.Copy />}
                handleClick={handleCopy}
                aria-label="Copy email to clipboard"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
