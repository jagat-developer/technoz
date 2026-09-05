import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { business } from "@/lib/site-data";
import { getBlogBySlug, sanitizeBlogContent } from "@/lib/upliftai";

type BlogPostProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) return { title: "Article Not Found" };

  const title = blog.meta?.seoTitle || blog.title;
  const description = blog.meta?.seoDescription || blog.excerpt;
  const canonical = `${business.baseUrl}/blog/${blog.slug}`;

  return {
    title,
    description,
    keywords: blog.meta?.keywords ?? blog.tags,
    alternates: { canonical },
    openGraph: {
      title: blog.meta?.ogTitle || title,
      description: blog.meta?.ogDescription || description,
      url: canonical,
      siteName: business.name,
      locale: blog.meta?.ogLocale || "en_CA",
      type: "article",
      publishedTime: blog.publishDate,
      modifiedTime: blog.updatedAt,
      authors: blog.authorName ? [blog.authorName] : [business.name],
      section: blog.meta?.articleSection || blog.categories?.[0],
      tags: blog.meta?.articleTags ?? blog.tags,
      images: blog.featuredImage ? [{ url: blog.featuredImage, alt: blog.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.meta?.ogTitle || title,
      description: blog.meta?.ogDescription || description,
      images: blog.featuredImage ? [blog.featuredImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog || blog.status !== "PUBLISH") notFound();

  const canonical = `${business.baseUrl}/blog/${blog.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.featuredImage,
    datePublished: blog.publishDate,
    dateModified: blog.updatedAt ?? blog.publishDate,
    author: { "@type": "Organization", name: blog.authorName || business.name, url: blog.authorUrl || business.baseUrl },
    publisher: { "@type": "Organization", name: business.name, url: business.baseUrl },
    mainEntityOfPage: canonical,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }}
      />
      <article>
        <header className="border-b border-white/10 bg-[radial-gradient(circle_at_75%_15%,rgba(234,88,12,0.16),transparent_32%),linear-gradient(180deg,#090806,#050504)] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-orange-300">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All articles
            </Link>
            {blog.categories?.length ? <p className="eyebrow mt-10 text-orange-300">{blog.categories.join(" · ")}</p> : null}
            <h1 className="mt-4 font-display text-4xl leading-[1.02] text-white sm:text-6xl lg:text-7xl">{blog.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">{blog.excerpt}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-400">
              <span>{blog.authorName || business.name}</span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                {formatDate(blog.publishDate)}
              </span>
              {typeof blog.customFields?.readingTime === "string" ? (
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-4 w-4" aria-hidden="true" />
                  {blog.customFields.readingTime}
                </span>
              ) : null}
            </div>
          </div>
        </header>

        <div className="bg-ink-1 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {blog.featuredImage ? (
              <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-sm border border-white/10 bg-ink-4">
                <Image src={blog.featuredImage} alt={blog.title} fill priority sizes="(min-width: 1024px) 896px, 100vw" className="object-cover" />
              </div>
            ) : null}
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: sanitizeBlogContent(blog.content) }} />
          </div>
        </div>
      </article>

      <section className="border-t border-white/10 bg-ink-3 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-6 rounded-sm border border-orange-400/20 bg-orange-500/[0.06] p-7 sm:flex-row sm:items-center sm:p-9">
          <div>
            <p className="eyebrow text-orange-300">Ready for studio results?</p>
            <h2 className="mt-2 font-display text-3xl text-white">Let’s take care of your vehicle.</h2>
          </div>
          <ButtonLink href="/contact-us">Book a service</ButtonLink>
        </div>
      </section>
    </>
  );
}

