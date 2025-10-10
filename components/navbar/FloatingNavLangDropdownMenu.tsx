"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { memo, useCallback, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";

interface FloatingNavLangDropdownMenuProps {
  locale: string;
  LanguageOptions: string;
  globeIcon?: React.ReactNode;
}

const FloatingNavLangDropdownMenu = memo(function FloatingNavLangDropdownMenu({
  locale,
  globeIcon,
  LanguageOptions,
}: FloatingNavLangDropdownMenuProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(
    locale === "he" ? "hebrew" : "english",
  );
  const router = useRouter();

  const switchLocale = useCallback(
    (newLocale: string) => {
      window.history.replaceState(null, "", `/${newLocale}`);
      router.push(`/${newLocale}`);
    },
    [router],
  );

  const handleLanguageChange = useCallback(
    (language: string) => {
      if (
        (language === "hebrew" && locale === "he") ||
        (language === "english" && locale === "en")
      ) {
        const toastId = toast("Language already selected", {
          description: `You are already viewing this website in the ${language} language.`,
          style: {
            backgroundColor: "#C41E3A", // Red background
            color: "white", // White text
            border: "2px solid #C41E3A", // Same red border
          },
          cancel: {
            label: "Close",
            onClick: () => toast.dismiss(toastId), // Dismiss the toast on cancel button click
          },
        });

        return; // Do nothing if the selected language is already active
      }

      setSelectedLanguage(language);
      const newLocale = language === "hebrew" ? "he" : "en";
      switchLocale(newLocale);

      const toastId = toast(`Language switched successfully to ${language}`, {
        description: `The site language has been switched to ${language === "hebrew" ? "Hebrew" : "English"}.`,
        style: {
          backgroundColor: "#4CAF50", // Green background for success
          color: "white", // White text
          border: "2px solid #4CAF50", // Same green border
        },
        cancel: {
          label: "Close",
          onClick: () => toast.dismiss(toastId), // Dismiss the toast on cancel button click
        },
      });
    },
    [locale, switchLocale],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" aria-label="Change language" className="p-4">
          {globeIcon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-55 mr-10 mt-4 dark:bg-black">
        <DropdownMenuLabel>{LanguageOptions}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedLanguage}
          onValueChange={handleLanguageChange}
        >
          <DropdownMenuRadioItem
            value="hebrew"
            className={`relative flex items-center pl-8 ${selectedLanguage === "hebrew" ? "bg-blue-500 text-white" : ""}`}
          >
            עברית
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="english"
            className={`relative flex items-center pl-8 ${selectedLanguage === "english" ? "bg-blue-500 text-white" : ""}`}
          >
            English
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export default FloatingNavLangDropdownMenu;
