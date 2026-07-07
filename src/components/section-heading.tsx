import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  summary?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, summary, align = "left" }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p className="mb-4 inline-flex border-l border-orange-500 pl-3 text-xs font-semibold uppercase tracking-[0.22em] text-orange-300">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="break-words font-display text-3xl leading-[1.08] text-white sm:text-5xl">{title}</h2>
      {summary ? <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">{summary}</p> : null}
    </div>
  );
}
