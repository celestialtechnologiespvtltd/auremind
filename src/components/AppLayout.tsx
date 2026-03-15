'use client';

import { useState, useEffect, useRef } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import { Bell, Settings, X, User, Users, FileText, ChevronRight, Eye, EyeOff, Menu, Home, Users2, BookOpen, Brain, Star, Trash2, Info, Shield, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';


interface AppLayoutProps {
  children: React.ReactNode;
  hideHeader?: boolean;
}

const navItems = [
  { label: 'Home', path: '/home-dashboard', Icon: Home },
  { label: 'Community', path: '/community-section', Icon: Users2 },
  { label: 'Diary', path: '/mood-tracker-diary', Icon: BookOpen },
  { label: 'Tests', path: '/psychology-tests', Icon: Brain },
  { label: 'Motivation', path: '/daily-motivation', Icon: Star },
];

export default function AppLayout({ children, hideHeader = false }: AppLayoutProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [username, setUsername] = useState('');
  const [communityName, setCommunityName] = useState('');
  const [notifGranted, setNotifGranted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [usernamePublic, setUsernamePublic] = useState(true);
  const [editUsername, setEditUsername] = useState('');
  const [editCommunity, setEditCommunity] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [dailyReminder, setDailyReminder] = useState(true);
  const [exerciseReminder, setExerciseReminder] = useState(true);
  const [reminderTime, setReminderTime] = useState('08:00');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState<'profile' | 'notifications' | 'privacy' | 'about'>('profile');
  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('mindbloom_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUsername(parsed.username || '');
        setCommunityName(parsed.communityName || '');
        setUsernamePublic(parsed.usernamePublic !== false);
        setEditUsername(parsed.username || '');
        setEditCommunity(parsed.communityName || '');
        setDailyReminder(parsed.dailyReminder !== false);
        setExerciseReminder(parsed.exerciseReminder !== false);
        setReminderTime(parsed.reminderTime || '08:00');
      } catch {}
    }
    if (typeof Notification !== 'undefined') {
      setNotifGranted(Notification.permission === 'granted');
    }
  }, [showSettings]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    if (showMenu) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showMenu]);

  const saveUserData = (updates: Record<string, unknown>) => {
    try {
      const stored = localStorage.getItem('mindbloom_user');
      const parsed = stored ? JSON.parse(stored) : {};
      localStorage.setItem('mindbloom_user', JSON.stringify({ ...parsed, ...updates }));
    } catch {}
  };

  const toggleUsernameVisibility = () => {
    const newVal = !usernamePublic;
    setUsernamePublic(newVal);
    saveUserData({ usernamePublic: newVal });
  };

  const saveProfile = () => {
    setUsername(editUsername);
    setCommunityName(editCommunity);
    saveUserData({ username: editUsername, communityName: editCommunity });
    setIsEditing(false);
  };

  const saveNotifSettings = (key: string, value: boolean | string) => {
    if (key === 'dailyReminder') setDailyReminder(value as boolean);
    if (key === 'exerciseReminder') setExerciseReminder(value as boolean);
    if (key === 'reminderTime') setReminderTime(value as string);
    saveUserData({ [key]: value });
  };

  const requestNotifications = async () => {
    if (typeof Notification === 'undefined') return;
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      setNotifGranted(true);
      saveUserData({ notifGranted: true });
    }
  };

  const clearAllData = () => {
    const keys = ['mindbloom_user', 'mindbloom_streak', 'mindbloom_notes', 'mindbloom_mood_entries',
      'wellness-tips-checked', 'wellness-tips-date', 'mindbloom_exercise_counts',
      'mindbloom_test_results', 'mindbloom_sound_prefs'];
    keys.forEach(k => localStorage.removeItem(k));
    setShowClearConfirm(false);
    setShowSettings(false);
    window.location.reload();
  };

  const handleNavClick = (path: string) => {
    setShowMenu(false);
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50" style={{ WebkitOverflowScrolling: 'touch' }}>
      {!hideHeader && (
        <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/60" ref={menuRef}>
          <div className="max-w-screen-2xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-shrink-0">
              <AppLogo size={28} />
              <span className="font-nunito font-800 text-lg text-purple-800 tracking-tight hidden sm:block">MindBloom</span>
            </div>

            {/* Center: current page label */}
            <div className="flex-1 flex justify-center">
              <span className="font-nunito font-700 text-sm text-purple-700">
                {navItems.find(n => n.path === pathname)?.label ?? 'MindBloom'}
              </span>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowMenu(v => !v)}
                className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-2xl bg-purple-50 hover:bg-purple-100 flex items-center justify-center text-purple-500 transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu size={18} />
              </motion.button>
            </div>
          </div>

          {/* Slide-down menu: Notifications first, Settings second, then nav links */}
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                className="overflow-hidden border-t border-purple-100/60 bg-white/95 backdrop-blur-xl"
              >
                <nav className="max-w-screen-2xl mx-auto px-4 py-3 flex flex-col gap-1">
                  {/* Notifications button */}
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { requestNotifications(); setShowMenu(false); }}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-nunito font-600 transition-all duration-200 text-left w-full text-purple-500 hover:bg-purple-50 hover:text-purple-700 min-h-[44px]"
                  >
                    <Bell size={18} className={notifGranted ? 'text-green-500' : 'text-purple-400'} />
                    <span>Notifications</span>
                    {notifGranted && <span className="ml-auto text-xs text-green-500 font-dm">Enabled</span>}
                  </motion.button>

                  {/* Settings button */}
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { setShowSettings(true); setShowMenu(false); }}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-nunito font-600 transition-all duration-200 text-left w-full text-purple-500 hover:bg-purple-50 hover:text-purple-700 min-h-[44px]"
                  >
                    <Settings size={18} className="text-purple-400" />
                    <span>Settings</span>
                  </motion.button>

                  <div className="h-px bg-purple-100/60 my-1" />

                  {/* Nav links */}
                  {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    const { Icon } = item;
                    return (
                      <motion.button
                        key={item.path}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleNavClick(item.path)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-nunito font-600 transition-all duration-200 text-left w-full min-h-[44px] ${
                          isActive
                            ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700' :'text-purple-500 hover:bg-purple-50 hover:text-purple-700'
                        }`}
                      >
                        <Icon size={18} className={isActive ? 'text-purple-600' : 'text-purple-400'} />
                        <span>{item.label}</span>
                        {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />}
                      </motion.button>
                    );
                  })}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      )}

      <main className="max-w-screen-2xl mx-auto px-4 py-4 xl:px-8 2xl:px-12 pt-20" style={{ scrollBehavior: 'smooth' }}>
        {children}
      </main>

      {/* Enhanced Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setShowSettings(false); }}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-white/95 backdrop-blur-xl rounded-4xl w-full max-w-sm border border-purple-100 shadow-2xl max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 pb-3 flex-shrink-0">
                <h2 className="font-nunito font-800 text-lg text-purple-900">Settings</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl bg-purple-50 hover:bg-purple-100 flex items-center justify-center text-purple-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Tab bar */}
              <div className="flex gap-1 px-5 pb-3 flex-shrink-0">
                {(['profile', 'notifications', 'privacy', 'about'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveSettingsTab(tab)}
                    className={`flex-1 py-2 rounded-xl text-xs font-nunito font-700 capitalize transition-all min-h-[36px] ${
                      activeSettingsTab === tab
                        ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-sm'
                        : 'bg-purple-50 text-purple-500 hover:bg-purple-100'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="overflow-y-auto flex-1 px-5 pb-5">

                {/* PROFILE TAB */}
                {activeSettingsTab === 'profile' && (
                  <div className="space-y-3">
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-4 border border-purple-100/60">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center text-2xl border border-white/60">
                          🌸
                        </div>
                        <div>
                          <p className="font-nunito font-800 text-base text-purple-900">{communityName || 'Anonymous'}</p>
                          <p className="text-xs font-dm text-purple-500">MindBloom Member</p>
                        </div>
                      </div>
                      {!isEditing ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 bg-white/60 rounded-2xl px-3 py-2 border border-white/60">
                            <User size={14} className="text-purple-400 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-[10px] font-dm text-purple-400 uppercase tracking-wide">Username</p>
                              <p className="text-sm font-nunito font-700 text-purple-800 truncate">{username ? `@${username}` : 'Not set'}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 bg-white/60 rounded-2xl px-3 py-2 border border-white/60">
                            <Users size={14} className="text-purple-400 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-[10px] font-dm text-purple-400 uppercase tracking-wide">Community Name</p>
                              <p className="text-sm font-nunito font-700 text-purple-800 truncate">{communityName || 'Not set'}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => setIsEditing(true)}
                            className="w-full py-2.5 rounded-2xl bg-purple-100 text-purple-700 font-nunito font-700 text-sm hover:bg-purple-200 transition-colors min-h-[44px]"
                          >
                            Edit Profile
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <input
                            value={editUsername}
                            onChange={e => setEditUsername(e.target.value)}
                            placeholder="Username"
                            className="w-full bg-white/80 rounded-2xl px-3 py-2.5 text-sm font-dm text-purple-900 border border-purple-100 outline-none focus:ring-2 focus:ring-purple-200"
                          />
                          <input
                            value={editCommunity}
                            onChange={e => setEditCommunity(e.target.value)}
                            placeholder="Community name / display name"
                            className="w-full bg-white/80 rounded-2xl px-3 py-2.5 text-sm font-dm text-purple-900 border border-purple-100 outline-none focus:ring-2 focus:ring-purple-200"
                          />
                          <div className="flex gap-2">
                            <button onClick={() => setIsEditing(false)} className="flex-1 py-2.5 rounded-2xl bg-gray-100 text-gray-600 font-nunito font-700 text-sm min-h-[44px]">Cancel</button>
                            <button onClick={saveProfile} className="flex-1 py-2.5 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 text-white font-nunito font-700 text-sm shadow-md min-h-[44px]">Save</button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Visibility toggle */}
                    <div className="bg-white/70 rounded-3xl border border-purple-100/60 overflow-hidden">
                      <button
                        onClick={toggleUsernameVisibility}
                        className="w-full flex items-center gap-3 p-4 hover:bg-purple-50/50 transition-colors min-h-[44px]"
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${usernamePublic ? 'bg-purple-100' : 'bg-gray-100'}`}>
                          {usernamePublic ? <Eye size={16} className="text-purple-600" /> : <EyeOff size={16} className="text-gray-400" />}
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-nunito font-700 text-sm text-purple-900">Username Visibility</p>
                          <p className="text-xs font-dm text-purple-400">
                            {usernamePublic ? 'Public — visible in community' : 'Hidden — shown as Anonymous'}
                          </p>
                        </div>
                        <div className={`w-11 h-6 rounded-full transition-all duration-300 relative ${usernamePublic ? 'bg-purple-400' : 'bg-gray-200'}`}>
                          <motion.div
                            animate={{ x: usernamePublic ? 20 : 2 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                            className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* NOTIFICATIONS TAB */}
                {activeSettingsTab === 'notifications' && (
                  <div className="space-y-3">
                    <div className="bg-white/70 rounded-3xl border border-purple-100/60 overflow-hidden">
                      <button
                        onClick={requestNotifications}
                        className="w-full flex items-center gap-3 p-4 hover:bg-purple-50/50 transition-colors min-h-[44px]"
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${notifGranted ? 'bg-green-100' : 'bg-pink-50'}`}>
                          <Bell size={16} className={notifGranted ? 'text-green-600' : 'text-pink-400'} />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-nunito font-700 text-sm text-purple-900">Browser Notifications</p>
                          <p className="text-xs font-dm text-purple-400">{notifGranted ? 'Enabled ✓' : 'Tap to enable'}</p>
                        </div>
                        <ChevronRight size={16} className="text-purple-300" />
                      </button>
                    </div>

                    {[
                      { key: 'dailyReminder', label: 'Daily Check-in Reminder', desc: 'Remind me to log my mood daily', value: dailyReminder, setter: (v: boolean) => saveNotifSettings('dailyReminder', v) },
                      { key: 'exerciseReminder', label: 'Exercise Reminder', desc: 'Remind me to do self-care exercises', value: exerciseReminder, setter: (v: boolean) => saveNotifSettings('exerciseReminder', v) },
                    ].map(item => (
                      <div key={item.key} className="bg-white/70 rounded-3xl border border-purple-100/60 overflow-hidden">
                        <button
                          onClick={() => item.setter(!item.value)}
                          className="w-full flex items-center gap-3 p-4 hover:bg-purple-50/50 transition-colors min-h-[44px]"
                        >
                          <div className="flex-1 text-left">
                            <p className="font-nunito font-700 text-sm text-purple-900">{item.label}</p>
                            <p className="text-xs font-dm text-purple-400">{item.desc}</p>
                          </div>
                          <div className={`w-11 h-6 rounded-full transition-all duration-300 relative ${item.value ? 'bg-purple-400' : 'bg-gray-200'}`}>
                            <motion.div
                              animate={{ x: item.value ? 20 : 2 }}
                              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                              className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                            />
                          </div>
                        </button>
                      </div>
                    ))}

                    <div className="bg-white/70 rounded-3xl border border-purple-100/60 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock size={15} className="text-purple-400" />
                        <p className="font-nunito font-700 text-sm text-purple-900">Reminder Time</p>
                      </div>
                      <input
                        type="time"
                        value={reminderTime}
                        onChange={e => saveNotifSettings('reminderTime', e.target.value)}
                        className="w-full bg-purple-50 rounded-2xl px-3 py-2.5 text-sm font-dm text-purple-900 border border-purple-100 outline-none focus:ring-2 focus:ring-purple-200"
                      />
                    </div>
                  </div>
                )}

                {/* PRIVACY TAB */}
                {activeSettingsTab === 'privacy' && (
                  <div className="space-y-3">
                    <div className="bg-blue-50 border border-blue-100 rounded-3xl p-4">
                      <div className="flex items-start gap-2">
                        <Shield size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-nunito font-700 text-sm text-blue-800 mb-1">Your Privacy</p>
                          <p className="text-xs font-dm text-blue-700 leading-relaxed">All your data is stored locally on your device only. MindBloom never collects, transmits, or shares your personal information.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/70 rounded-3xl border border-purple-100/60 overflow-hidden">
                      <button
                        onClick={() => setShowTerms(!showTerms)}
                        className="w-full flex items-center gap-3 p-4 hover:bg-purple-50/50 transition-colors min-h-[44px]"
                      >
                        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                          <FileText size={16} className="text-blue-400" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-nunito font-700 text-sm text-purple-900">Privacy Policy & Terms</p>
                          <p className="text-xs font-dm text-purple-400">View our terms</p>
                        </div>
                        <motion.div animate={{ rotate: showTerms ? 90 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronRight size={16} className="text-purple-300" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {showTerms && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 text-xs font-dm text-purple-600 leading-relaxed border-t border-purple-50">
                              <p className="pt-3">MindBloom is a wellness companion app. All data is stored locally on your device. We do not collect or share personal information. This app is not a substitute for professional mental health care. Use it as a supportive tool alongside professional guidance when needed.</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {!showClearConfirm ? (
                      <button
                        onClick={() => setShowClearConfirm(true)}
                        className="w-full flex items-center gap-3 p-4 rounded-3xl bg-red-50 border border-red-100 hover:bg-red-100 transition-colors min-h-[44px]"
                      >
                        <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
                          <Trash2 size={16} className="text-red-500" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-nunito font-700 text-sm text-red-700">Clear All Data</p>
                          <p className="text-xs font-dm text-red-400">Permanently delete all local data</p>
                        </div>
                      </button>
                    ) : (
                      <div className="bg-red-50 border border-red-200 rounded-3xl p-4">
                        <p className="font-nunito font-700 text-sm text-red-800 mb-1">Are you sure?</p>
                        <p className="text-xs font-dm text-red-600 mb-3">This will delete all your notes, mood entries, streaks, and settings. This cannot be undone.</p>
                        <div className="flex gap-2">
                          <button onClick={() => setShowClearConfirm(false)} className="flex-1 py-2.5 rounded-2xl bg-white text-gray-600 font-nunito font-700 text-sm border border-gray-200 min-h-[44px]">Cancel</button>
                          <button onClick={clearAllData} className="flex-1 py-2.5 rounded-2xl bg-red-500 text-white font-nunito font-700 text-sm shadow-md min-h-[44px]">Delete All</button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ABOUT TAB */}
                {activeSettingsTab === 'about' && (
                  <div className="space-y-3">
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-5 border border-purple-100/60 text-center">
                      <div className="text-4xl mb-2">🌸</div>
                      <p className="font-nunito font-800 text-lg text-purple-900">MindBloom</p>
                      <p className="text-xs font-dm text-purple-500 mb-1">Version 2.0.0</p>
                      <p className="text-xs font-dm text-purple-400 leading-relaxed">Your personal mental wellness companion. Built with care for your journey.</p>
                    </div>
                    {[
                      { icon: <Info size={16} className="text-blue-400" />, bg: 'bg-blue-50', title: 'About MindBloom', desc: 'A wellness app for mood tracking, self-care, and daily motivation.' },
                      { icon: <Shield size={16} className="text-green-500" />, bg: 'bg-green-50', title: 'Data Storage', desc: 'All data stored locally. No servers, no tracking, no ads.' },
                      { icon: <FileText size={16} className="text-purple-400" />, bg: 'bg-purple-50', title: 'Not Medical Advice', desc: 'MindBloom is for personal wellness only, not clinical diagnosis.' },
                    ].map((item, i) => (
                      <div key={i} className="bg-white/70 rounded-3xl border border-purple-100/60 p-4 flex items-start gap-3">
                        <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-nunito font-700 text-sm text-purple-900">{item.title}</p>
                          <p className="text-xs font-dm text-purple-500 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}