import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Galerie Photos | Créations Florales Anne Freret — Normandie, Normandie",
  description: "Découvrez notre galerie de créations florales : bouquets, mariages, événements. Photos de nos réalisations en Normandie et Normandie par Anne Freret Fleuriste depuis 2001.",
  keywords: "galerie fleuriste, photos bouquets, créations florales Normandie, portfolio fleuriste, réalisations mariage Normandie",
  alternates: {
    canonical: 'https://fleuriste-annefreret.com/galerie',
  },
};

export default function GalerieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
