'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tips = [
  { id: 'tip-1', emoji: '💧', tip: 'Drink 8 glasses of water today — hydration boosts mood by up to 30%', color: 'bg-blue-50 border-blue-100' },
  { id: 'tip-2', emoji: '🚶', tip: 'A 10-minute walk outside can reduce anxiety as effectively as light exercise', color: 'bg-green-50 border-green-100' },
  { id: 'tip-3', emoji: '🌙', tip: 'Try the 4-7-8 breathing technique before sleep for deeper rest', color: 'bg-purple-50 border-purple-100' },
  { id: 'tip-4', emoji: '📵', tip: 'Put your phone away 30 minutes before bed to improve sleep quality', color: 'bg-pink-50 border-pink-100' },
  { id: 'tip-5', emoji: '🌿', tip: "Write 3 things you\'re grateful for each morning for positivity", color: 'bg-amber-50 border-amber-100' },
];

function getTodayDateStr() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export default function WellnessTips() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [animating, setAnimating] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const today = getTodayDateStr();
    try {
      const savedDate = localStorage.getItem('wellness-tips-date');
      const saved = localStorage.getItem('wellness-tips-checked');
      if (savedDate !== today) {
        // New day — reset all tips
        localStorage.setItem('wellness-tips-date', today);
        localStorage.setItem('wellness-tips-checked', JSON.stringify({}));
        setChecked({});
      } else if (saved) {
        setChecked(JSON.parse(saved));
      }
    } catch {}

    // Schedule midnight reset
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const msUntilMidnight = midnight.getTime() - now.getTime();
    const timer = setTimeout(() => {
      const newDate = getTodayDateStr();
      localStorage.setItem('wellness-tips-date', newDate);
      localStorage.setItem('wellness-tips-checked', JSON.stringify({}));
      setChecked({});
    }, msUntilMidnight);
    return () => clearTimeout(timer);
  }, []);

  const toggle = (id: string) => {
    const isChecking = !checked[id];
    const next = { ...checked, [id]: isChecking };
    setChecked(next);
    try {
      localStorage.setItem('wellness-tips-checked', JSON.stringify(next));
    } catch {}

    if (isChecking) {
      setAnimating(prev => ({ ...prev, [id]: true }));
      setTimeout(() => setAnimating(prev => ({ ...prev, [id]: false })), 600);
    }
  };

  const completedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-nunito font-700 text-lg text-purple-900">Quick Tips 💡</h2>
        {mounted && (
          <span className="text-xs font-medium text-purple-600 bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-full">
            {completedCount}/{tips.length} · resets midnight
          </span>
        )}
      </div>

      <div className="space-y-2.5">
        {tips?.map((t, i) => {
          const isChecked = mounted && !!checked[t.id];
          const isAnimating = mounted && !!animating[t.id];

          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`flex items-start gap-3 p-3.5 rounded-2xl border ${t?.color} transition-all hover:shadow-sm ${isChecked ? 'opacity-50' : 'opacity-100'}`}
            >
              <button
                onClick={() => toggle(t.id)}
                aria-label={isChecked ? 'Uncheck tip' : 'Check tip'}
                className="flex-shrink-0 mt-0.5 relative w-6 h-6 min-w-[44px] min-h-[44px] -m-2.5 flex items-center justify-center focus:outline-none"
              >
                <span
                  className={`block w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                    isChecked ? 'bg-purple-500 border-purple-500' : 'bg-white border-purple-300 hover:border-purple-400'
                  }`}
                />
                <AnimatePresence>
                  {isChecked && (
                    <motion.svg
                      key="check"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className="absolute w-5 h-5 text-white"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path d="M5 10l3.5 3.5L15 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {isAnimating && (
                    <motion.span
                      key="burst"
                      initial={{ scale: 0.5, opacity: 0.8 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="absolute inset-0 rounded-full bg-purple-300 pointer-events-none"
                    />
                  )}
                </AnimatePresence>
              </button>

              <span className="text-xl flex-shrink-0">{t?.emoji}</span>
              <p className={`text-sm font-dm text-purple-800 leading-relaxed transition-all duration-300 ${isChecked ? 'line-through text-purple-400' : ''}`}>
                {t?.tip}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}