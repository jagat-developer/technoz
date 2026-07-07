import { Camera, Mail, MapPin, Phone } from "lucide-react";
import { business } from "@/lib/site-data";
import { BookingForm } from "@/components/booking-form";

export function ContactPanel() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-ink-3">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(234,88,12,0.14),transparent_32%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="self-center">
          <p className="mb-4 inline-flex border-l border-orange-500 pl-3 text-xs font-semibold uppercase tracking-[0.22em] text-orange-300">
            Quick booking
          </p>
          <h2 className="font-display text-4xl leading-[1.05] text-white sm:text-5xl">
            Ready to give your car the studio treatment?
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-zinc-400">
            Send vehicle details and preferred timing. If email delivery is not configured yet, the form opens a
            prefilled message to the studio so no lead gets trapped.
          </p>
          <div className="mt-8 grid gap-3 text-sm text-zinc-300">
            <a href={`tel:${business.phone}`} className="flex gap-3 transition hover:text-orange-300">
              <Phone className="h-5 w-5 text-orange-400" aria-hidden="true" />
              {business.phoneDisplay}
            </a>
            <a href={`mailto:${business.email}`} className="flex gap-3 break-all transition hover:text-orange-300">
              <Mail className="h-5 w-5 text-orange-400" aria-hidden="true" />
              {business.email}
            </a>
            <a href={business.mapsUrl} target="_blank" rel="noreferrer" className="flex gap-3 transition hover:text-orange-300">
              <MapPin className="h-5 w-5 text-orange-400" aria-hidden="true" />
              {business.address}, {business.city}, {business.region}
            </a>
            <a
              href={business.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex gap-3 transition hover:text-orange-300"
            >
              <Camera className="h-5 w-5 text-orange-400" aria-hidden="true" />
              @{business.instagram}
            </a>
          </div>
        </div>
        <div className="rounded-sm border border-white/10 bg-black/45 p-5 shadow-2xl shadow-black/40 sm:p-7">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
