"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { X } from "lucide-react";

const SESSION_KEY = "techno-pricing-seen";
const subscribeToSession = () => () => {};

const groups = [
  {
    title: "Techno Wheels and Tires",
    href: "/wheels-and-tires",
    prices: [
      ["Custom rims", "From $199"],
      ["New / used tires", "From $39"],
      ["Oil change", "$69"],
      ["Rustproofing", "$79"],
      ["Brake change", "$99"],
    ],
  },
  {
    title: "Tint and Customs",
    href: "/tint-and-customs",
    prices: [
      ["Interior detailing", "From $49"],
      ["Exterior hand wash", "From $49"],
      ["Window tint", "From $149"],
      ["Interior coating", "From $149"],
      ["Exterior coating", "From $299"],
      ["Fabric / leather coating", "Request a Quote"],
    ],
  },
] as const;

export function HomePricingPopup() {
  const shouldShow = useSyncExternalStore(
    subscribeToSession,
    () => !sessionStorage.getItem(SESSION_KEY),
    () => false,
  );
  const [dismissed, setDismissed] = useState(false);
  const open = shouldShow && !dismissed;
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (shouldShow) sessionStorage.setItem(SESSION_KEY, "true");
  }, [shouldShow]);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setDismissed(true);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-end bg-black/70 p-3 backdrop-blur-sm sm:place-items-center sm:p-6" role="presentation">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="pricing-popup-title"
        className="max-h-[88svh] w-full max-w-3xl overflow-y-auto rounded-sm border border-orange-400/30 bg-ink-3 shadow-2xl shadow-black/70"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-6 border-b border-white/10 bg-ink-3/95 p-5 backdrop-blur sm:p-6">
          <div>
            <p className="eyebrow text-orange-300">Starting prices</p>
            <h2 id="pricing-popup-title" className="mt-2 font-display text-3xl text-white sm:text-4xl">
              Choose the service you need.
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setDismissed(true)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-sm border border-white/15 text-zinc-200 transition hover:border-orange-400/60 hover:text-white"
            aria-label="Close pricing"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
          {groups.map((group) => (
            <article key={group.title} className="rounded-sm border border-white/10 bg-black/25 p-5">
              <h3 className="text-lg font-semibold text-white">{group.title}</h3>
              <dl className="mt-4 grid gap-2.5">
                {group.prices.map(([label, price]) => (
                  <div key={label} className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-2 text-sm">
                    <dt className="text-zinc-400">{label}</dt>
                    <dd className="text-right font-semibold text-white">{price}</dd>
                  </div>
                ))}
              </dl>
              <Link
                href={group.href}
                onClick={() => setDismissed(true)}
                className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-sm bg-orange-600 px-4 text-sm font-semibold text-white transition hover:bg-orange-500"
              >
                View services
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
