export default function BlogLoading() {
  return (
    <div className="min-h-[70vh] animate-pulse bg-ink-1 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="h-3 w-36 bg-orange-400/20" />
        <div className="mt-6 h-14 max-w-2xl bg-white/10" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((item) => <div key={item} className="aspect-[4/3] rounded-sm border border-white/10 bg-white/[0.04]" />)}
        </div>
      </div>
    </div>
  );
}

