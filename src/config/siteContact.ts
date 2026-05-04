/**
 * Sticky rail + outbound links. Digits only, country code included, no + or spaces.
 * Example: +420 725 703 868 → 420725703868
 */
export const SITE_WHATSAPP_PHONE_DIGITS = "420725703868";

export const SITE_CONTACT_EMAIL = "info@pk-digital.cz";

export const siteWhatsAppUrl = (): string =>
  `https://wa.me/${SITE_WHATSAPP_PHONE_DIGITS}`;

export const siteMailtoUrl = (): string => `mailto:${SITE_CONTACT_EMAIL}`;
