'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Clock, Star } from 'lucide-react';

const categories = ['All', 'Breathing', 'Mindfulness', 'Sleep', 'Stress Relief'];

const cards = [
  {
    id: 1, category: 'Breathing', title: 'Box Breathing', emoji: '📦',
    gradient: 'gradient-blue', textColor: 'text-blue-800',
    duration: '5 min', difficulty: 'Beginner', rating: 4.9,
    desc: 'Inhale 4s, hold 4s, exhale 4s, hold 4s. Perfect for stress reduction.',
    steps: ['Sit upright in a comfortable position', 'Inhale slowly for 4 counts', 'Hold your breath for 4 counts', 'Exhale slowly for 4 counts', 'Hold empty for 4 counts', 'Repeat 4–6 times'],
  },
  {
    id: 2, category: 'Mindfulness', title: 'Body Scan', emoji: '🌊',
    gradient: 'gradient-lavender', textColor: 'text-purple-800',
    duration: '10 min', difficulty: 'Beginner', rating: 4.7,
    desc: 'Slowly bring awareness to each part of your body from toes to crown.',
    steps: ['Lie down comfortably', 'Close your eyes and breathe naturally', 'Focus attention on your feet', 'Slowly move attention upward', 'Notice sensations without judgment', 'End with full-body awareness'],
  },
  {
    id: 3, category: 'Sleep', title: 'Progressive Relaxation', emoji: '🌙',
    gradient: 'gradient-peach', textColor: 'text-pink-800',
    duration: '15 min', difficulty: 'Beginner', rating: 4.8,
    desc: 'Tense and release each muscle group to prepare your body for deep sleep.',
    steps: ['Lie in bed in a comfortable position', 'Tense your feet for 5 seconds', 'Release and feel the relaxation', 'Move up to calves, thighs, abdomen', 'Continue to arms, shoulders, face', 'Feel your whole body melt into the bed'],
  },
  {
    id: 4, category: 'Stress Relief', title: '5-4-3-2-1 Grounding', emoji: '🌿',
    gradient: 'gradient-green', textColor: 'text-green-800',
    duration: '3 min', difficulty: 'Beginner', rating: 4.6,
    desc: 'Use your senses to anchor yourself in the present moment.',
    steps: ['Name 5 things you can see', 'Name 4 things you can touch', 'Name 3 things you can hear', 'Name 2 things you can smell', 'Name 1 thing you can taste', 'Take a deep breath and notice how you feel'],
  },
  {
    id: 5, category: 'Mindfulness', title: 'Loving Kindness', emoji: '💗',
    gradient: 'gradient-pink', textColor: 'text-rose-800',
    duration: '8 min', difficulty: 'Intermediate', rating: 4.5,
    desc: 'Cultivate compassion for yourself and others through guided meditation.',
    steps: ['Sit comfortably and close eyes', 'Bring yourself to mind', 'Repeat: "May I be happy, healthy, safe"', 'Extend to a loved one', 'Extend to a neutral person', 'Finally extend to all beings'],
  },
  {
    id: 6, category: 'Sleep', title: 'Sleep Hygiene Reset', emoji: '😴',
    gradient: 'gradient-cream', textColor: 'text-amber-800',
    duration: '30 min', difficulty: 'Lifestyle', rating: 4.4,
    desc: 'A bedtime routine to signal your brain that it\'s time to wind down.',
    steps: ['Dim lights 1 hour before bed', 'Put away all screens', 'Make a warm herbal tea', 'Do light stretching or reading', 'Write 3 gratitudes in your diary', 'Practice 4-7-8 breathing as you drift off'],
  },
  {
    id: 7, category: 'Stress Relief', title: 'Cold Water Therapy', emoji: '💧',
    gradient: 'gradient-blue', textColor: 'text-blue-800',
    duration: '2 min', difficulty: 'Intermediate', rating: 4.3,
    desc: 'Splashing cold water on your face activates the dive reflex to slow heart rate.',
    steps: ['Fill a bowl with cold water', 'Take a deep breath', 'Submerge your face for 30 seconds', 'Repeat 3 times', 'Pat dry and breathe normally', 'Notice the calm that follows'],
  },
  {
    id: 8, category: 'Breathing', title: 'Alternate Nostril', emoji: '🌬️',
    gradient: 'gradient-lavender', textColor: 'text-purple-800',
    duration: '6 min', difficulty: 'Intermediate', rating: 4.7,
    desc: 'Balance the nervous system with this ancient pranayama technique.',
    steps: ['Sit with spine tall', 'Close right nostril with thumb, inhale left', 'Close both nostrils, hold briefly', 'Release right nostril, exhale right', 'Inhale right nostril', 'Close both, release left, exhale left'],
  },
];

export default function SelfCareGrid() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = activeCategory === 'All' ? cards : cards?.filter(c => c?.category === activeCategory);

  return (
    <div>
      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-4">
        {categories?.map(cat => (
          <motion.button
            key={cat}
            whileTap={{ scale: 0.9 }}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-2xl text-sm font-nunito font-600 transition-all ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-md'
                : 'bg-white/60 text-purple-600 border border-purple-100 hover:bg-white/90'
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered?.map((card, i) => (
            <motion.div
              key={card?.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
              className={`${card?.gradient} rounded-3xl border border-white/60 shadow-sm overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
              onClick={() => setExpanded(expanded === card?.id ? null : card?.id)}
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <motion.span
                    className="text-4xl"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  >
                    {card?.emoji}
                  </motion.span>
                  <div className="flex items-center gap-1 bg-white/50 rounded-xl px-2 py-1">
                    <Star size={11} className={`${card?.textColor} fill-current`} />
                    <span className={`text-xs font-dm ${card?.textColor} font-medium`}>{card?.rating}</span>
                  </div>
                </div>

                <h3 className={`font-nunito font-700 text-base ${card?.textColor} mb-1`}>{card?.title}</h3>
                <p className={`text-xs font-dm ${card?.textColor} opacity-70 leading-relaxed mb-3`}>{card?.desc}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-1 ${card?.textColor} opacity-70`}>
                      <Clock size={12} />
                      <span className="text-xs font-dm">{card?.duration}</span>
                    </div>
                    <span className={`text-xs font-dm px-2 py-0.5 rounded-full bg-white/40 ${card?.textColor}`}>
                      {card?.difficulty}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: expanded === card?.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={16} className={`${card?.textColor} opacity-60`} />
                  </motion.div>
                </div>
              </div>

              <AnimatePresence>
                {expanded === card?.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5">
                      <div className="bg-white/40 rounded-2xl p-3 border border-white/60">
                        <p className={`text-xs font-nunito font-700 ${card?.textColor} mb-2 uppercase tracking-wide`}>Steps</p>
                        <ol className="space-y-1.5">
                          {card?.steps?.map((step, si) => (
                            <li key={si} className={`flex items-start gap-2 text-xs font-dm ${card?.textColor} opacity-80`}>
                              <span className="w-4 h-4 rounded-full bg-white/60 flex items-center justify-center text-[10px] font-nunito font-700 flex-shrink-0 mt-0.5">{si + 1}</span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}