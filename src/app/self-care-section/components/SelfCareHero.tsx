'use client';

import { motion } from 'framer-motion';

export default function SelfCareHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-4xl p-6 bg-gradient-to-br from-purple-200 via-pink-100 to-blue-100 border border-white/60 shadow-md"
    >
      <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-purple-300/30 blur-2xl" />
      <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-pink-300/30 blur-2xl" />
      <div className="relative z-10 flex items-center gap-4">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="text-5xl"
        >
          🧘
        </motion.div>
        <div>
          <h1 className="font-nunito font-800 text-2xl text-purple-900">Self Care 🌿</h1>
          <p className="text-sm font-dm text-purple-600 mt-1 leading-relaxed">
            Nurture your mind, body, and soul with gentle practices designed for your wellbeing.
          </p>
        </div>
      </div>
      <div className="relative z-10 grid grid-cols-3 gap-3 mt-5">
        {[
          { label: 'Exercises', value: '12', emoji: '🏃' },
          { label: 'Completed', value: '8', emoji: '✅' },
          { label: 'Streak', value: '7d', emoji: '🔥' },
        ]?.map((stat) => (
          <div key={stat?.label} className="bg-white/50 rounded-2xl p-3 text-center border border-white/60">
            <p className="text-xl">{stat?.emoji}</p>
            <p className="font-nunito font-800 text-lg text-purple-800 text-tabular">{stat?.value}</p>
            <p className="text-[10px] font-dm text-purple-500">{stat?.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}