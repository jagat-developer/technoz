import type { Metadata } from "next";
import Image from "next/image";
import { CircleGauge, Disc3, ShieldCheck, Wrench } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { ContactPanel } from "@/components/contact-panel";
import { SectionHeading } from "@/components/section-heading";
import { business, wheelAndTireBrands, wheelAndTireServices } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Techno Wheels and Tires | Cambridge, ON",
  description: "Custom rims, new and used tires, oil changes, rustproofing, and brake changes in Cambridge, Ontario.",
  alternates: { canonical: `${business.baseUrl}/wheels-and-tires` },
};

const icons = [Disc3, CircleGauge, Wrench, ShieldCheck, Wrench];

export default function WheelsAndTiresPage() {
  return (
    <>
      <section className="relative isolate min-h-[58vh] overflow-hidden border-b border-white/10">
        <Image src="/images/exterior-g-wagon-wash.jpg" alt="Vehicle at Techno Car Studio" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,4,0.97),rgba(5,5,4,0.76)_55%,rgba(5,5,4,0.38)),linear-gradient(180deg,transparent,#050504)]" />
        <div className="relative mx-auto flex min-h-[58vh] max-w-7xl items-end px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="eyebrow text-orange-300">New venture</p>
            <h1 className="mt-4 font-display text-5xl leading-none text-white sm:text-7xl">Techno Wheels and Tires</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">Custom rims, new and used tires, and essential lube and maintenance services in Cambridge.</p>
            <ButtonLink href="/contact-us" className="mt-8">Enquire or Book</ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Services and prices" title="Clear starting points for wheels, tires, and maintenance." summary="Premium parts available along with installation. Whether pricing is per item, set, axle, tax-inclusive, or includes additional work is confirmed before booking." />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {wheelAndTireServices.map((service, index) => {
            const Icon = icons[index];
            return (
              <article key={service.id} className="flex min-h-64 flex-col rounded-sm border border-white/10 bg-white/[0.035] p-6">
                <Icon className="h-6 w-6 text-orange-400" aria-hidden="true" />
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-orange-300">{service.price}</p>
                <h2 className="mt-3 font-display text-4xl text-white">{service.title}</h2>
                <p className="mt-4 text-base leading-7 text-zinc-400">{service.description}</p>
                <ButtonLink href="/contact-us" variant="secondary" className="mt-auto pt-0">Enquire</ButtonLink>
              </article>
            );
          })}
        </div>
        {wheelAndTireBrands.length > 0 ? (
          <section className="mt-20">
            <SectionHeading eyebrow="Available brands" title="Current wheel and tire brands." />
            <ul className="mt-8 flex flex-wrap gap-3">{wheelAndTireBrands.map((brand) => <li key={brand} className="border border-white/10 px-4 py-3 text-zinc-200">{brand}</li>)}</ul>
          </section>
        ) : null}
      </section>
      <ContactPanel defaultVenture="Techno Wheels and Tires" />
    </>
  );
}
