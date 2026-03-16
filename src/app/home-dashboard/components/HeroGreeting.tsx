'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Trophy, CheckCircle2, X } from 'lucide-react';

const moodEmojis = [
  { emoji: '😭', label: 'Very Sad' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '🙂', label: 'Good' },
  { emoji: '😄', label: 'Happy' },
];

const moodOptions = ['Great', 'Good', 'Okay', 'Low', 'Rough'];

interface StreakInfo {
  tag: string;
  tagColor: string;
  tagBg: string;
  icon: string;
}

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

function getStreakInfo(count: number): StreakInfo {
  if (count === 0) return { tag: 'Just Getting Started', tagColor: 'text-blue-700', tagBg: 'bg-blue-100/80 border-blue-200/50', icon: '🌱' };
  if (count <= 2) return { tag: 'Keep it Up!', tagColor: 'text-purple-700', tagBg: 'bg-purple-100/80 border-purple-200/50', icon: '🪴' };
  if (count <= 4) return { tag: 'Growing Steadily', tagColor: 'text-green-700', tagBg: 'bg-green-100/80 border-green-200/50', icon: '🌿' };
  if (count <= 6) return { tag: 'On a Roll!', tagColor: 'text-orange-700', tagBg: 'bg-orange-100/80 border-orange-200/50', icon: '🔥' };
  return { tag: 'Consistency King', tagColor: 'text-yellow-700', tagBg: 'bg-yellow-100/80 border-yellow-200/50', icon: '✦' };
}

