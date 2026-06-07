import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

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
  metadataBase: new URL("https://courtsidepadel.nl"),
  title: {
    default: "Courtside Padel — Padel lessen op jouw niveau",
    template: "%s · Courtside Padel",
  },
  description:
    "Padel-lessen die bij jou passen. Vooraf duidelijkheid over trainer, niveau en planning. Aanmelden duurt 60 seconden — wij koppelen je binnen 48 uur.",
  openGraph: {
    title: "Courtside Padel — Padel lessen op jouw niveau",
    description:
      "Padel-lessen die bij jou passen. Vooraf duidelijkheid over trainer, niveau en planning. Aanmelden duurt 60 seconden — wij koppelen je binnen 48 uur.",
    locale: "nl_NL",
    type: "website",
    siteName: "Courtside Padel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Courtside Padel — Padel lessen op jouw niveau",
    description:
      "Padel-lessen die bij jou passen. Vooraf duidelijkheid over trainer, niveau en planning. Aanmelden duurt 60 seconden — wij koppelen je binnen 48 uur.",
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
        <Providers>
          <main className="min-h-screen pb-10">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
