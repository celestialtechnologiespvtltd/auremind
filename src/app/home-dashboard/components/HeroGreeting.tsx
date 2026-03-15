'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const moodEmojis = ['😔', '😕', '😐', '🙂', '😊', '😄'];

export default function HeroGreeting() {
  const router = useRouter();
  const hour = new Date()?.getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
  const timeEmoji = hour < 12 ? '🌅' : hour < 17 ? '☀️' : '🌙';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-4xl p-6 bg-gradient-to-br from-purple-200 via-pink-100 to-blue-100 shadow-lg border border-white/60"
    >
      {/* Background blobs */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-300/30 blur-2xl" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-pink-300/30 blur-2xl" />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-dm text-purple-500 mb-0.5">
              {timeEmoji} {new Date()?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
            <h1 className="font-nunito text-2xl font-800 text-purple-900 leading-tight">
              {greeting}, Aria! 🌸
            </h1>
            <p className="text-purple-600 text-sm mt-1 font-dm">
              How are you feeling today?
            </p>
          </div>
          <div className="w-16 h-16 rounded-3xl gradient-lavender flex items-center justify-center text-3xl shadow-md border border-white/60 float-doodle">
            🧠
          </div>
        </div>

        {/* Quick mood check */}
        <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-4 border border-white/60">
          <p className="text-xs font-nunito font-600 text-purple-700 mb-3 uppercase tracking-wide">Quick Mood Check</p>
          <div className="flex items-center justify-between">
            {moodEmojis?.map((emoji, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.2 }}
                onClick={() => router?.push('/mood-tracker-diary')}
                className="w-10 h-10 rounded-2xl bg-white/60 flex items-center justify-center text-xl hover:bg-white/90 transition-all shadow-sm border border-white/40"
              >
                {emoji}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-3 mt-4">
          <div className="flex items-center gap-1.5 bg-orange-100/80 rounded-2xl px-3 py-1.5 border border-orange-200/50">
            <span className="text-base">🔥</span>
            <span className="text-xs font-nunito font-700 text-orange-700">7 day streak</span>
          </div>
          <div className="flex items-center gap-1.5 bg-green-100/80 rounded-2xl px-3 py-1.5 border border-green-200/50">
            <span className="text-base">🌱</span>
            <span className="text-xs font-nunito font-700 text-green-700">Growing steadily</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}