import { Droplets, Sparkles } from "lucide-react";
import { PackageCard } from "@/components/package-card";
import { SectionHeading } from "@/components/section-heading";
import { exteriorWashAddOns, exteriorWashPackages } from "@/lib/site-data";

type ExteriorWashSectionProps = {
  className?: string;
};

export function ExteriorWashSection({ className = "" }: ExteriorWashSectionProps) {
  return (
    <section className={className}>
      <SectionHeading
        eyebrow="Exterior wash"
        title="Exterior hand wash with paint-surface add-ons."
        summary="Exterior wash is now presented separately from the interior packages so customers can choose the right service path."
      />
      <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        {exteriorWashPackages.map((item) => (
          <PackageCard key={item.id} item={item} />
        ))}
        <div className="grid gap-4">
          {exteriorWashAddOns.map((item, index) => {
            const Icon = index === 0 ? Sparkles : Droplets;

            return (
              <article key={item.name} className="rounded-sm border border-white/10 bg-white/[0.035] p-6">
                <div className="flex items-start justify-between gap-5">
                  <Icon className="mt-1 h-5 w-5 shrink-0 text-orange-400" aria-hidden="true" />
                  <p className="text-right text-lg font-semibold text-white">{item.price}</p>
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-white">{item.name}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
