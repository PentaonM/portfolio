"use client";
import { cn } from "@/lib/utils";
import { memo, useMemo } from "react";

export const TextGenerateEffect = memo(function TextGenerateEffect({
  words,
  className,
}: {
  words: string;
  className?: string;
}) {
  const wordsArray = useMemo(() => words.split(" "), [words]);

  return (
    <div className={cn("font-bold", className)}>
      <div className="my-4 leading-snug tracking-wide text-black dark:text-white">
        {wordsArray.map((word, idx) => (
          <span
            key={word + idx}
            className={cn(
              idx > 11 ? "text-purple" : "text-black-100 dark:text-white",
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
