"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
  cardType,
  locale,
}: {
  items: {
    testimonial?: string;
    title?: string;
    mastery?: number;
    id?: number;
    imgSrc: string;
    name?: string;
    jobTitle?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  cardType: string;
  locale: string;
}) => {
  const [start, setStart] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const el = containerRef.current;

      el.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse",
      );

      const duration =
        speed === "fast" ? "120s" : speed === "normal" ? "220s" : "320s";
      el.style.setProperty("--animation-duration", duration);
      setStart(true);
    }
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        className={cn(
          `${locale === "en" ? "ltr" : "rtl"} flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4`,
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {[...items, ...items].map((item, index) => (
          <li
            key={`${item.id}-${index}`}
            className={cn(
              `relative max-w-full flex-shrink-0 rounded-2xl border border-b-0 border-slate-700 px-8 py-6 ${locale === "en" ? "ltr" : "rtl"}`,
              cardType === "techStack"
                ? "w-[120px] md:w-[150px]"
                : "w-[350px] md:w-[450px]",
            )}
            style={{
              background:
                "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
            }}
          >
            <blockquote>
              <span className="relative z-20 text-sm font-normal leading-[1.6] text-gray-100">
                {item.testimonial}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center gap-5">
                <div className="shrink-0">
                  <Image
                    src={item.imgSrc}
                    alt={item.title ?? "Reviewer Image"}
                    width={90}
                    height={90}
                    className="h-[90px] w-[90px] rounded-full sm:h-[65px] sm:w-[65px] md:h-[80px] md:w-[80px]"
                    loading="lazy"
                  />
                </div>
                <span className="flex flex-col gap-1">
                  <span className="text-sm font-normal leading-[1.6] text-gray-400">
                    {item.name}
                  </span>
                  <span className="text-sm font-normal leading-[1.6] text-gray-400">
                    {item.jobTitle}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfiniteMovingCards;
