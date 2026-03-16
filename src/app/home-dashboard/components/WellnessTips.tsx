'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Pool of 50 wellness to-do tasks
const TODO_POOL = [
  { emoji: '💧', task: 'Drink 8 glasses of water today' },
  { emoji: '🚶', task: 'Take a 10-minute walk outside' },
  { emoji: '🌙', task: 'Try the 4-7-8 breathing technique before sleep' },
  { emoji: '📵', task: 'Put your phone away 30 minutes before bed' },
  { emoji: '🌿', task: 'Write 3 things you\'re grateful for' },
  { emoji: '🧘', task: 'Do 5 minutes of mindful meditation' },
  { emoji: '📖', task: 'Read for at least 15 minutes' },
  { emoji: '🥗', task: 'Eat a healthy, balanced meal today' },
  { emoji: '😴', task: 'Aim for 7–8 hours of sleep tonight' },
  { emoji: '🎵', task: 'Listen to calming music for 10 minutes' },
  { emoji: '🌸', task: 'Compliment yourself in the mirror' },
  { emoji: '🤸', task: 'Do a 5-minute stretch or yoga flow' },
  { emoji: '✍️', task: 'Write one positive affirmation for today' },
  { emoji: '🌞', task: 'Spend 10 minutes in natural sunlight' },
  { emoji: '🫁', task: 'Practice box breathing: 4 in, 4 hold, 4 out, 4 hold' },
  { emoji: '📞', task: 'Reach out to a friend or family member' },
  { emoji: '🧹', task: 'Tidy up one small area of your space' },
  { emoji: '🍵', task: 'Make and enjoy a warm herbal tea mindfully' },
  { emoji: '🎨', task: 'Doodle or color for 10 minutes' },
  { emoji: '🌊', task: 'Take a relaxing shower or bath' },
  { emoji: '🏃', task: 'Do 20 jumping jacks or a quick workout' },
  { emoji: '🦋', task: 'Step outside and notice 5 things in nature' },
  { emoji: '💤', task: 'Take a 20-minute power nap if tired' },
  { emoji: '🧡', task: 'Do one act of kindness for someone today' },
  { emoji: '🎯', task: 'Set one small, achievable goal for today' },
  { emoji: '🌺', task: 'Spend 5 minutes in silence without screens' },
  { emoji: '🍎', task: 'Eat a piece of fruit as a healthy snack' },
  { emoji: '🤲', task: 'Practice progressive muscle relaxation' },
  { emoji: '📝', task: 'Write down one thing you\'re looking forward to' },
  { emoji: '🌈', task: 'Watch a funny video to boost your mood' },
  { emoji: '🧠', task: 'Learn one new interesting fact today' },
  { emoji: '🕯️', task: 'Light a candle and sit quietly for 5 minutes' },
  { emoji: '🐾', task: 'Spend time with a pet or watch cute animal videos' },
  { emoji: '🌻', task: 'Water a plant or tend to something living' },
  { emoji: '🎤', task: 'Sing or hum your favorite song' },
  { emoji: '🏞️', task: 'Look at a beautiful photo or piece of art' },
  { emoji: '🧃', task: 'Drink a glass of fresh juice or smoothie' },
  { emoji: '🤗', task: 'Give yourself a self-hug and breathe deeply' },
  { emoji: '📸', task: 'Take a photo of something beautiful around you' },
  { emoji: '🌙', task: 'Write a short reflection on your day tonight' },
  { emoji: '🏋️', task: 'Do 10 minutes of light exercise' },
  { emoji: '🎭', task: 'Watch or read something that makes you laugh' },
  { emoji: '🌍', task: 'Spend 5 minutes visualizing your happy place' },
  { emoji: '🦅', task: 'Stand tall, take 3 deep breaths, feel grounded' },
  { emoji: '🍫', task: 'Enjoy a small treat mindfully without guilt' },
  { emoji: '💌', task: 'Write a kind note to your future self' },
  { emoji: '🌟', task: 'List 3 personal strengths you\'re proud of' },
  { emoji: '🧩', task: 'Do a puzzle or brain game for 10 minutes' },
  { emoji: '🌬️', task: 'Open a window and breathe fresh air for 5 minutes' },
  { emoji: '🙏', task: 'Reflect on one moment of joy from this week' },
];

const STORAGE_KEY_TODOS = 'mindbloom_todos';
const STORAGE_KEY_DATE = 'mindbloom_todos_date';

function getTodayDateStr() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function pickRandom5(): { emoji: string; task: string; id: string }[] {
  const shuffled = [...TODO_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5).map((t, i) => ({ ...t, id: `todo-${i}-${Date.now()}` }));
}

interface TodoItem {
  id: string;
  emoji: string;
  task: string;
  done: boolean;
}

// Simple confetti particle
function ConfettiParticle({ x, color, delay }: { x: number; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ y: -20, x, opacity: 1, rotate: 0, scale: 1 }}
      animate={{ y: window.innerHeight + 40, x: x + (Math.random() - 0.5) * 200, opacity: 0, rotate: 720, scale: 0.5 }}
      transition={{ duration: 2.5 + Math.random(), delay, ease: 'easeIn' }}
      className="fixed top-0 z-[100] pointer-events-none"
      style={{ left: 0, width: 10, height: 10, borderRadius: Math.random() > 0.5 ? '50%' : '2px', background: color }}
    />
  );
}

