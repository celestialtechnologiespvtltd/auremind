'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Heart, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

const quotes = [
  {
    text: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, or overwhelmed.",
    author: 'Lori Deschene',
    category: 'Acceptance',
    emoji: '🌧️',
    gradient: 'from-blue-100 via-purple-100 to-pink-100',
  },
  {
    text: "Self-care is not selfish. You cannot serve from an empty vessel. Fill yourself first.",
    author: 'Eleanor Brownn',
    category: 'Self-care',
    emoji: '🌸',
    gradient: 'from-pink-100 via-rose-100 to-purple-100',
  },
  {
    text: "Be gentle with yourself. You are a child of the universe, no less than the trees and the stars.",
    author: 'Max Ehrmann',
    category: 'Compassion',
    emoji: '🌿',
    gradient: 'from-green-100 via-teal-100 to-blue-100',
  },
  {
    text: "You are allowed to be both a masterpiece and a work in progress simultaneously.",
    author: 'Sophia Bush',
    category: 'Growth',
    emoji: '✨',
    gradient: 'from-amber-100 via-yellow-100 to-pink-100',
  },
  {
    text: "The present moment is the only moment available to us, and it is the door to all moments.",
    author: 'Thich Nhat Hanh',
    category: 'Mindfulness',
    emoji: '🧘',
    gradient: 'from-purple-100 via-indigo-100 to-blue-100',
  },
  {
    text: "Healing is not linear. Some days you\'ll take two steps forward and one step back — and that\'s still progress.",
    author: 'Unknown',
    category: 'Healing',
    emoji: '🌱',
    gradient: 'from-green-100 via-emerald-100 to-teal-100',
  },
  {
    text: "Your feelings are valid. Your struggles are real. And you are worthy of love and support exactly as you are.",
    author: 'MindBloom',
    category: 'Worthiness',
    emoji: '💜',
    gradient: 'from-purple-100 via-pink-100 to-rose-100',
  },
];

export default function MotivationHero() {
  const [idx, setIdx] = useState(0);
  const [liked, setLiked] = useState<number[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const q = quotes[idx];
  const isLiked = liked.includes(idx);

  const refresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIdx((prev) => (prev + 1) % quotes.length);
      setIsRefreshing(false);
    }, 400);
  };

  const toggleLike = () => {
    setLiked(prev => isLiked ? prev.filter(i => i !== idx) : [...prev, idx]);
    if (!isLiked) toast.success('Quote saved to your favourites 💜');
  };

  const saveToJournal = () => {
    toast.success('Quote added to today\'s diary entry 📖');
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.97 }}
        transition={{ duration: 0.4 }}
        className={`relative overflow-hidden rounded-4xl p-6 bg-gradient-to-br ${q.gradient} border border-white/60 shadow-lg`}
      >
        {/* Background decoration */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/20 blur-2xl" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/20 blur-2xl" />

        <div className="relative z-10">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{q.emoji}</span>
              <span className="text-xs font-dm px-2.5 py-1 rounded-full bg-white/50 text-purple-700 border border-white/60">
                {q.category}
              </span>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={saveToJournal}
                className="w-8 h-8 rounded-xl bg-white/50 hover:bg-white/80 flex items-center justify-center text-purple-600 transition-all"
              >
                <BookOpen size={15} />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={toggleLike}
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${isLiked ? 'bg-pink-200 text-pink-600' : 'bg-white/50 text-purple-400 hover:bg-white/80'}`}
              >
                <Heart size={15} fill={isLiked ? 'currentColor' : 'none'} />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={refresh}
                className="w-8 h-8 rounded-xl bg-white/50 hover:bg-white/80 flex items-center justify-center text-purple-500 transition-all"
              >
                <motion.div animate={{ rotate: isRefreshing ? 360 : 0 }} transition={{ duration: 0.4 }}>
                  <RefreshCw size={15} />
                </motion.div>
              </motion.button>
            </div>
          </div>

          {/* Quote */}
          <blockquote className="font-nunito font-600 text-xl text-purple-900 leading-relaxed mb-4">
            &ldquo;{q.text}&rdquo;
          </blockquote>
          <p className="font-dm text-sm text-purple-600">— {q.author}</p>

          {/* Dots */}
          <div className="flex gap-1.5 mt-5">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? 'bg-purple-500 w-6' : 'bg-purple-300/50 w-1.5'}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}