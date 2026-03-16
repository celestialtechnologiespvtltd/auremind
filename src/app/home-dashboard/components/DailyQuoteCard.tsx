'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Heart } from 'lucide-react';

const quotes = [
  { text: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, or overwhelmed.", author: 'Lori Deschene' },
  { text: 'Self-care is not selfish. You cannot serve from an empty vessel.', author: 'Eleanor Brownn' },
  { text: "Mental health is not a destination, but a process. It's about how you drive, not where you're going.", author: 'Noam Shpancer' },
  { text: 'Be gentle with yourself. You are a child of the universe, no less than the trees and the stars.', author: 'Max Ehrmann' },
  { text: 'You are allowed to be both a masterpiece and a work in progress simultaneously.', author: 'Sophia Bush' },
];

function getDailyQuote() {
  const today = new Date();
  const dayIndex = Math.floor(today?.getTime() / (1000 * 60 * 60 * 24));
  return quotes?.[dayIndex % quotes?.length];
}

export default function DailyQuoteCard() {
  const [liked, setLiked] = useState(false);
  const quote = getDailyQuote();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="relative overflow-hidden rounded-4xl p-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 border border-white/60 shadow-md"
    >
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-purple-200/40 blur-2xl -translate-y-8 translate-x-8" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💫</span>
            <p className="font-nunito font-700 text-sm text-purple-800 uppercase tracking-wide">Daily Motivation</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setLiked(!liked)}
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${liked ? 'bg-pink-200 text-pink-600' : 'bg-white/60 text-purple-400'}`}
          >
            <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
          </motion.button>
        </div>

        <div className="text-center">
          <p className="font-nunito font-600 text-purple-900 text-lg leading-relaxed mb-3">
            &ldquo;{quote?.text}&rdquo;
          </p>
          <p className="text-sm font-dm text-purple-500">— {quote?.author}</p>
        </div>
      </div>
    </motion.div>
  );
}