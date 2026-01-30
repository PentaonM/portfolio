import { Pathnames, LocalePrefix } from "next-intl/routing";

export const defaultLocale = "en" as const;
export const locales = ["en", "he"] as const;

export const pathnames: Pathnames<typeof locales> = {
  "/": "/",
  "/pathnames": {
    en: "/pathnames",
    he: "/שם נתיב",
  },
};

export const localePrefix: LocalePrefix<typeof locales> = "always";

export const port = process.env.PORT || 3000;

function normalizeAbsoluteUrl(url?: string) {
  if (!url) return undefined;
  const trimmed = url.trim().replace(/^"+|"+$/g, "");
  if (!trimmed) return undefined;
  // Remove trailing slash for consistent concatenation.
  return trimmed.replace(/\/+$/g, "");
}

export const host =
  normalizeAbsoluteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:${port}`);
