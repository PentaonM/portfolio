"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [screenSize, setScreenSize] = React.useState({
    isSmallScreen: false,
    isMediumScreen: false,
  });

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isSmallScreen: width < 540,
        isMediumScreen: width <= 640,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { isSmallScreen, isMediumScreen } = screenSize;

  return (
    <div
      className={cn(
        "relative z-0 flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-md pt-[9.5rem]",
        className,
      )}
    >
      <div className="-pt-4 relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center">
        <motion.div
          initial={{
            opacity: 0.5,
            width: isSmallScreen ? "0rem" : isMediumScreen ? "10rem" : "20rem",
          }}
          whileInView={{
            opacity: 1,
            width: isSmallScreen ? "10rem" : isMediumScreen ? "20rem" : "40rem",
          }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="bg-gradient-conic absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-[100%] bg-slate-950 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-[100%] w-40 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{
            opacity: 0.5,
            width: isSmallScreen ? "0rem" : isMediumScreen ? "10rem" : "20rem",
          }}
          whileInView={{
            opacity: 1,
            width: isSmallScreen ? "10rem" : isMediumScreen ? "20rem" : "40rem",
          }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="bg-gradient-conic absolute inset-auto left-1/2 h-56 w-[30rem] from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute bottom-0 right-0 z-20 h-[100%] w-40 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute bottom-0 right-0 z-20 h-40 w-[100%] bg-slate-950 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl max-sm:opacity-0"></div>
        <motion.div
          initial={{
            width: isSmallScreen ? "3rem" : isMediumScreen ? "6rem" : "8rem",
          }}
          whileInView={{
            width: isSmallScreen ? "6rem" : isMediumScreen ? "12rem" : "16rem",
          }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
        ></motion.div>
        <motion.div
          initial={{
            width: isSmallScreen ? "5rem" : isMediumScreen ? "10rem" : "15rem",
          }}
          whileInView={{
            width: isSmallScreen ? "10rem" : isMediumScreen ? "20rem" : "30rem",
          }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-400"
        ></motion.div>
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950"></div>
      </div>
      <div>{children}</div>
    </div>
  );
};
