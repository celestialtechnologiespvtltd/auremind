'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, useRef, useCallback, memo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const VISIBLE_COUNT = 3; // cards visible at once on mobile
  const maxIndex = features.length - VISIBLE_COUNT;

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-nunito font-700 text-lg text-purple-900">Help Yourself 🌈</h2>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-dm text-purple-400 mr-1">Swipe to explore</span>
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            aria-label="Previous"
            className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${currentIndex === 0 ? 'border-purple-100 text-purple-200 cursor-not-allowed' : 'border-purple-200 text-purple-500 hover:bg-purple-50 active:scale-90'}`}
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={goNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Next"
            className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${currentIndex >= maxIndex ? 'border-purple-100 text-purple-200 cursor-not-allowed' : 'border-purple-200 text-purple-500 hover:bg-purple-50 active:scale-90'}`}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Mobile swipeable row */}
      <div
        ref={containerRef}
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          className="flex gap-3"
          animate={{ x: `calc(-${currentIndex} * (100% / ${VISIBLE_COUNT} + 4px))` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
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
              className={`relative ${f.gradient} rounded-lg p-4 flex flex-col items-center gap-2 shadow-sm border border-white/60 cursor-pointer transition-all duration-300 overflow-hidden flex-shrink-0 min-h-[44px] ${activeCard === i ? 'ring-2 ring-purple-300 shadow-lg' : ''}`}
              style={{ width: `calc((100% - ${(VISIBLE_COUNT - 1) * 12}px) / ${VISIBLE_COUNT})`, minWidth: '90px' }}
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
                <p className={`text-[10px] font-dm ${f.textColor} opacity-70 leading-tight mt-0.5 hidden sm:block`}>{f.desc}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

    </div>
  );
});

export default QuickFeatureCards;
