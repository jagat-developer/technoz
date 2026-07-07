import Image from "next/image";
import Link from "next/link";
import { Check, Clock } from "lucide-react";
import { PackageExpectations } from "@/components/package-expectations";
import type { ServicePackage } from "@/lib/types";
import { cn } from "@/lib/utils";

type PackageCardProps = {
  item: ServicePackage;
  featured?: boolean;
};

export function PackageCard({ item, featured = false }: PackageCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-sm border bg-ink-4",
        featured ? "border-orange-500/70 shadow-[0_0_45px_rgba(234,88,12,0.18)]" : "border-white/10",
      )}
    >
      <div className="relative min-h-56 border-b border-white/10">
        <Image
          src={item.image}
          alt={`${item.name} service package`}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-4 via-transparent to-transparent" />
        {featured ? (
          <span className="absolute right-4 top-4 rounded-sm bg-orange-600 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white">
            Popular
          </span>
        ) : null}
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">{item.eyebrow}</p>
        <h3 className="mt-3 text-2xl font-semibold text-white">{item.name}</h3>
        <p className="mt-3 text-sm leading-7 text-zinc-400">{item.summary}</p>
        {item.time ? (
          <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-zinc-200">
            <Clock className="h-4 w-4 text-orange-400" aria-hidden="true" />
            {item.time}
          </p>
        ) : null}
        {item.prices ? (
          <dl className="mt-6 grid gap-2">
            {item.prices.map((price) => (
              <div key={price.vehicle} className="flex min-w-0 justify-between gap-4 border-b border-white/[0.08] pb-2 text-sm">
                <dt className="min-w-0 break-words text-zinc-400">{price.vehicle}</dt>
                <dd className="font-semibold text-white">{price.price}</dd>
              </div>
            ))}
        </dl>
        ) : null}
        <PackageExpectations items={item.expectations} compact />
        <ul className="mt-6 grid gap-2 text-sm text-zinc-300">
          {item.interior.map((feature) => (
            <li key={feature} className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        {item.note ? <p className="mt-5 text-xs leading-6 text-zinc-500">{item.note}</p> : null}
        <div className="mt-auto pt-7">
          <Link
            href={item.slug ? `/${item.slug}` : "/contact-us"}
            className="inline-flex h-11 w-full items-center justify-center rounded-sm border border-white/15 text-sm font-semibold text-white transition hover:border-orange-400/60 hover:bg-orange-500/10 hover:text-orange-200"
          >
            {item.slug ? "View Details" : item.cta}
          </Link>
        </div>
      </div>
    </article>
  );
}
