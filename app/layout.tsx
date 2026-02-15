import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import TopBanner from "@/components/ui/TopBanner";
import NewsletterPopup from "@/components/ui/NewsletterPopup";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anne Freret Fleuriste | Créations Florales d'Exception à Barneville-Carteret",
  description: "Anne Freret propose des créations florales d'exception à Barneville-Carteret, Normandie. Bouquets artisanaux, mariages, livraison 24h. 15 ans d'expérience.",
  keywords: "fleuriste, Anne Freret, Barneville-Carteret, Normandie, bouquet, fleurs, mariage, livraison, artisanal",
  openGraph: {
    title: "Anne Freret Fleuriste | Créations Florales d'Exception",
    description: "Découvrez nos créations florales artisanales à Barneville-Carteret. Bouquets uniques, mariages, livraison en Normandie.",
    type: "website",
    locale: "fr_FR",
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
      <body
        className={`${playfair.variable} ${lato.variable} antialiased`}
      >
        <Providers>
          <TopBanner />
          {children}
          <NewsletterPopup />
        </Providers>
      </body>
    </html>
  );
}
