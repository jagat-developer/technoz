import "server-only";

import { cache } from "react";
import sanitizeHtml from "sanitize-html";

const UPLIFT_API_URL = "https://api.upliftai.co/api/public/v1";
const BLOG_SLUG_PATTERN = /^[a-z0-9-]+$/i;

export type UpliftBlog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: "PUBLISH" | "DRAFT";
  publishDate: string;
  publishTime?: string;
  featuredImage?: string;
  categories?: string[];
  tags?: string[];
  seoScore?: number;
  createdAt?: string;
  updatedAt?: string;
  authorName?: string;
  authorUrl?: string;
  freshness?: {
    lastUpdatedAt?: string;
    ageDays?: number;
    needsRefresh?: boolean;
    freshnessThresholdDays?: number;
  };
  meta?: {
    seoTitle?: string;
    seoDescription?: string;
    focusKeyword?: string;
    keywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
    ogType?: string;
    ogUrl?: string;
    ogSiteName?: string;
    ogLocale?: string;
    articleAuthor?: string;
    articleSection?: string;
    articleTags?: string[];
  };
  customFields?: Record<string, unknown>;
};

type BlogListResponse = {
  success: boolean;
  data?: {
    blogs: UpliftBlog[];
    pagination: { page: number; limit: number; total: number; totalPages: number };
  };
};

type BlogDetailResponse = {
  success: boolean;
  data?: { blog: UpliftBlog };
};

function authorizationHeaders() {
  const token = process.env.UPLIFTAI_API_KEY;

  if (!token) {
    throw new Error("UPLIFTAI_API_KEY is not configured");
  }

  return { Authorization: `Bearer ${token}` };
}

export async function getPublishedBlogs(limit = 100): Promise<UpliftBlog[]> {
  try {
    const params = new URLSearchParams({ page: "1", limit: String(limit), status: "PUBLISH" });
    const response = await fetch(`${UPLIFT_API_URL}/blogs?${params}`, {
      headers: authorizationHeaders(),
      next: { revalidate: 3600, tags: ["upliftai-blogs"] },
    });

    if (!response.ok) return [];

    const payload = (await response.json()) as BlogListResponse;
    return payload.success ? (payload.data?.blogs ?? []) : [];
  } catch (error) {
    console.error("Unable to load UpliftAI blogs", error);
    return [];
  }
}

export const getBlogBySlug = cache(async (slug: string): Promise<UpliftBlog | null> => {
  if (!BLOG_SLUG_PATTERN.test(slug)) return null;

  try {
    const response = await fetch(`${UPLIFT_API_URL}/blog/${encodeURIComponent(slug)}`, {
      headers: authorizationHeaders(),
      next: { revalidate: 3600, tags: ["upliftai-blogs", `upliftai-blog-${slug}`] },
    });

    if (response.status === 404 || !response.ok) return null;

    const payload = (await response.json()) as BlogDetailResponse;
    return payload.success ? (payload.data?.blog ?? null) : null;
  } catch (error) {
    console.error(`Unable to load UpliftAI blog: ${slug}`, error);
    return null;
  }
});

export function sanitizeBlogContent(content: string) {
  return sanitizeHtml(content, {
    allowedTags: [
      "p",
      "br",
      "h2",
      "h3",
      "h4",
      "ul",
      "ol",
      "li",
      "strong",
      "em",
      "blockquote",
      "a",
      "img",
      "figure",
      "figcaption",
      "code",
      "pre",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
    ],
    allowedAttributes: {
      a: ["href", "rel"],
      img: ["src", "alt", "width", "height", "loading", "decoding"],
      "*": ["id"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      a: (_tagName, attribs) => ({
        tagName: "a",
        attribs: {
          href: attribs.href ?? "#",
          rel: "noopener noreferrer",
        },
      }),
      img: (_tagName, attribs) => ({
        tagName: "img",
        attribs: {
          src: attribs.src ?? "",
          alt: attribs.alt ?? "",
          loading: "lazy",
          decoding: "async",
        },
      }),
    },
    disallowedTagsMode: "discard",
  });
}
