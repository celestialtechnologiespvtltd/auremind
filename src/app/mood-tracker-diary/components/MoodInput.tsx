'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenLine } from 'lucide-react';
import DiaryEditor from './DiaryEditor';

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
  const [showEditor, setShowEditor] = useState(false);
  const [pendingMood, setPendingMood] = useState<number | null>(null);

  const current = moodData?.[mood - 1];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMood(Number(e.target.value));
  };

  const handleSliderRelease = useCallback(() => {
    // Save mood to localStorage
    try {
      const entries = JSON.parse(localStorage.getItem('mindbloom_mood_entries') || '[]');
      const today = new Date().toISOString().split('T')[0];
      const existing = entries.findIndex((e: { date: string }) => e.date === today);
      const entry = { date: today, mood, label: moodData[mood - 1].label, emoji: moodData[mood - 1].emoji, timestamp: new Date().toISOString() };
      if (existing >= 0) entries[existing] = entry;
      else entries.unshift(entry);
      localStorage.setItem('mindbloom_mood_entries', JSON.stringify(entries.slice(0, 90)));
    } catch {}
    // Open note editor with current mood pre-filled
    setPendingMood(mood);
    setShowEditor(true);
  }, [mood]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 backdrop-blur-sm rounded-4xl p-5 border border-white/60 shadow-md"
      >
        <h2 className="font-nunito font-700 text-base text-purple-900 mb-4">How are you feeling?</h2>
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

        {/* Mood slider — release opens note editor */}
        <div className="mb-4">
          <input
            type="range"
            min={1}
            max={10}
            value={mood}
            onChange={handleSliderChange}
            onMouseUp={handleSliderRelease}
            onTouchEnd={handleSliderRelease}
            className="w-full cursor-pointer"
            style={{
              background: `linear-gradient(to right, #CDB4DB 0%, #CDB4DB ${(mood - 1) / 9 * 100}%, #e8d5f5 ${(mood - 1) / 9 * 100}%, #e8d5f5 100%)`
            }}
          />
          <div className="flex justify-between text-xs font-dm text-purple-300 mt-1">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>

        {/* Create Note button inside the mood section */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.01 }}
          onClick={() => { setPendingMood(mood); setShowEditor(true); }}
          className="w-full flex items-center justify-center gap-2.5 py-3 rounded-3xl bg-gradient-to-r from-purple-400 to-pink-400 text-white font-nunito font-700 text-sm shadow-md hover:shadow-lg transition-shadow min-h-[44px]"
        >
          <PenLine size={17} strokeWidth={2} />
          Create a Note
        </motion.button>
        <p className="text-center text-xs font-dm text-purple-400 mt-2">Slide to set mood, then note opens automatically</p>
      </motion.div>

      {/* Diary editor modal */}
      <AnimatePresence>
        {showEditor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
            onClick={(e) => { if (e?.target === e?.currentTarget) setShowEditor(false); }}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full max-w-lg"
            >
              <DiaryEditor
                onClose={() => setShowEditor(false)}
                initialMood={pendingMood ?? mood}
                moodLabel={moodData[(pendingMood ?? mood) - 1]?.label}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}