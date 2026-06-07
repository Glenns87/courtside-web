/**
 * Schema.org JSON-LD generators voor SEO.
 */

const ORG_DESCRIPTION =
  "Padel-lessen die bij jou passen — wij koppelen spelers aan trainers in jouw regio.";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Courtside Padel",
  url: "https://courtsidepadel.nl",
  email: "leads@courtsidepadel.nl",
  foundingDate: "2026",
  description: ORG_DESCRIPTION,
  areaServed: ["Utrecht", "Rotterdam", "Den Haag", "Amsterdam"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "leads@courtsidepadel.nl",
    availableLanguage: "Dutch",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Courtside Padel",
  url: "https://courtsidepadel.nl",
  description: ORG_DESCRIPTION,
  inLanguage: "nl-NL",
};
