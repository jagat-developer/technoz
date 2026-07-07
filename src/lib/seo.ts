import type { Metadata } from "next";
import type { SeoPage } from "@/lib/types";
import { business } from "@/lib/site-data";
import { absoluteUrl } from "@/lib/utils";

export function buildMetadata(page: SeoPage): Metadata {
  const title = page.title;
  const description = page.description;
  const image = absoluteUrl(page.image, business.baseUrl);

  return {
    title,
    description,
    keywords: page.keywords,
    metadataBase: new URL(business.baseUrl),
    alternates: {
      canonical: page.path,
    },
    openGraph: {
      title,
      description,
      url: page.path,
      siteName: business.name,
      locale: "en_CA",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${business.name} automotive service in Kitchener`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
