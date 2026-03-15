'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// ---- ANXIETY TEST ----
const anxietyQuestions = [
  { id: 1, text: 'How often have you felt nervous, anxious, or on edge over the past two weeks?', emoji: '😰' },
  { id: 2, text: 'How often have you been unable to stop or control worrying?', emoji: '🌀' },
  { id: 3, text: 'How often have you worried too much about different things?', emoji: '💭' },
  { id: 4, text: 'How often have you had trouble relaxing?', emoji: '😤' },
  { id: 5, text: 'How often have you been so restless that it\'s hard to sit still?', emoji: '⚡' },
  { id: 6, text: 'How often have you become easily annoyed or irritable?', emoji: '😠' },
  { id: 7, text: 'How often have you felt afraid, as if something awful might happen?', emoji: '😨' },
];

const getAnxietyResult = (score: number) => {
  if (score <= 4) return { level: 'Minimal Anxiety', emoji: '😌', color: 'gradient-green', desc: 'Your anxiety levels appear minimal. Keep nurturing your calm with daily mindfulness.', suggestions: ['Continue your breathing exercises', 'Maintain your sleep routine', 'Stay connected with loved ones', 'Celebrate your emotional balance'] };
  if (score <= 9) return { level: 'Mild Anxiety', emoji: '🌤️', color: 'gradient-lavender', desc: 'You\'re experiencing mild anxiety. This is common and manageable with gentle techniques.', suggestions: ['Try box breathing when anxious', 'Limit caffeine and news intake', 'Practice the 5-4-3-2-1 grounding technique', 'Journal your worries to release them'] };
  if (score <= 14) return { level: 'Moderate Anxiety', emoji: '⛅', color: 'gradient-peach', desc: 'Moderate anxiety is affecting your daily life. You deserve support and care.', suggestions: ['Consider speaking with a therapist', 'Practice daily mindfulness meditation', 'Try progressive muscle relaxation', 'Reach out to someone you trust'] };
  return { level: 'High Anxiety', emoji: '🌧️', color: 'gradient-blue', desc: 'You\'re carrying significant anxiety. Please know you\'re not alone — help is available.', suggestions: ['Please speak with a mental health professional', 'Try the Consult section to reach an expert', 'Practice breathing exercises daily', 'Be very gentle and patient with yourself'] };
};

// ---- STRESS TEST ----
const stressQuestions = [
  { id: 1, text: 'How often have you felt overwhelmed by the amount of things you need to do?', emoji: '😵' },
  { id: 2, text: 'How often have you felt unable to control important things in your life?', emoji: '🎭' },
  { id: 3, text: 'How often have you felt stressed or under pressure?', emoji: '💢' },
  { id: 4, text: 'How often have you felt difficulties were piling up so high you couldn\'t overcome them?', emoji: '🏔️' },
  { id: 5, text: 'How often have you had physical symptoms of stress (headache, tension, fatigue)?', emoji: '🤕' },
  { id: 6, text: 'How often have you felt irritable or short-tempered due to stress?', emoji: '😤' },
  { id: 7, text: 'How often has stress affected your sleep quality?', emoji: '😴' },
  { id: 8, text: 'How often have you felt unable to cope with your responsibilities?', emoji: '📋' },
];

const getStressResult = (score: number) => {
  if (score <= 6) return { level: 'Low Stress', emoji: '🌿', color: 'gradient-green', desc: 'Your stress levels are well-managed. You\'re handling life\'s demands with resilience.', suggestions: ['Keep your current self-care routine', 'Share your coping strategies with others', 'Celebrate your emotional strength', 'Continue regular exercise and sleep habits'] };
  if (score <= 12) return { level: 'Moderate Stress', emoji: '🌤️', color: 'gradient-lavender', desc: 'You\'re experiencing moderate stress. Small daily habits can make a big difference.', suggestions: ['Take 5-minute breaks every hour', 'Try the body scan meditation', 'Prioritize your top 3 tasks each day', 'Spend time in nature when possible'] };
  if (score <= 18) return { level: 'High Stress', emoji: '⛅', color: 'gradient-peach', desc: 'Your stress levels are high. It\'s important to address this before it affects your health.', suggestions: ['Consider speaking with a counselor', 'Delegate tasks where possible', 'Practice daily relaxation techniques', 'Review and reduce commitments'] };
  return { level: 'Very High Stress', emoji: '🌧️', color: 'gradient-blue', desc: 'You\'re under significant stress. Please prioritize your wellbeing — you matter.', suggestions: ['Speak with a mental health professional', 'Take a break from non-essential tasks', 'Use the Consult section to reach an expert', 'Practice self-compassion daily'] };
};

