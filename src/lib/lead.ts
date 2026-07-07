import { z } from "zod";
import type { LeadFormSubmission } from "@/lib/types";

export const leadSchema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().min(7).max(40),
  email: z.string().email().max(160),
  vehicleType: z.string().min(2).max(80),
  vehicle: z.string().min(2).max(160),
  serviceInterest: z.string().min(2).max(120),
  packageInterest: z.string().max(120),
  preferredDate: z.string().max(80),
  message: z.string().max(1200),
  website: z.string().optional(),
});

export function buildLeadEmail(payload: LeadFormSubmission) {
  const subject = `New Techno Car Studio booking request from ${payload.name}`;
  const body = [
    "New Techno Car Studio booking request",
    "",
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    `Vehicle type: ${payload.vehicleType}`,
    `Vehicle: ${payload.vehicle}`,
    `Service interest: ${payload.serviceInterest}`,
    `Package interest: ${payload.packageInterest || "Not specified"}`,
    `Preferred date/time: ${payload.preferredDate || "Not specified"}`,
    "",
    "Message:",
    payload.message || "No extra message provided.",
  ].join("\n");

  return { subject, body };
}

export function buildMailto(payload: LeadFormSubmission, recipient: string) {
  const { subject, body } = buildLeadEmail(payload);

  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
