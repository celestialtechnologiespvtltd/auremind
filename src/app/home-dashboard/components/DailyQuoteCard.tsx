'use client';

import { motion } from 'framer-motion';

const quotes = [
  { text: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, or overwhelmed.", author: 'Lori Deschene', emoji: '🌧️' },
  { text: "Self-care is not selfish. You cannot serve from an empty vessel. Fill yourself first.", author: 'Eleanor Brownn', emoji: '🌸' },
  { text: "Be gentle with yourself. You are a child of the universe, no less than the trees and the stars.", author: 'Max Ehrmann', emoji: '🌿' },
  { text: "You are allowed to be both a masterpiece and a work in progress simultaneously.", author: 'Sophia Bush', emoji: '✨' },
  { text: "The present moment is the only moment available to us, and it is the door to all moments.", author: 'Thich Nhat Hanh', emoji: '🧘' },
  { text: "Healing is not linear. Some days you will take two steps forward and one step back — and that is still progress.", author: 'Unknown', emoji: '🌱' },
  { text: "Your feelings are valid. Your struggles are real. And you are worthy of love and support exactly as you are.", author: 'AureMind', emoji: '💜' },
  { text: "You don't have to earn rest. You are allowed to simply be.", author: 'Unknown', emoji: '🌙' },
  { text: "The most important relationship in your life is the one you have with yourself.", author: 'Diane Von Furstenberg', emoji: '💖' },
  { text: "Breathe. You are exactly where you need to be.", author: 'Unknown', emoji: '🍃' },
  { text: "It is okay to not be okay. What matters is that you keep going.", author: 'Unknown', emoji: '🌊' },
  { text: "Every day is a new beginning. Take a deep breath and start again.", author: 'Unknown', emoji: '🌅' },
  { text: "You have survived 100% of your worst days. That is a perfect record.", author: 'Unknown', emoji: '💪' },
  { text: "Small steps every day lead to big changes over time. Trust the process.", author: 'Unknown', emoji: '🐾' },
  { text: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.", author: 'Unknown', emoji: '🌺' },
  { text: "Be the energy you want to attract. Radiate love, peace, and positivity.", author: 'Unknown', emoji: '☀️' },
  { text: "You are not your thoughts. You are the observer of your thoughts.", author: 'Eckhart Tolle', emoji: '🔮' },
  { text: "Vulnerability is not weakness. It takes real courage to show up and be seen.", author: 'Brene Brown', emoji: '🦋' },
  { text: "You deserve the same compassion you give to others. Start with yourself.", author: 'Unknown', emoji: '🤍' },
  { text: "Rest is not a reward for finishing your work. It is a basic human need.", author: 'Unknown', emoji: '🛌' },
  { text: "You are enough. You have always been enough. You will always be enough.", author: 'Unknown', emoji: '⭐' },
  { text: "Growth is uncomfortable. That discomfort is proof you are expanding.", author: 'Unknown', emoji: '🌻' },
  { text: "Your story is not over yet. The best chapters may still be ahead.", author: 'Unknown', emoji: '📖' },
  { text: "Comparison is the thief of joy. Run your own race at your own pace.", author: 'Theodore Roosevelt', emoji: '🏃' },
  { text: "The way you speak to yourself matters. Choose words that heal, not harm.", author: 'Unknown', emoji: '💬' },
  { text: "Not every day will be good, but there is something good in every day.", author: 'Alice Morse Earle', emoji: '🌈' },
  { text: "You are braver than you believe, stronger than you seem, and smarter than you think.", author: 'A.A. Milne', emoji: '🦁' },
  { text: "Peace begins with a pause. Breathe before you react.", author: 'Unknown', emoji: '🕊️' },
  { text: "You are worthy of a life filled with joy, love, and meaning. Do not settle for less.", author: 'Unknown', emoji: '🌟' },
  { text: "Asking for help is a sign of strength, not weakness. You do not have to do this alone.", author: 'Unknown', emoji: '🤝' },
  { text: "Your feelings are messengers, not enemies. Listen to what they are trying to tell you.", author: 'Unknown', emoji: '💌' },
  { text: "Every moment of kindness you show yourself ripples outward to the world.", author: 'Unknown', emoji: '🫶' },
  { text: "You are not behind. You are on your own timeline, and that is perfectly okay.", author: 'Unknown', emoji: '⏳' },
  { text: "Gratitude turns what we have into enough, and more.", author: 'Melody Beattie', emoji: '🙏' },
  { text: "The bravest thing you can do is continue when everything feels hard.", author: 'Unknown', emoji: '🔥' },
];

function getDailyQuote() {
  const today = new Date();
  const dayIndex = Math.floor(today?.getTime() / (1000 * 60 * 60 * 24));
  return quotes?.[dayIndex % quotes?.length];
}

export default function DailyQuoteCard() {
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
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center gap-2">
            <motion.span
              className="text-2xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              {quote?.emoji}
            </motion.span>
            <p className="font-nunito font-700 text-sm text-purple-800 uppercase tracking-wide">Daily Motivation</p>
          </div>
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