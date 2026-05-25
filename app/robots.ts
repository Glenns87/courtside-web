import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/aanvragen/bedankt"] }],
    sitemap: "https://courtside.nl/sitemap.xml",
  };
}
