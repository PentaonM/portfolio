import "./globals.css";
import dynamic from "next/dynamic";
import { hasLocale } from "next-intl";
import { Inter } from "next/font/google";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import CustomCursor from "@/lib/CustomCursor";
import type { Metadata, Viewport } from "next";
import { setRequestLocale } from "next-intl/server";
import SpotlightEffect from "@/components/SpotlightEffect";
import { ThemeProvider } from "@/components/providers/theme-provider";
import EnableAccessibility from "@/components/enable/EnableAccessibility";

const CustomSentryFeedbackButton = dynamic(
  () => import("@/components/ui/custom-sentry-feedback-btn"),
  { ssr: false },
);

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fentahun's Portfolio",
  description: "Modern and minimalist portfolio",
  // generator: 'Next.js',
  // applicationName: 'Next.js',
  // referrer: 'origin-when-cross-origin',
  // keywords: ['Next.js', 'React', 'JavaScript'],
  // authors: [{ name: 'Seb' }, { name: 'Josh', url: 'https://nextjs.org' }],
  // creator: 'Fentahun Modawo',
  // publisher: 'Fentahun Modawo',
  // formatDetection: {
  //   email: false,
  //   address: false,
  //   telephone: false,
  // },

  // //OpenGraph
  // openGraph: {
  //   title: "My Next.js App",
  //   description: "This is a description of my Next.js app.",
  //   url: "https://example.com/",
  //   siteName: 'Next.js',
  //   locale: 'en_US',
  //   type: "website",
  //   images: [
  //     {
  //       url: "https://example.com/og-image.jpg",
  //       width: 800,
  //       height: 600,
  //       alt: "Og Image Alt",
  //     },
  //   ],
  // },

  // //Twitter openGraph
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'Next.js',
  //   description: 'The React Framework for the Web',
  //   siteId: '1467726470533754880',
  //   creator: 'Fentahun Modawo',
  //   creatorId: '1467726470533754880',
  //   images: ['https://nextjs.org/og.png'],
  // },

  // //Robots
  // robots: {
  //   index: false,
  //   follow: true,
  //   nocache: true,
  //   googleBot: {
  //     index: true,
  //     follow: false,
  //     noimageindex: true,
  //     "max-video-preview": -1,
  //     "max-image-preview": "large",
  //     "max-snippet": -1,
  //   },
  // },

  // //Manifest
  // manifest: 'https://nextjs.org/manifest.json',
};

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
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={`${inter.className} relative`}>
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
        </ThemeProvider>

        <EnableAccessibility
          locale={locale}
          scriptSrc={`https://cdn.enable.co.il/licenses/${process.env.ENABLE_LICENSE_CODE}-78912/init.js`}
        />
      </body>
    </html>
  );
}
