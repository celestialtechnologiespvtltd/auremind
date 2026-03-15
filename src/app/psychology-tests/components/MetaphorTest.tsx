'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const questions = [
  {
    id: 1,
    text: "If your mind was the weather right now, what would it be?",
    emoji: "🌍",
    options: [
      { value: 'sunny', label: 'Sunny & Clear', emoji: '☀️', desc: 'Bright, warm, everything feels possible', color: 'bg-yellow-100 border-yellow-200 text-yellow-800' },
      { value: 'cloudy', label: 'Partly Cloudy', emoji: '⛅', desc: 'Mostly okay with some grey patches', color: 'bg-blue-100 border-blue-200 text-blue-800' },
      { value: 'rainy', label: 'Rainy & Grey', emoji: '🌧️', desc: 'Low mood, heavy, hard to see through', color: 'bg-indigo-100 border-indigo-200 text-indigo-800' },
      { value: 'stormy', label: 'Stormy', emoji: '⛈️', desc: 'Overwhelming, chaotic, hard to breathe', color: 'bg-purple-100 border-purple-200 text-purple-800' },
      { value: 'foggy', label: 'Foggy', emoji: '🌫️', desc: 'Unclear, drifting, not sure which way to go', color: 'bg-gray-100 border-gray-200 text-gray-700' },
    ],
  },
  {
    id: 2,
    text: "If your heart was a room in a house, what would it look like right now?",
    emoji: "🏠",
    options: [
      { value: 'garden', label: 'A sunny garden', emoji: '🌻', desc: 'Open, blooming, full of light and life', color: 'bg-green-100 border-green-200 text-green-800' },
      { value: 'cozy', label: 'A cozy living room', emoji: '🛋️', desc: 'Comfortable, warm, safe and familiar', color: 'bg-amber-100 border-amber-200 text-amber-800' },
      { value: 'bedroom', label: 'A messy bedroom', emoji: '🛏️', desc: 'Tired, scattered, needs some tidying', color: 'bg-orange-100 border-orange-200 text-orange-800' },
      { value: 'attic', label: 'A dusty attic', emoji: '📦', desc: 'Full of old things, needs sorting through', color: 'bg-stone-100 border-stone-200 text-stone-700' },
      { value: 'basement', label: 'A locked basement', emoji: '🔒', desc: 'Dark, hidden, things pushed away', color: 'bg-slate-100 border-slate-200 text-slate-700' },
    ],
  },
  {
    id: 3,
    text: "If your energy was a body of water, what would it be?",
    emoji: "💧",
    options: [
      { value: 'ocean', label: 'A flowing ocean', emoji: '🌊', desc: 'Powerful, moving, alive and expansive', color: 'bg-blue-100 border-blue-200 text-blue-800' },
      { value: 'river', label: 'A gentle river', emoji: '🏞️', desc: 'Steady flow, moving forward calmly', color: 'bg-teal-100 border-teal-200 text-teal-800' },
      { value: 'puddle', label: 'A shallow puddle', emoji: '💦', desc: 'Small, easily disturbed, not much left', color: 'bg-sky-100 border-sky-200 text-sky-700' },
      { value: 'still', label: 'A still pond', emoji: '🪷', desc: 'Quiet, reflective, peaceful but stagnant', color: 'bg-emerald-100 border-emerald-200 text-emerald-800' },
      { value: 'dry', label: 'A dry riverbed', emoji: '🏜️', desc: 'Depleted, cracked, desperately needing rain', color: 'bg-yellow-100 border-yellow-200 text-yellow-800' },
    ],
  },
  {
    id: 4,
    text: "If your thoughts were music right now, what would they sound like?",
    emoji: "🎵",
    options: [
      { value: 'symphony', label: 'A symphony', emoji: '🎻', desc: 'Harmonious, complex, beautiful in its fullness', color: 'bg-purple-100 border-purple-200 text-purple-800' },
      { value: 'jazz', label: 'Improvised jazz', emoji: '🎷', desc: 'Spontaneous, creative, sometimes unpredictable', color: 'bg-rose-100 border-rose-200 text-rose-800' },
      { value: 'static', label: 'Static noise', emoji: '📻', desc: 'Chaotic, hard to tune in, overwhelming', color: 'bg-red-100 border-red-200 text-red-800' },
      { value: 'lullaby', label: 'A soft lullaby', emoji: '🎶', desc: 'Quiet, soothing, slowing down', color: 'bg-pink-100 border-pink-200 text-pink-800' },
      { value: 'silence', label: 'Silence', emoji: '🔇', desc: 'Empty, numb, nothing playing', color: 'bg-gray-100 border-gray-200 text-gray-700' },
    ],
  },
  {
    id: 5,
    text: "If your future was a path, what does it look like right now?",
    emoji: "🛤️",
    options: [
      { value: 'clear', label: 'A clear sunny road', emoji: '🌅', desc: 'Open, visible, exciting to walk forward', color: 'bg-yellow-100 border-yellow-200 text-yellow-800' },
      { value: 'winding', label: 'A winding trail', emoji: '🌿', desc: 'Uncertain but beautiful, full of surprises', color: 'bg-green-100 border-green-200 text-green-800' },
      { value: 'foggy', label: 'A foggy lane', emoji: '🌫️', desc: 'Can only see a few steps ahead, unsure', color: 'bg-slate-100 border-slate-200 text-slate-700' },
      { value: 'blocked', label: 'A blocked path', emoji: '🚧', desc: 'Obstacles everywhere, hard to move forward', color: 'bg-orange-100 border-orange-200 text-orange-800' },
      { value: 'cliff', label: 'Standing at a cliff edge', emoji: '🏔️', desc: 'Scary, uncertain, need support to move', color: 'bg-indigo-100 border-indigo-200 text-indigo-800' },
    ],
  },
];

