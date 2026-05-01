import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './global2.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'American Dream — Interactive Sales Deck',
  description:
    'Interactive browser-based sales deck for American Dream: scale, energy, retail, venues, and partnership pathways.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
