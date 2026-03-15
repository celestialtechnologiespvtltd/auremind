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

const feelingTags = [
  { label: 'Anxious', emoji: '😰', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { label: 'Calm', emoji: '😌', color: 'bg-green-100 text-green-700 border-green-200' },
  { label: 'Stressed', emoji: '😤', color: 'bg-red-100 text-red-700 border-red-200' },
  { label: 'Hopeful', emoji: '🌟', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { label: 'Tired', emoji: '😴', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  { label: 'Grateful', emoji: '🙏', color: 'bg-pink-100 text-pink-700 border-pink-200' },
  { label: 'Lonely', emoji: '🫂', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { label: 'Excited', emoji: '⚡', color: 'bg-orange-100 text-orange-700 border-orange-200' },
];

export default function MoodInput() {
  const [mood, setMood] = useState(6);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Calm']);

  const current = moodData[mood - 1];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

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
          className={`w-20 h-20 rounded-4xl bg-gradient-to-br ${current.color} flex items-center justify-center text-5xl shadow-md mb-2 border border-white/60`}
        >
          {current.emoji}
        </motion.div>
        <motion.p
          key={current.label}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-nunito font-700 text-purple-800 text-lg"
        >
          {current.label}
        </motion.p>
        <p className="font-dm text-purple-400 text-sm">{mood}/10</p>
      </div>

      {/* Slider */}
      <div className="mb-5">
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
          onChange={(e) => setMood(Number(e.target.value))}
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

      {/* Feeling tags */}
      <div>
        <p className="font-nunito font-600 text-xs text-purple-600 uppercase tracking-wide mb-2">How you feel right now</p>
        <div className="flex flex-wrap gap-2">
          {feelingTags.map((tag) => (
            <motion.button
              key={tag.label}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleTag(tag.label)}
              className={`tag-pill border text-xs flex items-center gap-1 ${
                selectedTags.includes(tag.label)
                  ? `${tag.color} shadow-sm scale-105`
                  : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <span>{tag.emoji}</span>
              {tag.label}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}