const getMetaphorResult = (answers: Record<number, string>) => {
  const positiveAnswers = ['sunny', 'garden', 'ocean', 'symphony', 'clear', 'river', 'cozy', 'jazz', 'still', 'winding'];
  const positiveCount = Object.values(answers).filter(v => positiveAnswers.includes(v)).length;

  if (positiveCount >= 4) return {
    title: 'Blooming Inner Garden',
    emoji: '🌸',
    color: 'gradient-green',
    desc: "Your metaphors paint a picture of inner richness and vitality. You seem to be in a relatively grounded and hopeful place right now.",
    suggestions: ['Channel this energy into something creative', 'Share your positivity in the community', 'Set an intention for the week ahead', 'Celebrate how far you\'ve come'],
  };
  if (positiveCount >= 2) return {
    title: 'Shifting Weather',
    emoji: '⛅',
    color: 'gradient-lavender',
    desc: "Your inner world has both light and shadow right now — and that's completely okay. You're navigating with awareness.",
    suggestions: ['The breathing exercises may help on harder days', 'Journal about what the metaphors mean to you', 'Be patient with yourself through the shifts', 'Connect with someone who understands'],
  };
  return {
    title: 'Gentle Tending Needed',
    emoji: '🌱',
    color: 'gradient-peach',
    desc: "Your metaphors suggest you may be going through a difficult time emotionally. This is a signal to be especially gentle with yourself.",
    suggestions: ['Start small — one self-care act today', 'Talk to someone you trust', 'Consider reaching out to a professional', 'You deserve care and support'],
  };
};

interface Props { onBack: () => void; }

export default function MetaphorTest({ onBack }: Props) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const q = questions[current];
  const progress = (current / questions.length) * 100;

  const selectAnswer = (value: string) => {
    const newAnswers = { ...answers, [q.id]: value };
    setAnswers(newAnswers);
    if (current < questions.length - 1) {
      setTimeout(() => setCurrent(c => c + 1), 350);
    } else {
      setTimeout(() => setShowResult(true), 350);
    }
  };

  const result = getMetaphorResult(answers);

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-4"
      >
        <div className={`${result.color} rounded-4xl p-6 border border-white/60 shadow-md`}>
          <div className="text-center mb-4">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="text-6xl mb-3"
            >
              {result.emoji}
            </motion.div>
            <h2 className="font-nunito font-800 text-xl text-purple-900">{result.title}</h2>
          </div>
          <p className="font-dm text-sm text-purple-700 leading-relaxed text-center mb-5">{result.desc}</p>

          {/* Answer review */}
          <div className="space-y-2 mb-4">
            <p className="font-nunito font-700 text-xs text-purple-800 uppercase tracking-wide">Your Metaphors</p>
            {questions.map((q) => {
              const ans = q.options.find(o => o.value === answers[q.id]);
              if (!ans) return null;
              return (
                <div key={q.id} className="flex items-center gap-2 bg-white/40 rounded-xl p-2.5 border border-white/60">
                  <span className="text-lg">{ans.emoji}</span>
                  <div>
                    <p className="text-xs font-nunito font-700 text-purple-800">{ans.label}</p>
                    <p className="text-[10px] font-dm text-purple-500">{ans.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white/40 rounded-2xl p-3 border border-white/60">
            <p className="font-nunito font-700 text-xs text-purple-800 uppercase tracking-wide mb-2">Suggestions for You</p>
            <ul className="space-y-1.5">
              {result.suggestions.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-xs font-dm text-purple-700">
                  <span className="text-purple-400">→</span>{s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-3">
          <motion.button whileTap={{ scale: 0.95 }} onClick={onBack}
            className="flex-1 py-3 rounded-2xl font-nunito font-700 text-sm bg-white/70 text-purple-700 border border-purple-200">
            ← Back
          </motion.button>
          <motion.button whileTap={{ scale: 0.95 }}
            onClick={() => { setAnswers({}); setCurrent(0); setShowResult(false); }}
            className="flex-1 py-3 rounded-2xl font-nunito font-700 text-sm bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-md">
            Retake ↺
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <motion.button whileTap={{ scale: 0.9 }} onClick={onBack}
          className="w-9 h-9 rounded-2xl bg-white/70 border border-purple-100 flex items-center justify-center text-purple-600">
          <ArrowLeft size={16} />
        </motion.button>
        <div className="flex-1">
          <p className="font-nunito font-700 text-sm text-purple-900">Mind Weather 🌈</p>
          <p className="text-xs font-dm text-purple-400">{current + 1} of {questions.length}</p>
        </div>
      </div>

      <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="bg-white/70 backdrop-blur-sm rounded-4xl p-6 border border-white/60 shadow-md"
        >
          <div className="text-4xl text-center mb-4">{q.emoji}</div>
          <p className="font-nunito font-600 text-base text-purple-900 text-center leading-relaxed mb-5">{q.text}</p>
          <div className="space-y-2.5">
            {q.options.map((opt) => (
              <motion.button
                key={opt.value}
                whileTap={{ scale: 0.97 }}
                onClick={() => selectAnswer(opt.value)}
                className={`w-full flex items-center gap-3 py-3 px-4 rounded-2xl border text-left transition-all hover:shadow-sm ${
                  answers[q.id] === opt.value
                    ? opt.color + ' shadow-sm'
                    : 'bg-white/60 border-purple-100 hover:bg-white/90'
                }`}
              >
                <span className="text-2xl">{opt.emoji}</span>
                <div>
                  <p className="font-nunito font-700 text-sm text-purple-900">{opt.label}</p>
                  <p className="text-xs font-dm text-purple-500">{opt.desc}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}