import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { business } from "@/lib/site-data";
import { getPublishedBlogs } from "@/lib/upliftai";

export const metadata: Metadata = {
  title: "Car Care Blog | Detailing Tips in Cambridge, ON",
  description:
    "Practical auto detailing, ceramic coating, window tint, and vehicle care advice from Techno Car Studio in Cambridge, Ontario.",
  alternates: { canonical: `${business.baseUrl}/blog` },
  openGraph: {
    title: "Techno Car Studio Blog",
    description: "Expert car care advice for drivers across Cambridge and Waterloo Region.",
    url: `${business.baseUrl}/blog`,
    siteName: business.name,
    type: "website",
  },
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export default async function BlogPage() {
  const blogs = await getPublishedBlogs();

  return (
    <>
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_75%_15%,rgba(234,88,12,0.16),transparent_32%),linear-gradient(180deg,#090806,#050504)] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="From the studio"
            title="Car care, explained by people who do the work."
            summary="Straightforward guides on detailing, protection, tint, and upgrades for drivers in Cambridge and across Waterloo Region."
          />
        </div>
      </section>

      <section className="bg-ink-1 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {blogs.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {blogs.map((blog) => (
                <article
                  key={blog.id}
                  className="group flex overflow-hidden rounded-sm border border-white/10 bg-white/[0.035] transition hover:-translate-y-1 hover:border-orange-400/40"
                >
                  <Link href={`/blog/${blog.slug}`} className="flex w-full flex-col">
                    {blog.featuredImage ? (
                      <div className="relative aspect-[16/9] overflow-hidden bg-ink-4">
                        <Image
                          src={blog.featuredImage}
                          alt={blog.title}
                          fill
                          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                    ) : null}
                    <div className="flex flex-1 flex-col p-6">
                      {blog.categories?.length ? (
                        <p className="eyebrow text-orange-300">{blog.categories[0]}</p>
                      ) : null}
                      <h2 className="mt-3 font-display text-3xl leading-tight text-white">{blog.title}</h2>
                      <p className="mt-4 line-clamp-3 leading-7 text-zinc-400">{blog.excerpt}</p>
                      <div className="mt-6 flex flex-wrap gap-4 text-xs text-zinc-500">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                          {formatDate(blog.publishDate)}
                        </span>
                        {typeof blog.customFields?.readingTime === "string" ? (
                          <span className="inline-flex items-center gap-1.5">
                            <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                            {blog.customFields.readingTime}
                          </span>
                        ) : null}
                      </div>
                      <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-orange-300">
                        Read article
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-sm border border-white/10 bg-white/[0.035] p-8 text-center sm:p-12">
              <h2 className="font-display text-3xl text-white">New guides are on the way.</h2>
              <p className="mx-auto mt-3 max-w-xl leading-7 text-zinc-400">
                We could not load the latest articles right now. Please check back shortly.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

