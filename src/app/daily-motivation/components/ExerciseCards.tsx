'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, LogOut } from 'lucide-react';

interface Exercise {
  name: string;
  emoji: string;
  gradient: string;
  textColor: string;
  type: 'breathing' | 'stretch';
  phases: { label: string; duration: number }[];
  reps?: number;
  desc: string;
}

const exercises: Exercise[] = [
  {
    name: 'Box Breathing',
    emoji: '🟦',
    gradient: 'from-blue-100 via-sky-100 to-cyan-100',
    textColor: 'text-blue-800',
    type: 'breathing',
    phases: [
      { label: 'Inhale', duration: 4 },
      { label: 'Hold', duration: 4 },
      { label: 'Exhale', duration: 4 },
      { label: 'Hold', duration: 4 },
    ],
    desc: 'Equal 4-count breathing cycle',
  },
  {
    name: '4-7-8 Breathing',
    emoji: '🌬️',
    gradient: 'from-indigo-100 via-purple-100 to-blue-100',
    textColor: 'text-indigo-800',
    type: 'breathing',
    phases: [
      { label: 'Inhale', duration: 4 },
      { label: 'Hold', duration: 7 },
      { label: 'Exhale', duration: 8 },
    ],
    desc: 'Calming nervous system reset',
  },
  {
    name: 'Deep Belly Breathing',
    emoji: '🫁',
    gradient: 'from-teal-100 via-green-100 to-emerald-100',
    textColor: 'text-teal-800',
    type: 'breathing',
    phases: [
      { label: 'Inhale deeply', duration: 5 },
      { label: 'Hold gently', duration: 2 },
      { label: 'Exhale slowly', duration: 6 },
    ],
    desc: 'Diaphragmatic deep breathing',
  },
  {
    name: 'Pursed Lip Breathing',
    emoji: '💨',
    gradient: 'from-cyan-100 via-sky-100 to-blue-100',
    textColor: 'text-cyan-800',
    type: 'breathing',
    phases: [
      { label: 'Inhale through nose', duration: 2 },
      { label: 'Exhale through pursed lips', duration: 4 },
    ],
    desc: 'Slow, controlled breath release',
  },
  {
    name: 'Neck Rolls Stretch',
    emoji: '🔄',
    gradient: 'from-amber-100 via-yellow-100 to-orange-100',
    textColor: 'text-amber-800',
    type: 'stretch',
    phases: [
      { label: 'Roll right', duration: 5 },
      { label: 'Roll left', duration: 5 },
      { label: 'Rest', duration: 3 },
    ],
    reps: 3,
    desc: 'Gentle neck tension release',
  },
  {
    name: 'Shoulder Shrug Stretch',
    emoji: '🤷',
    gradient: 'from-rose-100 via-pink-100 to-red-100',
    textColor: 'text-rose-800',
    type: 'stretch',
    phases: [
      { label: 'Shrug up', duration: 3 },
      { label: 'Hold', duration: 2 },
      { label: 'Release down', duration: 3 },
    ],
    reps: 5,
    desc: 'Release shoulder tension',
  },
  {
    name: 'Seated Spinal Twist',
    emoji: '🌀',
    gradient: 'from-violet-100 via-purple-100 to-indigo-100',
    textColor: 'text-violet-800',
    type: 'stretch',
    phases: [
      { label: 'Twist right', duration: 8 },
      { label: 'Center', duration: 2 },
      { label: 'Twist left', duration: 8 },
    ],
    reps: 2,
    desc: 'Spinal mobility & core release',
  },
  {
    name: "Child's Pose",
    emoji: '🧘',
    gradient: 'from-green-100 via-emerald-100 to-teal-100',
    textColor: 'text-green-800',
    type: 'stretch',
    phases: [
      { label: 'Fold forward', duration: 5 },
      { label: 'Hold & breathe', duration: 20 },
      { label: 'Rise slowly', duration: 5 },
    ],
    reps: 2,
    desc: 'Full body relaxation pose',
  },
  {
    name: 'Standing Forward Fold',
    emoji: '🙇',
    gradient: 'from-lime-100 via-green-100 to-emerald-100',
    textColor: 'text-lime-800',
    type: 'stretch',
    phases: [
      { label: 'Fold down slowly', duration: 5 },
      { label: 'Hang & breathe', duration: 15 },
      { label: 'Roll up slowly', duration: 5 },
    ],
    reps: 2,
    desc: 'Hamstring & back release',
  },
  {
    name: 'Wrist & Finger Stretch',
    emoji: '🤲',
    gradient: 'from-pink-100 via-rose-100 to-purple-100',
    textColor: 'text-pink-800',
    type: 'stretch',
    phases: [
      { label: 'Extend & flex wrists', duration: 5 },
      { label: 'Spread fingers wide', duration: 3 },
      { label: 'Make fists & release', duration: 4 },
    ],
    reps: 4,
    desc: 'Hand & wrist tension relief',
  },
];

