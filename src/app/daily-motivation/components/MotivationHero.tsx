'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Heart, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

const quotes = [
  { text: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, or overwhelmed.", author: 'Lori Deschene', category: 'Acceptance', emoji: '🌧️', gradient: 'from-blue-100 via-purple-100 to-pink-100' },
  { text: "Self-care is not selfish. You cannot serve from an empty vessel. Fill yourself first.", author: 'Eleanor Brownn', category: 'Self-care', emoji: '🌸', gradient: 'from-pink-100 via-rose-100 to-purple-100' },
  { text: "Be gentle with yourself. You are a child of the universe, no less than the trees and the stars.", author: 'Max Ehrmann', category: 'Compassion', emoji: '🌿', gradient: 'from-green-100 via-teal-100 to-blue-100' },
  { text: "You are allowed to be both a masterpiece and a work in progress simultaneously.", author: 'Sophia Bush', category: 'Growth', emoji: '✨', gradient: 'from-amber-100 via-yellow-100 to-pink-100' },
  { text: "The present moment is the only moment available to us, and it is the door to all moments.", author: 'Thich Nhat Hanh', category: 'Mindfulness', emoji: '🧘', gradient: 'from-purple-100 via-indigo-100 to-blue-100' },
  { text: "Healing is not linear. Some days you\'ll take two steps forward and one step back — and that\'s still progress.", author: 'Unknown', category: 'Healing', emoji: '🌱', gradient: 'from-green-100 via-emerald-100 to-teal-100' },
  { text: "Your feelings are valid. Your struggles are real. And you are worthy of love and support exactly as you are.", author: 'MindBloom', category: 'Worthiness', emoji: '💜', gradient: 'from-purple-100 via-pink-100 to-rose-100' },
  { text: "You don't have to earn rest. You are allowed to simply be.", author: 'Unknown', category: 'Rest', emoji: '🌙', gradient: 'from-indigo-100 via-blue-100 to-purple-100' },
  { text: "The most important relationship in your life is the one you have with yourself.", author: 'Diane Von Furstenberg', category: 'Self-love', emoji: '💖', gradient: 'from-rose-100 via-pink-100 to-purple-100' },
  { text: "Breathe. You are exactly where you need to be.", author: 'Unknown', category: 'Mindfulness', emoji: '🍃', gradient: 'from-green-100 via-teal-100 to-cyan-100' },
  { text: "It\'s okay to not be okay. What matters is that you keep going.", author: 'Unknown', category: 'Resilience', emoji: '🌊', gradient: 'from-blue-100 via-cyan-100 to-teal-100' },
  { text: "Every day is a new beginning. Take a deep breath and start again.", author: 'Unknown', category: 'New Beginnings', emoji: '🌅', gradient: 'from-amber-100 via-orange-100 to-pink-100' },
  { text: "You have survived 100% of your worst days. That\'s a perfect record.", author: 'Unknown', category: 'Strength', emoji: '💪', gradient: 'from-purple-100 via-violet-100 to-indigo-100' },
  { text: "Small steps every day lead to big changes over time. Trust the process.", author: 'Unknown', category: 'Progress', emoji: '🐾', gradient: 'from-yellow-100 via-amber-100 to-orange-100' },
  { text: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.", author: 'Unknown', category: 'Self-care', emoji: '🌺', gradient: 'from-pink-100 via-rose-100 to-red-100' },
  { text: "Be the energy you want to attract. Radiate love, peace, and positivity.", author: 'Unknown', category: 'Energy', emoji: '☀️', gradient: 'from-yellow-100 via-amber-100 to-pink-100' },
  { text: "You are not your thoughts. You are the observer of your thoughts.", author: 'Eckhart Tolle', category: 'Mindfulness', emoji: '🔮', gradient: 'from-violet-100 via-purple-100 to-blue-100' },
  { text: "Vulnerability is not weakness. It takes real courage to show up and be seen.", author: 'Brené Brown', category: 'Courage', emoji: '🦋', gradient: 'from-blue-100 via-purple-100 to-pink-100' },
  { text: "You deserve the same compassion you give to others. Start with yourself.", author: 'Unknown', category: 'Compassion', emoji: '🤍', gradient: 'from-gray-100 via-blue-100 to-purple-100' },
  { text: "Rest is not a reward for finishing your work. It is a basic human need.", author: 'Unknown', category: 'Rest', emoji: '🛌', gradient: 'from-indigo-100 via-purple-100 to-pink-100' },
  { text: "You are enough. You have always been enough. You will always be enough.", author: 'Unknown', category: 'Worthiness', emoji: '⭐', gradient: 'from-yellow-100 via-amber-100 to-orange-100' },
  { text: "Growth is uncomfortable. That discomfort is proof you are expanding.", author: 'Unknown', category: 'Growth', emoji: '🌻', gradient: 'from-green-100 via-yellow-100 to-amber-100' },
  { text: "Your story isn\'t over yet. The best chapters may still be ahead.", author: 'Unknown', category: 'Hope', emoji: '📖', gradient: 'from-purple-100 via-pink-100 to-rose-100' },
  { text: "Comparison is the thief of joy. Run your own race at your own pace.", author: 'Theodore Roosevelt', category: 'Self-acceptance', emoji: '🏃', gradient: 'from-teal-100 via-green-100 to-emerald-100' },
  { text: "The way you speak to yourself matters. Choose words that heal, not harm.", author: 'Unknown', category: 'Self-talk', emoji: '💬', gradient: 'from-pink-100 via-purple-100 to-violet-100' },
  { text: "Not every day will be good, but there is something good in every day.", author: 'Alice Morse Earle', category: 'Gratitude', emoji: '🌈', gradient: 'from-red-100 via-yellow-100 to-blue-100' },
  { text: "You are braver than you believe, stronger than you seem, and smarter than you think.", author: 'A.A. Milne', category: 'Strength', emoji: '🦁', gradient: 'from-amber-100 via-yellow-100 to-green-100' },
  { text: "Peace begins with a pause. Breathe before you react.", author: 'Unknown', category: 'Peace', emoji: '🕊️', gradient: 'from-blue-100 via-sky-100 to-cyan-100' },
  { text: "You are worthy of a life filled with joy, love, and meaning. Don't settle for less.", author: 'Unknown', category: 'Worthiness', emoji: '🌟', gradient: 'from-yellow-100 via-pink-100 to-purple-100' },
  { text: "Asking for help is a sign of strength, not weakness. You don't have to do this alone.", author: 'Unknown', category: 'Connection', emoji: '🤝', gradient: 'from-green-100 via-teal-100 to-blue-100' },
  { text: "Your feelings are messengers, not enemies. Listen to what they're trying to tell you.", author: 'Unknown', category: 'Emotional Intelligence', emoji: '💌', gradient: 'from-rose-100 via-pink-100 to-purple-100' },
  { text: "Every moment of kindness you show yourself ripples outward to the world.", author: 'Unknown', category: 'Kindness', emoji: '🫶', gradient: 'from-pink-100 via-rose-100 to-red-100' },
  { text: "You are not behind. You are on your own timeline, and that is perfectly okay.", author: 'Unknown', category: 'Self-acceptance', emoji: '⏳', gradient: 'from-purple-100 via-indigo-100 to-blue-100' },
  { text: "Gratitude turns what we have into enough, and more.", author: 'Melody Beattie', category: 'Gratitude', emoji: '🙏', gradient: 'from-amber-100 via-yellow-100 to-green-100' },
  { text: "The bravest thing you can do is continue when everything feels hard.", author: 'Unknown', category: 'Resilience', emoji: '🔥', gradient: 'from-orange-100 via-red-100 to-pink-100' },
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

  const randomQuote = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      let next = Math.floor(Math.random() * quotes.length);
      while (next === idx) next = Math.floor(Math.random() * quotes.length);
      setIdx(next);
      setIsRefreshing(false);
    }, 400);
  };

  const toggleLike = () => {
    setLiked(prev => isLiked ? prev.filter(i => i !== idx) : [...prev, idx]);
    if (!isLiked) toast.success('Quote saved to your favourites 💜');
  };

  const saveToJournal = () => {
    toast.success("Quote added to today's diary entry 📖");
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
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/20 blur-2xl" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/20 blur-2xl" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <motion.span
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="text-2xl"
              >
                {q.emoji}
              </motion.span>
              <span className="text-xs font-dm px-2.5 py-1 rounded-full bg-white/50 text-purple-700 border border-white/60">
                {q.category}
              </span>
              <span className="text-[10px] font-dm text-purple-500">{idx + 1}/{quotes.length}</span>
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

          <blockquote className="font-nunito font-600 text-xl text-purple-900 leading-relaxed mb-4">
            &ldquo;{q.text}&rdquo;
          </blockquote>
          <p className="font-dm text-sm text-purple-600">— {q.author}</p>

          {/* Random quote button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={randomQuote}
            className="mt-4 w-full py-2.5 rounded-2xl bg-white/50 hover:bg-white/70 text-purple-700 font-nunito font-700 text-sm border border-white/60 transition-all"
          >
            ✨ Inspire Me (Random Quote)
          </motion.button>

          {/* Dots — show first 10 */}
          <div className="flex gap-1.5 mt-4 flex-wrap">
            {quotes.slice(0, 10).map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? 'bg-purple-500 w-6' : 'bg-purple-300/50 w-1.5'}`}
              />
            ))}
            {idx >= 10 && (
              <div className="h-1.5 w-6 rounded-full bg-pink-400" />
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}