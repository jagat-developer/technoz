import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Check } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { ContactPanel } from "@/components/contact-panel";
import { ExteriorWashSection } from "@/components/exterior-wash-section";
import { GalleryGrid } from "@/components/gallery-grid";
import { PackageCard } from "@/components/package-card";
import { PackageExpectations } from "@/components/package-expectations";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ServiceAccordion } from "@/components/service-accordion";
import { SupplierProductGrid } from "@/components/supplier-product-grid";
import type { LocalSeoPage } from "@/lib/types";
import {
  accessoryPackages,
  business,
  detailingPackages,
  getContentPage,
  getLocalSeoPage,
  getPackageBySlug,
  getSeo,
  localSeoCities,
  localSeoPages,
  memberships,
  ppfAddOns,
  ppfPackages,
  publicRoutes,
  services,
  supplierProducts,
  testimonials,
} from "@/lib/site-data";
import {
  breadcrumbSchema,
  faqPageSchema,
  localBusinessSchema,
  localSeoServiceSchema,
  packageSchema,
  serviceSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { jsonLd } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return publicRoutes.filter((path) => path !== "/").map((path) => ({ slug: path.slice(1) }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const seo = getSeo(slug);

  if (!seo) {
    return {};
  }

  return buildMetadata(seo);
}

export default async function PublicPage({ params }: PageProps) {
  const { slug } = await params;
  const servicePackage = getPackageBySlug(slug);
  const contentPage = getContentPage(slug);
  const localSeoPage = getLocalSeoPage(slug);

  if (servicePackage) {
    const schema = packageSchema(slug);

    return (
      <>
        {schema ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: jsonLd([
                schema,
                breadcrumbSchema([
                  { name: "Home", path: "/" },
                  { name: "Servicing & Pricing", path: "/servicing-pricing" },
                  { name: servicePackage.name, path: `/${slug}` },
                ]),
              ]),
            }}
          />
        ) : null}
        <PackageDetail slug={slug} />
      </>
    );
  }

  if (slug === "dashcam") {
    return <DashcamPage />;
  }

  if (localSeoPage) {
    return <LocalSeoPageTemplate page={localSeoPage} />;
  }

  if (!contentPage) {
    notFound();
  }

  return <ContentPageTemplate slug={slug} />;
}

function PageHero({
  eyebrow,
  title,
  summary,
  image,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  image: string;
}) {
  return (
    <section className="relative isolate min-h-[56vh] overflow-hidden border-b border-white/10">
      <Image
        src={image}
        alt={title}
        fill
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,4,0.94),rgba(5,5,4,0.7)_45%,rgba(5,5,4,0.4)),linear-gradient(180deg,rgba(5,5,4,0.18),#050504_100%)]" />
      <div className="relative mx-auto flex min-h-[56vh] max-w-7xl items-end px-4 py-16 sm:px-6 lg:px-8">
        <Reveal className="w-full min-w-0 max-w-4xl">
          <p className="mb-5 inline-flex border-l border-orange-500 pl-3 text-xs font-semibold uppercase tracking-[0.24em] text-orange-300">
            {eyebrow}
          </p>
          <h1 className="max-w-[12ch] font-display text-4xl leading-[1] text-white sm:max-w-none sm:text-7xl">{title}</h1>
          <p className="mt-6 max-w-[22rem] text-base leading-8 text-zinc-300 sm:max-w-2xl sm:text-lg">{summary}</p>
        </Reveal>
      </div>
    </section>
  );
}

