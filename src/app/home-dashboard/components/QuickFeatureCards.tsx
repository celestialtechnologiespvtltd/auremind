'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, memo } from 'react';

const features = [
  {
    title: 'Self Care',
    desc: 'Breathing & mindfulness',
    emoji: '🧘',
    gradient: 'gradient-lavender',
    path: '/self-care-section',
    textColor: 'text-purple-800',
    type: 'selfcare',
  },
  {
    title: 'Mind Tests',
    desc: 'Self-reflection quizzes',
    emoji: '🧠',
    gradient: 'gradient-blue',
    path: '/psychology-tests',
    textColor: 'text-blue-800',
    type: 'mindtest',
  },
  {
    title: 'My Diary',
    desc: 'Track your journey',
    emoji: '📔',
    gradient: 'gradient-peach',
    path: '/mood-tracker-diary',
    textColor: 'text-pink-800',
    type: 'diary',
  },
  {
    title: 'Motivation',
    desc: 'Daily quotes & sounds',
    emoji: '✨',
    gradient: 'gradient-pink',
    path: '/daily-motivation',
    textColor: 'text-rose-800',
    type: 'motivation',
  },
  {
    title: 'Community',
    desc: 'Share & connect',
    emoji: '🤝',
    gradient: 'gradient-green',
    path: '/community-section',
    textColor: 'text-green-800',
    type: 'community',
  },
  {
    title: 'Consult',
    desc: 'Talk to an expert',
    emoji: '💬',
    gradient: 'gradient-cream',
    path: '/contact',
    textColor: 'text-amber-800',
    type: 'consult',
  },
];

// Self Care: floating breath circles
function SelfCareAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none flex items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-purple-400/40"
          animate={{ scale: [0.4, 1.6], opacity: [0.6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.7, ease: 'easeOut' }}
          style={{ width: '50px', height: '50px' }}
        />
      ))}
    </div>
  );
}

// Mind Tests: floating thought bubbles / sparks
function MindTestAnimation() {
  const sparks = ['💡', '⚡', '✦'];
  return (
    <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
      {sparks.map((s, i) => (
        <motion.span
          key={i}
          className="absolute text-xs"
          style={{ left: `${15 + i * 28}%`, bottom: '8px' }}
          animate={{ y: [0, -45], opacity: [0.8, 0], scale: [1, 0.6] }}
          transition={{ duration: 1.4 + i * 0.3, repeat: Infinity, delay: i * 0.45, ease: 'easeOut' }}
        >
          {s}
        </motion.span>
      ))}
    </div>
  );
}

// Diary: floating ink dots / writing lines
function DiaryAnimation() {
  const dots = Array.from({ length: 6 }, (_, i) => i);
  return (
    <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
      {dots.map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-pink-400/40"
          style={{
            width: `${3 + (i % 3) * 2}px`,
            height: '2px',
            left: `${10 + i * 14}%`,
            top: `${20 + (i % 3) * 18}%`,
          }}
          animate={{ scaleX: [0, 1, 0], opacity: [0, 0.7, 0] }}
          transition={{ duration: 0.9 + i * 0.2, repeat: Infinity, delay: i * 0.25, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// Motivation: rising star sparkles
function MotivationAnimation() {
  const stars = ['✨', '⭐', '🌟'];
  return (
    <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
      {stars.map((s, i) => (
        <motion.span
          key={i}
          className="absolute text-xs"
          style={{ left: `${18 + i * 25}%`, bottom: '6px' }}
          animate={{ y: [0, -50], x: [0, (i % 2 === 0 ? 6 : -6)], opacity: [0.9, 0], scale: [1, 0.5] }}
          transition={{ duration: 1.6 + i * 0.35, repeat: Infinity, delay: i * 0.5, ease: 'easeOut' }}
        >
          {s}
        </motion.span>
      ))}
    </div>
  );
}

// Community: floating heart / connection pulses
function CommunityAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
      {['💚', '🤝', '💬'].map((e, i) => (
        <motion.span
          key={i}
          className="absolute text-xs"
          style={{ left: `${12 + i * 28}%`, top: `${10 + i * 15}%` }}
          animate={{ y: [0, -6, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8 + i * 0.4, repeat: Infinity, delay: i * 0.35, ease: 'easeInOut' }}
        >
          {e}
        </motion.span>
      ))}
    </div>
  );
}

// Consult: gentle wave / speech bubble ripple
function ConsultAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none flex items-center justify-center">
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-amber-400/40"
          animate={{ scale: [0.5, 1.7], opacity: [0.6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.9, ease: 'easeOut' }}
          style={{ width: '45px', height: '45px' }}
        />
      ))}
    </div>
  );
}

function CardAnimation({ type }: { type: string }) {
  switch (type) {
    case 'selfcare': return <SelfCareAnimation />;
    case 'mindtest': return <MindTestAnimation />;
    case 'diary': return <DiaryAnimation />;
    case 'motivation': return <MotivationAnimation />;
    case 'community': return <CommunityAnimation />;
    case 'consult': return <ConsultAnimation />;
    default: return null;
  }
}

const QuickFeatureCards = memo(function QuickFeatureCards() {
  const router = useRouter();
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-nunito font-700 text-lg text-purple-900">Help Yourself 🌈</h2>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {features.map((f, i) => (
          <motion.button
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            whileTap={{ scale: 0.92 }}
            onHoverStart={() => setActiveCard(i)}
            onHoverEnd={() => setActiveCard(null)}
            onFocus={() => setActiveCard(i)}
            onBlur={() => setActiveCard(null)}
            onClick={() => router.push(f.path)}
            className={`relative ${f.gradient} rounded-3xl p-4 flex flex-col items-center gap-3 shadow-sm border border-white/60 cursor-pointer transition-all duration-300 overflow-hidden w-full ${activeCard === i ? 'ring-2 ring-purple-300 shadow-lg' : ''}`}
          >
            <AnimatePresence>
              {activeCard === i && <CardAnimation type={f.type} />}
            </AnimatePresence>

            <motion.span
              className="text-3xl relative z-10"
              animate={activeCard === i ? { scale: [1, 1.18, 1] } : { scale: 1 }}
              transition={{ duration: 1.4, repeat: activeCard === i ? Infinity : 0 }}
            >
              {f.emoji}
            </motion.span>
            <div className="text-center relative z-10">
              <p className={`font-nunito font-700 text-xs ${f.textColor} leading-tight`}>{f.title}</p>
              <p className={`text-[10px] font-dm ${f.textColor} opacity-70 leading-tight mt-0.5`}>{f.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
});

export default QuickFeatureCards;