export default function HeroGreeting() {
  const [username, setUsername] = useState('');
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [greeting, setGreeting] = useState('Good Morning');
  const [timeEmoji, setTimeEmoji] = useState('🌅');
  const [dateString, setDateString] = useState('');
  const [mounted, setMounted] = useState(false);

  // Streak state
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
  const [showCheckinModal, setShowCheckinModal] = useState(false);
  const [checkinNote, setCheckinNote] = useState('');
  const [checkinMood, setCheckinMood] = useState('Good');

  useEffect(() => {
    setMounted(true);
    const now = new Date();
    const hour = now.getHours();
    setGreeting(hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening');
    setTimeEmoji(hour < 12 ? '🌤' : hour < 17 ? '☀️' : '🌙');
    setDateString(now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }));

    // Load user
    const stored = localStorage.getItem('mindbloom_user');
    let uname = '';
    let communityName = '';
    if (stored) {
      try {
        const u = JSON.parse(stored);
        uname = u.username || '';
        communityName = u.communityName || '';
        setUsername(uname);
      } catch {}
    }

    // Load streak
    const saved = localStorage.getItem('mindbloom_streak');
    if (saved) {
      try {
        const data: StreakData = JSON.parse(saved);
        setStreak({ ...data, username: uname, communityName });
        const today = getDateKey(new Date());
        setCheckedIn(data.lastCheckin === today);
      } catch {}
    } else {
      setStreak(prev => ({ ...prev, username: uname, communityName }));
    }
  }, []);

  const handleCheckin = () => {
    const today = getDateKey(new Date());
    if (streak.lastCheckin === today) return;
    setShowCheckinModal(true);
  };

  const confirmCheckin = () => {
    const today = getDateKey(new Date());
    const yesterday = getDateKey(new Date(Date.now() - 86400000));
    const safeCurrentStreak = Number(streak.currentStreak) || 0;
    const safeBestStreak = Number(streak.bestStreak) || 0;
    const newCurrentStreak = streak.lastCheckin === yesterday ? safeCurrentStreak + 1 : 1;
    const newBestStreak = Math.max(newCurrentStreak, safeBestStreak);
    const newCheckinDays = [
      ...(streak.checkinDays || []).filter(d => {
        const diff = (new Date(today).getTime() - new Date(d).getTime()) / 86400000;
        return diff <= 30;
      }),
      today,
    ];

    const userSaved = localStorage.getItem('mindbloom_user');
    let uname = streak.username;
    let communityName = streak.communityName;
    if (userSaved) {
      try {
        const u = JSON.parse(userSaved);
        uname = u.username || uname;
        communityName = u.communityName || communityName;
      } catch {}
    }

    const newNote: CheckinNote = { date: today, note: checkinNote.trim(), mood: checkinMood };
    const newStreak: StreakData = {
      currentStreak: newCurrentStreak,
      bestStreak: newBestStreak,
      lastCheckin: today,
      checkinDays: newCheckinDays,
      username: uname,
      communityName,
      notes: [...(streak.notes || []).filter(n => n.date !== today), ...(checkinNote.trim() ? [newNote] : [])],
    };

    setStreak(newStreak);
    setCheckedIn(true);
    setShowCheckinModal(false);
    setCheckinNote('');
    try { localStorage.setItem('mindbloom_streak', JSON.stringify(newStreak)); } catch {}
  };

  const last7 = getLast7Days();
  const streakInfo = getStreakInfo(streak.currentStreak || 0);
  const checkedCount = streak.checkinDays?.filter(d => last7.includes(d)).length ?? 0;
  const todayNote = streak.notes?.find(n => n.date === getDateKey(new Date()));

  if (!mounted) return null;

  return (
    <>
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
          {/* Header row */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-dm text-purple-500 mb-0.5">
                {timeEmoji} {dateString}
              </p>
              <h1 className="font-nunito text-2xl font-800 text-purple-900 leading-tight">
                {greeting}{username ? `, ${username}` : ''}!
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
          <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-4 border border-white/60 mb-4">
            <p className="text-xs font-nunito font-600 text-purple-700 mb-3 uppercase tracking-wide">Quick Mood Check</p>
            <div className="flex items-center justify-around flex-wrap gap-y-3">
              {moodEmojis?.map((item, i) => (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.95 }}
                  animate={selectedMood === i ? { scale: 1.15 } : { scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  onClick={() => {
                    setSelectedMood(i);
                    localStorage.setItem('mindbloom_quick_mood', JSON.stringify({ index: i, label: item.label, emoji: item.emoji }));
                  }}
                  className="flex items-center justify-center bg-transparent border-0 outline-none cursor-pointer p-1"
                  style={{
                    fontSize: '36px',
                    lineHeight: 1,
                    filter: selectedMood === i
                      ? 'drop-shadow(0 0 8px rgba(168,85,247,0.7)) drop-shadow(0 0 16px rgba(168,85,247,0.4))'
                      : 'none',
                    transition: 'filter 0.2s ease',
                  }}
                  aria-label={item.label}
                >
                  {item.emoji}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Daily Check-in & Streak Stats */}
          <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-4 border border-white/60">
            {/* Title + check-in button */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs font-nunito font-700 text-purple-700 uppercase tracking-wide">Daily Check-in & Streak</p>
                {username && (
                  <p className="text-[10px] font-dm text-purple-400 mt-0.5">@{username}{streak.communityName ? ` · ${streak.communityName}` : ''}</p>
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

            {/* Current & Best streak stats */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-white/60 rounded-2xl p-2.5 border border-orange-100/60 flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <Flame size={16} className="text-orange-500" />
                </div>
                <div>
                  <p className="font-nunito font-800 text-xl text-orange-600 leading-none">{Number(streak.currentStreak) || 0}</p>
                  <p className="text-[9px] font-dm text-orange-500 mt-0.5">Current Streak</p>
                </div>
              </div>
              <div className="bg-white/60 rounded-2xl p-2.5 border border-yellow-100/60 flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <Trophy size={16} className="text-yellow-600" />
                </div>
                <div>
                  <p className="font-nunito font-800 text-xl text-yellow-600 leading-none">{Number(streak.bestStreak) || 0}</p>
                  <p className="text-[9px] font-dm text-yellow-600 mt-0.5">Best Streak</p>
                </div>
              </div>
            </div>

            {/* 7-day calendar */}
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-dm text-purple-500 uppercase tracking-wide">Past 7 Days</p>
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-2xl border text-[10px] font-nunito font-700 ${streakInfo.tagBg} ${streakInfo.tagColor}`}
              >
                <span>{streakInfo.icon}</span>
                <span>{streakInfo.tag}</span>
              </motion.div>
            </div>
            <div className="flex items-center justify-between gap-1">
              {last7.map((day) => {
                const isChecked = streak.checkinDays?.includes(day) ?? false;
                const isToday = day === getDateKey(new Date());
                return (
                  <div key={day} className="flex flex-col items-center gap-1">
                    <span className="text-[9px] font-dm text-purple-400">{getDayLabel(day)}</span>
                    <motion.div
                      animate={isChecked ? { scale: [1, 1.15, 1] } : {}}
                      transition={{ duration: 0.3 }}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm transition-all ${
                        isChecked
                          ? 'bg-gradient-to-br from-purple-400 to-pink-400 text-white shadow-sm'
                          : isToday
                          ? 'bg-white/60 border-2 border-purple-300 border-dashed' :'bg-white/40 border border-purple-100/40'
                      }`}
                    >
                      {isChecked ? '🔥' : isToday ? '·' : ''}
                    </motion.div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs font-dm text-purple-500 mt-2 text-center">
              {Number(checkedCount) || 0}/7 days checked in 🌟
            </p>

            {/* Today's note */}
            {todayNote && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 bg-purple-50/60 rounded-2xl px-3 py-2 border border-purple-100/40"
              >
                <p className="text-[10px] font-dm text-purple-400 uppercase tracking-wide mb-0.5">Today's note · {todayNote.mood}</p>
                <p className="text-xs font-dm text-purple-700 leading-relaxed">{todayNote.note}</p>
              </motion.div>
            )}
          </div>
        </div>
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

              {username && (
                <p className="text-xs font-dm text-purple-500 mb-4">Checking in as <span className="font-700 text-purple-700">@{username}</span></p>
              )}

              <div className="mb-4">
                <p className="text-xs font-dm text-purple-500 mb-2 uppercase tracking-wide">How are you feeling today?</p>
                <div className="flex gap-2 flex-wrap">
                  {moodOptions.map(mood => (
                    <button
                      key={mood}
                      onClick={() => setCheckinMood(mood)}
                      className={`px-3 py-1.5 rounded-2xl text-xs font-nunito font-600 transition-all ${
                        checkinMood === mood
                          ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-sm'
                          : 'bg-purple-50 text-purple-600 border border-purple-100 hover:bg-purple-100'
                      }`}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>

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