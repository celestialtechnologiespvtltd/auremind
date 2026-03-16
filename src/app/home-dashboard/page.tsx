import { Suspense, lazy } from 'react';
import AppLayout from '@/components/AppLayout';
import HeroGreeting from './components/HeroGreeting';
import QuickFeatureCards from './components/QuickFeatureCards';
import MotivationHero from '../daily-motivation/components/MotivationHero';
import FloatingDoodles from './components/FloatingDoodles';

// Lazy load heavier below-the-fold components
const WeeklyMoodSummary = lazy(() => import('./components/WeeklyMoodSummary'));
const WellnessTips = lazy(() => import('./components/WellnessTips'));
const CommunityPreview = lazy(() => import('./components/CommunityPreview'));

function SectionSkeleton() {
  return (
    <div className="rounded-3xl bg-white/50 border border-purple-100/60 animate-pulse h-32" />
  );
}

export default function HomeDashboardPage() {
  return (
    <AppLayout>
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