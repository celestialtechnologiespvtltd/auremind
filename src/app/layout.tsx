import type { Metadata } from 'next';
import type { Viewport } from 'next';
import '../styles/tailwind.css';
import { Toaster } from 'sonner';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mindbloom2967.builtwithrocket.new';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#a855f7',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'AureMind — Your Mental Wellness Companion',
    template: '%s | AureMind',
  },
  description: 'AureMind is a calming mental wellness app for daily mood tracking, journaling, self-care, relaxing sounds, and community support. Start your wellness journey today.',
  keywords: ['mental wellness', 'mood tracker', 'meditation', 'self-care', 'mindfulness', 'journaling', 'relaxing sounds', 'mental health app'],
  authors: [{ name: 'AureMind' }],
  creator: 'AureMind',
  publisher: 'AureMind',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'AureMind',
    title: 'AureMind — Your Mental Wellness Companion',
    description: 'A calming mental wellness app for daily mood tracking, journaling, self-care, and community support.',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 512,
        height: 512,
        alt: 'AureMind — Mental Wellness App Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AureMind — Your Mental Wellness Companion',
    description: 'A calming mental wellness app for daily mood tracking, journaling, self-care, and community support.',
    images: ['/assets/images/app_logo.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/assets/images/app_logo.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <style dangerouslySetInnerHTML={{ __html: `
          @font-face { font-display: swap; }
        `}} />

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fmindbloom2967back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.17" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /></head>
      <body className="font-dm antialiased">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(205,180,219,0.3)',
              borderRadius: '1rem',
              fontFamily: 'DM Sans, sans-serif',
              color: '#4a3560',
            },
          }}
        />
</body>
    </html>
  );
}