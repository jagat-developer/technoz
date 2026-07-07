import Image from "next/image";
import Link from "next/link";
import { Camera, Mail, MapPin, Phone } from "lucide-react";
import { business, navItems, services } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-1">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="relative block h-12 w-12 overflow-hidden rounded-sm border border-orange-400/25">
              <Image
                src="/images/techno-car-studio-logo.webp"
                alt="Techno Car Studio logo"
                fill
                sizes="48px"
                className="object-cover"
              />
            </span>
            <span>
              <span className="block text-base font-bold uppercase text-white">Techno Car Studio</span>
              <span className="block text-xs uppercase tracking-[0.2em] text-orange-300">Kitchener</span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-zinc-400">{business.description}</p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">Pages</h3>
          <ul className="mt-5 grid gap-3 text-sm text-zinc-400">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link className="transition hover:text-orange-300" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">Services</h3>
          <ul className="mt-5 grid gap-3 text-sm text-zinc-400">
            {services.slice(0, 5).map((service) => (
              <li key={service.id}>
                <Link className="transition hover:text-orange-300" href="/servicing-pricing">
                  {service.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">Contact</h3>
          <ul className="mt-5 grid gap-4 text-sm text-zinc-400">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" aria-hidden="true" />
              <a href={business.mapsUrl} target="_blank" rel="noreferrer" className="hover:text-orange-300">
                {business.address}, {business.city}, {business.region} {business.postalCode}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" aria-hidden="true" />
              <a href={`tel:${business.phone}`} className="hover:text-orange-300">
                {business.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" aria-hidden="true" />
              <a href={`mailto:${business.email}`} className="break-all hover:text-orange-300">
                {business.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Camera className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" aria-hidden="true" />
              <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-orange-300">
                @{business.instagram}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-zinc-500">
        © 2026 Techno Car Studio. All rights reserved.
      </div>
    </footer>
  );
}
