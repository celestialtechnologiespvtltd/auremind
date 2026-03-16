'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Trophy, Calendar, CheckCircle2, X } from 'lucide-react';

interface StreakData {
  currentStreak: number;
  bestStreak: number;
  lastCheckin: string;
  checkinDays: string[];
  username: string;
  communityName: string;
  notes: CheckinNote[];
}

interface CheckinNote {
  date: string;
  note: string;
  mood: string;
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

const moodOptions = ['Great', 'Good', 'Okay', 'Low', 'Rough'];

export default function StreakTracker() {
  const [streak, setStreak] = useState<StreakData>({
    currentStreak: 0,
    bestStreak: 0,
    lastCheckin: '',
    checkinDays: [],
    username: '',
    communityName: '',
    notes: [],
  });
  const [checkedIn, setCheckedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showCheckinModal, setShowCheckinModal] = useState(false);
  const [checkinNote, setCheckinNote] = useState('');
  const [selectedMood, setSelectedMood] = useState('Good');

  useEffect(() => {
    setMounted(true);
    loadData();
  }, []);

  const loadData = () => {
    try {
      const saved = localStorage.getItem('mindbloom_streak');
      const userSaved = localStorage.getItem('mindbloom_user');
      let username = '';
      let communityName = '';
      if (userSaved) {
        const u = JSON.parse(userSaved);
        username = u.username || '';
        communityName = u.communityName || '';
      }
      if (saved) {
        const data: StreakData = JSON.parse(saved);
        setStreak({ ...data, username, communityName });
        const today = getDateKey(new Date());
        setCheckedIn(data.lastCheckin === today);
      } else {
        setStreak(prev => ({ ...prev, username, communityName }));
      }
    } catch {}
  };

  const handleCheckin = () => {
    const today = getDateKey(new Date());
    if (streak.lastCheckin === today) return;
    setShowCheckinModal(true);
  };

  const confirmCheckin = () => {
    const today = getDateKey(new Date());
    const yesterday = getDateKey(new Date(Date.now() - 86400000));
    const newCurrentStreak = streak.lastCheckin === yesterday ? streak.currentStreak + 1 : 1;
    const newBestStreak = Math.max(newCurrentStreak, streak.bestStreak);
    const newCheckinDays = [
      ...streak.checkinDays.filter(d => {
        const diff = (new Date(today).getTime() - new Date(d).getTime()) / 86400000;
        return diff <= 30;
      }),
      today,
    ];

    const userSaved = localStorage.getItem('mindbloom_user');
    let username = streak.username;
    let communityName = streak.communityName;
    if (userSaved) {
      try {
        const u = JSON.parse(userSaved);
        username = u.username || username;
        communityName = u.communityName || communityName;
      } catch {}
    }

    const newNote: CheckinNote = {
      date: today,
      note: checkinNote.trim(),
      mood: selectedMood,
    };

    const newStreak: StreakData = {
      currentStreak: newCurrentStreak,
      bestStreak: newBestStreak,
      lastCheckin: today,
      checkinDays: newCheckinDays,
      username,
      communityName,
      notes: [...(streak.notes || []).filter(n => n.date !== today), ...(checkinNote.trim() ? [newNote] : [])],
    };

    setStreak(newStreak);
    setCheckedIn(true);
    setShowCheckinModal(false);
    setCheckinNote('');
    try {
      localStorage.setItem('mindbloom_streak', JSON.stringify(newStreak));
    } catch {}
  };

  const last7 = getLast7Days();
  const todayNote = streak.notes?.find(n => n.date === getDateKey(new Date()));

  if (!mounted) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 backdrop-blur-sm rounded-3xl border border-white/60 shadow-sm p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-nunito font-700 text-lg text-purple-900">Daily Streak</h2>
            {streak.username && (
              <p className="text-xs font-dm text-purple-400 mt-0.5">@{streak.username}{streak.communityName ? ` · ${streak.communityName}` : ''}</p>
            )}
          </div>
          {!checkedIn ? (
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={handleCheckin}
              className="px-3 py-1.5 rounded-2xl text-xs font-nunito font-700 bg-gradient-to-r from-orange-400 to-pink-400 text-white shadow-sm"
            >
              Check In
            </motion.button>
          ) : (
            <span className="px-3 py-1.5 rounded-2xl text-xs font-nunito font-700 bg-green-100 text-green-700 border border-green-200 flex items-center gap-1">
              <CheckCircle2 size={12} /> Checked in
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

        {/* Today's note */}
        {todayNote && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 bg-purple-50/60 rounded-2xl px-3 py-2.5 border border-purple-100/40"
          >
            <p className="text-[10px] font-dm text-purple-400 uppercase tracking-wide mb-1">Today's note · {todayNote.mood}</p>
            <p className="text-xs font-dm text-purple-700 leading-relaxed">{todayNote.note}</p>
          </motion.div>
        )}

        {streak.currentStreak >= 3 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-xs font-dm text-purple-500 mt-3"
          >
            {streak.currentStreak >= 7 ? 'Amazing! 7+ day streak!' : streak.currentStreak >= 5 ? '5 days strong! Keep going!' : '3-day streak! You\'re on a roll!'}
          </motion.p>
        )}
      </motion.div>

      {/* Check-in modal */}
      <AnimatePresence>
        {showCheckinModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setShowCheckinModal(false); }}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-white/95 backdrop-blur-xl rounded-4xl p-6 w-full max-w-sm border border-purple-100 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-nunito font-700 text-base text-purple-900">Daily Check-in</h3>
                <button
                  onClick={() => setShowCheckinModal(false)}
                  className="w-8 h-8 rounded-xl bg-purple-50 hover:bg-purple-100 flex items-center justify-center text-purple-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {streak.username && (
                <p className="text-xs font-dm text-purple-500 mb-4">Checking in as <span className="font-700 text-purple-700">@{streak.username}</span></p>
              )}

              {/* Mood selector */}
              <div className="mb-4">
                <p className="text-xs font-dm text-purple-500 mb-2 uppercase tracking-wide">How are you feeling today?</p>
                <div className="flex gap-2 flex-wrap">
                  {moodOptions.map(mood => (
                    <button
                      key={mood}
                      onClick={() => setSelectedMood(mood)}
                      className={`px-3 py-1.5 rounded-2xl text-xs font-nunito font-600 transition-all ${
                        selectedMood === mood
                          ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-sm'
                          : 'bg-purple-50 text-purple-600 border border-purple-100 hover:bg-purple-100'
                      }`}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>

              {/* Note input */}
              <div className="mb-5">
                <p className="text-xs font-dm text-purple-500 mb-2 uppercase tracking-wide">Add a note (optional)</p>
                <textarea
                  value={checkinNote}
                  onChange={(e) => setCheckinNote(e.target.value)}
                  placeholder="What's on your mind today?"
                  rows={3}
                  className="w-full bg-purple-50/50 rounded-2xl p-3 text-sm font-dm text-purple-900 placeholder-purple-300 border border-purple-100 outline-none resize-none focus:ring-2 focus:ring-purple-200 transition-all leading-relaxed"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={confirmCheckin}
                className="w-full py-3 rounded-2xl font-nunito font-700 text-sm bg-gradient-to-r from-orange-400 to-pink-400 text-white shadow-md"
              >
                Complete Check-in
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
