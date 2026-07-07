"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { ServiceCategory } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/button-link";

type ServiceAccordionProps = {
  services: ServiceCategory[];
};

export function ServiceAccordion({ services }: ServiceAccordionProps) {
  const [active, setActive] = useState(services[0]?.id ?? "");

  return (
    <div className="border-y border-white/10">
      {services.map((service, index) => {
        const open = active === service.id;

        return (
          <article key={service.id} className="border-b border-white/10 last:border-b-0">
            <button
              type="button"
              className="grid w-full grid-cols-[3rem_1fr_auto] items-center gap-4 py-5 text-left"
              onClick={() => setActive(open ? "" : service.id)}
              aria-expanded={open}
            >
              <span className="font-mono text-xs text-zinc-500">{String(index + 1).padStart(3, "0")}</span>
              <span className="text-lg font-semibold text-white">{service.title}</span>
              <ChevronDown
                className={cn("h-5 w-5 text-orange-300 transition", open && "rotate-180")}
                aria-hidden="true"
              />
            </button>
            {open ? (
              <div className="grid gap-6 pb-8 pl-0 sm:pl-16 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="relative min-h-64 overflow-hidden rounded-sm border border-white/10 bg-zinc-900">
                  <Image
                    src={service.image}
                    alt={`${service.title} at Techno Car Studio`}
                    fill
                    sizes="(min-width: 1024px) 420px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="self-center">
                  <p className="text-base leading-8 text-zinc-300">{service.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {service.startingAt ? (
                      <span className="rounded-sm border border-orange-400/20 bg-orange-500/10 px-3 py-2 text-sm font-semibold text-orange-200">
                        Starting at {service.startingAt}
                      </span>
                    ) : null}
                    {service.time ? (
                      <span className="rounded-sm border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-300">
                        {service.time}
                      </span>
                    ) : null}
                    {service.quoteRequired ? (
                      <span className="rounded-sm border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-300">
                        Quote-based package
                      </span>
                    ) : null}
                  </div>
                  <ul className="mt-6 grid gap-2 text-sm text-zinc-400 sm:grid-cols-2">
                    {service.benefits.slice(0, 4).map((benefit) => (
                      <li key={benefit} className="border-l border-orange-500/50 pl-3">
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink href="/contact-us" className="mt-7">
                    Book {service.shortTitle}
                  </ButtonLink>
                </div>
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
