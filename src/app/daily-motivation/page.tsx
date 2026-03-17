'use client';

import AppLayout from '@/components/AppLayout';
import ExerciseCards from './components/ExerciseCards';
import WellnessSoundCards from './components/WellnessSoundCards';
import WellnessTipsList from './components/WellnessTipsList';
import ConsultCard from './components/ConsultCard';

export default function DailyMotivationPage() {
  return (
    <AppLayout>
      <div className="space-y-6 py-2">
        <div>
          <h1 className="font-nunito font-800 text-2xl text-purple-900">Wellness ✨</h1>
          <p className="text-sm font-dm text-purple-500 mt-0.5">
            {new Date()?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <ExerciseCards />
        <WellnessSoundCards />
        <WellnessTipsList />
        <ConsultCard />
      </div>
    </AppLayout>
  );
}