'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import AppLayout from '@/components/AppLayout';
import HeroGreeting from './components/HeroGreeting';
import QuickFeatureCards from './components/QuickFeatureCards';
import MotivationHero from '../daily-motivation/components/MotivationHero';
import FloatingDoodles from './components/FloatingDoodles';

// Dynamic imports for below-the-fold components (Next.js pattern)
const WeeklyMoodSummary = dynamic(() => import('./components/WeeklyMoodSummary'), { ssr: false });
const WellnessTips = dynamic(() => import('./components/WellnessTips'), { ssr: false });
const CommunityPreview = dynamic(() => import('./components/CommunityPreview'), { ssr: false });

// Dynamic import for OnboardingModal — client-only, no SSR
const OnboardingModal = dynamic(() => import('@/components/OnboardingModal'), { ssr: false });

function SectionSkeleton() {
  return (
    <div className="rounded-3xl bg-white/50 border border-purple-100/60 animate-pulse h-32" />
  );
}

export default function HomeDashboardPage() {
  return (
    <AppLayout>
      <OnboardingModal />
      <div className="relative space-y-6 py-2">
        <FloatingDoodles />
        <HeroGreeting />
        <MotivationHero />
        <Suspense fallback={<SectionSkeleton />}>
          <WeeklyMoodSummary />
        </Suspense>
        <QuickFeatureCards />
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