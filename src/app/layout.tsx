import type { Metadata } from 'next';
import '../styles/tailwind.css';
import { Toaster } from 'sonner';
import OnboardingModal from '@/components/OnboardingModal';

export const metadata: Metadata = {
  title: 'AureMind — Your Mental Wellness Companion',
  description: 'A calming mental wellness app for daily mood tracking, journaling, and self-care.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-dm antialiased">
        <OnboardingModal />
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

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fmindbloom2967back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.17" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /></body>
    </html>
  );
}