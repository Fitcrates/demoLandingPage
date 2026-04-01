import type { Metadata } from "next";
import SanityVisualEditing from "@/components/SanityVisualEditing";
import DisableDraftMode from "@/components/DisableDraftMode";
import { SanityLive } from "@/sanity/lib/live";
import { draftMode } from "next/headers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Glow & Serenity | Premium Spa & Salon Kosmetyczny",
  description: "Odzyskaj blask swojej skóry. Profesjonalne zabiegi kosmetyczne, masaże relaksacyjne i pielęgnacja premium w sercu miasta.",
  keywords: ["salon kosmetyczny", "spa", "zabiegi na twarz", "relaks", "masaż", "manicure", "pedicure", "pielęgnacja"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const draft = await draftMode();

  return (
    <html lang="pl">
      <body>
        {children}
        {/* SanityLive handles real-time content revalidation from Sanity Content Lake */}
        <SanityLive />
        {/* VisualEditing enables Presentation tool communication (only active inside Studio iframe) */}
        {draft.isEnabled && (
          <>
            <SanityVisualEditing />
            <DisableDraftMode />
          </>
        )}
      </body>
    </html>
  );
}
