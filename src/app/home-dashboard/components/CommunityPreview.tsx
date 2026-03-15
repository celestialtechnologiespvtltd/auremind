'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Heart, MessageCircle, ArrowRight } from 'lucide-react';

const posts = [
  {
    avatar: '🦊',
    name: 'Mia K.',
    time: '2h ago',
    text: "Had a really tough week but I managed to do my breathing exercises every day. Small wins! 💪",
    likes: 24,
    comments: 8,
    gradient: 'gradient-peach',
  },
  {
    avatar: '🐻',
    name: 'James R.',
    time: '4h ago',
    text: "Does anyone else feel like mornings are the hardest? Any tips for starting the day with more energy?",
    likes: 18,
    comments: 15,
    gradient: 'gradient-blue',
  },
  {
    avatar: '🦋',
    name: 'Priya S.',
    time: '6h ago',
    text: "Gratitude journal update: found 3 beautiful things today — morning coffee, a kind stranger, and sunshine ☀️",
    likes: 41,
    comments: 12,
    gradient: 'gradient-lavender',
  },
];

export default function CommunityPreview() {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-nunito font-700 text-lg text-purple-900">Community 🤝</h2>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => router?.push('/community-section')}
          className="flex items-center gap-1 text-xs font-dm text-purple-500 hover:text-purple-700 transition-colors"
        >
          See all <ArrowRight size={14} />
        </motion.button>
      </div>
      <div className="space-y-3">
        {posts?.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -2 }}
            className="bg-white/70 backdrop-blur-sm rounded-3xl p-4 border border-white/60 shadow-sm cursor-pointer"
            onClick={() => router?.push('/community-section')}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-2xl ${p?.gradient} flex items-center justify-center text-xl flex-shrink-0 shadow-sm border border-white/60`}>
                {p?.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-nunito font-700 text-sm text-purple-900">{p?.name}</p>
                  <p className="text-[10px] font-dm text-purple-400">{p?.time}</p>
                </div>
                <p className="text-sm font-dm text-purple-700 leading-relaxed line-clamp-2">{p?.text}</p>
                <div className="flex items-center gap-4 mt-2">
                  <button className="flex items-center gap-1 text-pink-400 hover:text-pink-600 transition-colors">
                    <Heart size={13} />
                    <span className="text-xs font-dm">{p?.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-purple-400 hover:text-purple-600 transition-colors">
                    <MessageCircle size={13} />
                    <span className="text-xs font-dm">{p?.comments}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}