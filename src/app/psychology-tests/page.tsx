import AppLayout from '@/components/AppLayout';
import TestHub from './components/TestHub';

export default function PsychologyTestsPage() {
  return (
    <AppLayout>
      <div className="py-2">
        <div className="mb-5">
          <h1 className="font-nunito font-800 text-2xl text-purple-900">Mindscape 🔮</h1>
          <p className="text-sm font-dm text-purple-500 mt-0.5">
            Gentle self-reflection tools — not medical diagnoses
          </p>
        </div>
        <TestHub />
      </div>
    </AppLayout>
  );
}