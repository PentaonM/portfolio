"use client";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { memo, useState } from "react";
import FloatingNavLangDropdownMenu from "../navbar/FloatingNavLangDropdownMenu";

export const FloatingNav = ({
  items,
  className,
  locale,
  LanguageOptions,
}: {
  items: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
  locale: string;
  LanguageOptions: string;
}) => {
  // const router = useRouter();
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const MemoizedNavItem = memo(function MemoizedNavItem({
    navItem,
    locale,
    LanguageOptions,
  }: {
    navItem: {
      name: string;
      link: string;
      icon?: JSX.Element;
    };
    locale: string;
    LanguageOptions: string;
  }) {
    return (
      <>
        <Link
          href={navItem.link}
          className={cn(
            "relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300",
          )}
          aria-label={`Navigation item - ${navItem.name}`}
        >
          <span className="icons-navbar block !cursor-pointer">
            {navItem.name === "World" ? (
              <FloatingNavLangDropdownMenu
                globeIcon={navItem.icon}
                locale={locale}
                LanguageOptions={LanguageOptions}
              />
            ) : (
              navItem.icon
            )}
          </span>

          <span className="text-navbar !cursor-pointer text-sm">
            {navItem.name === "World" ? (
              <FloatingNavLangDropdownMenu
                globeIcon={navItem.icon}
                locale={locale}
                LanguageOptions={LanguageOptions}
              />
            ) : (
              navItem.name
            )}
          </span>
        </Link>
      </>
    );
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "fixed inset-x-0 top-6 z-[5000] mx-auto flex max-w-fit items-center justify-center space-x-4 rounded-2xl border bg-white px-8 py-5 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:border-white/[0.3] dark:bg-black",
          className,
        )}
      >
        {items.map((navItem, idx) => (
          <MemoizedNavItem
            key={`link-${idx}`}
            navItem={navItem}
            locale={locale}
            LanguageOptions={LanguageOptions}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
