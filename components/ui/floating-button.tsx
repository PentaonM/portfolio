"use client";

import { useRef, useState, useEffect } from "react";
import { MemoizedLucideReactIcons } from "../common/memoizedIcons/MemoizedLucideReactIcons";

const FloatingButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const backToTopButtonRef = useRef<HTMLButtonElement>(null);

  const handleBackToTopClick = () => {
    if (backToTopButtonRef.current) {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
    }
  };

  //handleScroll function checks if the scroll position is greater than the window height (i.e., past the first section). If so, it sets isVisible to true, making the button visible. Otherwise, it sets isVisible to false.
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > window.innerHeight) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  //   "useEffect" adds an event listener to the scroll event and removes it on cleanup.
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={`fixed bottom-4 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--golden)] bg-white text-[20px] text-black shadow-lg transition-transform duration-300 ease-in-out hover:animate-pulse-infinity hover:bg-transparent hover:text-[var(--golden)] focus:outline-none ${isVisible ? "opacity-100" : "pointer-events-none opacity-0"}`}
      ref={backToTopButtonRef}
      onClick={handleBackToTopClick}
      aria-label="Click here to scroll to the top of the page"
    >
      <MemoizedLucideReactIcons.ChevronUp className="h-8 w-8" />
    </button>
  );
};

export default FloatingButton;
