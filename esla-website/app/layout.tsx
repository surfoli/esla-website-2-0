import type { Metadata } from "next";
import "./globals.css";
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Team Elitesoccer | ESLA - Elite Soccer Luqmon Adekunle",
  description: "ESLA steht für mehr als Fussball. Wir fördern Talent und formen Charakter. Unser Fokus liegt auf gezielter Nachwuchsförderung sowie auf der ganzheitlichen Persönlichkeitsentwicklung junger Spieler.",
  keywords: ["Fussball", "Elite Soccer", "ESLA", "Luqmon Adekunle", "Nachwuchsförderung", "Luzern", "Jugendfussball"],
  authors: [{ name: "Team Elitesoccer" }],
  creator: "Team Elitesoccer",
  publisher: "Team Elitesoccer",
  openGraph: {
    title: "Team Elitesoccer | ESLA",
    description: "Elite Soccer Luqmon Adekunle - Wir entwickeln Champions, auf und neben dem Platz",
    url: "https://www.teamelitesoccer.ch",
    siteName: "Team Elitesoccer",
    images: [
      {
        url: "/images/esla-website-logo.png",
        width: 1200,
        height: 630,
        alt: "Team Elitesoccer Logo",
      },
    ],
    locale: "de_CH",
    type: "website",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: "/icon.svg",
    apple: "/apple-touch-icon.png",
    other: [
      { rel: 'mask-icon', url: '/icon.svg', color: '#0a0a0a' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="de">
      <body className="antialiased">
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-setup" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}
        {/* Schema.org Markup für Sportorganisation */}
        <Script id="schema-org" strategy="beforeInteractive" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "SportsOrganization",
              "name": "Team Elitesoccer | ESLA",
              "alternateName": "Elite Soccer Luqmon Adekunle",
              "url": "https://www.teamelitesoccer.ch",
              "logo": "https://www.teamelitesoccer.ch/images/esla-website-logo.png",
              "description": "ESLA steht für mehr als Fussball. Wir fördern Talent und formen Charakter. Unser Fokus liegt auf gezielter Nachwuchsförderung sowie auf der ganzheitlichen Persönlichkeitsentwicklung junger Spieler.",
              "foundingDate": "2024",
              "areaServed": {
                "@type": "Place",
                "name": "Luzern, Zentralschweiz"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Luzern",
                "addressCountry": "CH"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "info@teamelitesoccer.ch",
                "contactType": "customer service",
                "availableLanguage": ["German", "English"]
              },
              "sameAs": [
                "https://www.tiktok.com/@esla_team_eliteso"
              ],
              "sport": "Soccer",
              "memberOf": {
                "@type": "SportsOrganization",
                "name": "Swiss Football Association"
              }
            }
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
