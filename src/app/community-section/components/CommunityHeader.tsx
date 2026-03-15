'use client';

import { motion } from 'framer-motion';

const categories = ['All', 'Sharing', 'Advice', 'Gratitude', 'Milestones'];

export default function CommunityHeader() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-4xl p-6 bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 border border-white/60 shadow-md"
      >
        <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-blue-200/30 blur-2xl" />
        <div className="relative z-10 flex items-center gap-4">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-5xl"
          >
            🤝
          </motion.div>
          <div>
            <h1 className="font-nunito font-800 text-2xl text-purple-900">Community 💚</h1>
            <p className="text-sm font-dm text-purple-600 mt-1">A safe space to share, support, and grow together</p>
          </div>
        </div>
        <div className="relative z-10 grid grid-cols-3 gap-3 mt-4">
          {[
            { label: 'Members', value: '2.4k', emoji: '👥' },
            { label: 'Posts Today', value: '38', emoji: '✍️' },
            { label: 'Supportive', value: '99%', emoji: '💜' },
          ]?.map((stat) => (
            <div key={stat?.label} className="bg-white/50 rounded-2xl p-3 text-center border border-white/60">
              <p className="text-xl">{stat?.emoji}</p>
              <p className="font-nunito font-800 text-lg text-purple-800 text-tabular">{stat?.value}</p>
              <p className="text-[10px] font-dm text-purple-500">{stat?.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pt-4 pb-1">
        {categories?.map((cat, i) => (
          <motion.button
            key={cat}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            whileTap={{ scale: 0.9 }}
            className={`flex-shrink-0 px-4 py-2 rounded-2xl text-sm font-nunito font-600 transition-all ${
              cat === 'All' ?'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-md' :'bg-white/60 text-purple-600 border border-purple-100 hover:bg-white/90'
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>
    </div>
  );
}