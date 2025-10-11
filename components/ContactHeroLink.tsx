"use client";
import React, { useCallback } from "react";
import MagicButton from "./ui/magic-button";
import Image, { StaticImageData } from "next/image";

interface ContactHeroLinkProps {
  href: string;
  buttonText: string;
  leftIconSrc: StaticImageData;
  rightIconSrc: StaticImageData;
  otherClasses?: string;
}

const ContactHeroLink: React.FC<ContactHeroLinkProps> = ({
  href,
  buttonText,
  leftIconSrc,
  rightIconSrc,
  otherClasses,
}) => {
  const handleClick = useCallback(() => {
    // Only handle internal links (starting with #)
    if (href.startsWith("#")) {
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      // External links (like LinkedIn, GitHub) will navigate normally
      window.open(href, "_blank", "noopener,noreferrer");
    }
  }, [href]);

  return (
    <MagicButton
      buttonText={buttonText}
      displayLeftIcon={true}
      leftIcon={
        <Image
          src={rightIconSrc}
          width={24}
          style={{ height: "auto", transform: "scaleX(-1)" }}
          alt=""
          loading="lazy"
          decoding="async"
          aria-hidden
        />
      }
      displayRightIcon={true}
      rightIcon={
        <Image
          src={leftIconSrc}
          width={24}
          style={{ height: "auto" }}
          alt=""
          loading="lazy"
          decoding="async"
          aria-hidden
        />
      }
      handleClick={handleClick}
      otherClasses={otherClasses}
    />
  );
};

export default ContactHeroLink;
