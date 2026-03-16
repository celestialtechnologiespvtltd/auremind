'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const techniques = [
  { name: '4-7-8 Calm', phases: [
    { label: 'Breathe In', seconds: 4, color: 'from-purple-300 to-blue-300' },
    { label: 'Hold', seconds: 7, color: 'from-blue-300 to-indigo-300' },
    { label: 'Breathe Out', seconds: 8, color: 'from-indigo-300 to-pink-300' },
  ]},
  { name: 'Box Breathing', phases: [
    { label: 'Breathe In', seconds: 4, color: 'from-blue-200 to-purple-200' },
    { label: 'Hold', seconds: 4, color: 'from-purple-200 to-pink-200' },
    { label: 'Breathe Out', seconds: 4, color: 'from-pink-200 to-blue-200' },
    { label: 'Hold', seconds: 4, color: 'from-blue-200 to-purple-200' },
  ]},
  { name: 'Quick Reset', phases: [
    { label: 'Breathe In', seconds: 3, color: 'from-green-200 to-teal-200' },
    { label: 'Breathe Out', seconds: 6, color: 'from-teal-200 to-green-200' },
  ]},
];

export default function BreathingCircle() {
  const [activeTech, setActiveTech] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [cycles, setCycles] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const tech = techniques[activeTech];
  const phase = tech.phases[phaseIdx];

  useEffect(() => {
    if (!isActive) return;
    setCountdown(tech.phases[phaseIdx].seconds);

    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          const nextPhase = (phaseIdx + 1) % tech.phases.length;
          setPhaseIdx(nextPhase);
          if (nextPhase === 0) setCycles(c => c + 1);
          return tech.phases[nextPhase].seconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, phaseIdx, activeTech]);

  const toggle = () => {
    if (isActive) {
      setIsActive(false);
      setPhaseIdx(0);
      setCycles(0);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setCountdown(tech.phases[0].seconds);
      setIsActive(true);
    }
  };

  const switchTech = (i: number) => {
    setIsActive(false);
    setPhaseIdx(0);
    setCycles(0);
    setActiveTech(i);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const isExpanding = phase.label === 'Breathe In';
  const isHolding = phase.label === 'Hold';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-white/60 shadow-md"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-nunito font-700 text-base text-purple-900">Breathing Exercise 🫁</h2>
          <p className="text-xs font-dm text-purple-400 mt-0.5">Calm your nervous system</p>
        </div>
        {isActive && (
          <div className="text-right">
            <p className="font-nunito font-800 text-xl text-purple-700">{cycles}</p>
            <p className="text-xs font-dm text-purple-400">cycles</p>
          </div>
        )}
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto">
        {techniques.map((t, i) => (
          <motion.button
            key={t.name}
            whileTap={{ scale: 0.9 }}
            onClick={() => switchTech(i)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-nunito font-600 transition-all ${
              activeTech === i
                ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-sm'
                : 'bg-purple-50 text-purple-600 border border-purple-100'
            }`}
          >
            {t.name}
          </motion.button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className="relative w-44 h-44 flex items-center justify-center">
          <motion.div
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${phase.color} opacity-15`}
            animate={isActive ? {
              scale: isExpanding ? [1, 1.25] : isHolding ? 1.25 : [1.25, 1],
            } : { scale: 1 }}
            transition={{ duration: isActive ? phase.seconds : 0.5, ease: 'easeInOut' }}
          />
          <motion.div
            className={`absolute inset-4 rounded-full bg-gradient-to-br ${phase.color} opacity-25`}
            animate={isActive ? {
              scale: isExpanding ? [1, 1.2] : isHolding ? 1.2 : [1.2, 1],
            } : { scale: 1 }}
            transition={{ duration: isActive ? phase.seconds : 0.5, ease: 'easeInOut' }}
          />
          <motion.div
            className={`relative w-28 h-28 rounded-full bg-gradient-to-br ${phase.color} shadow-lg border border-white/80 flex flex-col items-center justify-center`}
            animate={isActive ? {
              scale: isExpanding ? [1, 1.15] : isHolding ? 1.15 : [1.15, 1],
            } : { scale: 1 }}
            transition={{ duration: isActive ? phase.seconds : 0.5, ease: 'easeInOut' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${phaseIdx}-${isActive}`}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                {isActive ? (
                  <>
                    <p className="font-nunito font-800 text-3xl text-white/90">{countdown}</p>
                    <p className="text-xs font-dm text-white/70">sec</p>
                  </>
                ) : (
                  <p className="text-3xl">🌬️</p>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${phaseIdx}-${isActive}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="text-center"
          >
            <p className="font-nunito font-700 text-lg text-purple-800">
              {isActive ? phase.label : tech.name}
            </p>
            {!isActive && (
              <p className="text-xs font-dm text-purple-400 mt-1">
                {tech.phases.map(p => `${p.label} ${p.seconds}s`).join(' · ')}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {isActive && (
          <div className="flex gap-2">
            {tech.phases.map((p, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === phaseIdx ? 'bg-purple-500 w-8' : 'bg-purple-200 w-3'
                }`}
              />
            ))}
          </div>
        )}

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggle}
          className={`px-8 py-3 rounded-2xl font-nunito font-700 text-sm shadow-md transition-all ${
            isActive
              ? 'bg-red-100 text-red-600 border border-red-200 hover:bg-red-200' :'bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:shadow-lg'
          }`}
        >
          {isActive ? '⏹ Stop' : '▶ Begin Exercise'}
        </motion.button>
      </div>
    </motion.div>
  );
}