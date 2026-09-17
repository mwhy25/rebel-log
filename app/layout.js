import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rebel-log.vercel.app';
const siteTitle = 'REBEL LOG — Daily Creator Record';
const siteDescription = 'Diary kreator konten AI bertema Persona 5 — video, cerita, dan ide yang lahir tiap hari.';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s — REBEL LOG',
  },
  description: siteDescription,
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: 'REBEL LOG',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/og-default.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}

