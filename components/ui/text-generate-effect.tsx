"use client";
import { cn } from "@/lib/utils";
import { memo, useMemo } from "react";

export const TextGenerateEffect = memo(function TextGenerateEffect({
  words,
  className,
  locale = "en",
}: {
  words: string;
  className?: string;
  locale?: string;
}) {
  const wordsArray = useMemo(() => words.split(" "), [words]);

  const isPurpleWord = (idx: number) => {
    if (locale === "he") {
      return idx > 5 && idx < 8;
    }
    return idx > 1 && idx < 3;
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="my-4 leading-snug tracking-wide text-black dark:text-white">
        {wordsArray.map((word, idx) => (
          <span
            key={word + idx}
            className={cn(
              isPurpleWord(idx) ? `text-purple ${idx}` : "text-black-100 dark:text-white",
              "mr-3 inline-block",
            )}
          >
            {word}{" "}
          </span>
        ))}
      </div>
    </div>
  );
});
