import Image from "next/image";
import { gallery } from "@/lib/site-data";

export function GalleryGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {gallery.map((item, index) => (
        <figure
          key={item.src}
          className={index === 0 || index === 7 ? "group sm:col-span-2 sm:row-span-2" : "group"}
        >
          <div className="relative aspect-square overflow-hidden rounded-sm border border-white/10 bg-zinc-900">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
            <figcaption className="absolute bottom-3 left-3 rounded-sm border border-white/10 bg-black/45 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-orange-200">
              {item.service}
            </figcaption>
          </div>
        </figure>
      ))}
    </div>
  );
}
