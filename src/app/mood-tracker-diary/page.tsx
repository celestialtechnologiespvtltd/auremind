'use client';

import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import MoodInput from './components/MoodInput';
import WeeklyMoodChart from './components/WeeklyMoodChart';
import PastEntries from './components/PastEntries';

export default function MoodTrackerDiaryPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  return (
    <AppLayout>
      <div className="space-y-6 py-2">
        <div>
          <h1 className="font-nunito font-800 text-2xl text-purple-900">My Diary</h1>
          <p className="text-sm font-dm text-purple-500 mt-0.5">
            {new Date()?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        <MoodInput onNoteSaved={() => setRefreshTrigger(t => t + 1)} />

        <WeeklyMoodChart />
        <PastEntries refreshTrigger={refreshTrigger} />
      </div>
    </AppLayout>
  );
}