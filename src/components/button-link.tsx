import Link from "next/link";
import type { ComponentProps } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function ButtonLink({ className, variant = "primary", children, ...props }: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "group inline-flex h-12 items-center justify-center gap-2 rounded-sm px-5 text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400",
        variant === "primary" &&
          "bg-orange-600 text-white shadow-[0_0_30px_rgba(234,88,12,0.25)] hover:bg-orange-500",
        variant === "secondary" &&
          "border border-white/15 bg-white/[0.07] text-white hover:border-orange-400/60 hover:bg-orange-500/10",
        variant === "ghost" && "text-zinc-200 hover:text-orange-300",
        className,
      )}
      {...props}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
    </Link>
  );
}
