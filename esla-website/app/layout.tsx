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
        url: "/images/ESLA_Website_logo.png",
        width: 1200,
        height: 630,
        alt: "Team Elitesoccer Logo",
      },
    ],
    locale: "de_CH",
    type: "website",
  },
  icons: {
    icon: "/images/Favicon_squarspace_ESLA.png",
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
        {children}
      </body>
    </html>
  );
}
