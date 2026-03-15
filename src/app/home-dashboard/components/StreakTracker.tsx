'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Trophy, Calendar } from 'lucide-react';

interface StreakData {
  currentStreak: number;
  bestStreak: number;
  lastCheckin: string;
  checkinDays: string[];
}

function getDateKey(date: Date): string {
  return date.toISOString().split('T')[0];
}

function getLast7Days(): string[] {
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(getDateKey(d));
  }
  return days;
}

function getDayLabel(dateKey: string): string {
  const d = new Date(dateKey + 'T12:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0);
}

export default function StreakTracker() {
  const [streak, setStreak] = useState<StreakData>({
    currentStreak: 0,
    bestStreak: 0,
    lastCheckin: '',
    checkinDays: [],
  });
  const [checkedIn, setCheckedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('mindbloom_streak');
      if (saved) {
        const data: StreakData = JSON.parse(saved);
        setStreak(data);
        const today = getDateKey(new Date());
        setCheckedIn(data.lastCheckin === today);
      }
    } catch {}
  }, []);

  const handleCheckin = () => {
    const today = getDateKey(new Date());
    if (streak.lastCheckin === today) return;

    const yesterday = getDateKey(new Date(Date.now() - 86400000));
    const newCurrentStreak = streak.lastCheckin === yesterday ? streak.currentStreak + 1 : 1;
    const newBestStreak = Math.max(newCurrentStreak, streak.bestStreak);
    const newCheckinDays = [...streak.checkinDays.filter(d => {
      const diff = (new Date(today).getTime() - new Date(d).getTime()) / 86400000;
      return diff <= 30;
    }), today];

    const newStreak: StreakData = {
      currentStreak: newCurrentStreak,
      bestStreak: newBestStreak,
      lastCheckin: today,
      checkinDays: newCheckinDays,
    };

    setStreak(newStreak);
    setCheckedIn(true);
    try {
      localStorage.setItem('mindbloom_streak', JSON.stringify(newStreak));
    } catch {}
  };

  const last7 = getLast7Days();

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/70 backdrop-blur-sm rounded-3xl border border-white/60 shadow-sm p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-nunito font-700 text-lg text-purple-900">Daily Streak 🔥</h2>
        {!checkedIn && (
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={handleCheckin}
            className="px-3 py-1.5 rounded-2xl text-xs font-nunito font-700 bg-gradient-to-r from-orange-400 to-pink-400 text-white shadow-sm"
          >
            Check In ✓
          </motion.button>
        )}
        {checkedIn && (
          <span className="px-3 py-1.5 rounded-2xl text-xs font-nunito font-700 bg-green-100 text-green-700 border border-green-200">
            ✓ Checked in today
          </span>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-3 border border-orange-100/60 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
            <Flame size={20} className="text-orange-500" />
          </div>
          <div>
            <p className="font-nunito font-800 text-2xl text-orange-600 leading-none">{streak.currentStreak}</p>
            <p className="text-[10px] font-dm text-orange-500 mt-0.5">Current Streak</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-3 border border-yellow-100/60 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center flex-shrink-0">
            <Trophy size={20} className="text-yellow-600" />
          </div>
          <div>
            <p className="font-nunito font-800 text-2xl text-yellow-600 leading-none">{streak.bestStreak}</p>
            <p className="text-[10px] font-dm text-yellow-600 mt-0.5">Best Streak</p>
          </div>
        </div>
      </div>

      {/* 7-day calendar grid */}
      <div className="bg-purple-50/50 rounded-2xl p-3 border border-purple-100/40">
        <div className="flex items-center gap-1.5 mb-2">
          <Calendar size={12} className="text-purple-400" />
          <p className="text-[10px] font-dm text-purple-500 uppercase tracking-wide">Last 7 Days</p>
        </div>
        <div className="flex gap-2 justify-between">
          {last7.map((day) => {
            const isChecked = streak.checkinDays?.includes(day) ?? false;
            const isToday = day === getDateKey(new Date());
            return (
              <div key={day} className="flex flex-col items-center gap-1.5 flex-1">
                <span className="text-[10px] font-dm text-purple-400">{getDayLabel(day)}</span>
                <motion.div
                  animate={isChecked ? { scale: [1, 1.15, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
                    isChecked
                      ? 'bg-gradient-to-br from-orange-400 to-pink-400 shadow-sm'
                      : isToday
                      ? 'bg-purple-100 border-2 border-purple-300 border-dashed' :'bg-purple-100/60 border border-purple-100'
                  }`}
                >
                  {isChecked ? '🔥' : isToday ? '·' : ''}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {streak.currentStreak >= 3 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-xs font-dm text-purple-500 mt-3"
        >
          {streak.currentStreak >= 7 ? '🏆 Amazing! 7+ day streak!' : streak.currentStreak >= 5 ? '⭐ 5 days strong! Keep going!' : '🌟 3-day streak! You\'re on a roll!'}
        </motion.p>
      )}
    </motion.div>
  );
}
