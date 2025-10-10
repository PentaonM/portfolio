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

  return {
    name: t("name"),
    start_url: "/",
    theme_color: "#101E33",
    description: t("description"),
  };
}
