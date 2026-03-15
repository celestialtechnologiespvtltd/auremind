import AppLayout from '@/components/AppLayout';
import SelfCareHero from './components/SelfCareHero';
import BreathingExercise from './components/BreathingExercise';
import SelfCareGrid from './components/SelfCareGrid';

export default function SelfCareSectionPage() {
  return (
    <AppLayout>
      <div className="space-y-6 py-2">
        <SelfCareHero />
        <BreathingExercise />
        <SelfCareGrid />
      </div>
    </AppLayout>
  );
}