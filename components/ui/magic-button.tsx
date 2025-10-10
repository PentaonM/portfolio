"use client";
import * as React from "react";

function MagicButton({
  buttonText,
  displayLeftIcon,
  leftIcon,
  displayRightIcon,
  rightIcon,
  handleClick,
  otherClasses,
}: {
  buttonText: string;
  displayLeftIcon: boolean;
  displayRightIcon: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  handleClick?: () => void;
  otherClasses?: string;
}) {
  return (
    <>
      <button
        className={`inline-flex items-center justify-between gap-3 rounded-xl border border-neutral-600 bg-white px-4 py-4 text-black transition duration-200 hover:bg-gray-100 ${otherClasses}`}
        onClick={handleClick}
      >
        <span className="main-icon">{displayLeftIcon && leftIcon}</span>
        <span className="link-txt">{buttonText}</span>
        <span className="arrow-icon">{displayRightIcon && rightIcon}</span>
      </button>
    </>
  );
}

export default MagicButton;
