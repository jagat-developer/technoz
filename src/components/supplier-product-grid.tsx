import Image from "next/image";
import { Check, Tag } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import type { SupplierProduct } from "@/lib/types";

type SupplierProductGridProps = {
  products: SupplierProduct[];
  title: string;
  summary: string;
};

export function SupplierProductGrid({ products, title, summary }: SupplierProductGridProps) {
  return (
    <section className="mt-16">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-300">Supplier retail</p>
          <h2 className="mt-3 break-words font-display text-3xl leading-tight text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 text-sm leading-7 text-zinc-400">{summary}</p>
        </div>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <article key={product.id} className="flex min-w-0 flex-col overflow-hidden rounded-sm border border-white/10 bg-ink-4">
            <div className="relative aspect-[4/3] bg-white">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-contain p-4"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col p-5">
              <div className="flex flex-wrap gap-2">
                {product.badges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1 rounded-sm border border-orange-400/20 bg-orange-500/10 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-orange-200"
                  >
                    <Tag className="h-3 w-3" aria-hidden="true" />
                    {badge}
                  </span>
                ))}
              </div>
              <h3 className="mt-4 text-lg font-semibold leading-7 text-white">{product.name}</h3>
              <div className="mt-4 flex items-end gap-3">
                {product.compareAtPrice ? (
                  <span className="text-sm text-zinc-500 line-through">{product.compareAtPrice}</span>
                ) : null}
                <span className="text-2xl font-bold text-white">{product.price}</span>
              </div>
              <ul className="mt-5 grid gap-2 text-sm leading-6 text-zinc-400">
                {product.details.map((detail) => (
                  <li key={detail} className="flex gap-2">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-orange-400" aria-hidden="true" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-5">
                <ButtonLink href="/contact-us" variant="secondary" className="w-full">
                  Ask to Install
                </ButtonLink>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
