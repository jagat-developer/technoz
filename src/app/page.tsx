import Image from "next/image";
import type { Metadata } from "next";
import { Award, Clock, MapPin, ShieldCheck, Sparkles, Star, Wrench } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { ContactPanel } from "@/components/contact-panel";
import { ExteriorWashSection } from "@/components/exterior-wash-section";
import { GalleryGrid } from "@/components/gallery-grid";
import { PackageCard } from "@/components/package-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ServiceAccordion } from "@/components/service-accordion";
import { detailingPackages, getSeo, services, testimonials } from "@/lib/site-data";
import { breadcrumbSchema, localBusinessSchema, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { jsonLd } from "@/lib/utils";

const seo = getSeo("home");

export const metadata: Metadata = seo ? buildMetadata(seo) : {};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd([localBusinessSchema(), serviceSchema(), breadcrumbSchema([{ name: "Home", path: "/" }])]) }}
      />
      <section className="relative isolate min-h-[calc(88svh-6rem)] overflow-hidden">
        <Image
          src="/images/studio-red-car-hero.jpg"
          alt="Red coupe inside Techno Car Studio under premium shop lighting"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[center_86%] sm:object-[center_88%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,4,0.98),rgba(5,5,4,0.84)_40%,rgba(5,5,4,0.54)_70%,rgba(5,5,4,0.26)),linear-gradient(180deg,rgba(5,5,4,0.04),#050504_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_52%,rgba(234,88,12,0.16),transparent_35%),linear-gradient(115deg,transparent_0%,transparent_58%,rgba(255,255,255,0.07)_58.2%,transparent_58.8%)]" />
        <div className="relative mx-auto flex min-h-[calc(88svh-6rem)] max-w-7xl items-center px-4 py-14 sm:px-6 lg:px-8">
          <Reveal className="w-full min-w-0 max-w-3xl">
            <p className="mb-5 inline-flex max-w-full border-l border-orange-500 pl-3 text-[0.68rem] font-semibold uppercase leading-5 tracking-[0.18em] text-orange-300 sm:text-xs sm:tracking-[0.24em]">
              Premium automotive care in Kitchener
            </p>
            <h1 className="fluid-hero max-w-[11ch] font-display font-normal text-white [text-shadow:0_14px_50px_rgba(0,0,0,0.72)] sm:max-w-none">
              Your car deserves expert care.
            </h1>
            <p className="mt-6 max-w-[22rem] text-base leading-8 text-zinc-300 sm:max-w-xl sm:text-lg">
              Interior detailing, exterior hand wash, tint, ceramic coating, PPF, dashcam, remote starter, audio, and
              CarPlay installation for KWC drivers.
            </p>
            <ul className="mt-7 flex max-w-xl flex-col items-start gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-200 sm:flex-row sm:flex-wrap">
              {["Interior detail from $49", "Exterior wash from $49", "Tint from $149"].map((item) => (
                <li
                  key={item}
                  className="max-w-full shrink-0 whitespace-nowrap border border-white/12 bg-white/[0.06] px-3 py-2 backdrop-blur-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact-us">Book a Service</ButtonLink>
              <ButtonLink href="/servicing-pricing" variant="secondary">
                View Packages
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-white/10 bg-ink-3">
        <div className="mx-auto grid max-w-7xl gap-0 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[
            { label: "Years of source-site experience", value: "20+", icon: Award },
            { label: "Core automotive service lanes", value: "5", icon: Wrench },
            { label: "Local KWC service focus", value: "KWC", icon: MapPin },
          ].map((stat) => (
            <div key={stat.label} className="border-white/10 py-9 lg:border-r lg:px-8 lg:last:border-r-0">
              <stat.icon className="h-5 w-5 text-orange-400" aria-hidden="true" />
              <p className="mt-5 font-display text-5xl font-normal text-white">{stat.value}</p>
              <p className="mt-2 text-sm text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="One studio for the way your vehicle looks, feels, and drives."
            summary="Every service is presented source-first. Exact detailing package times and prices are published; incomplete service data remains quote-based until the client confirms it."
          />
        </Reveal>
        <Reveal className="mt-12" delay={0.1}>
          <ServiceAccordion services={services} />
        </Reveal>
      </section>

      <section className="bg-ink-3">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Interior detailing"
              title="Interior detailing packages with source-confirmed timing."
              summary="Express, Premium, and Ultimate packages are now presented as interior package paths with vehicle pricing and estimated service windows."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {detailingPackages.map((item) => (
              <Reveal key={item.id} delay={item.id === "premium" ? 0.1 : 0}>
                <PackageCard item={item} featured={item.id === "premium"} />
              </Reveal>
            ))}
          </div>
          <ExteriorWashSection className="mt-20" />
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(234,88,12,0.15),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Why choose us"
              title="Craftsmanship, clear options, and work drivers actually recommend."
              summary="The source reviews highlight professional tinting, reasonable prices, fast friendly service, and cars returning clean enough to feel new."
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Source-led pricing", body: "Published details stay tied to the current site, with quote-based copy where facts are missing.", icon: ShieldCheck },
              { title: "Fast service paths", body: "Interior Express starts at 1 to 1.5 hours, with exterior hand wash available separately.", icon: Clock },
              { title: "Premium finish", body: "Dark studio design, real images, and sharper service content elevate the brand image.", icon: Sparkles },
              { title: "Local trust", body: "Reviews call out tint quality, detailing results, affordability, and KWC-area recommendation.", icon: Star },
            ].map((item) => (
              <Reveal key={item.title}>
                <article className="min-h-48 rounded-sm border border-white/10 bg-white/[0.045] p-6">
                  <item.icon className="h-6 w-6 text-orange-400" aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-ink-3">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Loved by drivers"
              title="Google review language, refined into proof points."
              summary="Testimonials are sourced from the current site’s review feed and lightly tightened for presentation."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="rounded-sm border border-white/10 bg-ink-4 p-5">
                <div className="flex gap-1 text-orange-400" aria-label="Five star review">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <p className="mt-5 text-sm leading-7 text-zinc-300">“{testimonial.quote}”</p>
                <p className="mt-5 text-sm font-semibold text-white">{testimonial.name}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-orange-300">{testimonial.service}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Studio work"
            title="A sharper gallery for real source-site vehicle work."
            summary="Migrated gallery assets are local, optimized through Next image, and tagged for service relevance."
          />
        </Reveal>
        <Reveal className="mt-12">
          <GalleryGrid />
        </Reveal>
      </section>

      <ContactPanel />
    </>
  );
}
