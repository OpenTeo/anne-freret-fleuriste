import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions Légales',
  description: 'Mentions légales Anne Freret Fleuriste. Informations légales et éditoriales.',
  alternates: {
    canonical: 'https://fleuriste-annefreret.com/mentions-legales',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function MentionsLegalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
