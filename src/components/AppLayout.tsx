'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import { Bell, Settings, X, User, Users, FileText, ChevronRight, Eye, EyeOff, Menu, Home, Users2, BookOpen, Brain, Star, Trash2, Info, Shield, Clock, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import {
  registerServiceWorker,
  requestNotificationPermission,
  getNotificationPermission,
  scheduleReminder } from
'@/lib/notifications';
import Icon from '@/components/ui/AppIcon';


interface AppLayoutProps {
  children: React.ReactNode;
  hideHeader?: boolean;
}

interface UserData {
  username?: string;
  communityName?: string;
  usernamePublic?: boolean;
  notifGranted?: boolean;
  dailyReminder?: boolean;
  exerciseReminder?: boolean;
  dailyReminderTime?: string;
  exerciseReminderTime?: string;
}

const navItems = [
{ label: 'Home', path: '/home-dashboard', Icon: Home },
{ label: 'Motivation', path: '/daily-motivation', Icon: Star },
{ label: 'Diary', path: '/mood-tracker-diary', Icon: BookOpen },
{ label: 'Tests', path: '/psychology-tests', Icon: Brain },
{ label: 'Community', path: '/community-section', Icon: Users2 }];


const LS_USER_KEY = 'mindbloom_user';

function readUserData(): UserData {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(LS_USER_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeUserData(updates: Partial<UserData>) {
  try {
    const existing = readUserData();
    localStorage.setItem(LS_USER_KEY, JSON.stringify({ ...existing, ...updates }));
  } catch {}
}

export default function AppLayout({ children, hideHeader = false }: AppLayoutProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notifGranted, setNotifGranted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState<'profile' | 'notifications' | 'privacy' | 'about'>('profile');

  // Profile state
  const [username, setUsername] = useState('');
  const [communityName, setCommunityName] = useState('');
  const [usernamePublic, setUsernamePublic] = useState(true);
  const [editUsername, setEditUsername] = useState('');
  const [editCommunity, setEditCommunity] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Notification state
  const [dailyReminder, setDailyReminder] = useState(false);
  const [exerciseReminder, setExerciseReminder] = useState(false);
  const [dailyReminderTime, setDailyReminderTime] = useState('');
  const [exerciseReminderTime, setExerciseReminderTime] = useState('');
  const [showDailyTimePicker, setShowDailyTimePicker] = useState(false);
  const [showExerciseTimePicker, setShowExerciseTimePicker] = useState(false);
  const [tempDailyTime, setTempDailyTime] = useState('08:00');
  const [tempExerciseTime, setTempExerciseTime] = useState('18:00');

  const pathname = usePathname();
  const router = useRouter();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const isHomePage = pathname === '/home-dashboard';

  // Single batched localStorage read on mount
  useEffect(() => {
    const data = readUserData();
    setUsername(data.username || '');
    setCommunityName(data.communityName || '');
    setUsernamePublic(data.usernamePublic !== false);
    setEditUsername(data.username || '');
    setEditCommunity(data.communityName || '');
    setDailyReminder(!!data.dailyReminder);
    setExerciseReminder(!!data.exerciseReminder);
    setDailyReminderTime(data.dailyReminderTime || '');
    setExerciseReminderTime(data.exerciseReminderTime || '');
    setNotifGranted(getNotificationPermission() === 'granted');
    registerServiceWorker();
  }, []);

  // Re-read user data when settings opens
  useEffect(() => {
    if (!showSettings) return;
    const data = readUserData();
    setUsername(data.username || '');
    setCommunityName(data.communityName || '');
    setUsernamePublic(data.usernamePublic !== false);
    setEditUsername(data.username || '');
    setEditCommunity(data.communityName || '');
    setDailyReminder(!!data.dailyReminder);
    setExerciseReminder(!!data.exerciseReminder);
    setDailyReminderTime(data.dailyReminderTime || '');
    setExerciseReminderTime(data.exerciseReminderTime || '');
    setNotifGranted(getNotificationPermission() === 'granted');
  }, [showSettings]);

  // Schedule reminders whenever relevant state changes
  useEffect(() => {
    if (!notifGranted) return;
    if (dailyReminder && dailyReminderTime) {
      scheduleReminder('daily-checkin', 'AureMind 🌸', 'Time for your daily mood check-in!', dailyReminderTime);
    }
    if (exerciseReminder && exerciseReminderTime) {
      scheduleReminder('exercise-reminder', 'AureMind 💪', 'Time for your self-care exercise!', exerciseReminderTime);
    }
  }, [notifGranted, dailyReminder, dailyReminderTime, exerciseReminder, exerciseReminderTime]);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setShowMobileMenu(false);
      }
    };
    if (showMobileMenu) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showMobileMenu]);

  // Close mobile menu on route change
  useEffect(() => {
    setShowMobileMenu(false);
  }, [pathname]);

  const toggleUsernameVisibility = useCallback(() => {
    const newVal = !usernamePublic;
    setUsernamePublic(newVal);
    writeUserData({ usernamePublic: newVal });
  }, [usernamePublic]);

  const saveProfile = useCallback(() => {
    setUsername(editUsername);
    setCommunityName(editCommunity);
    writeUserData({ username: editUsername, communityName: editCommunity });
    setIsEditing(false);
  }, [editUsername, editCommunity]);

  const handleEnableNotifications = useCallback(async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      setNotifGranted(true);
      writeUserData({ notifGranted: true });
    }
  }, []);

  const handleDailyReminderToggle = useCallback(() => {
    if (!dailyReminder) {
      setShowDailyTimePicker(true);
    } else {
      setDailyReminder(false);
      setDailyReminderTime('');
      setShowDailyTimePicker(false);
      writeUserData({ dailyReminder: false, dailyReminderTime: '' });
    }
  }, [dailyReminder]);

  const saveDailyReminderTime = useCallback(() => {
    setDailyReminder(true);
    setDailyReminderTime(tempDailyTime);
    setShowDailyTimePicker(false);
    writeUserData({ dailyReminder: true, dailyReminderTime: tempDailyTime });
  }, [tempDailyTime]);

  const handleExerciseReminderToggle = useCallback(() => {
    if (!exerciseReminder) {
      setShowExerciseTimePicker(true);
    } else {
      setExerciseReminder(false);
      setExerciseReminderTime('');
      setShowExerciseTimePicker(false);
      writeUserData({ exerciseReminder: false, exerciseReminderTime: '' });
    }
  }, [exerciseReminder]);

  const saveExerciseReminderTime = useCallback(() => {
    setExerciseReminder(true);
    setExerciseReminderTime(tempExerciseTime);
    setShowExerciseTimePicker(false);
    writeUserData({ exerciseReminder: true, exerciseReminderTime: tempExerciseTime });
  }, [tempExerciseTime]);

  const clearAllData = useCallback(() => {
    const keys = ['mindbloom_user', 'mindbloom_streak', 'mindbloom_notes', 'mindbloom_mood_entries',
    'wellness-tips-checked', 'wellness-tips-date', 'mindbloom_exercise_counts',
    'mindbloom_test_results', 'mindbloom_sound_prefs'];
    keys.forEach((k) => localStorage.removeItem(k));
    setShowClearConfirm(false);
    setShowSettings(false);
    window.location.reload();
  }, []);

  const handleNavClick = useCallback((path: string) => {
    setShowMobileMenu(false);
    router.push(path);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50" style={{ WebkitOverflowScrolling: 'touch' }}>
      {!hideHeader &&
      <header
        ref={mobileMenuRef}
        className="fixed top-0 left-0 right-0 z-40 bg-white/70 backdrop-blur-2xl border-b border-white/50 shadow-sm"
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(243,232,255,0.65) 50%, rgba(252,231,243,0.65) 100%)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>

          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">

              {/* LEFT: Logo + Site Name */}
              <div className="flex items-center gap-2.5 flex-shrink-0">
                <AppLogo size={32} />
                <div className="flex flex-col">
                  <span className="font-nunito font-800 text-xl bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent tracking-tight leading-tight">AureMind</span>
                  <span className="text-xs font-light text-purple-400/80 tracking-wide leading-tight">Elevate Your Mind</span>
                  <span className="text-xs font-light text-purple-400/80 tracking-wide leading-tight">Embrace Your Calm</span>
                </div>
              </div>

              {/* CENTER: Desktop Nav Links */}
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item) => {
                const isActive = pathname === item.path;
                const { Icon } = item;
                return (
                  <motion.button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className={`relative flex items-center gap-1.5 px-4 py-2 rounded-2xl text-sm font-nunito font-700 transition-all duration-200 ${
                    isActive ?
                    'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-200' :
                    'text-purple-600 hover:bg-white/70 hover:text-purple-800 hover:shadow-sm'}`
                    }>

                      <Icon size={15} className={isActive ? 'text-white' : 'text-purple-400'} />
                      <span>{item.label}</span>
                    </motion.button>);

              })}
              </nav>

              {/* RIGHT: Actions */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {/* Settings & Notifications — visible on Home page only */}
                {isHomePage &&
              <>
                    <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={handleEnableNotifications}
                  className="w-10 h-10 rounded-2xl bg-white/60 hover:bg-white/90 border border-white/60 flex items-center justify-center transition-all duration-200 shadow-sm"
                  aria-label="Notifications">

                      <Bell size={17} className={notifGranted ? 'text-green-500' : 'text-purple-500'} />
                    </motion.button>
                    <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowSettings(true)}
                  className="w-10 h-10 rounded-2xl bg-white/60 hover:bg-white/90 border border-white/60 flex items-center justify-center text-purple-500 transition-all duration-200 shadow-sm"
                  aria-label="Settings">

                      <Settings size={17} />
                    </motion.button>
                  </>
              }

                {/* Mobile Hamburger */}
                <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowMobileMenu((v) => !v)}
                className="md:hidden w-10 h-10 rounded-2xl bg-white/60 hover:bg-white/90 border border-white/60 flex items-center justify-center text-purple-600 transition-all duration-200 shadow-sm"
                aria-label="Toggle navigation menu">

                  <AnimatePresence mode="wait" initial={false}>
                    {showMobileMenu ?
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                        <X size={18} />
                      </motion.div> :

                  <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                        <Menu size={18} />
                      </motion.div>
                  }
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {showMobileMenu &&
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
            className="md:hidden border-t border-white/40 bg-white/80 backdrop-blur-2xl"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.88) 0%, rgba(243,232,255,0.80) 100%)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>

                <nav className="max-w-screen-xl mx-auto px-4 py-3 flex flex-col gap-1">
                  {navItems.map((item) => {
                const isActive = pathname === item.path;
                const { Icon } = item;
                return (
                  <motion.button
                    key={item.path}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNavClick(item.path)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-nunito font-700 transition-all duration-200 text-left w-full ${
                    isActive ?
                    'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-200/50' :
                    'text-purple-600 hover:bg-purple-50 hover:text-purple-800'}`
                    }>

                        <Icon size={18} className={isActive ? 'text-white' : 'text-purple-400'} />
                        <span>{item.label}</span>
                        {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70" />}
                      </motion.button>);

              })}

                  {/* Settings & Notifications in mobile menu (home page only) */}
                  {isHomePage &&
              <div className="flex gap-2 pt-1 pb-1 border-t border-purple-100/60 mt-1">
                      <button
                  onClick={() => {setShowMobileMenu(false);handleEnableNotifications();}}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-purple-50 text-purple-600 font-nunito font-700 text-sm hover:bg-purple-100 transition-colors">

                        <Bell size={15} className={notifGranted ? 'text-green-500' : 'text-purple-500'} />
                        <span>Notifications</span>
                      </button>
                      <button
                  onClick={() => {setShowMobileMenu(false);setShowSettings(true);}}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-purple-50 text-purple-600 font-nunito font-700 text-sm hover:bg-purple-100 transition-colors">

                        <Settings size={15} />
                        <span>Settings</span>
                      </button>
                    </div>
              }
                </nav>
              </motion.div>
          }
          </AnimatePresence>
        </header>
      }

      {/* Main Content — full width, padded top for fixed header */}
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8" style={{ scrollBehavior: 'smooth' }}>
        {children}
      </main>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          onClick={(e) => {if (e.target === e.currentTarget) setShowSettings(false);}}>

            <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-white/95 backdrop-blur-xl rounded-4xl w-full max-w-sm border border-purple-100 shadow-2xl max-h-[90vh] flex flex-col">

              <div className="flex items-center justify-between p-5 pb-3 flex-shrink-0">
                <h2 className="font-nunito font-800 text-lg text-purple-900">Settings</h2>
                <button
                onClick={() => setShowSettings(false)}
                className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl bg-purple-50 hover:bg-purple-100 flex items-center justify-center text-purple-500 transition-colors">

                  <X size={18} />
                </button>
              </div>

              <div className="flex gap-1 px-5 pb-3 flex-shrink-0">
                {(['profile', 'notifications', 'privacy', 'about'] as const).map((tab) =>
              <button
                key={tab}
                onClick={() => setActiveSettingsTab(tab)}
                className={`flex-1 py-2 rounded-xl text-xs font-nunito font-700 capitalize transition-all min-h-[36px] ${
                activeSettingsTab === tab ?
                'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-sm' :
                'bg-purple-50 text-purple-500 hover:bg-purple-100'}`
                }>

                    {tab}
                  </button>
              )}
              </div>

              <div className="overflow-y-auto flex-1 px-5 pb-5">

                {/* PROFILE TAB */}
                {activeSettingsTab === 'profile' &&
              <div className="space-y-3">
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-4 border border-purple-100/60">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center text-2xl border border-white/60">
                          🌸
                        </div>
                        <div>
                          <p className="font-nunito font-800 text-base text-purple-900">{communityName || 'Anonymous'}</p>
                          <p className="text-xs font-dm text-purple-500">AureMind Member</p>
                        </div>
                      </div>
                      {!isEditing ?
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
                      className="w-full py-2.5 rounded-2xl bg-purple-100 text-purple-700 font-nunito font-700 text-sm hover:bg-purple-200 transition-colors min-h-[44px]">

                            Edit Profile
                          </button>
                        </div> :

                  <div className="space-y-2">
                          <input
                      value={editUsername}
                      onChange={(e) => setEditUsername(e.target.value)}
                      placeholder="Username"
                      className="w-full bg-white/80 rounded-2xl px-3 py-2.5 text-sm font-dm text-purple-900 border border-purple-100 outline-none focus:ring-2 focus:ring-purple-200" />

                          <input
                      value={editCommunity}
                      onChange={(e) => setEditCommunity(e.target.value)}
                      placeholder="Community name / display name"
                      className="w-full bg-white/80 rounded-2xl px-3 py-2.5 text-sm font-dm text-purple-900 border border-purple-100 outline-none focus:ring-2 focus:ring-purple-200" />

                          <div className="flex gap-2">
                            <button onClick={() => setIsEditing(false)} className="flex-1 py-2.5 rounded-2xl bg-gray-100 text-gray-600 font-nunito font-700 text-sm min-h-[44px]">Cancel</button>
                            <button onClick={saveProfile} className="flex-1 py-2.5 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 text-white font-nunito font-700 text-sm shadow-md min-h-[44px]">Save</button>
                          </div>
                        </div>
                  }
                    </div>

                    <div className="bg-white/70 rounded-3xl border border-purple-100/60 overflow-hidden">
                      <button
                    onClick={toggleUsernameVisibility}
                    className="w-full flex items-center gap-3 p-4 hover:bg-purple-50/50 transition-colors min-h-[44px]">

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
                        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm" />

                        </div>
                      </button>
                    </div>
                  </div>
              }

                {/* NOTIFICATIONS TAB */}
                {activeSettingsTab === 'notifications' &&
              <div className="space-y-3">
                    <div className="bg-white/70 rounded-3xl border border-purple-100/60 overflow-hidden">
                      <button
                    onClick={handleEnableNotifications}
                    className="w-full flex items-center gap-3 p-4 hover:bg-purple-50/50 transition-colors min-h-[44px]">

                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${notifGranted ? 'bg-green-100' : 'bg-pink-50'}`}>
                          <Bell size={16} className={notifGranted ? 'text-green-600' : 'text-pink-400'} />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-nunito font-700 text-sm text-purple-900">Browser Notifications</p>
                          <p className="text-xs font-dm text-purple-400">{notifGranted ? 'Enabled ✓' : 'Tap to enable'}</p>
                        </div>
                        <div className={`w-11 h-6 rounded-full transition-all duration-300 relative ${notifGranted ? 'bg-green-400' : 'bg-gray-200'}`}>
                          <motion.div
                        animate={{ x: notifGranted ? 20 : 2 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm" />

                        </div>
                      </button>
                    </div>

                    {!notifGranted ?
                <div className="bg-amber-50 border border-amber-100 rounded-3xl p-4 text-center">
                        <p className="text-2xl mb-2">🔔</p>
                        <p className="font-nunito font-700 text-sm text-amber-800 mb-1">Enable Notifications First</p>
                        <p className="text-xs font-dm text-amber-600">Allow browser notifications to set up daily check-in and exercise reminders.</p>
                        <button
                    onClick={handleEnableNotifications}
                    className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 text-white font-nunito font-700 text-sm shadow-md min-h-[44px]">

                          Enable Browser Notifications
                        </button>
                      </div> :

                <>
                        {/* Daily Check-in Reminder */}
                        <div className="bg-white/70 rounded-3xl border border-purple-100/60 overflow-hidden">
                          <button
                      onClick={handleDailyReminderToggle}
                      className="w-full flex items-center gap-3 p-4 hover:bg-purple-50/50 transition-colors min-h-[44px]">

                            <div className="flex-1 text-left">
                              <p className="font-nunito font-700 text-sm text-purple-900">Daily Check-in Reminder</p>
                              <p className="text-xs font-dm text-purple-400">Remind me to log my mood daily</p>
                            </div>
                            <div className={`w-11 h-6 rounded-full transition-all duration-300 relative ${dailyReminder ? 'bg-purple-400' : 'bg-gray-200'}`}>
                              <motion.div
                          animate={{ x: dailyReminder ? 20 : 2 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm" />

                            </div>
                          </button>

                          <AnimatePresence>
                            {showDailyTimePicker &&
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden border-t border-purple-50">

                                <div className="px-4 pb-4 pt-3 space-y-2">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Clock size={13} className="text-purple-400" />
                                    <p className="text-xs font-dm text-purple-600">Set reminder time</p>
                                  </div>
                                  <input
                            type="time"
                            value={tempDailyTime}
                            onChange={(e) => setTempDailyTime(e.target.value)}
                            className="w-full bg-purple-50 rounded-2xl px-3 py-2.5 text-sm font-dm text-purple-900 border border-purple-100 outline-none focus:ring-2 focus:ring-purple-200" />

                                  <div className="flex gap-2">
                                    <button
                              onClick={() => setShowDailyTimePicker(false)}
                              className="flex-1 py-2 rounded-2xl bg-gray-100 text-gray-600 font-nunito font-700 text-xs min-h-[36px]">

                                      Cancel
                                    </button>
                                    <button
                              onClick={saveDailyReminderTime}
                              className="flex-1 py-2 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 text-white font-nunito font-700 text-xs shadow-sm min-h-[36px]">

                                      Save Time
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                      }
                          </AnimatePresence>

                          {dailyReminder && dailyReminderTime && !showDailyTimePicker &&
                    <div className="px-4 pb-3 flex items-center gap-2 border-t border-purple-50 pt-2">
                              <Clock size={13} className="text-purple-400" />
                              <p className="text-xs font-dm text-purple-600 flex-1">Reminder at <span className="font-700 text-purple-800">{dailyReminderTime}</span></p>
                              <button
                        onClick={() => {setTempDailyTime(dailyReminderTime);setShowDailyTimePicker(true);}}
                        className="text-[11px] font-nunito font-700 text-purple-500 hover:text-purple-700 underline underline-offset-2">

                                Change Time
                              </button>
                            </div>
                    }
                        </div>

                        {/* Exercise Reminder */}
                        <div className="bg-white/70 rounded-3xl border border-purple-100/60 overflow-hidden">
                          <button
                      onClick={handleExerciseReminderToggle}
                      className="w-full flex items-center gap-3 p-4 hover:bg-purple-50/50 transition-colors min-h-[44px]">

                            <div className="flex-1 text-left">
                              <p className="font-nunito font-700 text-sm text-purple-900">Exercise Reminder</p>
                              <p className="text-xs font-dm text-purple-400">Remind me to do self-care exercises</p>
                            </div>
                            <div className={`w-11 h-6 rounded-full transition-all duration-300 relative ${exerciseReminder ? 'bg-purple-400' : 'bg-gray-200'}`}>
                              <motion.div
                          animate={{ x: exerciseReminder ? 20 : 2 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm" />

                            </div>
                          </button>

                          <AnimatePresence>
                            {showExerciseTimePicker &&
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden border-t border-purple-50">

                                <div className="px-4 pb-4 pt-3 space-y-2">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Clock size={13} className="text-purple-400" />
                                    <p className="text-xs font-dm text-purple-600">Set reminder time</p>
                                  </div>
                                  <input
                            type="time"
                            value={tempExerciseTime}
                            onChange={(e) => setTempExerciseTime(e.target.value)}
                            className="w-full bg-purple-50 rounded-2xl px-3 py-2.5 text-sm font-dm text-purple-900 border border-purple-100 outline-none focus:ring-2 focus:ring-purple-200" />

                                  <div className="flex gap-2">
                                    <button
                              onClick={() => setShowExerciseTimePicker(false)}
                              className="flex-1 py-2 rounded-2xl bg-gray-100 text-gray-600 font-nunito font-700 text-xs min-h-[36px]">

                                      Cancel
                                    </button>
                                    <button
                              onClick={saveExerciseReminderTime}
                              className="flex-1 py-2 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 text-white font-nunito font-700 text-xs shadow-sm min-h-[36px]">

                                      Save Time
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                      }
                          </AnimatePresence>

                          {exerciseReminder && exerciseReminderTime && !showExerciseTimePicker &&
                    <div className="px-4 pb-3 flex items-center gap-2 border-t border-purple-50 pt-2">
                              <Clock size={13} className="text-purple-400" />
                              <p className="text-xs font-dm text-purple-600 flex-1">Reminder at <span className="font-700 text-purple-800">{exerciseReminderTime}</span></p>
                              <button
                        onClick={() => {setTempExerciseTime(exerciseReminderTime);setShowExerciseTimePicker(true);}}
                        className="text-[11px] font-nunito font-700 text-purple-500 hover:text-purple-700 underline underline-offset-2">

                                Change Time
                              </button>
                            </div>
                    }
                        </div>
                      </>
                }
                  </div>
              }

                {/* PRIVACY TAB */}
                {activeSettingsTab === 'privacy' &&
              <div className="space-y-3">
                    <div className="bg-blue-50 border border-blue-100 rounded-3xl p-4">
                      <div className="flex items-start gap-2">
                        <Shield size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-nunito font-700 text-sm text-blue-800 mb-1">Your Privacy</p>
                          <p className="text-xs font-dm text-blue-700 leading-relaxed">All your data is stored locally on your device only. AureMind never collects, transmits, or shares your personal information.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/70 rounded-3xl border border-purple-100/60 overflow-hidden">
                      <button
                    onClick={() => setShowTerms(!showTerms)}
                    className="w-full flex items-center gap-3 p-4 hover:bg-purple-50/50 transition-colors min-h-[44px]">

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
                        {showTerms &&
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden">

                            <div className="px-4 pb-4 text-xs font-dm text-purple-600 leading-relaxed border-t border-purple-50">
                              <p className="pt-3">AureMind is a wellness companion app. All data is stored locally on your device. We do not collect or share personal information. This app is not a substitute for professional mental health care. Use it as a supportive tool alongside professional guidance when needed.</p>
                            </div>
                          </motion.div>
                    }
                      </AnimatePresence>
                    </div>

                    {!showClearConfirm ?
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="w-full flex items-center gap-3 p-4 rounded-3xl bg-red-50 border border-red-100 hover:bg-red-100 transition-colors min-h-[44px]">

                        <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
                          <Trash2 size={16} className="text-red-500" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-nunito font-700 text-sm text-red-700">Clear All Data</p>
                          <p className="text-xs font-dm text-red-400">Permanently delete all local data</p>
                        </div>
                      </button> :

                <div className="bg-red-50 border border-red-200 rounded-3xl p-4">
                        <p className="font-nunito font-700 text-sm text-red-800 mb-1">Are you sure?</p>
                        <p className="text-xs font-dm text-red-600 mb-3">This will delete all your notes, mood entries, streaks, and settings. This cannot be undone.</p>
                        <div className="flex gap-2">
                          <button onClick={() => setShowClearConfirm(false)} className="flex-1 py-2.5 rounded-2xl bg-white text-gray-600 font-nunito font-700 text-sm border border-gray-200 min-h-[44px]">Cancel</button>
                          <button onClick={clearAllData} className="flex-1 py-2.5 rounded-2xl bg-red-500 text-white font-nunito font-700 text-sm shadow-md min-h-[44px]">Delete All</button>
                        </div>
                      </div>
                }
                  </div>
              }

                {/* ABOUT TAB */}
                {activeSettingsTab === 'about' &&
              <div className="space-y-3">
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-5 border border-purple-100/60 text-center">
                      <div className="text-4xl mb-2">🌸</div>
                      <p className="font-nunito font-800 text-lg text-purple-900">AureMind</p>
                      <p className="text-xs font-dm text-purple-500 mb-1">Version 2.0.0</p>
                      <p className="text-xs font-dm text-purple-400 leading-relaxed">Your personal mental wellness companion. Built with care for your journey.</p>
                    </div>
                    {[
                { icon: <Info size={16} className="text-blue-400" />, bg: 'bg-blue-50', title: 'About AureMind', desc: 'A wellness app for mood tracking, self-care, and daily motivation.' },
                { icon: <Shield size={16} className="text-green-500" />, bg: 'bg-green-50', title: 'Data Storage', desc: 'All data stored locally. No servers, no tracking, no ads.' },
                { icon: <FileText size={16} className="text-purple-400" />, bg: 'bg-purple-50', title: 'Not Medical Advice', desc: 'AureMind is for personal wellness only, not clinical diagnosis.' }].
                map((item, i) =>
                <div key={i} className="bg-white/70 rounded-3xl border border-purple-100/60 p-4 flex items-start gap-3">
                        <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-nunito font-700 text-sm text-purple-900">{item.title}</p>
                          <p className="text-xs font-dm text-purple-500 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                )}
                  <div className="bg-white/70 rounded-3xl border border-purple-100/60 p-4 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                      <Phone size={16} className="text-purple-500" />
                    </div>
                    <div>
                      <p className="font-nunito font-700 text-sm text-purple-900">Contact Us</p>
                      <p className="text-xs font-dm text-purple-500 leading-relaxed">Email: auremind@gmail.com</p>
                      <p className="text-xs font-dm text-purple-500 leading-relaxed">Mobile: +91 84627 59314</p>
                    </div>
                  </div>
                  </div>
              }
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}