// ---- SLEEP TEST ----
const sleepQuestions = [
  { id: 1, text: 'How often do you have trouble falling asleep within 30 minutes?', emoji: '🛏️' },
  { id: 2, text: 'How often do you wake up in the middle of the night and struggle to go back to sleep?', emoji: '🌙' },
  { id: 3, text: 'How often do you wake up earlier than desired and can\'t fall back asleep?', emoji: '⏰' },
  { id: 4, text: 'How often do you feel unrefreshed or tired after a night\'s sleep?', emoji: '😪' },
  { id: 5, text: 'How often does poor sleep affect your mood or daily functioning?', emoji: '😔' },
  { id: 6, text: 'How often do you use screens (phone/TV) within an hour of bedtime?', emoji: '📱' },
  { id: 7, text: 'How often do you feel anxious or have racing thoughts at bedtime?', emoji: '🌀' },
];

const getSleepResult = (score: number) => {
  if (score <= 4) return { level: 'Good Sleep Quality', emoji: '😴', color: 'gradient-green', desc: 'Your sleep quality appears healthy! Keep maintaining your good sleep habits.', suggestions: ['Keep a consistent sleep schedule', 'Continue your wind-down routine', 'Your sleep hygiene is working well', 'Share your sleep tips with others'] };
  if (score <= 9) return { level: 'Mild Sleep Issues', emoji: '🌤️', color: 'gradient-lavender', desc: 'You have some sleep challenges. Small adjustments can significantly improve your rest.', suggestions: ['Try the Evening Wind-Down Routine in Self Care', 'Avoid screens 30 min before bed', 'Keep your bedroom cool and dark', 'Try the 4-7-8 breathing technique at bedtime'] };
  if (score <= 14) return { level: 'Moderate Sleep Problems', emoji: '⛅', color: 'gradient-peach', desc: 'Sleep problems are affecting your wellbeing. It\'s worth addressing these patterns.', suggestions: ['Consider a consistent sleep/wake schedule', 'Try progressive muscle relaxation at night', 'Limit caffeine after 2pm', 'Consider speaking with a sleep specialist'] };
  return { level: 'Significant Sleep Disruption', emoji: '🌧️', color: 'gradient-blue', desc: 'Your sleep is significantly disrupted. Please consider seeking professional guidance.', suggestions: ['Speak with a healthcare professional', 'Keep a sleep diary for 1 week', 'Evaluate your sleep environment', 'Use the Consult section to reach an expert'] };
};

const options = [
  { value: 0, label: 'Not at all', color: 'bg-green-100 border-green-200 text-green-800' },
  { value: 1, label: 'Several days', color: 'bg-blue-100 border-blue-200 text-blue-800' },
  { value: 2, label: 'More than half the days', color: 'bg-amber-100 border-amber-200 text-amber-800' },
  { value: 3, label: 'Nearly every day', color: 'bg-red-100 border-red-200 text-red-800' },
];

type TestType = 'anxiety' | 'stress' | 'sleep';

interface Props {
  testType: TestType;
  onBack: () => void;
}

