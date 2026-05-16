/** Service labels aligned with Naše služby navigation. */
export const CONTACT_SERVICE_OPTIONS_CS = [
  "Webové stránky na míru",
  "Modernizace webových stránek",
  "Webové aplikace",
  "Automatizace procesů",
] as const;

export const CONTACT_SERVICE_OPTIONS_EN = [
  "New website",
  "Website modernization",
  "Web applications",
  "Process automation",
] as const;

export type LeadFormState = {
  name: string;
  email: string;
  phone: string;
  address: string;
  services: string[];
  projectDetails: string;
  gdprConsent: boolean;
};

export const leadFormInit: LeadFormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  services: [],
  projectDetails: "",
  gdprConsent: false,
};

export function getContactServiceOptions(isEn: boolean): string[] {
  return isEn ? [...CONTACT_SERVICE_OPTIONS_EN] : [...CONTACT_SERVICE_OPTIONS_CS];
}

export function buildLeadPayload(form: LeadFormState, isEn: boolean) {
  const details = form.projectDetails.trim();
  const address = form.address.trim();
  const messageParts = [
    details || null,
    address ? `${isEn ? "Address" : "Adresa"}: ${address}` : null,
  ].filter(Boolean);

  return {
    name: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    company: "",
    project_type: form.services.length
      ? form.services.join(", ")
      : isEn
        ? "Not specified"
        : "Neuvedeno",
    budget: "",
    message: messageParts.length ? messageParts.join("\n") : isEn ? "No details provided" : "Bez upřesnění",
  };
}
