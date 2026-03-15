'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const moodData = [
  { value: 1, emoji: '😭', label: 'Very Sad', color: 'from-blue-300 to-blue-400' },
  { value: 2, emoji: '😢', label: 'Sad', color: 'from-blue-200 to-blue-300' },
  { value: 3, emoji: '😕', label: 'Down', color: 'from-indigo-200 to-purple-300' },
  { value: 4, emoji: '😐', label: 'Neutral', color: 'from-purple-200 to-purple-300' },
  { value: 5, emoji: '🙂', label: 'Okay', color: 'from-purple-200 to-pink-200' },
  { value: 6, emoji: '😊', label: 'Good', color: 'from-pink-200 to-rose-200' },
  { value: 7, emoji: '😄', label: 'Happy', color: 'from-peach to-pink-300' },
  { value: 8, emoji: '😁', label: 'Great', color: 'from-amber-200 to-orange-200' },
  { value: 9, emoji: '🤩', label: 'Amazing', color: 'from-yellow-200 to-amber-200' },
  { value: 10, emoji: '🥳', label: 'Ecstatic', color: 'from-green-200 to-emerald-200' },
];

export default function MoodInput() {
  const [mood, setMood] = useState(6);

  const current = moodData?.[mood - 1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/70 backdrop-blur-sm rounded-4xl p-5 border border-white/60 shadow-md"
    >
      <h2 className="font-nunito font-700 text-base text-purple-900 mb-4">How are you feeling? 🌈</h2>
      {/* Emoji display */}
      <div className="flex flex-col items-center mb-5">
        <motion.div
          key={mood}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className={`w-20 h-20 rounded-4xl bg-gradient-to-br ${current?.color} flex items-center justify-center text-5xl shadow-md mb-2 border border-white/60`}
        >
          {current?.emoji}
        </motion.div>
        <motion.p
          key={current?.label}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-nunito font-700 text-purple-800 text-lg"
        >
          {current?.label}
        </motion.p>
        <p className="font-dm text-purple-400 text-sm">{mood}/10</p>
      </div>
      {/* Slider */}
      <div className="mb-2">
        <div
          className="w-full h-2 rounded-full mb-2"
          style={{
            background: `linear-gradient(to right, #A2D2FF 0%, #CDB4DB 40%, #FFC8DD 70%, #b7ebd8 100%)`
          }}
        />
        <input
          type="range"
          min={1}
          max={10}
          value={mood}
          onChange={(e) => setMood(Number(e?.target?.value))}
          className="w-full cursor-pointer"
          style={{
            background: `linear-gradient(to right, #CDB4DB 0%, #CDB4DB ${(mood - 1) / 9 * 100}%, #e8d5f5 ${(mood - 1) / 9 * 100}%, #e8d5f5 100%)`
          }}
        />
        <div className="flex justify-between text-xs font-dm text-purple-300 mt-1">
          <span>😔 Low</span>
          <span>😊 High</span>
        </div>
      </div>
    </motion.div>
  );
}