import AppLayout from '@/components/AppLayout';
import CommunityFeed from './components/CommunityFeed';
import CommunityHeader from './components/CommunityHeader';

export default function CommunitySectionPage() {
  return (
    <AppLayout>
      <div className="space-y-5 py-2">
        <CommunityHeader />
        <CommunityFeed />
      </div>
    </AppLayout>
  );
}