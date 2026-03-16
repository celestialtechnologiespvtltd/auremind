'use client';

import AppLayout from '@/components/AppLayout';
import MotivationHero from './components/MotivationHero';
import BreathingCircle from './components/BreathingCircle';
import SoundPlayer from './components/SoundPlayer';
import WellnessTipsList from './components/WellnessTipsList';

export default function DailyMotivationPage() {
  return (
    <AppLayout>
      <div className="space-y-6 py-2">
        <div>
          <h1 className="font-nunito font-800 text-2xl text-purple-900">Daily Motivation ✨</h1>
          <p className="text-sm font-dm text-purple-500 mt-0.5">
            {new Date()?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <MotivationHero />
        <BreathingCircle />
        <SoundPlayer />
        <WellnessTipsList />
      </div>
    </AppLayout>
  );
}