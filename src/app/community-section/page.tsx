'use client';

import { useState, useEffect } from 'react';
import AppLayout from '@/components/AppLayout';
import CommunityFeed from './components/CommunityFeed';
import CommunityHeader from './components/CommunityHeader';
import CommunityGuidelinesModal from './components/CommunityGuidelinesModal';

const GUIDELINES_KEY = 'mindbloom_community_guidelines_v2';

export default function CommunitySectionPage() {
  const [guidelinesAccepted, setGuidelinesAccepted] = useState<boolean | null>(null);

  useEffect(() => {
    const accepted = localStorage.getItem(GUIDELINES_KEY) === 'true';
    setGuidelinesAccepted(accepted);
  }, []);

  // Don't render anything until we've checked localStorage on the client
  if (guidelinesAccepted === null) {
    return <AppLayout><div /></AppLayout>;
  }

  return (
    <AppLayout>
      {!guidelinesAccepted && (
        <CommunityGuidelinesModal onAccepted={() => setGuidelinesAccepted(true)} />
      )}
      {guidelinesAccepted && (
        <div className="space-y-5 py-2">
          <CommunityHeader />
          <CommunityFeed />
        </div>
      )}
    </AppLayout>
  );
}