export default function ExtraTest({ testType, onBack }: Props) {
  const questions = testType === 'anxiety' ? anxietyQuestions : testType === 'stress' ? stressQuestions : sleepQuestions;
  const getResult = testType === 'anxiety' ? getAnxietyResult : testType === 'stress' ? getStressResult : getSleepResult;
  const testTitle = testType === 'anxiety' ? 'Anxiety Self-Check 😰' : testType === 'stress' ? 'Stress Level Assessment 💢' : 'Sleep Quality Check 😴';

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const progress = (current / questions.length) * 100;
  const q = questions[current];

  const answer = (value: number) => {
    const newAnswers = { ...answers, [q.id]: value };
    setAnswers(newAnswers);
    if (current < questions.length - 1) {
      setTimeout(() => setCurrent(c => c + 1), 300);
    } else {
      setTimeout(() => {
        setShowResult(true);
        // Save result to localStorage
        const score = Object.values(newAnswers).reduce((a, b) => a + b, 0);
        const result = getResult(score);
        try {
          const saved = localStorage.getItem('mindbloom_test_results');
          const results = saved ? JSON.parse(saved) : [];
          results.unshift({ test: testTitle, date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), result: result.level, emoji: result.emoji });
          localStorage.setItem('mindbloom_test_results', JSON.stringify(results.slice(0, 20)));
        } catch {}
      }, 300);
    }
  };

  const score = Object.values(answers).reduce((a, b) => a + b, 0);
  const result = getResult(score);

  if (showResult) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
        <div className={`${result.color} rounded-4xl p-6 border border-white/60 shadow-md text-center`}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }} className="text-6xl mb-3">
            {result.emoji}
          </motion.div>
          <p className="text-xs font-dm text-purple-500 uppercase tracking-wide mb-1">Your result</p>
          <h2 className="font-nunito font-800 text-2xl text-purple-900 mb-2">{result.level}</h2>
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
        <div className="flex gap-3">
          <motion.button whileTap={{ scale: 0.95 }} onClick={onBack} className="flex-1 py-3 rounded-2xl font-nunito font-700 text-sm bg-white/70 text-purple-700 border border-purple-200 min-h-[44px]">
            ← Back to Tests
          </motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => { setAnswers({}); setCurrent(0); setShowResult(false); }} className="flex-1 py-3 rounded-2xl font-nunito font-700 text-sm bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-md min-h-[44px]">
            Retake ↺
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <motion.button whileTap={{ scale: 0.9 }} onClick={onBack} className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-2xl bg-white/70 border border-purple-100 flex items-center justify-center text-purple-600">
          <ArrowLeft size={16} />
        </motion.button>
        <div className="flex-1">
          <p className="font-nunito font-700 text-sm text-purple-900">{testTitle}</p>
          <p className="text-xs font-dm text-purple-400">{current + 1} of {questions.length}</p>
        </div>
      </div>
      <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden">
        <motion.div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="bg-white/70 backdrop-blur-sm rounded-4xl p-6 border border-white/60 shadow-md">
          <div className="text-4xl mb-4 text-center">{q.emoji}</div>
          <p className="font-nunito font-600 text-base text-purple-900 text-center leading-relaxed mb-6">{q.text}</p>
          <div className="space-y-3">
            {options.map((opt) => (
              <motion.button key={opt.value} whileTap={{ scale: 0.97 }} onClick={() => answer(opt.value)} className={`w-full py-3 px-4 rounded-2xl border text-sm font-dm font-medium text-left transition-all min-h-[44px] ${answers[q.id] === opt.value ? opt.color + ' shadow-sm' : 'bg-white/60 border-purple-100 text-purple-700 hover:bg-white/90'}`}>
                {opt.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex gap-3">
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0} className="flex items-center gap-2 px-4 py-2.5 rounded-2xl font-dm text-sm bg-white/70 text-purple-600 border border-purple-100 disabled:opacity-40 min-h-[44px]">
          <ArrowLeft size={15} /> Previous
        </motion.button>
        {answers[q.id] !== undefined && current < questions.length - 1 && (
          <motion.button initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} whileTap={{ scale: 0.95 }} onClick={() => setCurrent(c => c + 1)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl font-nunito font-700 text-sm bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-md min-h-[44px]">
            Next <ArrowRight size={15} />
          </motion.button>
        )}
        {answers[q.id] !== undefined && current === questions.length - 1 && (
          <motion.button initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} whileTap={{ scale: 0.95 }} onClick={() => setShowResult(true)} className="flex-1 py-2.5 rounded-2xl font-nunito font-700 text-sm bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-md min-h-[44px]">
            See Results ✨
          </motion.button>
        )}
      </div>
    </div>
  );
}
