'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const questions = [
  { id: 1, text: "Over the past two weeks, how often have you felt little interest or pleasure in doing things you usually enjoy?", emoji: "🎯" },
  { id: 2, text: "How often have you felt down, hopeless, or like things will never get better?", emoji: "🌧️" },
  { id: 3, text: "How often have you had trouble falling asleep, staying asleep, or sleeping too much?", emoji: "😴" },
  { id: 4, text: "How often have you felt tired or had very little energy, even after resting?", emoji: "⚡" },
  { id: 5, text: "How often have you had a poor appetite, or found yourself eating much more than usual?", emoji: "🍽️" },
  { id: 6, text: "How often have you felt bad about yourself, or felt like a failure or a burden to others?", emoji: "💭" },
  { id: 7, text: "How often have you had trouble concentrating on things like reading or watching TV?", emoji: "🎯" },
  { id: 8, text: "How often have you been moving or speaking so slowly that others might have noticed?", emoji: "🐢" },
  { id: 9, text: "How often have you had thoughts of hurting yourself or that you\'d be better off not being here?", emoji: "⚠️" },
  { id: 10, text: "How often have you felt disconnected from your emotions — like you're watching your life from outside?", emoji: "🫧" },
];

const options = [
  { value: 0, label: 'Not at all', color: 'bg-green-100 border-green-200 text-green-800' },
  { value: 1, label: 'Several days', color: 'bg-blue-100 border-blue-200 text-blue-800' },
  { value: 2, label: 'More than half the days', color: 'bg-amber-100 border-amber-200 text-amber-800' },
  { value: 3, label: 'Nearly every day', color: 'bg-red-100 border-red-200 text-red-800' },
];

const getResult = (score: number) => {
  if (score <= 4) return {
    level: 'Minimal', emoji: '☀️', color: 'gradient-green',
    desc: "You're doing really well! Your responses suggest minimal distress. Keep nurturing your wellbeing with daily self-care.",
    suggestions: ['Continue your journaling habit', 'Celebrate small daily wins', 'Stay connected with people you love', 'Keep up your healthy sleep routine'],
  };
  if (score <= 9) return {
    level: 'Mild', emoji: '🌤️', color: 'gradient-lavender',
    desc: "You're experiencing some low moods. This is completely normal and manageable with gentle self-care practices.",
    suggestions: ['Try the breathing exercises in Self Care', 'Write in your diary daily', 'Spend time in nature', 'Limit social media before bed'],
  };
  if (score <= 14) return {
    level: 'Moderate', emoji: '⛅', color: 'gradient-peach',
    desc: "You may be going through a harder stretch. You deserve support — please consider talking to someone you trust.",
    suggestions: ['Reach out to a trusted friend or family member', 'Try daily mindfulness practice', 'Consider speaking with a therapist', 'Use the community for peer support'],
  };
  return {
    level: 'Significant', emoji: '🌧️', color: 'gradient-blue',
    desc: "It seems like you're carrying a heavy load right now. Please know you're not alone — professional support can make a real difference.",
    suggestions: ['Please speak with a mental health professional', 'Call a support line if you feel overwhelmed', 'Reach out to someone you trust today', 'Be very gentle with yourself'],
  };
};

interface Props { onBack: () => void; }

export default function DepressionTest({ onBack }: Props) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const progress = ((current) / questions.length) * 100;
  const q = questions[current];

  const answer = (value: number) => {
    const newAnswers = { ...answers, [q.id]: value };
    setAnswers(newAnswers);
    if (current < questions.length - 1) {
      setTimeout(() => setCurrent(c => c + 1), 300);
    } else {
      setTimeout(() => setShowResult(true), 300);
    }
  };

  const score = Object.values(answers).reduce((a, b) => a + b, 0);
  const result = getResult(score);

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-4"
      >
        <div className={`${result.color} rounded-4xl p-6 border border-white/60 shadow-md text-center`}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="text-6xl mb-3"
          >
            {result.emoji}
          </motion.div>
          <p className="text-xs font-dm text-purple-500 uppercase tracking-wide mb-1">Your result</p>
          <h2 className="font-nunito font-800 text-2xl text-purple-900 mb-2">{result.level} Distress</h2>
          <p className="font-dm text-sm text-purple-700 leading-relaxed mb-4">{result.desc}</p>
          <div className="bg-white/40 rounded-2xl p-3 text-left border border-white/60">
            <p className="font-nunito font-700 text-xs text-purple-800 uppercase tracking-wide mb-2">Gentle Suggestions</p>
            <ul className="space-y-1.5">
              {result.suggestions.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-xs font-dm text-purple-700">
                  <span className="text-purple-400 flex-shrink-0">→</span>{s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-4">
          <p className="text-xs font-dm text-amber-700 leading-relaxed">
            ⚠️ <strong>Reminder:</strong> This reflection tool is for personal insight only and is not a clinical diagnosis. If you scored moderate or above, we gently encourage you to speak with a mental health professional.
          </p>
        </div>

        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex-1 py-3 rounded-2xl font-nunito font-700 text-sm bg-white/70 text-purple-700 border border-purple-200 hover:bg-white/90 transition-all"
          >
            ← Back to Tests
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => { setAnswers({}); setCurrent(0); setShowResult(false); }}
            className="flex-1 py-3 rounded-2xl font-nunito font-700 text-sm bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-md"
          >
            Retake ↺
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="w-9 h-9 rounded-2xl bg-white/70 border border-purple-100 flex items-center justify-center text-purple-600 hover:bg-white transition-colors"
        >
          <ArrowLeft size={16} />
        </motion.button>
        <div className="flex-1">
          <p className="font-nunito font-700 text-sm text-purple-900">Mood Check-In 🌤️</p>
          <p className="text-xs font-dm text-purple-400">{current + 1} of {questions.length}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="bg-white/70 backdrop-blur-sm rounded-4xl p-6 border border-white/60 shadow-md"
        >
          <div className="text-4xl mb-4 text-center">{q.emoji}</div>
          <p className="font-nunito font-600 text-base text-purple-900 text-center leading-relaxed mb-6">
            {q.text}
          </p>
          <div className="space-y-3">
            {options.map((opt) => (
              <motion.button
                key={opt.value}
                whileTap={{ scale: 0.97 }}
                onClick={() => answer(opt.value)}
                className={`w-full py-3 px-4 rounded-2xl border text-sm font-dm font-medium text-left transition-all hover:shadow-sm ${
                  answers[q.id] === opt.value
                    ? opt.color + ' shadow-sm scale-[1.01]'
                    : 'bg-white/60 border-purple-100 text-purple-700 hover:bg-white/90'
                }`}
              >
                {opt.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrent(c => Math.max(0, c - 1))}
          disabled={current === 0}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl font-dm text-sm bg-white/70 text-purple-600 border border-purple-100 disabled:opacity-40 hover:bg-white/90 transition-all"
        >
          <ArrowLeft size={15} /> Previous
        </motion.button>
        {answers[q.id] !== undefined && current < questions.length - 1 && (
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrent(c => c + 1)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl font-nunito font-700 text-sm bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-md"
          >
            Next <ArrowRight size={15} />
          </motion.button>
        )}
        {answers[q.id] !== undefined && current === questions.length - 1 && (
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowResult(true)}
            className="flex-1 py-2.5 rounded-2xl font-nunito font-700 text-sm bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-md"
          >
            See Results ✨
          </motion.button>
        )}
      </div>
    </div>
  );
}