'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import DepressionTest from './DepressionTest';
import MetaphorTest from './MetaphorTest';
import ExtraTest from './ExtraTest';

const tests = [
  {
    id: 'depression',
    title: 'Mood Check-In',
    emoji: '🌤️',
    desc: 'Reflect on your emotional patterns over the past two weeks',
    duration: '3–5 min',
    questions: 10,
    gradient: 'gradient-lavender',
    textColor: 'text-purple-800',
    tag: 'Self-reflection',
  },
  {
    id: 'metaphor',
    title: 'Mind Weather',
    emoji: '🌈',
    desc: 'Explore your inner world through vivid metaphors and imagery',
    duration: '2–3 min',
    questions: 5,
    gradient: 'gradient-blue',
    textColor: 'text-blue-800',
    tag: 'Metaphor-based',
  },
  {
    id: 'anxiety',
    title: 'Anxiety Self-Check',
    emoji: '😰',
    desc: 'Assess your anxiety levels and discover calming strategies',
    duration: '2–4 min',
    questions: 7,
    gradient: 'gradient-peach',
    textColor: 'text-pink-800',
    tag: 'Anxiety',
  },
  {
    id: 'stress',
    title: 'Stress Level Assessment',
    emoji: '💢',
    desc: 'Measure your current stress load and get personalized tips',
    duration: '3–4 min',
    questions: 8,
    gradient: 'gradient-green',
    textColor: 'text-green-800',
    tag: 'Stress',
  },
  {
    id: 'sleep',
    title: 'Sleep Quality Check',
    emoji: '😴',
    desc: 'Understand your sleep patterns and improve your rest',
    duration: '2–3 min',
    questions: 7,
    gradient: 'gradient-cream',
    textColor: 'text-amber-800',
    tag: 'Sleep',
  },
];

// Scroll-reveal wrapper
function ScrollRevealCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0px)' : 'translateY(36px)',
        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function TestHub() {
  const [activeTest, setActiveTest] = useState<string | null>(null);
  const [pastResults, setPastResults] = useState<Array<{ test: string; date: string; result: string; emoji: string }>>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mindbloom_test_results');
      if (saved) setPastResults(JSON.parse(saved));
    } catch {}
  }, [activeTest]);

  if (activeTest === 'depression') return <DepressionTest onBack={() => setActiveTest(null)} />;
  if (activeTest === 'metaphor') return <MetaphorTest onBack={() => setActiveTest(null)} />;
  if (activeTest === 'anxiety') return <ExtraTest testType="anxiety" onBack={() => setActiveTest(null)} />;
  if (activeTest === 'stress') return <ExtraTest testType="stress" onBack={() => setActiveTest(null)} />;
  if (activeTest === 'sleep') return <ExtraTest testType="sleep" onBack={() => setActiveTest(null)} />;

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-amber-50 border border-amber-200 rounded-3xl p-4 flex items-start gap-3"
      >
        <span className="text-xl flex-shrink-0">⚠️</span>
        <div>
          <p className="font-nunito font-700 text-sm text-amber-800 mb-1">For Self-Reflection Only</p>
          <p className="text-xs font-dm text-amber-700 leading-relaxed">
            These tools are designed for personal insight and are <strong>not</strong> medical diagnoses. If you're experiencing persistent distress, please reach out to a mental health professional.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tests?.map((test, i) => (
          <ScrollRevealCard key={test?.id} delay={i * 80}>
            <motion.div
              whileHover={{
                y: -6,
                scale: 1.02,
                boxShadow: '0 20px 48px rgba(205,180,219,0.45)',
                transition: { duration: 0.25, ease: 'easeOut' },
              }}
              whileTap={{ scale: 0.97 }}
              className={`${test?.gradient} rounded-4xl p-6 border border-white/60 shadow-md cursor-pointer transition-all duration-300`}
              onClick={() => setActiveTest(test?.id)}
            >
              <motion.div className="text-5xl mb-4" animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}>
                {test?.emoji}
              </motion.div>
              <span className={`text-[10px] font-dm px-2 py-1 rounded-full bg-white/40 ${test?.textColor} mb-2 inline-block`}>
                {test?.tag}
              </span>
              <h3 className={`font-nunito font-800 text-xl ${test?.textColor} mt-2 mb-2`}>{test?.title}</h3>
              <p className={`text-sm font-dm ${test?.textColor} opacity-70 leading-relaxed mb-4`}>{test?.desc}</p>
              <div className={`flex items-center gap-3 text-xs font-dm ${test?.textColor} opacity-60`}>
                <span>⏱ {test?.duration}</span>
                <span>•</span>
                <span>📝 {test?.questions} questions</span>
              </div>
              <motion.div
                whileHover={{ scale: 1.04, boxShadow: '0 6px 20px rgba(139,92,246,0.15)' }}
                whileTap={{ scale: 0.96 }}
                className={`mt-4 w-full py-2.5 rounded-2xl bg-white/40 text-center font-nunito font-700 text-sm ${test?.textColor} border border-white/60 hover:bg-white/60 transition-colors`}
              >
                Begin Reflection →
              </motion.div>
            </motion.div>
          </ScrollRevealCard>
        ))}
      </div>

      {/* Past results from localStorage */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-4 border border-white/60 shadow-sm">
        <h3 className="font-nunito font-700 text-sm text-purple-900 mb-3">Recent Reflections 📋</h3>
        <div className="space-y-2.5">
          {pastResults.length > 0 ? pastResults.slice(0, 5).map((r, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-2xl border bg-purple-50 border-purple-100 text-purple-700">
              <span className="text-xl">{r.emoji}</span>
              <div className="flex-1">
                <p className="font-nunito font-700 text-xs text-purple-900">{r.test}</p>
                <p className="text-xs font-dm text-purple-500">{r.result}</p>
              </div>
              <p className="text-[10px] font-dm text-purple-400">{r.date}</p>
            </div>
          )) : (
            <p className="text-xs font-dm text-purple-400 text-center py-2">Complete a test to see your reflections here</p>
          )}
        </div>
      </div>
    </div>
  );
}