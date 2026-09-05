"use client";

import { useMemo, useState } from "react";
import { Send } from "lucide-react";
import { bookingExtraWorkGroups, services } from "@/lib/site-data";
import type { LeadFormSubmission } from "@/lib/types";

const initialForm: LeadFormSubmission = {
  venture: "Tint and Customs",
  name: "",
  phone: "",
  email: "",
  vehicleType: "Sedan",
  vehicle: "",
  serviceInterest: "Detailing",
  packageInterest: "Not sure yet",
  additionalWork: [],
  additionalDetails: "",
  preferredDate: "",
  message: "",
  website: "",
};

export function BookingForm({ defaultVenture = "Tint and Customs" }: { defaultVenture?: LeadFormSubmission["venture"] }) {
  const [form, setForm] = useState<LeadFormSubmission>(() => ({
    ...initialForm,
    venture: defaultVenture,
    serviceInterest: defaultVenture === "Techno Wheels and Tires" ? "Custom Rims" : "Detailing",
  }));
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [mailtoFallback, setMailtoFallback] = useState<string | null>(null);

  const selectedService = useMemo(
    () => services.find((service) => service.shortTitle === form.serviceInterest),
    [form.serviceInterest],
  );

  const ventureServices = useMemo(
    () =>
      form.venture === "Techno Wheels and Tires"
        ? ["Custom Rims", "New / Used Tires", "Oil Change", "Rustproofing", "Brake Change"]
        : services.map((service) => service.shortTitle),
    [form.venture],
  );

  const packages = useMemo(() => {
    const servicePackages = selectedService?.packages?.map((item) => item.name) ?? [];
    const fallbackPackages: Record<string, string[]> = {
      Tinting: ["Front side window tint", "Headlight / taillight tint", "Full coverage window tint"],
      "Ceramic Coating": ["Interior ceramic coating", "Exterior ceramic coating"],
    };

    return ["Not sure yet", ...(servicePackages.length ? servicePackages : (fallbackPackages[form.serviceInterest] ?? []))];
  }, [form.serviceInterest, selectedService]);

  function update<K extends keyof LeadFormSubmission>(key: K, value: LeadFormSubmission[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateServiceInterest(serviceInterest: string) {
    const service = services.find((item) => item.shortTitle === serviceInterest);
    const packageNames = service?.packages?.map((item) => item.name) ?? [];
    const fallbackPackages: Record<string, string[]> = {
      Tinting: ["Front side window tint", "Headlight / taillight tint", "Full coverage window tint"],
      "Ceramic Coating": ["Interior ceramic coating", "Exterior ceramic coating"],
    };
    const validPackages = ["Not sure yet", ...(packageNames.length ? packageNames : (fallbackPackages[serviceInterest] ?? []))];

    setForm((current) => ({
      ...current,
      serviceInterest,
      packageInterest: validPackages.includes(current.packageInterest) ? current.packageInterest : "Not sure yet",
    }));
  }

  function updateVenture(venture: LeadFormSubmission["venture"]) {
    const serviceInterest = venture === "Techno Wheels and Tires" ? "Custom Rims" : "Detailing";
    setForm((current) => ({ ...current, venture, serviceInterest, packageInterest: "Not sure yet", additionalWork: [] }));
  }

  function toggleAdditionalWork(value: string) {
    setForm((current) => {
      const exists = current.additionalWork.includes(value);

      return {
        ...current,
        additionalWork: exists
          ? current.additionalWork.filter((item) => item !== value)
          : [...current.additionalWork, value],
      };
    });
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");
    setMailtoFallback(null);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as { ok?: boolean; mailto?: string; message?: string };

      if (!response.ok && response.status !== 202) {
        throw new Error(result.message || "Unable to submit request.");
      }

      setStatus("success");
      setMessage(result.message || "Request prepared. We will follow up shortly.");
      if (result.mailto) {
        setMailtoFallback(result.mailto);
      } else {
        setForm({
          ...initialForm,
          venture: defaultVenture,
          serviceInterest: defaultVenture === "Techno Wheels and Tires" ? "Custom Rims" : "Detailing",
        });
      }
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please call the studio.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" aria-label="Booking request form">
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave this field empty
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website ?? ""}
            onChange={(event) => update("website", event.target.value)}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name">
          <input required value={form.name} onChange={(event) => update("name", event.target.value)} />
        </Field>
        <Field label="Phone">
          <input required value={form.phone} onChange={(event) => update("phone", event.target.value)} />
        </Field>
      </div>
      <Field label="Email">
        <input required type="email" value={form.email} onChange={(event) => update("email", event.target.value)} />
      </Field>
      <Field label="Business venture">
        <select value={form.venture} onChange={(event) => updateVenture(event.target.value as LeadFormSubmission["venture"])}>
          <option>Techno Wheels and Tires</option>
          <option>Tint and Customs</option>
        </select>
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Vehicle type">
          <select value={form.vehicleType} onChange={(event) => update("vehicleType", event.target.value)}>
            {["Sedan", "Small / Mid SUV", "7-Seat SUV / Pickup", "Minivan", "Other"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </Field>
        <Field label="Year / make / model">
          <input required value={form.vehicle} onChange={(event) => update("vehicle", event.target.value)} />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Service interest">
          <select value={form.serviceInterest} onChange={(event) => updateServiceInterest(event.target.value)}>
            {ventureServices.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </select>
        </Field>
        <Field label="Package">
          <select value={form.packageInterest} onChange={(event) => update("packageInterest", event.target.value)}>
            {packages.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </Field>
      </div>
      {form.venture === "Tint and Customs" ? <fieldset className="grid gap-3 rounded-sm border border-white/10 bg-white/[0.025] p-4">
        <legend className="px-1 text-sm font-semibold text-zinc-200">Additional work</legend>
        <p className="text-xs leading-6 text-zinc-500">Select extras or condition items to quote with this booking.</p>
        <div className="grid gap-4">
          {bookingExtraWorkGroups.map((group) => (
            <div key={group.title} className="grid gap-2">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-orange-300">{group.title}</p>
              <div className="grid gap-2 md:grid-cols-2">
                {group.options.map((option) => {
                  const checked = form.additionalWork.includes(option.value);

                  return (
                    <label
                      key={option.value}
                      className="flex min-h-16 cursor-pointer items-start gap-3 rounded-sm border border-white/10 bg-white/[0.035] p-3 text-sm text-zinc-300 transition hover:border-orange-400/50 hover:bg-orange-500/10"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleAdditionalWork(option.value)}
                        className="mt-1 h-4 w-4 shrink-0 accent-orange-500"
                      />
                      <span className="min-w-0">
                        <span className="block break-words font-semibold leading-5 text-white">{option.label}</span>
                        <span className="mt-1 block text-xs leading-5 text-zinc-500">{option.description}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </fieldset> : null}
      <Field label="Extra work details">
        <textarea
          rows={3}
          value={form.additionalDetails}
          placeholder="Pet hair in cargo area, coffee stain, dashcam plus tint together..."
          onChange={(event) => update("additionalDetails", event.target.value)}
        />
      </Field>
      <Field label="Preferred date or time">
        <input value={form.preferredDate} onChange={(event) => update("preferredDate", event.target.value)} />
      </Field>
      <Field label="Message">
        <textarea rows={5} value={form.message} onChange={(event) => update("message", event.target.value)} />
      </Field>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-white px-5 text-sm font-bold text-zinc-950 transition hover:bg-orange-200 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        {status === "submitting" ? "Sending..." : "Book Now"}
      </button>
      {message ? (
        <p
          className={status === "error" ? "text-sm font-semibold text-red-300" : "text-sm font-semibold text-green-300"}
          aria-live="polite"
        >
          {message}
        </p>
      ) : null}
      {mailtoFallback ? (
        <a
          href={mailtoFallback}
          className="inline-flex h-11 items-center justify-center rounded-sm border border-orange-400/60 px-5 text-sm font-semibold text-orange-200 transition hover:bg-orange-500/10"
        >
          Open prefilled email instead
        </a>
      ) : null}
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactElement }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-zinc-200">
      {label}
      <span className="form-control">{children}</span>
    </label>
  );
}
