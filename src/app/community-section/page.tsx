'use client';

import { useState, useEffect } from 'react';
import AppLayout from '@/components/AppLayout';
import CommunityFeed from './components/CommunityFeed';
import CommunityHeader from './components/CommunityHeader';
import CommunityGuidelinesModal from './components/CommunityGuidelinesModal';

const GUIDELINES_KEY = 'mindbloom_community_guidelines_v3';

export default function CommunitySectionPage() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const accepted = sessionStorage.getItem(GUIDELINES_KEY) === 'true';
    if (!accepted) {
      setShowModal(true);
    }
  }, []);

  return (
    <AppLayout>
      {showModal && (
        <CommunityGuidelinesModal onAccepted={() => setShowModal(false)} />
      )}
      <div className="space-y-5 py-2">
        <CommunityHeader />
        <CommunityFeed />
      </div>
    </AppLayout>
  );
}