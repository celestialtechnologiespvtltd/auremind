'use client';

import dynamic from 'next/dynamic';
import { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/AppLayout';

// Dynamic imports for all client-heavy components to prevent ChunkLoadError
const FloatingDoodles = dynamic(() => import('./components/FloatingDoodles'), { ssr: false });
const HeroGreeting = dynamic(() => import('./components/HeroGreeting'), { ssr: false });
const QuickFeatureCards = dynamic(() => import('./components/QuickFeatureCards'), { ssr: false });

// Cross-route import MUST be dynamic — static cross-route imports cause ChunkLoadError in App Router
const MotivationHero = dynamic(() => import('../daily-motivation/components/MotivationHero'), { ssr: false });

// Below-the-fold dynamic imports
const WeeklyMoodSummary = dynamic(() => import('./components/WeeklyMoodSummary'), { ssr: false });
const WellnessTips = dynamic(() => import('./components/WellnessTips'), { ssr: false });
const CommunityPreview = dynamic(() => import('./components/CommunityPreview'), { ssr: false });

// OnboardingModal — client-only, no SSR
const OnboardingModal = dynamic(() => import('@/components/OnboardingModal'), { ssr: false });

function SectionSkeleton() {
  return (
    <div className="rounded-3xl bg-white/50 border border-purple-100/60 animate-pulse h-32" />
  );
}

export default function HomeDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const introSeen = localStorage.getItem('auremind_intro_seen');
    if (!introSeen) {
      router?.replace('/intro');
    }
  }, [router]);

  return (
    <AppLayout>
      <OnboardingModal />
      <div className="relative space-y-6 py-2">
        <FloatingDoodles />
        <Suspense fallback={<SectionSkeleton />}>
          <HeroGreeting />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <MotivationHero />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <WeeklyMoodSummary />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <QuickFeatureCards />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <WellnessTips />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <CommunityPreview />
        </Suspense>
        <div className="h-4" />
        {/* Copyright footer */}
        <footer className="text-center py-4 border-t border-purple-100/60">
          <p className="text-xs font-dm text-purple-400">© 2026 AureMind. All rights reserved.</p>
        </footer>
      </div>
    </AppLayout>
  );
}