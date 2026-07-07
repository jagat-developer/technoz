"use client";

import { useMemo, useState } from "react";
import { Send } from "lucide-react";
import { detailingPackages, exteriorWashPackages, services } from "@/lib/site-data";
import type { LeadFormSubmission } from "@/lib/types";

const initialForm: LeadFormSubmission = {
  name: "",
  phone: "",
  email: "",
  vehicleType: "Sedan",
  vehicle: "",
  serviceInterest: "Detailing",
  packageInterest: "Not sure yet",
  preferredDate: "",
  message: "",
  website: "",
};

export function BookingForm() {
  const [form, setForm] = useState<LeadFormSubmission>(initialForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [mailtoFallback, setMailtoFallback] = useState<string | null>(null);

  const packages = useMemo(
    () => ["Not sure yet", ...detailingPackages.map((item) => item.name), ...exteriorWashPackages.map((item) => item.name)],
    [],
  );

  function update<K extends keyof LeadFormSubmission>(key: K, value: LeadFormSubmission[K]) {
    setForm((current) => ({ ...current, [key]: value }));
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
        setForm(initialForm);
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
          <select value={form.serviceInterest} onChange={(event) => update("serviceInterest", event.target.value)}>
            {services.map((service) => (
              <option key={service.id}>{service.shortTitle}</option>
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
