import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://courtside.nl"),
  title: {
    default: "Courtside — Padel lessen op jouw niveau",
    template: "%s · Courtside",
  },
  description:
    "Een boutique padel-programma dat jou koppelt aan spelers op exact jouw niveau — en gecertificeerde trainers die je verder brengen. Eerste les gratis.",
  keywords: ["padel", "padel lessen", "Utrecht", "padel trainer", "padel club", "Courtside"],
  openGraph: {
    title: "Courtside — Padel lessen op jouw niveau",
    description:
      "Les op jouw niveau, elke week. Gekoppeld aan spelers op gelijk niveau en gecertificeerde trainers.",
    locale: "nl_NL",
    type: "website",
    siteName: "Courtside",
  },
  twitter: {
    card: "summary_large_image",
    title: "Courtside — Padel lessen op jouw niveau",
    description:
      "Les op jouw niveau, elke week. Gekoppeld aan spelers op gelijk niveau en gecertificeerde trainers.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="nl"
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="bg-bg font-sans text-ink antialiased">
        <main className="min-h-screen pb-10">{children}</main>
      </body>
    </html>
  );
}
