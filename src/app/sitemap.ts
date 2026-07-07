import type { MetadataRoute } from "next";
import { business, pageSeo } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-06-22");

  return pageSeo.map((page) => ({
    url: `${business.baseUrl}${page.path === "/" ? "" : page.path}`,
    lastModified,
    changeFrequency: page.path === "/" ? "weekly" : "monthly",
    priority: page.priority,
    images: [`${business.baseUrl}${page.image}`],
  }));
}
