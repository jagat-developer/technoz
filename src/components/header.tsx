"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { business, navItems } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink-2/88 backdrop-blur-xl">
      <div className="mx-auto flex h-[var(--header-height)] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3.5" onClick={() => setOpen(false)}>
          <span className="relative grid h-14 w-14 place-items-center overflow-hidden rounded-sm border border-orange-400/30 bg-black/45 p-1 shadow-[0_0_28px_rgba(234,88,12,0.15)] lg:h-16 lg:w-16">
            <Image
              src="/images/techno-car-studio-logo.webp"
              alt="Techno Car Studio logo"
              fill
              sizes="(min-width: 1024px) 64px, 56px"
              className="object-contain"
              loading="eager"
            />
          </span>
          <span className="leading-none">
            <span className="block text-base font-bold uppercase text-white lg:text-lg">Techno Car</span>
            <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-orange-300 lg:text-xs">
              Studio
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-sm px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white",
                  active && "bg-white/[0.08] text-orange-300",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${business.phone}`}
            className="inline-flex h-11 items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white transition hover:border-orange-400/60 hover:text-orange-200"
          >
            <Phone className="h-4 w-4 text-orange-400" aria-hidden="true" />
            {business.phoneDisplay}
          </a>
          <Link
            href="/contact-us"
            className="inline-flex h-11 items-center rounded-sm bg-orange-600 px-4 text-sm font-semibold text-white transition hover:bg-orange-500"
          >
            Book Now
          </Link>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-sm border border-white/10 bg-white/5 text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Toggle navigation</span>
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <div id="mobile-menu" className="border-t border-white/10 bg-ink-2 px-4 pb-5 pt-2 lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-sm px-3 py-3 text-base font-semibold text-zinc-200 hover:bg-white/5 hover:text-orange-200"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`tel:${business.phone}`}
              className="mt-3 inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-orange-600 px-4 text-sm font-semibold text-white"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call {business.phoneDisplay}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
