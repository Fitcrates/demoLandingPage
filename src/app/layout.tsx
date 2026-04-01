import type { Metadata, Viewport } from "next";
import SanityVisualEditing from "@/components/SanityVisualEditing";
import { SanityLive } from "@/sanity/lib/live";
import { draftMode } from "next/headers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Glow & Serenity | Premium Spa & Salon Kosmetyczny w Warszawie",
    template: "%s | Glow & Serenity"
  },
  description: "Odzyskaj blask swojej skóry. Profesjonalne zabiegi kosmetyczne, masaże relaksacyjne i pielęgnacja premium w sercu Warszawy. Umów wizytę już dziś!",
  keywords: ["salon kosmetyczny warszawa", "spa warszawa", "zabiegi na twarz", "masaż relaksacyjny", "manicure warszawa", "pedicure warszawa", "pielęgnacja twarzy", "zabiegi premium"],
  authors: [{ name: "Glow & Serenity" }],
  creator: "Glow & Serenity",
  publisher: "Glow & Serenity",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://glowandserenity.pl'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Glow & Serenity | Premium Spa & Salon Kosmetyczny w Warszawie",
    description: "Odzyskaj blask swojej skóry. Profesjonalne zabiegi kosmetyczne, masaże relaksacyjne i pielęgnacja premium w sercu Warszawy.",
    url: 'https://glowandserenity.pl',
    siteName: 'Glow & Serenity',
    locale: 'pl_PL',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#c9a063',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const draft = await draftMode();

  return (
    <html lang="pl">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <a href="#main-content" className="skip-to-main">
          Przejdź do głównej treści
        </a>
        {children}
        {draft.isEnabled && <SanityVisualEditing />}
      </body>
    </html>
  );
}