// Breathing circle animation for breath exercises
function BreathingAnimation({ phase }: { phase: string }) {
  const isInhale = phase.toLowerCase().includes('inhale') || phase.toLowerCase().includes('in');
  const isHold = phase.toLowerCase().includes('hold');
  const scale = isInhale ? 1.5 : isHold ? 1.5 : 0.7;

  return (
    <div className="relative flex items-center justify-center w-28 h-28">
      <motion.div
        className="absolute rounded-full bg-blue-200/40 border-2 border-blue-300/60"
        animate={{ scale, opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: '100px', height: '100px' }}
      />
      <motion.div
        className="absolute rounded-full bg-blue-300/50 border border-blue-400/40"
        animate={{ scale: scale * 0.7 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: '70px', height: '70px' }}
      />
      <motion.div
        className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <span className="text-white text-xs font-bold">{isInhale ? '↑' : isHold ? '—' : '↓'}</span>
      </motion.div>
    </div>
  );
}

// Stretch animation for stretch exercises
function StretchAnimation({ phase }: { phase: string }) {
  const isActive = !phase.toLowerCase().includes('rest') && !phase.toLowerCase().includes('center');
  return (
    <div className="relative flex items-center justify-center w-28 h-28">
      <motion.div
        className="absolute rounded-full bg-amber-200/40 border-2 border-amber-300/60"
        animate={{ scale: isActive ? [1, 1.2, 1] : 1, opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: '100px', height: '100px' }}
      />
      <motion.span
        className="text-4xl relative z-10"
        animate={isActive ? { rotate: [-10, 10, -10], scale: [1, 1.15, 1] } : { rotate: 0, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        🧘
      </motion.span>
    </div>
  );
}

// In-card breathing circle animation (looping, no phase)
function CardBreathingAnim() {
  return (
    <div className="relative flex items-center justify-center w-16 h-16 mx-auto my-1">
      <motion.div
        className="absolute rounded-full bg-blue-300/30 border border-blue-400/40"
        animate={{ scale: [0.7, 1.4, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: '56px', height: '56px' }}
      />
      <motion.div
        className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400/70 to-purple-400/70"
        animate={{ scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

// In-card stretch animation (looping)
function CardStretchAnim({ emoji }: { emoji: string }) {
  return (
    <motion.span
      className="text-3xl block text-center my-1"
      animate={{ rotate: [-8, 8, -8], y: [0, -4, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {emoji}
    </motion.span>
  );
}

interface PopupProps {
  exercise: Exercise;
  onClose: () => void;
}

function ExercisePopup({ exercise, onClose }: PopupProps) {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(exercise.phases[0].duration);
  const [repsDone, setRepsDone] = useState(0);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalReps = exercise.reps ?? 1;
  const currentPhase = exercise.phases[phaseIdx];

  const startTimer = useCallback((pIdx: number, time: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          // Move to next phase
          const nextPhase = pIdx + 1;
          if (nextPhase < exercise.phases.length) {
            setPhaseIdx(nextPhase);
            const nextDuration = exercise.phases[nextPhase].duration;
            setTimeLeft(nextDuration);
            startTimer(nextPhase, nextDuration);
          } else {
            // Completed one rep
            const newReps = repsDone + 1;
            if (newReps < totalReps) {
              setRepsDone(newReps);
              setPhaseIdx(0);
              setTimeLeft(exercise.phases[0].duration);
              startTimer(0, exercise.phases[0].duration);
            } else {
              setFinished(true);
              // Save completion count
              try {
                const key = 'mindbloom_exercise_counts';
                const saved = JSON.parse(localStorage.getItem(key) || '{}');
                saved[exercise.name] = (saved[exercise.name] || 0) + 1;
                localStorage.setItem(key, JSON.stringify(saved));
              } catch {}
            }
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [exercise, repsDone, totalReps]);

  useEffect(() => {
    startTimer(0, exercise.phases[0].duration);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const retry = () => {
    setPhaseIdx(0);
    setTimeLeft(exercise.phases[0].duration);
    setRepsDone(0);
    setFinished(false);
    startTimer(0, exercise.phases[0].duration);
  };

  const progress = 1 - timeLeft / currentPhase.duration;
  const circumference = 2 * Math.PI * 44;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(88,28,135,0.35)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 30 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className={`relative w-full max-w-sm rounded-3xl p-6 bg-gradient-to-br ${exercise.gradient} border border-white/70 shadow-2xl`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/60 hover:bg-white/90 flex items-center justify-center text-purple-600 transition-all"
        >
          <X size={16} />
        </button>

        <div className="text-center mb-4">
          <span className="text-3xl">{exercise.emoji}</span>
          <h3 className={`font-nunito font-800 text-xl mt-1 ${exercise.textColor}`}>{exercise.name}</h3>
          <p className={`text-xs font-dm mt-0.5 ${exercise.textColor} opacity-70`}>{exercise.desc}</p>
          {exercise.reps && (
            <p className={`text-xs font-dm mt-1 ${exercise.textColor} opacity-60`}>
              Rep {Math.min(repsDone + 1, totalReps)} of {totalReps}
            </p>
          )}
        </div>

        {!finished ? (
          <>
            {/* Animated visual */}
            <div className="flex justify-center mb-4">
              {exercise.type === 'breathing'
                ? <BreathingAnimation phase={currentPhase.label} />
                : <StretchAnimation phase={currentPhase.label} />
              }
            </div>

            {/* Phase label */}
            <motion.p
              key={currentPhase.label}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center font-nunito font-700 text-base ${exercise.textColor} mb-3`}
            >
              {currentPhase.label}
            </motion.p>

            {/* Circular countdown */}
            <div className="flex justify-center mb-4">
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="8" />
                  <motion.circle
                    cx="50" cy="50" r="44"
                    fill="none"
                    stroke="rgba(139,92,246,0.7)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * (1 - progress)}
                    transition={{ duration: 0.5 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`font-nunito font-800 text-3xl ${exercise.textColor}`}>{timeLeft}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-4"
          >
            <motion.span
              className="text-5xl block mb-3"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.6 }}
            >
              🎉
            </motion.span>
            <p className={`font-nunito font-700 text-lg ${exercise.textColor} mb-1`}>Exercise Complete!</p>
            <p className={`text-xs font-dm ${exercise.textColor} opacity-70 mb-5`}>Great job! How do you feel?</p>
            <div className="flex gap-3">
              <motion.button
                whileTap={{ scale: 0.93 }}
                onClick={retry}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/70 hover:bg-white/90 border border-white/60 transition-all"
              >
                <RotateCcw size={15} className={exercise.textColor} />
                <span className={`font-nunito font-700 text-sm ${exercise.textColor}`}>Retry</span>
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.93 }}
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-purple-500 hover:bg-purple-600 transition-all"
              >
                <LogOut size={15} className="text-white" />
                <span className="font-nunito font-700 text-sm text-white">Exit</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function ExerciseCards() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-nunito font-700 text-lg text-purple-900">Exercises & Stretches 🧘</h2>
        <span className="text-xs font-dm text-purple-400">Tap to start</span>
      </div>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {exercises.map((ex, i) => (
          <motion.button
            key={ex.name}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -6, scale: 1.05, boxShadow: '0 14px 36px rgba(99,102,241,0.20)' }}
            whileTap={{ scale: 0.94, y: 0 }}
            onClick={() => setSelectedExercise(ex)}
            className={`relative bg-gradient-to-br ${ex.gradient} rounded-3xl p-4 flex flex-col items-center min-w-[110px] w-[110px] h-[190px] border border-white/60 shadow-sm transition-shadow duration-300 overflow-hidden`}
          >
            {/* Top content area - fixed height */}
            <div className="flex flex-col items-center flex-1 w-full">
              {/* In-card animation */}
              {ex.type === 'breathing' ? (
                <CardBreathingAnim />
              ) : (
                <CardStretchAnim emoji={ex.emoji} />
              )}
              <p className={`font-nunito font-700 text-xs ${ex.textColor} text-center leading-tight mt-1`}>{ex.name}</p>
              <p className={`text-[10px] font-dm ${ex.textColor} opacity-60 text-center mt-0.5`}>{ex.desc}</p>
            </div>
            {/* Button always at bottom */}
            <div className={`mt-2 px-3 py-1 rounded-xl bg-white/50 border border-white/60 shrink-0`}>
              <span className={`text-[10px] font-dm font-bold ${ex.textColor}`}>
                {ex.type === 'breathing' ? '🌬️ Breath' : '🤸 Stretch'}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedExercise && (
          <ExercisePopup
            key={selectedExercise.name}
            exercise={selectedExercise}
            onClose={() => setSelectedExercise(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