const CONFETTI_COLORS = ['#a855f7', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#f97316', '#14b8a6', '#e11d48'];

export default function WellnessTips() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiParticles, setConfettiParticles] = useState<{ id: number; x: number; color: string; delay: number }[]>([]);
  const [animating, setAnimating] = useState<Record<string, boolean>>({});
  const confettiShownRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    const today = getTodayDateStr();
    try {
      const savedDate = localStorage.getItem(STORAGE_KEY_DATE);
      const savedTodos = localStorage.getItem(STORAGE_KEY_TODOS);
      if (savedDate !== today || !savedTodos) {
        // New day — pick 5 new todos
        const newTodos = pickRandom5().map(t => ({ ...t, done: false }));
        localStorage.setItem(STORAGE_KEY_DATE, today);
        localStorage.setItem(STORAGE_KEY_TODOS, JSON.stringify(newTodos));
        setTodos(newTodos);
        confettiShownRef.current = false;
      } else {
        const parsed: TodoItem[] = JSON.parse(savedTodos);
        setTodos(parsed);
        // If all already done, mark confetti as already shown
        if (parsed.every(t => t.done)) confettiShownRef.current = true;
      }
    } catch {
      const newTodos = pickRandom5().map(t => ({ ...t, done: false }));
      setTodos(newTodos);
    }

    // Schedule midnight reset
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const msUntilMidnight = midnight.getTime() - now.getTime();
    const timer = setTimeout(() => {
      const newDate = getTodayDateStr();
      const newTodos = pickRandom5().map(t => ({ ...t, done: false }));
      localStorage.setItem(STORAGE_KEY_DATE, newDate);
      localStorage.setItem(STORAGE_KEY_TODOS, JSON.stringify(newTodos));
      setTodos(newTodos);
      confettiShownRef.current = false;
    }, msUntilMidnight);
    return () => clearTimeout(timer);
  }, []);

  const triggerConfetti = () => {
    if (confettiShownRef.current) return;
    confettiShownRef.current = true;
    const particles = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      delay: Math.random() * 0.6,
    }));
    setConfettiParticles(particles);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setConfettiParticles([]);
    }, 3500);
  };

  const toggle = (id: string) => {
    const updated = todos.map(t => t.id === id ? { ...t, done: !t.done } : t);
    setTodos(updated);
    try {
      localStorage.setItem(STORAGE_KEY_TODOS, JSON.stringify(updated));
    } catch {}

    const isChecking = !todos.find(t => t.id === id)?.done;
    if (isChecking) {
      setAnimating(prev => ({ ...prev, [id]: true }));
      setTimeout(() => setAnimating(prev => ({ ...prev, [id]: false })), 600);
      // Check if all done after this toggle
      const allDone = updated.every(t => t.done);
      if (allDone) {
        setTimeout(triggerConfetti, 300);
      }
    }
  };

  const completedCount = todos.filter(t => t.done).length;
  const allDone = completedCount === todos.length && todos.length > 0;

  return (
    <>
      {/* Confetti overlay */}
      <AnimatePresence>
        {showConfetti && (
          <>
            {confettiParticles.map(p => (
              <ConfettiParticle key={p.id} x={p.x} color={p.color} delay={p.delay} />
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="fixed inset-0 z-[99] flex items-center justify-center pointer-events-none"
            >
              <div className="bg-white/95 backdrop-blur-xl rounded-4xl px-8 py-6 shadow-2xl border border-purple-100 text-center">
                <p className="text-5xl mb-2">🎉</p>
                <p className="font-nunito font-800 text-xl text-purple-900">All Done!</p>
                <p className="font-dm text-purple-500 text-sm mt-1">You completed all your to-dos today!</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-nunito font-700 text-lg text-purple-900">To-Do ✅</h2>
          {mounted && (
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${allDone ? 'text-green-700 bg-green-50 border-green-200' : 'text-purple-600 bg-purple-50 border-purple-100'}`}>
              {completedCount}/{todos.length} · resets midnight
            </span>
          )}
        </div>

        {allDone && mounted && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-3 border border-green-100 flex items-center gap-2"
          >
            <span className="text-xl">🎉</span>
            <p className="font-nunito font-600 text-green-700 text-sm">Amazing! You finished all your to-dos today!</p>
          </motion.div>
        )}

        <div className="space-y-2.5">
          {todos.map((t, i) => {
            const isChecked = mounted && t.done;
            const isAnimating = mounted && !!animating[t.id];

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`flex items-start gap-3 p-3.5 rounded-2xl border bg-white/70 border-purple-100 transition-all hover:shadow-sm ${isChecked ? 'opacity-50' : 'opacity-100'}`}
              >
                <button
                  onClick={() => toggle(t.id)}
                  aria-label={isChecked ? 'Uncheck to-do' : 'Check to-do'}
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

                <span className="text-xl flex-shrink-0">{t.emoji}</span>
                <p className={`text-sm font-dm text-purple-800 leading-relaxed transition-all duration-300 ${isChecked ? 'line-through text-purple-400' : ''}`}>
                  {t.task}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}