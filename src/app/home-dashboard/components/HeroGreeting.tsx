'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const moodEmojis = [
  { emoji: '😢', label: 'Very Sad' },
  { emoji: '😔', label: 'Sad' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '🙂', label: 'Good' },
  { emoji: '😄', label: 'Happy' },
];

interface StreakInfo {
  count: number;
  tag: string;
  tagColor: string;
  tagBg: string;
  icon: string;
}

function getStreakInfo(count: number): StreakInfo {
  if (count === 0) return { count, tag: 'Just Getting Started', tagColor: 'text-blue-700', tagBg: 'bg-blue-100/80 border-blue-200/50', icon: '🌱' };
  if (count <= 2) return { count, tag: 'Keep it Up!', tagColor: 'text-purple-700', tagBg: 'bg-purple-100/80 border-purple-200/50', icon: '🪴' };
  if (count <= 4) return { count, tag: 'Growing Steadily', tagColor: 'text-green-700', tagBg: 'bg-green-100/80 border-green-200/50', icon: '🌿' };
  if (count <= 6) return { count, tag: 'On a Roll!', tagColor: 'text-orange-700', tagBg: 'bg-orange-100/80 border-orange-200/50', icon: '🔥' };
  return { count, tag: 'Consistency King', tagColor: 'text-yellow-700', tagBg: 'bg-yellow-100/80 border-yellow-200/50', icon: '✦' };
}

export default function HeroGreeting() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [streakDays, setStreakDays] = useState<boolean[]>([false, false, false, false, false, false, false]);
  const [greeting, setGreeting] = useState('Good Morning');
  const [timeEmoji, setTimeEmoji] = useState('🌅');
  const [dateString, setDateString] = useState('');

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    setGreeting(hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening');
    setTimeEmoji(hour < 12 ? '🌤' : hour < 17 ? '☀️' : '🌙');
    setDateString(now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }));

    const stored = localStorage.getItem('mindbloom_user');
    if (stored) {
      try { setUsername(JSON.parse(stored).username || ''); } catch {}
    }
    // Simulate past 7 days streak from localStorage
    const streakData = localStorage.getItem('mindbloom_streak');
    if (streakData) {
      try { setStreakDays(JSON.parse(streakData)); } catch {}
    } else {
      // Default demo: 5 days checked in
      const demo = [true, true, true, true, true, false, false];
      setStreakDays(demo);
      localStorage.setItem('mindbloom_streak', JSON.stringify(demo));
    }
  }, []);

  const checkedCount = streakDays.filter(Boolean).length;
  const streakInfo = getStreakInfo(checkedCount);
  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-4xl p-6 bg-gradient-to-br from-purple-200 via-pink-100 to-blue-100 shadow-lg border border-white/60"
    >
      {/* Background blobs */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-300/30 blur-2xl" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-pink-300/30 blur-2xl" />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-dm text-purple-500 mb-0.5">
              {timeEmoji} {dateString}
            </p>
            <h1 className="font-nunito text-2xl font-800 text-purple-900 leading-tight">
              {greeting}{username ? `, ${username}` : ''}! 🌸
            </h1>
            <p className="text-purple-600 text-sm mt-1 font-dm">
              How are you feeling today?
            </p>
          </div>
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-16 h-16 rounded-3xl gradient-lavender flex items-center justify-center text-3xl shadow-md border border-white/60"
          >
            🧠
          </motion.div>
        </div>

        {/* Quick mood check */}
        <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-4 border border-white/60">
          <p className="text-xs font-nunito font-600 text-purple-700 mb-3 uppercase tracking-wide">Quick Mood Check</p>
          <div className="flex items-center justify-around">
            {moodEmojis?.map((item, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.9 }}
                animate={selectedMood === i ? { scale: 1.2 } : { scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={() => {
                  setSelectedMood(i);
                  localStorage.setItem('mindbloom_quick_mood', JSON.stringify({ index: i, label: item.label, emoji: item.emoji }));
                }}
                className="flex flex-col items-center gap-1 bg-transparent border-0 outline-none cursor-pointer p-1"
                style={{
                  filter: selectedMood === i ? 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.6))' : 'none',
                }}
              >
                <span style={{ fontSize: '36px', lineHeight: 1 }}>{item.emoji}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* 7-day streak status */}
        <div className="mt-4 bg-white/40 backdrop-blur-sm rounded-3xl p-4 border border-white/60">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-nunito font-700 text-purple-700 uppercase tracking-wide">Past 7 Days</p>
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-2xl border text-xs font-nunito font-700 ${streakInfo.tagBg} ${streakInfo.tagColor}`}
            >
              <span>{streakInfo.icon}</span>
              <span>{streakInfo.tag}</span>
            </motion.div>
          </div>
          <div className="flex items-center justify-between gap-1">
            {streakDays.map((checked, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm transition-all ${
                  checked
                    ? 'bg-gradient-to-br from-purple-400 to-pink-400 text-white shadow-sm'
                    : 'bg-white/50 text-purple-200 border border-purple-100/40'
                }`}>
                  {checked ? '✓' : '·'}
                </div>
                <span className="text-[9px] font-dm text-purple-400">{dayLabels[i]}</span>
              </div>
            ))}
          </div>
          <p className="text-xs font-dm text-purple-500 mt-2 text-center">
            {checkedCount}/7 days checked in 🌟
          </p>
        </div>
      </div>
    </motion.div>
  );
}