import AppLayout from '@/components/AppLayout';
import HeroGreeting from './components/HeroGreeting';
import QuickFeatureCards from './components/QuickFeatureCards';
import DailyQuoteCard from './components/DailyQuoteCard';
import WellnessTips from './components/WellnessTips';
import SoundCards from './components/SoundCards';
import CommunityPreview from './components/CommunityPreview';
import FloatingDoodles from './components/FloatingDoodles';

export default function HomeDashboardPage() {
  return (
    <AppLayout>
      <div className="relative space-y-6 py-2">
        <FloatingDoodles />
        <HeroGreeting />
        <DailyQuoteCard />
        <QuickFeatureCards />
        <WellnessTips />
        <SoundCards />
        <CommunityPreview />
        <div className="h-4" />
      </div>
    </AppLayout>
  );
}