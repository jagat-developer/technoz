import { business, detailingPackages, services } from "@/lib/site-data";
import type { LocalSeoPage } from "@/lib/types";
import { absoluteUrl } from "@/lib/utils";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${business.baseUrl}/#business`,
    name: business.legalName,
    image: absoluteUrl("/images/studio-red-car-hero.jpg"),
    url: business.baseUrl,
    telephone: business.phone,
    email: business.email,
    description: business.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      addressLocality: business.city,
      addressRegion: business.region,
      postalCode: business.postalCode,
      addressCountry: business.country,
    },
    areaServed: ["Kitchener", "Waterloo", "Cambridge", "Kitchener-Waterloo-Cambridge"],
    sameAs: [business.instagramUrl],
    priceRange: "$$",
  };
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Techno Car Studio automotive services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        provider: {
          "@id": `${business.baseUrl}/#business`,
        },
        areaServed: "Kitchener-Waterloo-Cambridge",
        description: service.summary,
        offers: service.startingAt
          ? {
              "@type": "Offer",
              priceCurrency: "CAD",
              price: service.startingAt.replace(/[^0-9.]/g, ""),
              availability: "https://schema.org/InStock",
            }
          : undefined,
      },
    })),
  };
}

export function packageSchema(slug: string) {
  const item = detailingPackages.find((servicePackage) => servicePackage.slug === slug);

  if (!item) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: item.name,
    provider: {
      "@id": `${business.baseUrl}/#business`,
    },
    areaServed: "Kitchener-Waterloo-Cambridge",
    description: item.summary,
    offers: item.prices?.map((price) => ({
      "@type": "Offer",
      name: `${item.name} - ${price.vehicle}`,
      priceCurrency: "CAD",
      price: price.price.replace(/[^0-9.]/g, ""),
      availability: "https://schema.org/InStock",
    })),
  };
}

export function localSeoServiceSchema(page: LocalSeoPage) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${page.service.label} in ${page.city.name}`,
    provider: {
      "@id": `${business.baseUrl}/#business`,
    },
    areaServed: {
      "@type": "City",
      name: page.city.name,
      addressRegion: page.city.region,
      addressCountry: business.country,
    },
    serviceType: page.service.label,
    description: page.seo.description,
    image: absoluteUrl(page.service.image),
    url: absoluteUrl(page.path),
    offers: page.service.startingAt
      ? {
          "@type": "Offer",
          priceCurrency: "CAD",
          price: page.service.startingAt.replace(/[^0-9.]/g, ""),
          availability: "https://schema.org/InStock",
          url: absoluteUrl(page.path),
        }
      : undefined,
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
