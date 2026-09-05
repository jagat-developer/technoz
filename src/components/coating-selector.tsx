"use client";

import Image from "next/image";
import { ArrowRight, Check, Send, ShieldCheck } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { coatingAreas, coatingBrands, coatingProducts, type CoatingAreaId, type CoatingTab, type CoatingVehicleCategory } from "@/lib/coating-data";
import type { LeadFormSubmission } from "@/lib/types";

const vehicleCategories: CoatingVehicleCategory[] = ["Sedan", "Small / Mid SUV", "7-Seat SUV / Pickup", "Minivan", "Other"];

type QuoteForm = Pick<LeadFormSubmission, "name" | "phone" | "email" | "vehicle" | "additionalDetails" | "website"> & {
  vehicleType: CoatingVehicleCategory;
};

const initialQuote: QuoteForm = {
  name: "",
  phone: "",
  email: "",
  vehicle: "",
  vehicleType: "Sedan",
  additionalDetails: "",
  website: "",
};

export function CoatingSelector() {
  const [tab, setTab] = useState<CoatingTab>("exterior");
  const [areaId, setAreaId] = useState<CoatingAreaId>("exterior-paint");
  const [productId, setProductId] = useState<string>("");
  const [quote, setQuote] = useState<QuoteForm>(initialQuote);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [mailtoFallback, setMailtoFallback] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const availableAreas = useMemo(() => coatingAreas.filter((area) => area.available && area.tab === tab), [tab]);
  const selectedArea = coatingAreas.find((area) => area.id === areaId) ?? coatingAreas[0];
  const products = coatingProducts.filter((product) => product.areas.includes(areaId));
  const selectedProduct = coatingProducts.find((product) => product.id === productId);

  function chooseTab(nextTab: CoatingTab) {
    setTab(nextTab);
    const firstArea = coatingAreas.find((area) => area.available && area.tab === nextTab);
    if (firstArea) setAreaId(firstArea.id);
    setProductId("");
  }

  function chooseArea(nextArea: CoatingAreaId) {
    setAreaId(nextArea);
    setProductId("");
  }

  function requestProduct(nextProductId: string) {
    setProductId(nextProductId);
    window.requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      formRef.current?.querySelector<HTMLInputElement>('input[name="name"]')?.focus({ preventScroll: true });
    });
  }

  function priceFor(productIdToPrice: string) {
    const product = coatingProducts.find((item) => item.id === productIdToPrice);
    const amount = product?.installationPrices[quote.vehicleType];
    return typeof amount === "number" ? `Professional Installation — From $${amount}` : "Request Installation Pricing";
  }

  async function submitQuote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setFeedback("");
    setMailtoFallback(null);

    const payload: LeadFormSubmission = {
      venture: "Tint and Customs",
      name: quote.name,
      phone: quote.phone,
      email: quote.email,
      vehicleType: quote.vehicleType,
      vehicle: quote.vehicle,
      serviceInterest: "Ceramic Coating",
      packageInterest: selectedProduct?.name ?? "Fabric protection enquiry",
      additionalWork: [`Treatment area: ${selectedArea.label}`],
      additionalDetails: quote.additionalDetails,
      preferredDate: "",
      message: `Professional coating installation enquiry for ${selectedArea.label}. Product: ${selectedProduct ? `${selectedProduct.brand} ${selectedProduct.name}` : "Product to be confirmed"}.`,
      website: quote.website,
    };

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string; mailto?: string };
      if (!response.ok && response.status !== 202) throw new Error(result.message || "Unable to submit your request.");
      setStatus("success");
      setFeedback(result.message || "Your installation quote request has been sent.");
      setMailtoFallback(result.mailto ?? null);
      if (!result.mailto) setQuote(initialQuote);
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Unable to submit your request. Please call the studio.");
    }
  }

  return (
    <section id="coating-selector" className="border-y border-white/10 bg-[#070706] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="eyebrow text-orange-300">Professional coating installation</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-white sm:text-6xl">Choose the surface. Compare the right coating.</h2>
          <p className="mt-5 text-base leading-7 text-zinc-400">Select a treatment area to see only compatible options. These are installed services—products, bottles, and shipping are not sold through this page.</p>
        </div>

        <div className="mt-10 inline-grid w-full grid-cols-2 rounded-sm border border-white/10 bg-white/[0.025] p-1 sm:w-auto" role="tablist" aria-label="Protection type">
          {(["exterior", "interior"] as const).map((item) => (
            <button key={item} type="button" role="tab" aria-selected={tab === item} onClick={() => chooseTab(item)} className={`min-h-12 px-6 text-sm font-bold uppercase tracking-[0.14em] transition ${tab === item ? "bg-orange-500 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}>
              {item === "exterior" ? "Exterior Protection" : "Interior Protection"}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative min-h-[390px] overflow-hidden rounded-sm border border-white/10 bg-[radial-gradient(circle_at_50%_42%,rgba(249,115,22,0.12),transparent_42%),linear-gradient(145deg,#11110f,#060605)] p-6 sm:p-10">
            <VehicleDiagram tab={tab} areaId={areaId} />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 rounded-sm border border-white/10 bg-black/70 px-4 py-3 backdrop-blur">
              <div><p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Selected area</p><p className="mt-1 font-semibold text-white">{selectedArea.label}</p></div>
              <ShieldCheck className="h-6 w-6 shrink-0 text-orange-400" aria-hidden="true" />
            </div>
          </div>

          <div className="grid content-start gap-3" aria-label="Available treatment areas">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Select a treatment area</p>
            {availableAreas.map((area) => (
              <button key={area.id} type="button" aria-pressed={areaId === area.id} onClick={() => chooseArea(area.id)} className={`min-h-20 rounded-sm border p-4 text-left transition ${areaId === area.id ? "border-orange-400 bg-orange-500/10" : "border-white/10 bg-white/[0.025] hover:border-white/25"}`}>
                <span className="flex items-center justify-between gap-4"><span className="font-bold text-white">{area.label}</span>{areaId === area.id ? <Check className="h-5 w-5 text-orange-400" aria-hidden="true" /> : null}</span>
                <span className="mt-1 block text-sm leading-6 text-zinc-500">{area.summary}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14" aria-live="polite">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div><p className="eyebrow text-orange-300">Suitable options</p><h3 className="mt-2 font-display text-3xl text-white">{selectedArea.label}</h3></div>
            <p className="text-sm text-zinc-500">Pricing updates for: <span className="font-semibold text-zinc-200">{quote.vehicleType}</span></p>
          </div>

          {products.length ? (
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              {products.map((product) => (
                <article key={product.id} className={`overflow-hidden rounded-sm border bg-white/[0.025] ${productId === product.id ? "border-orange-400" : "border-white/10"}`}>
                  <div className="grid sm:grid-cols-[180px_1fr]">
                    <div className="relative min-h-52 bg-white"><Image src={product.image} alt={product.imageAlt} fill sizes="(max-width: 640px) 100vw, 180px" className="object-contain p-5" /></div>
                    <div className="p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">{product.brand}</p>
                      <h4 className="mt-2 text-xl font-bold text-white">{product.name}</h4>
                      <p className="mt-3 text-sm leading-6 text-zinc-400">{product.description}</p>
                      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Suitable area</p>
                      <p className="mt-1 text-sm font-semibold text-zinc-200">{selectedArea.label}</p>
                    </div>
                  </div>
                  <div className="border-t border-white/10 p-5">
                    {product.confirmationNote ? <p className="mb-4 rounded-sm border border-amber-400/25 bg-amber-400/10 p-3 text-xs leading-5 text-amber-100">{product.confirmationNote}</p> : null}
                    <p className="text-sm font-bold text-white">{priceFor(product.id)}</p>
                    <p className="mt-2 text-xs leading-5 text-zinc-500">Package inclusions will be confirmed in your written installation quote.</p>
                    <button type="button" onClick={() => requestProduct(product.id)} className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-sm bg-orange-500 px-5 text-sm font-bold text-white transition hover:bg-orange-400">
                      Request Installation Quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-7 rounded-sm border border-white/10 bg-white/[0.025] p-6">
              <h4 className="text-xl font-bold text-white">Fabric protection enquiry</h4>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">The installed fabric-protection product, package inclusions, and pricing are still awaiting client confirmation. Send your vehicle details and the studio will respond with an appropriate option.</p>
              <button type="button" onClick={() => requestProduct("")} className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-orange-500 px-5 text-sm font-bold text-white transition hover:bg-orange-400">Request Installation Pricing <ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
            </div>
          )}
        </div>

        <div className="mt-16 grid gap-8 border-t border-white/10 pt-14 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="eyebrow text-orange-300">Installation enquiry</p>
            <h3 className="mt-3 font-display text-4xl text-white">Your selection is ready.</h3>
            <div className="mt-6 rounded-sm border border-orange-400/30 bg-orange-500/10 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-orange-200">Selected request</p>
              <p className="mt-2 font-bold text-white">{selectedArea.label}</p>
              <p className="mt-1 text-sm text-zinc-300">{selectedProduct ? `${selectedProduct.brand} — ${selectedProduct.name}` : "Product to be confirmed by the studio"}</p>
              <p className="mt-3 text-sm font-semibold text-orange-100">{selectedProduct ? priceFor(selectedProduct.id) : "Request Installation Pricing"}</p>
            </div>
            <p className="mt-5 text-sm leading-6 text-zinc-500">Submitting this form requests a quote; it does not purchase a product or confirm an appointment.</p>
          </div>

          <form ref={formRef} onSubmit={submitQuote} className="grid gap-4 rounded-sm border border-white/10 bg-white/[0.025] p-5 sm:p-7" aria-label="Professional coating installation quote form">
            <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" value={quote.website} onChange={(event) => setQuote((current) => ({ ...current, website: event.target.value }))} /></label></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name"><input name="name" required autoComplete="name" value={quote.name} onChange={(event) => setQuote((current) => ({ ...current, name: event.target.value }))} /></Field>
              <Field label="Phone"><input required type="tel" autoComplete="tel" value={quote.phone} onChange={(event) => setQuote((current) => ({ ...current, phone: event.target.value }))} /></Field>
            </div>
            <Field label="Email"><input required type="email" autoComplete="email" value={quote.email} onChange={(event) => setQuote((current) => ({ ...current, email: event.target.value }))} /></Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Vehicle category"><select value={quote.vehicleType} onChange={(event) => setQuote((current) => ({ ...current, vehicleType: event.target.value as CoatingVehicleCategory }))}>{vehicleCategories.map((category) => <option key={category}>{category}</option>)}</select></Field>
              <Field label="Vehicle year / make / model"><input required value={quote.vehicle} onChange={(event) => setQuote((current) => ({ ...current, vehicle: event.target.value }))} /></Field>
            </div>
            <Field label="Additional requirements"><textarea rows={4} placeholder="Surface condition, concerns, preferred timing, or anything else we should know…" value={quote.additionalDetails} onChange={(event) => setQuote((current) => ({ ...current, additionalDetails: event.target.value }))} /></Field>
            <button type="submit" disabled={status === "submitting"} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-white px-5 text-sm font-bold text-zinc-950 transition hover:bg-orange-200 disabled:cursor-not-allowed disabled:opacity-60"><Send className="h-4 w-4" aria-hidden="true" />{status === "submitting" ? "Sending…" : "Request Installation Quote"}</button>
            {feedback ? <p aria-live="polite" className={`text-sm font-semibold ${status === "error" ? "text-red-300" : "text-green-300"}`}>{feedback}</p> : null}
            {mailtoFallback ? <a href={mailtoFallback} className="inline-flex min-h-11 items-center justify-center rounded-sm border border-orange-400/60 px-5 text-sm font-semibold text-orange-200">Open prefilled email instead</a> : null}
          </form>
        </div>

        <div className="mt-16 border-t border-white/10 pt-12">
          <p className="eyebrow text-orange-300">Brands and suppliers we use</p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{coatingBrands.map((brand) => <div key={brand} className="flex min-h-20 items-center justify-center rounded-sm border border-white/10 bg-white/[0.025] px-4 text-center text-base font-bold text-zinc-100">{brand}</div>)}</div>
          <p className="mt-5 text-xs leading-5 text-zinc-500">Brand names identify products and suppliers considered for installation. No official partnership, certification, or endorsement is implied.</p>
        </div>
      </div>
    </section>
  );
}

function VehicleDiagram({ tab, areaId }: { tab: CoatingTab; areaId: CoatingAreaId }) {
  const orange = "#f97316";
  const dim = "#27272a";
  return (
    <svg viewBox="0 0 720 360" className="mx-auto w-full max-w-3xl" role="img" aria-label={`${tab === "exterior" ? "Exterior" : "Interior"} vehicle diagram highlighting ${coatingAreas.find((area) => area.id === areaId)?.label}`}>
      <defs><linearGradient id="vehicle-shell" x1="0" x2="1"><stop stopColor="#3f3f46" /><stop offset="1" stopColor="#18181b" /></linearGradient></defs>
      {tab === "exterior" ? (
        <g>
          <path d="M92 222c8-51 30-76 72-91l82-30c26-33 60-52 110-57h92c42 3 75 24 103 63l60 31c23 12 36 33 38 65l-8 32h-45c-6-37-31-58-69-58s-63 21-69 58H258c-6-37-31-58-69-58s-63 21-69 58H83z" fill={areaId === "exterior-paint" ? orange : "url(#vehicle-shell)"} opacity={areaId === "exterior-paint" ? 0.9 : 1} stroke="#71717a" strokeWidth="3" />
          <path d="M266 103c25-28 51-39 91-42h80c32 3 56 15 78 47l-117 1z" fill="#0a0a0a" stroke="#71717a" strokeWidth="3" />
          <path d="M384 62v47M400 110l-11 67" stroke="#71717a" strokeWidth="3" />
          <circle cx="189" cy="232" r="48" fill="#09090b" stroke="#a1a1aa" strokeWidth="8" /><circle cx="189" cy="232" r="20" fill="#3f3f46" />
          <circle cx="527" cy="232" r="48" fill="#09090b" stroke="#a1a1aa" strokeWidth="8" /><circle cx="527" cy="232" r="20" fill="#3f3f46" />
          <path d="M118 265h480" stroke={orange} strokeWidth="2" opacity=".45" />
        </g>
      ) : (
        <g>
          <path d="M143 72h434c32 0 58 26 58 58v122c0 32-26 58-58 58H143c-32 0-58-26-58-58V130c0-32 26-58 58-58z" fill="#111113" stroke="#52525b" strokeWidth="3" />
          {[176, 300, 424, 548].map((x) => <g key={x}><rect x={x - 38} y="98" width="76" height="94" rx="28" fill={areaId === "leather" ? orange : dim} stroke="#71717a" strokeWidth="3" /><rect x={x - 45} y="204" width="90" height="66" rx="20" fill={areaId === "fabric" ? orange : dim} stroke="#71717a" strokeWidth="3" /></g>)}
          <path d="M108 113h28v151h-28M584 113h28v151h-28M238 82v34h244V82" fill="none" stroke={areaId === "vinyl-plastic" ? orange : "#52525b"} strokeWidth="12" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}

function Field({ label, children }: { label: string; children: React.ReactElement }) {
  return <label className="grid gap-2 text-sm font-semibold text-zinc-200">{label}<span className="form-control">{children}</span></label>;
}
