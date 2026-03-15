'use client';

import { useState, useEffect } from 'react';
import BottomNav from './BottomNav';
import AppLogo from '@/components/ui/AppLogo';
import { Bell, Settings, X, User, Users, FileText, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AppLayoutProps {
  children: React.ReactNode;
  hideHeader?: boolean;
}

export default function AppLayout({ children, hideHeader = false }: AppLayoutProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [username, setUsername] = useState('');
  const [communityName, setCommunityName] = useState('');
  const [notifGranted, setNotifGranted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('mindbloom_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUsername(parsed.username || '');
        setCommunityName(parsed.communityName || '');
      } catch {}
    }
    if (typeof Notification !== 'undefined') {
      setNotifGranted(Notification.permission === 'granted');
    }
  }, [showSettings]);

  const requestNotifications = async () => {
    if (typeof Notification === 'undefined') return;
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      setNotifGranted(true);
      // Schedule daily check-in reminder
      const scheduleNotif = (title: string, body: string, delayMs: number) => {
        setTimeout(() => {
          new Notification(title, { body, icon: '/favicon.ico' });
        }, delayMs);
      };
      scheduleNotif('🌸 Daily Check-in', 'How are you feeling today? Take a moment to log your mood in MindBloom.', 5000);
      scheduleNotif('🧘 Exercise Reminder', 'Time for your daily breathing exercise! Just 5 minutes can transform your day.', 10000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 pb-28">
      {!hideHeader && (
        <header className="fixed top-0 left-0 right-0 z-40 bg-white/70 backdrop-blur-xl border-b border-white/60 px-4 py-3">
          <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AppLogo size={32} />
              <span className="font-nunito font-800 text-xl text-purple-800 tracking-tight">MindBloom</span>
            </div>
            <div className="flex items-center gap-2">
              {/* Notification button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={requestNotifications}
                title={notifGranted ? 'Notifications enabled' : 'Enable daily reminders'}
                className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-colors relative ${notifGranted ? 'bg-pink-100 text-pink-500' : 'bg-pink-50 hover:bg-pink-100 text-pink-400'}`}
              >
                <Bell size={18} />
                {notifGranted && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-green-400" />
                )}
              </motion.button>
              {/* Settings button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSettings(true)}
                className="w-9 h-9 rounded-2xl bg-purple-50 hover:bg-purple-100 flex items-center justify-center text-purple-500 transition-colors"
              >
                <Settings size={18} />
              </motion.button>
            </div>
          </div>
        </header>
      )}

      <main className="max-w-screen-2xl mx-auto px-4 py-4 xl:px-8 2xl:px-12 pt-20">
        {children}
      </main>
      <BottomNav />

      {/* Settings Panel */}
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
              className="bg-white/95 backdrop-blur-xl rounded-4xl p-6 w-full max-w-sm border border-purple-100 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-nunito font-800 text-lg text-purple-900">Profile & Settings ✦</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-8 h-8 rounded-xl bg-purple-50 hover:bg-purple-100 flex items-center justify-center text-purple-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Profile info */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-4 border border-purple-100/60 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center text-2xl border border-white/60">
                    🌸
                  </div>
                  <div>
                    <p className="font-nunito font-800 text-base text-purple-900">{username || 'Anonymous'}</p>
                    <p className="text-xs font-dm text-purple-500">MindBloom Member</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 bg-white/60 rounded-2xl px-3 py-2 border border-white/60">
                    <User size={14} className="text-purple-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-dm text-purple-400 uppercase tracking-wide">Username</p>
                      <p className="text-sm font-nunito font-700 text-purple-800 truncate">{username || 'Not set'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/60 rounded-2xl px-3 py-2 border border-white/60">
                    <Users size={14} className="text-purple-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-dm text-purple-400 uppercase tracking-wide">Community</p>
                      <p className="text-sm font-nunito font-700 text-purple-800 truncate">{communityName || 'Not set'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-white/70 rounded-3xl border border-purple-100/60 overflow-hidden mb-4">
                <button
                  onClick={requestNotifications}
                  className="w-full flex items-center gap-3 p-4 hover:bg-purple-50/50 transition-colors"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${notifGranted ? 'bg-green-100' : 'bg-pink-50'}`}>
                    <Bell size={16} className={notifGranted ? 'text-green-600' : 'text-pink-400'} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-nunito font-700 text-sm text-purple-900">Daily Reminders</p>
                    <p className="text-xs font-dm text-purple-400">{notifGranted ? 'Notifications enabled ✓' : 'Tap to enable check-in reminders'}</p>
                  </div>
                  <ChevronRight size={16} className="text-purple-300" />
                </button>
              </div>

              {/* Terms & Service */}
              <div className="bg-white/70 rounded-3xl border border-purple-100/60 overflow-hidden">
                <button
                  onClick={() => setShowTerms(!showTerms)}
                  className="w-full flex items-center gap-3 p-4 hover:bg-purple-50/50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                    <FileText size={16} className="text-blue-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-nunito font-700 text-sm text-purple-900">Terms & Service Policy</p>
                    <p className="text-xs font-dm text-purple-400">View our terms and privacy policy</p>
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
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-3 border-t border-purple-50">
                        <div className="pt-3">
                          <p className="font-nunito font-700 text-xs text-purple-800 mb-1">Terms of Service</p>
                          <p className="text-xs font-dm text-purple-600 leading-relaxed">MindBloom is a personal wellness companion. By using this app, you agree to use it responsibly and understand it is not a substitute for professional mental health care.</p>
                        </div>
                        <div>
                          <p className="font-nunito font-700 text-xs text-purple-800 mb-1">Privacy Policy</p>
                          <p className="text-xs font-dm text-purple-600 leading-relaxed">Your diary entries and mood data are stored locally on your device. We do not collect, sell, or share your personal information with third parties.</p>
                        </div>
                        <div>
                          <p className="font-nunito font-700 text-xs text-purple-800 mb-1">Community Guidelines</p>
                          <p className="text-xs font-dm text-purple-600 leading-relaxed">Be kind, supportive, and respectful. No harmful, abusive, or triggering content. If you are in crisis, please contact a professional helpline immediately.</p>
                        </div>
                        <div className="bg-blue-50 rounded-2xl p-3 border border-blue-100">
                          <p className="text-xs font-dm text-blue-700 leading-relaxed">🛡️ <strong>Disclaimer:</strong> MindBloom is not a medical device and does not provide clinical diagnosis or treatment. Always consult a qualified mental health professional for serious concerns.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <p className="text-center text-[10px] font-dm text-purple-300 mt-4">MindBloom v1.0 · Made with 💜</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}