function ContentPageTemplate({ slug }: { slug: string }) {
  const page = getContentPage(slug);

  if (!page) {
    notFound();
  }

  const showServices = slug === "servicing-pricing";
  const showGallery = slug === "our-work";
  const showMembership = slug === "membership";
  const showContact = slug === "contact-us";
  const showAbout = slug === "about-us";
  const showPpf = slug === "paint-protection-film";
  const showPageIntro = !showServices;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            serviceSchema(),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: page.seo.title.split("|")[0].trim(), path: page.seo.path },
            ]),
          ]),
        }}
      />
      <PageHero eyebrow={page.eyebrow} title={page.title} summary={page.summary} image={page.heroImage} />

      {showPageIntro ? (
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <Reveal>
            <div className="sticky top-28">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-300">Overview</p>
              <p className="mt-4 text-sm leading-7 text-zinc-500">
                Premium automotive care, organized so drivers can compare services with confidence.
              </p>
            </div>
          </Reveal>
          <Reveal className="grid gap-6 text-lg leading-9 text-zinc-300">
            {page.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </section>
      ) : null}

      {showPageIntro && page.sections.length ? (
        <section className="border-y border-white/10 bg-ink-3">
          <div className="mx-auto grid max-w-7xl gap-5 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
            {page.sections.map((section) => (
              <Reveal key={section.title}>
                <article className="h-full rounded-sm border border-white/10 bg-ink-4 p-6">
                  <h2 className="font-display text-3xl text-white">{section.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-zinc-400">{section.body}</p>
                  {section.points ? (
                    <ul className="mt-6 grid gap-3 text-sm text-zinc-300">
                      {section.points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" aria-hidden="true" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {showServices ? <ServicesPricingBlock /> : null}
      {showPpf ? <PpfPackagesBlock /> : null}
      {showGallery ? <WorkBlock /> : null}
      {showMembership ? <MembershipBlock /> : null}
      {showAbout ? <AboutProofBlock /> : null}
      {showContact ? <ContactPanel /> : <BottomCta />}
    </>
  );
}

function LocalSeoPageTemplate({ page }: { page: LocalSeoPage }) {
  const serviceCategory =
    services.find((service) => service.id === page.service.id) ??
    services.find((service) => service.id === "accessories");
  const serviceLabel = `${page.service.label} in ${page.city.name}`;
  const localFaqs = getLocalSeoFaqs(page);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            localBusinessSchema(),
            localSeoServiceSchema(page),
            faqPageSchema(localFaqs),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: serviceLabel, path: page.path },
            ]),
          ]),
        }}
      />
      <PageHero
        eyebrow={`${page.city.name} ${page.service.keyword}`}
        title={serviceLabel}
        summary={page.service.summary}
        image={page.service.image}
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <Reveal>
          <div className="sticky top-28">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-300">Local service</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-white">{page.service.headline}</h2>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <ButtonLink href="/contact-us">Book This Service</ButtonLink>
              <Link
                href="/servicing-pricing"
                className="inline-flex h-12 items-center justify-center rounded-sm border border-white/15 px-5 text-sm font-semibold text-white transition hover:border-orange-400/60 hover:bg-orange-500/10"
              >
                Compare Services
              </Link>
            </div>
          </div>
        </Reveal>
        <Reveal className="grid gap-6 text-lg leading-9 text-zinc-300">
          <p>
            Techno Car Studio serves {page.city.serviceArea} with {page.service.keyword} and premium automotive care
            from its {business.city} studio.
          </p>
          <p>{page.city.localContext}</p>
          <p>{page.service.conversionAngle}</p>
          <p>{page.service.sourceFact}</p>
        </Reveal>
      </section>

      <section className="border-y border-white/10 bg-ink-3">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-20 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[
            { label: "Service", value: page.service.label },
            { label: "Starting point", value: page.service.startingAt ?? "Contact for quote" },
            { label: "Studio location", value: `${business.city}, ${business.region}` },
          ].map((item) => (
            <Reveal key={item.label}>
              <article className="h-full rounded-sm border border-white/10 bg-ink-4 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-300">{item.label}</p>
                <p className="mt-4 font-display text-4xl leading-tight text-white">{item.value}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <FeatureList title={`Why choose this ${page.service.keyword} service`} items={page.service.proofPoints} />
        <FeatureList title="What the process looks like" items={serviceCategory?.process ?? page.service.proofPoints} />
      </section>

      <section className="border-y border-white/10 bg-ink-3">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={`${page.city.name} service answers`}
            title={`Common questions about ${page.service.keyword}.`}
            summary="Clear answers about pricing, location, and booking before you contact the studio."
          />
          <dl className="mt-10 grid gap-4">
            {localFaqs.map((item) => (
              <Reveal key={item.question}>
                <div className="rounded-sm border border-white/10 bg-ink-4 p-6">
                  <dt className="text-lg font-semibold text-white">{item.question}</dt>
                  <dd className="mt-3 text-sm leading-7 text-zinc-400">{item.answer}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {page.service.id === "detailing" ? (
        <section className="border-y border-white/10 bg-ink-3">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow={`${page.city.name} detailing packages`}
              title="Compare interior packages and exterior wash options."
              summary="Choose the interior package or exterior wash option that best fits your vehicle condition and schedule."
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {detailingPackages.map((item) => (
                <PackageCard key={item.id} item={item} featured={item.id === "premium"} />
              ))}
            </div>
            <ExteriorWashSection className="mt-20" />
          </div>
        </section>
      ) : serviceCategory?.packages?.length ? (
        <section className="border-y border-white/10 bg-ink-3">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow={`${page.service.label} options`}
              title="Approved packages and service paths."
              summary="Only confirmed starting prices and inclusions are shown. Vehicle-specific details are finalized before booking."
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {serviceCategory.packages.map((item) => (
                <PackageCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="border-y border-white/10 bg-ink-3">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Vehicle-specific guidance"
              title="The right recommendation depends on your vehicle and goals."
              summary="Call or send a booking request so the studio can confirm fitment, timing, warranty, and the best service path."
            />
          </div>
        </section>
      )}

      <LocalSeoLinksBlock currentSlug={page.slug} />
      <ContactPanel />
    </>
  );
}

function getLocalSeoFaqs(page: LocalSeoPage) {
  const priceAnswer = page.service.startingAt
    ? `${page.service.sourceFact} Final pricing depends on the vehicle, condition, coverage, and any selected add-ons.`
    : `${page.service.sourceFact} The team confirms pricing after checking the vehicle, compatibility, and requested work.`;

  return [
    {
      question: `How much does ${page.service.keyword} cost for ${page.city.name} drivers?`,
      answer: priceAnswer,
    },
    {
      question: `Where is Techno Car Studio for ${page.service.keyword}?`,
      answer: `The studio is at ${business.address}, ${business.city}, ${business.region} ${business.postalCode}. ${page.city.localContext}`,
    },
    {
      question: `How do I book ${page.service.keyword} near ${page.city.name}?`,
      answer: `Send the booking form with your vehicle, preferred timing, and requested work, or call ${business.phoneDisplay}. The studio confirms availability and any vehicle-specific details before the appointment.`,
    },
    {
      question: `What should I confirm before booking ${page.service.keyword}?`,
      answer: `${page.service.conversionAngle} Exact timing, compatibility, warranty details, and final price are confirmed for your vehicle before service.`,
    },
  ];
}

function PackageDetail({ slug }: { slug: string }) {
  const item = getPackageBySlug(slug);

  if (!item) {
    notFound();
  }

  const featureColumns = [
    { title: "Interior inclusions", items: item.interior },
    item.exterior?.length ? { title: "Exterior inclusions", items: item.exterior } : null,
  ].filter((column): column is { title: string; items: string[] } => Boolean(column));

  return (
    <>
      <PageHero eyebrow={item.eyebrow} title={item.name} summary={item.summary} image={item.image} />
      <section className="mx-auto grid min-w-0 max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <Reveal className="min-w-0">
          <div className="min-w-0 rounded-sm border border-white/10 bg-ink-4 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-300">Estimated time</p>
            <p className="mt-3 font-display text-4xl text-white">{item.time}</p>
            <p className="mt-5 text-sm leading-7 text-zinc-400">{item.idealFor}</p>
            <ButtonLink href="/contact-us" className="mt-7">
              {item.cta}
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal className="min-w-0">
          <div className="min-w-0 rounded-sm border border-white/10 bg-white/[0.035] p-5 sm:p-6">
            <h2 className="font-display text-4xl text-white">Pricing by vehicle</h2>
            <dl className="mt-7 grid gap-3">
              {item.prices?.map((price) => (
                <div key={price.vehicle} className="flex min-w-0 items-start justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="min-w-0 break-words text-zinc-400">{price.vehicle}</dt>
                  <dd className="shrink-0 text-xl font-semibold text-white">{price.price}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
        <Reveal className="min-w-0 lg:col-span-2">
          <PackageExpectations id="expectation-guide" items={item.expectations} title={`${item.name} expectation guide`} />
        </Reveal>
      </section>
      <section className="border-y border-white/10 bg-ink-3">
        <div
          className={`mx-auto grid max-w-7xl gap-5 px-4 py-20 sm:px-6 lg:px-8 ${
            featureColumns.length > 1 ? "lg:grid-cols-2" : ""
          }`}
        >
          {featureColumns.map((column) => (
            <FeatureList key={column.title} title={column.title} items={column.items} />
          ))}
          {item.note ? (
            <p
              className={`rounded-sm border border-white/10 bg-white/[0.035] p-4 text-xs leading-6 text-zinc-500 ${
                featureColumns.length > 1 ? "lg:col-span-2" : ""
              }`}
            >
              {item.note}
            </p>
          ) : null}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Compare packages"
          title="Need a different level of clean?"
          summary="Move up or down based on vehicle condition, timing, and how much protection you want."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {detailingPackages.map((packageItem) => (
            <PackageCard key={packageItem.id} item={packageItem} featured={packageItem.id === item.id} />
          ))}
        </div>
      </section>
      <ContactPanel />
    </>
  );
}

function FeatureList({ title, items }: { title: string; items: string[] }) {
  return (
    <Reveal>
      <article className="h-full rounded-sm border border-white/10 bg-ink-4 p-6">
        <h2 className="font-display text-4xl text-white">{title}</h2>
        <ul className="mt-7 grid gap-3 text-sm text-zinc-300">
          {items.map((item) => (
            <li key={item} className="flex gap-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}

function ServicesPricingBlock() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Service menu"
          title="Choose the right service for your vehicle."
          summary="Compare detailing, exterior wash, tint, ceramic coating, PPF, and accessory options with clear starting points."
        />
        <div className="mt-12">
          <ServiceAccordion services={services} />
        </div>
      </section>
      <section className="border-y border-white/10 bg-ink-3">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Interior detailing"
            title="Interior detailing packages"
            summary="Express, Premium, and Ultimate make it easy to choose the right cabin clean based on vehicle condition and time."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {detailingPackages.map((item) => (
              <PackageCard key={item.id} item={item} featured={item.id === "premium"} />
            ))}
          </div>
          <ExteriorWashSection className="mt-20" />
        </div>
      </section>
      <LocalSeoLinksBlock />
    </>
  );
}

function LocalSeoLinksBlock({ currentSlug }: { currentSlug?: string }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Local service pages"
        title="Based in Cambridge and serving KWC drivers."
        summary="Start with Cambridge or choose your city to compare local service details and booking information."
      />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {localSeoCities.map((city) => (
          <article key={city.slug} className="rounded-sm border border-white/10 bg-white/[0.035] p-6">
            <h2 className="font-display text-3xl text-white">{city.name}</h2>
            <div className="mt-6 grid gap-2">
              {localSeoPages
                .filter((page) => page.city.slug === city.slug && page.slug !== currentSlug)
                .map((page) => (
                  <Link
                    key={page.slug}
                    href={page.path}
                    className="rounded-sm border border-white/10 px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:border-orange-400/60 hover:bg-orange-500/10 hover:text-orange-200"
                  >
                    {page.service.label}
                  </Link>
                ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DashcamPage() {
  const seo = getSeo("dashcam");
  const dashcams = supplierProducts.filter((product) => product.category === "Dashcams");
  const installationBundles = supplierProducts.filter((product) => product.category === "Installation Bundles");
  const lighting = supplierProducts.filter((product) => product.category === "Lighting");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Dashcam", path: "/dashcam" },
            ]),
          ),
        }}
      />
      <PageHero
        eyebrow="Dashcam & installation"
        title="Dashcam, lighting, and install bundle pricing."
        summary={seo?.description ?? "Dashcam options for Kitchener-Waterloo-Cambridge drivers."}
        image="/images/yodha-x35-dashcam.jpg"
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Retail catalog"
          title="Retail prices from the Yodha catalog."
          summary="Compare visible retail prices, sale pricing, and product images from the Yodha catalog. Final availability, tax, fitment, install time, and warranty are confirmed during booking."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {accessoryPackages.map((item) => (
            <PackageCard key={item.id} item={item} />
          ))}
        </div>
        <SupplierProductGrid
          products={dashcams}
          title="Dashcams and hardwire accessories"
          summary="Product-only retail pricing from Yodha, including REDTIGER and YODHA dashcam models plus hardwire accessories."
        />
        <SupplierProductGrid
          products={installationBundles}
          title="Installation bundles"
          summary="Bundle pricing for installed YODHA dashcam options and subwoofer installation. Azdome M350 is shown as text-only pricing because no product image is available."
        />
        <SupplierProductGrid
          products={lighting}
          title="Ambient, starlight, and underglow lighting"
          summary="Retail sale prices from Yodha for ambient lighting kits, starlight headliner kits, and exterior underglow."
        />
      </section>
      <ContactPanel />
    </>
  );
}

function WorkBlock() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Gallery"
        title="Local vehicle work, presented with premium restraint."
        summary="These images show completed vehicle work across detailing, tinting, protection, and accessory services."
      />
      <div className="mt-10">
        <GalleryGrid />
      </div>
    </section>
  );
}

function PpfPackagesBlock() {
  return (
    <>
      <section className="border-y border-white/10 bg-ink-3">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="PPF coverage packages"
            title="Choose the protection level around the panels that matter most."
            summary="Compare clear film coverage levels, then confirm final film brand, warranty, fitment, tax, and installation timing during booking."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {ppfPackages.map((item, index) => (
              <PackageCard key={item.id} item={item} featured={index === 2} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <Reveal>
          <div className="sticky top-28">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-300">Optional coverage</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-white">Small impact zones deserve their own plan.</h2>
            <p className="mt-5 text-sm leading-7 text-zinc-400">
              Add-on areas should be quoted by vehicle pattern and condition so customers only pay for protection that fits
              their actual use.
            </p>
            <ButtonLink href="/contact-us" className="mt-7">
              Request PPF Quote
            </ButtonLink>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {ppfAddOns.map((item) => (
            <Reveal key={item.name}>
              <article className="h-full rounded-sm border border-white/10 bg-ink-4 p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                  <span className="rounded-sm border border-orange-400/20 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-orange-200">
                    {item.price}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-zinc-400">{item.description}</p>
              </article>
            </Reveal>
          ))}
          <Reveal>
            <article className="h-full rounded-sm border border-orange-400/25 bg-orange-500/10 p-6">
              <h3 className="text-xl font-semibold text-white">Film & Warranty Confirmation</h3>
              <p className="mt-4 text-sm leading-7 text-orange-50/80">
                The studio will confirm the exact film line, available warranty terms, and whether self-healing film is
                available for your vehicle before booking.
              </p>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function MembershipBlock() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Membership tiers"
        title="Plans for repeat car care."
        summary="Choose a membership tier, then confirm the billing cadence and service rhythm with the studio."
      />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {memberships.map((tier) => (
          <article key={tier.name} className="rounded-sm border border-white/10 bg-ink-4 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-300">{tier.label}</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{tier.name}</h2>
            <p className="mt-6 font-display text-5xl font-normal text-white">{tier.price}</p>
            <ul className="mt-7 grid gap-3 text-sm text-zinc-300">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <ButtonLink href="/contact-us" className="mt-8 w-full">
              Join Us
            </ButtonLink>
          </article>
        ))}
      </div>
    </section>
  );
}

function AboutProofBlock() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Reviews"
        title="What clients say"
        summary="Customer feedback points to the services that lead the brand story: tinting, detailing, affordability, and friendly service."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.slice(0, 6).map((testimonial) => (
          <article key={testimonial.name} className="rounded-sm border border-white/10 bg-white/[0.035] p-5">
            <p className="text-sm leading-7 text-zinc-300">“{testimonial.quote}”</p>
            <p className="mt-5 text-sm font-semibold text-white">{testimonial.name}</p>
            <p className="text-xs uppercase tracking-[0.18em] text-orange-300">{testimonial.service}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BottomCta() {
  return (
    <section className="border-t border-white/10 bg-ink-3">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-300">{business.city}, {business.region}</p>
          <h2 className="mt-3 font-display text-4xl text-white">Ready to plan your service?</h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact-us">Book Now</ButtonLink>
          <Link
            href="/servicing-pricing"
            className="inline-flex h-12 items-center justify-center rounded-sm border border-white/15 px-5 text-sm font-semibold text-white transition hover:border-orange-400/60 hover:bg-orange-500/10"
          >
            View Services
          </Link>
        </div>
      </div>
    </section>
  );
}
