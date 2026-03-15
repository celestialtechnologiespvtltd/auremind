'use client';

import { motion } from 'framer-motion';

const tips = [
  { emoji: '💧', tip: 'Drink 8 glasses of water today — hydration boosts mood by up to 30%', color: 'bg-blue-50 border-blue-100' },
  { emoji: '🚶', tip: 'A 10-minute walk outside can reduce anxiety as effectively as light exercise', color: 'bg-green-50 border-green-100' },
  { emoji: '😴', tip: 'Try the 4-7-8 breathing technique before sleep for deeper rest', color: 'bg-purple-50 border-purple-100' },
  { emoji: '📵', tip: 'Put your phone away 30 minutes before bed to improve sleep quality', color: 'bg-pink-50 border-pink-100' },
  { emoji: '🙏', tip: 'Writing 3 things you\'re grateful for each morning rewires your brain for positivity', color: 'bg-amber-50 border-amber-100' },
];

export default function WellnessTips() {
  return (
    <div>
      <h2 className="font-nunito font-700 text-lg text-purple-900 mb-3">Quick Tips 💡</h2>
      <div className="space-y-2.5">
        {tips?.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`flex items-start gap-3 p-3.5 rounded-2xl border ${t?.color} transition-all hover:shadow-sm`}
          >
            <span className="text-xl flex-shrink-0">{t?.emoji}</span>
            <p className="text-sm font-dm text-purple-800 leading-relaxed">{t?.tip}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}