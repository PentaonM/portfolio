import "./globals.css";
import dynamic from "next/dynamic";
import { hasLocale } from "next-intl";
import { Inter } from "next/font/google";
import { host, locales } from "@/config";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import CustomCursor from "@/lib/CustomCursor";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import SpotlightEffect from "@/components/SpotlightEffect";
import { SpeedInsights } from "@vercel/speed-insights/next";
import MicrosoftClarity from "@/components/clarity/MicrosoftClarity";
import { ThemeProvider } from "@/components/providers/theme-provider";
import EnableAccessibility from "@/components/enable/EnableAccessibility";

const CustomSentryFeedbackButton = dynamic(
  () => import("@/components/ui/custom-sentry-feedback-btn"),
  { ssr: false },
);

const inter = Inter({ subsets: ["latin"] });

function getOgLocale(locale: string) {
  if (locale === "he") return "he_IL";
  return "en_US";
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Manifest" });
  const siteName = t("name");
  const description = t("description");

  const baseUrl = new URL(host);
  const ogImage = {
    url: "/portfolio-main-1.jpg",
    width: 1296,
    height: 650,
    alt: siteName,
  };

  return {
    metadataBase: baseUrl,
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description,
    applicationName: siteName,
    keywords: [
      "Fentahun Modawo",
      "Full Stack Web Developer",
      "Portfolio",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Jerusalem",
      "Israel",
    ],
    authors: [{ name: "Fentahun Modawo", url: baseUrl }],
    creator: "Fentahun Modawo",
    publisher: "Fentahun Modawo",
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    manifest: `/${locale}/manifest.webmanifest`,
    openGraph: {
      title: siteName,
      description,
      url: `/${locale}`,
      siteName,
      locale: getOgLocale(locale),
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => getOgLocale(l)),
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description,
      images: [ogImage.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
  const shouldLoadClarity =
    Boolean(clarityProjectId) && process.env.NODE_ENV === "production";

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={`${inter.className} relative`}>
        <MicrosoftClarity
          enabled={shouldLoadClarity}
          projectId={clarityProjectId}
          locale={locale}
        />
        <CustomCursor />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SpotlightEffect />
          {children}
          <CustomSentryFeedbackButton />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>

        <EnableAccessibility
          locale={locale}
          scriptSrc={`https://cdn.enable.co.il/licenses/${process.env.ENABLE_LICENSE_CODE}-78912/init.js`}
        />
      </body>
    </html>
  );
}
