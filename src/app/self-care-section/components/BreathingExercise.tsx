'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const phases = [
  { label: 'Breathe In', duration: 4, color: 'from-purple-200 to-blue-200', scale: 1.4 },
  { label: 'Hold', duration: 4, color: 'from-blue-200 to-purple-200', scale: 1.4 },
  { label: 'Breathe Out', duration: 6, color: 'from-pink-200 to-purple-200', scale: 1.0 },
  { label: 'Hold', duration: 2, color: 'from-purple-200 to-pink-200', scale: 1.0 },
];

export default function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [countdown, setCountdown] = useState(phases?.[0]?.duration);
  const [cycles, setCycles] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isActive) return;

    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setPhaseIdx(pi => {
            const next = (pi + 1) % phases?.length;
            if (next === 0) setCycles(c => c + 1);
            return next;
          });
          return phases?.[(phaseIdx + 1) % phases?.length]?.duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => { if (timerRef?.current) clearInterval(timerRef?.current); };
  }, [isActive, phaseIdx]);

  const toggle = () => {
    if (isActive) {
      setIsActive(false);
      setPhaseIdx(0);
      setCountdown(phases?.[0]?.duration);
      if (timerRef?.current) clearInterval(timerRef?.current);
    } else {
      setIsActive(true);
    }
  };

  const phase = phases?.[phaseIdx];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/70 backdrop-blur-sm rounded-4xl p-6 border border-white/60 shadow-md"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-nunito font-700 text-base text-purple-900">4-7-8 Breathing 🫁</h2>
          <p className="text-xs font-dm text-purple-400 mt-0.5">Reduces anxiety in minutes</p>
        </div>
        <div className="text-right">
          <p className="font-nunito font-700 text-sm text-purple-700 text-tabular">{cycles} cycles</p>
          <p className="text-xs font-dm text-purple-400">completed</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-6">
        {/* Breathing circle */}
        <div className="relative flex items-center justify-center w-40 h-40">
          {/* Outer ring */}
          <motion.div
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${phase?.color} opacity-30`}
            animate={isActive ? { scale: [1, 1.15, 1] } : { scale: 1 }}
            transition={{ duration: phase?.duration, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
          />
          {/* Middle ring */}
          <motion.div
            className={`absolute inset-4 rounded-full bg-gradient-to-br ${phase?.color} opacity-50`}
            animate={isActive ? { scale: [1, phase?.scale, 1] } : { scale: 1 }}
            transition={{ duration: phase?.duration, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
          />
          {/* Core circle */}
          <motion.div
            className={`relative z-10 w-24 h-24 rounded-full bg-gradient-to-br ${phase?.color} shadow-lg border border-white/60 flex flex-col items-center justify-center`}
            animate={isActive ? { scale: [1, phase?.scale * 0.85, 1] } : { scale: 1 }}
            transition={{ duration: phase?.duration, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={phaseIdx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <p className="font-nunito font-700 text-2xl text-purple-800 text-tabular">{isActive ? countdown : '✨'}</p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Phase label */}
        <AnimatePresence mode="wait">
          <motion.p
            key={phaseIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="font-nunito font-700 text-lg text-purple-800"
          >
            {isActive ? phase?.label : 'Ready to begin?'}
          </motion.p>
        </AnimatePresence>

        {/* Phase indicators */}
        <div className="flex gap-2">
          {phases?.map((p, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === phaseIdx && isActive ? 'bg-purple-500 w-8' : 'bg-purple-200 w-4'
              }`}
            />
          ))}
        </div>

        {/* Control button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggle}
          className={`px-8 py-3 rounded-2xl font-nunito font-700 text-sm transition-all shadow-md ${
            isActive
              ? 'bg-red-100 text-red-600 border border-red-200' :'bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:shadow-lg'
          }`}
        >
          {isActive ? '⏹ Stop Exercise' : '▶ Start Breathing'}
        </motion.button>
      </div>
    </motion.div>
  );
}