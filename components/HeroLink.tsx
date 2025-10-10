"use client";
import React from "react";
import Link from "next/link";
import MagicButton from "./ui/magic-button";
import Image, { StaticImageData } from "next/image";

interface HeroLinkProps {
  href: string;
  buttonText: string;
  leftIconSrc: StaticImageData;
  rightIconSrc: StaticImageData;
  otherClasses?: string;
}

const HeroLink: React.FC<HeroLinkProps> = ({
  href,
  buttonText,
  leftIconSrc,
  rightIconSrc,
  otherClasses,
}) => {
  return (
    <Link href={href}>
      <MagicButton
        buttonText={buttonText}
        displayLeftIcon={true}
        leftIcon={
          <Image
            src={leftIconSrc}
            width={24}
            style={{ height: "auto" }}
            alt="icon"
            priority
          />
        }
        displayRightIcon={true}
        rightIcon={
          <Image
            src={rightIconSrc}
            width={24}
            style={{ height: "auto" }}
            alt="icon"
            priority
          />
        }
        otherClasses={otherClasses}
      />
    </Link>
  );
};

export default HeroLink;
