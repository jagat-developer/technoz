import type { PackageExpectation } from "@/lib/types";

type PackageExpectationsProps = {
  items?: PackageExpectation[];
  compact?: boolean;
  title?: string;
  id?: string;
};

function normalizeValue(value: number) {
  return Math.max(0, Math.min(100, value));
}

export function PackageExpectations({ id, items, compact = false, title = "What to expect" }: PackageExpectationsProps) {
  if (!items?.length) {
    return null;
  }

  return (
    <div
      id={id}
      className={
        compact ? "mt-6 min-w-0" : "min-w-0 scroll-mt-28 rounded-sm border border-white/10 bg-white/[0.035] p-5 sm:p-6"
      }
    >
      <div className={compact ? "mb-4" : "mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"}>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase leading-5 tracking-[0.16em] text-orange-300 sm:tracking-[0.22em]">
            {title}
          </p>
          {!compact ? (
            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
              Use these bars as a quick package guide. Final results can vary by vehicle condition, stains, pet hair,
              and confirmed service scope.
            </p>
          ) : null}
        </div>
      </div>

      <div className={compact ? "grid gap-3" : "grid gap-5"}>
        {items.map((item) => {
          const value = normalizeValue(item.value);

          return (
            <div key={item.label} className="grid gap-2">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className={compact ? "text-xs font-semibold text-zinc-200" : "text-sm font-semibold text-white"}>
                    {item.label}
                  </p>
                  <p
                    className={
                      compact
                        ? "mt-0.5 text-[0.7rem] leading-5 text-zinc-500"
                        : "mt-1 break-words text-xs leading-5 text-zinc-500"
                    }
                  >
                    {item.caption}
                  </p>
                </div>
                <span className="shrink-0 text-xs font-semibold tabular-nums text-orange-300">{value}%</span>
              </div>
              <div
                className={compact ? "h-2 overflow-hidden rounded-full bg-white/[0.08]" : "h-3 overflow-hidden rounded-full bg-white/[0.08]"}
                role="meter"
                aria-label={`${item.label}: ${item.caption}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={value}
              >
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#ea580c,#f59e0b,#fde68a)] shadow-[0_0_18px_rgba(234,88,12,0.36)]"
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
