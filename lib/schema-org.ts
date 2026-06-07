/**
 * Schema.org JSON-LD generators voor SEO.
 */

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Courtside Padel",
  description:
    "Boutique padel-programma dat spelers koppelt aan gelijkwaardig niveau en gecertificeerde trainers.",
  url: "https://courtside.nl",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Utrecht",
    addressCountry: "NL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 52.0907,
    longitude: 5.1214,
  },
  priceRange: "€€",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "340",
  },
};

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Padel lessen op niveau",
  provider: {
    "@type": "LocalBusiness",
    name: "Courtside Padel",
  },
  areaServed: { "@type": "Country", name: "Nederland" },
  description:
    "Wekelijkse padellessen, gekoppeld aan spelers op jouw niveau. Eerste les gratis.",
};
