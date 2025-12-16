"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const [visible, setVisible] = useState(false);

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

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setVisible(entry.isIntersecting);
        }
      },
      { rootMargin: "150px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <TooltipProvider>
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
            start && visible && "animate-scroll",
            (!visible || !start) && "[animation-play-state:paused]",
            pauseOnHover && "hover:[animation-play-state:paused]",
          )}
        >
          {[...items, ...items].map((item, index) => {
            const cardKey = `${item.id}-${index}`;
            const cardClasses = cn(
              `relative max-w-full flex-shrink-0 rounded-2xl border border-b-0 border-slate-700 px-8 py-6 ${locale === "en" ? "ltr" : "rtl"}`,
              cardType === "techStack"
                ? "w-[120px] md:w-[150px]"
                : "flex min-h-[200px] w-[350px] flex-col justify-between md:w-[450px]",
              cardType === "testimonials" && "cursor-pointer",
            );
            const cardStyle = {
              background:
                "linear-gradient(180deg, var(--slate-800), var(--slate-900))",
            };

            const cardContent = (
              <li key={cardKey} className={cardClasses} style={cardStyle}>
                <blockquote className="flex h-full flex-col justify-between">
                  <span className="relative z-20 line-clamp-4 flex-grow text-sm font-normal leading-[1.6] text-gray-100">
                    {item.testimonial}
                  </span>
                  <div className="relative z-20 mt-6 flex flex-row items-center gap-5">
                    <div className="shrink-0">
                      <Image
                        src={item.imgSrc}
                        alt={
                          item.title ? `${item.title} logo` : "Reviewer Image"
                        }
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
            );

            // Only show tooltip for testimonials with text
            if (cardType === "testimonials" && item.testimonial) {
              return (
                <Tooltip key={cardKey} delayDuration={200}>
                  <TooltipTrigger asChild>
                    {cardContent}
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    sideOffset={20}
                    align="center"
                    avoidCollisions
                    collisionPadding={16}
                    className={cn(
                      // match FloatingNav background/border/shadow
                      "z-[99999] max-w-md rounded-2xl border bg-white p-4 text-sm text-neutral-900 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]",
                      "dark:border-white/[0.3] dark:bg-black dark:text-neutral-50",
                    )}
                  >
                    <p className="whitespace-pre-wrap break-words leading-relaxed">
                      {item.testimonial}
                    </p>
                  </TooltipContent>
                </Tooltip>
              );
            }

            return cardContent;
          })}
        </ul>
      </div>
    </TooltipProvider>
  );
};

export default InfiniteMovingCards;
