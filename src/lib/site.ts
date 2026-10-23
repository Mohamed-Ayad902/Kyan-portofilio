/**
 * Company facts. Every value here comes from Kayan's own portfolio (January 2026 deck) —
 * change them here and they update across pages, metadata and structured data.
 */
export const company = {
  name: "Kayan",
  legalName: "Kayan Equipment Rental", // TODO(verify): registered company name
  email: "kayanequipment@gmail.com",
  phones: [
    { display: "+20 111 969 9667", e164: "+201119699667" },
    { display: "+20 111 197 8921", e164: "+201111978921" },
  ],
  /**
   * WhatsApp chat target. TODO(verify): confirm with Kayan that this number is active on WhatsApp.
   * Set to null to remove every WhatsApp button.
   */
  whatsapp: "201119699667" as string | null,
  address: {
    street: "27 Shabab El-Mohandseen St.",
    district: "Nasr City",
    city: "Cairo",
    country: "Egypt",
    countryCode: "EG",
  },
} as const;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${company.address.street}, ${company.address.district}, ${company.address.city}, ${company.address.country}`,
)}`;

export function whatsappUrl(text?: string): string | null {
  if (!company.whatsapp) return null;
  return `https://wa.me/${company.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export function mailtoUrl(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const qs = params.toString().replace(/\+/g, "%20");
  return `mailto:${company.email}${qs ? `?${qs}` : ""}`;
}

export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}
