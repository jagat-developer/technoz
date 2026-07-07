import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-300">404</p>
      <h1 className="mt-4 font-display text-5xl text-white">This page is not in the service bay.</h1>
      <p className="mt-5 text-zinc-400">Head back to the service menu or book directly with the studio.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/servicing-pricing"
          className="inline-flex h-12 items-center justify-center rounded-sm bg-orange-600 px-5 text-sm font-semibold text-white hover:bg-orange-500"
        >
          View Services
        </Link>
        <Link
          href="/contact-us"
          className="inline-flex h-12 items-center justify-center rounded-sm border border-white/15 px-5 text-sm font-semibold text-white hover:border-orange-400/60"
        >
          Contact Studio
        </Link>
      </div>
    </section>
  );
}
