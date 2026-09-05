import type { Metadata } from "next";
import Image from "next/image";
import { ContactPanel } from "@/components/contact-panel";
import { CoatingSelector } from "@/components/coating-selector";
import { ExteriorWashSection } from "@/components/exterior-wash-section";
import { PackageCard } from "@/components/package-card";
import { SectionHeading } from "@/components/section-heading";
import { ServiceAccordion } from "@/components/service-accordion";
import { business, detailingPackages, services, tintPackages } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Tint and Customs | Techno Car Studio Cambridge",
  description: "Detailing, window tint, ceramic coating, PPF, dashcams, accessories, and custom vehicle services in Cambridge, Ontario.",
  alternates: { canonical: `${business.baseUrl}/tint-and-customs` },
};

export default function TintAndCustomsPage() {
  return (
    <>
      <section className="relative isolate min-h-[58vh] overflow-hidden border-b border-white/10">
        <Image src="/images/window-tint-install.webp" alt="Tint and custom vehicle work at Techno Car Studio" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,4,0.97),rgba(5,5,4,0.72)_58%,rgba(5,5,4,0.32)),linear-gradient(180deg,transparent,#050504)]" />
        <div className="relative mx-auto flex min-h-[58vh] max-w-7xl items-end px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="eyebrow text-orange-300">Existing venture</p>
            <h1 className="mt-4 font-display text-5xl leading-none text-white sm:text-7xl">Tint and Customs</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">Detailing, tint, protection, and custom vehicle upgrades with approved packages shown clearly.</p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Services" title="Choose your Tint and Customs service." summary="Open a service to compare its confirmed starting point and approved inclusions." />
        <div className="mt-12"><ServiceAccordion services={services} /></div>
      </section>
      <section className="border-y border-white/10 bg-ink-3 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Interior detailing" title="Express, Premium, and Ultimate packages." />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">{detailingPackages.map((item) => <PackageCard key={item.id} item={item} featured={item.id === "premium"} />)}</div>
          <ExteriorWashSection className="mt-20" />
        </div>
      </section>
      <PackageGroup title="Window tint packages" summary="Confirmed coverage and starting prices." items={tintPackages} />
      <CoatingSelector />
      <ContactPanel />
    </>
  );
}

function PackageGroup({ title, summary, items, muted = false }: { title: string; summary: string; items: typeof tintPackages; muted?: boolean }) {
  return (
    <section className={`${muted ? "bg-ink-3" : "bg-ink-1"} px-4 py-20 sm:px-6 lg:px-8`}>
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Approved options" title={title} summary={summary} />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">{items.map((item) => <PackageCard key={item.id} item={item} />)}</div>
      </div>
    </section>
  );
}
