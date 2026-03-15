'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const features = [
  {
    title: 'Self Care',
    desc: 'Breathing & mindfulness',
    emoji: '🧘',
    gradient: 'gradient-lavender',
    path: '/self-care-section',
    textColor: 'text-purple-800',
  },
  {
    title: 'Mind Tests',
    desc: 'Self-reflection quizzes',
    emoji: '🧠',
    gradient: 'gradient-blue',
    path: '/psychology-tests',
    textColor: 'text-blue-800',
  },
  {
    title: 'My Diary',
    desc: 'Track your journey',
    emoji: '📔',
    gradient: 'gradient-peach',
    path: '/mood-tracker-diary',
    textColor: 'text-pink-800',
  },
  {
    title: 'Motivation',
    desc: 'Daily quotes & sounds',
    emoji: '✨',
    gradient: 'gradient-pink',
    path: '/daily-motivation',
    textColor: 'text-rose-800',
  },
  {
    title: 'Community',
    desc: 'Share & connect',
    emoji: '🤝',
    gradient: 'gradient-green',
    path: '/community-section',
    textColor: 'text-green-800',
  },
  {
    title: 'Consult',
    desc: 'Talk to an expert',
    emoji: '💬',
    gradient: 'gradient-cream',
    path: '/contact',
    textColor: 'text-amber-800',
  },
];

export default function QuickFeatureCards() {
  const router = useRouter();

  return (
    <div>
      <h2 className="font-nunito font-700 text-lg text-purple-900 mb-3">Help Yourself 🌈</h2>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {features?.map((f, i) => (
          <motion.button
            key={f?.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileTap={{ scale: 0.92 }}
            whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(205,180,219,0.4)' }}
            onClick={() => router?.push(f?.path)}
            className={`${f?.gradient} rounded-3xl p-4 flex flex-col items-center gap-2 shadow-sm border border-white/60 cursor-pointer transition-all duration-300 min-h-[44px]`}
          >
            <span className="text-3xl">{f?.emoji}</span>
            <div className="text-center">
              <p className={`font-nunito font-700 text-xs ${f?.textColor} leading-tight`}>{f?.title}</p>
              <p className={`text-[10px] font-dm ${f?.textColor} opacity-70 leading-tight mt-0.5 hidden sm:block`}>{f?.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}