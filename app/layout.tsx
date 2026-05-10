import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import TopBanner from "@/components/ui/TopBanner";
import NewsletterPopup from "@/components/ui/NewsletterPopup";
import JsonLd from "@/components/seo/JsonLd";

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover' as const,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://fleuriste-annefreret.com'),
  title: {
    default: "Anne Freret — Fleuriste Artisanale à Saint-Pair-sur-Mer | Livraison Normandie & France",
    template: '%s | Anne Freret Fleuriste — Normandie',
  },
  description: "Artisan fleuriste depuis 2001 à Saint-Pair-sur-Mer. Bouquets d'exception composés à la main, livrés à Granville, Dinard, Saint-Malo, Dol-de-Bretagne et partout en France. Mariage, deuil, abonnement.",
  alternates: {
    canonical: 'https://fleuriste-annefreret.com',
  },
  openGraph: {
    title: "Anne Freret — Fleuriste Artisanale à Saint-Pair-sur-Mer",
    description: "Artisan fleuriste depuis 2001. Bouquets d'exception composés à la main, livrés en Normandie et partout en France.",
    type: "website",
    locale: "fr_FR",
    url: 'https://fleuriste-annefreret.com',
    siteName: 'Anne Freret Fleuriste',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Anne Freret Fleuriste — Créations florales artisanales en Normandie',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Anne Freret Fleuriste — Saint-Pair-sur-Mer, Normandie",
    description: "Artisan fleuriste depuis 2001. Bouquets d'exception, livraison Normandie et France.",
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <JsonLd type="LocalBusiness" />
        <JsonLd type="Organization" />
      </head>
      <body className="antialiased overflow-x-hidden">
        <Providers>
          <TopBanner />
          {children}
          <NewsletterPopup />
        </Providers>
      </body>
    </html>
  );
}
