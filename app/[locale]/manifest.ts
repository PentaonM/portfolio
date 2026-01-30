import { MetadataRoute } from "next";
import { getTranslations } from "next-intl/server";

interface Params {
  params: {
    locale: string;
  };
}

export default async function manifest({
  params: { locale },
}: Params): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations({ locale, namespace: "Manifest" });
  const isRtl = locale === "he";

  return {
    name: t("name"),
    description: t("description"),
    short_name: locale === "he" ? "פנטהון" : "Fentahun",
    lang: locale,
    dir: isRtl ? "rtl" : "ltr",
    start_url: `/${locale}`,
    scope: `/${locale}/`,
    display: "standalone",
    background_color: "#000000",
    theme_color: "#101E33",
    icons: [
      {
        src: "/logo192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
