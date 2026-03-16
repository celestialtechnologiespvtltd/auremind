'use client';

import dynamic from 'next/dynamic';

const OnboardingModal = dynamic(() => import('./OnboardingModal'), { ssr: false });

export default function OnboardingModalWrapper() {
  return <OnboardingModal />;
}
