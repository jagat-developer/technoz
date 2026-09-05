import type { MetadataRoute } from "next";
import { business, pageSeo } from "@/lib/site-data";
import { getPublishedBlogs } from "@/lib/upliftai";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date("2026-09-03");
  const pages: MetadataRoute.Sitemap = pageSeo.map((page) => ({
    url: `${business.baseUrl}${page.path === "/" ? "" : page.path}`,
    lastModified,
    changeFrequency: page.path === "/" ? "weekly" : "monthly",
    priority: page.priority,
    images: [`${business.baseUrl}${page.image}`],
  }));

  const blogs = await getPublishedBlogs();
  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${business.baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogs.map((blog) => ({
      url: `${business.baseUrl}/blog/${blog.slug}`,
      lastModified: new Date(blog.updatedAt ?? blog.publishDate),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: blog.featuredImage ? [blog.featuredImage] : undefined,
    })),
  ];

  const venturePages: MetadataRoute.Sitemap = ["/wheels-and-tires", "/tint-and-customs"].map((path) => ({
    url: `${business.baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...pages, ...venturePages, ...blogPages];
}
