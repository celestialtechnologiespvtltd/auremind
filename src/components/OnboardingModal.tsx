'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OnboardingModal() {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [communityName, setCommunityName] = useState('');
  const [step, setStep] = useState(1);
  const [usernameError, setUsernameError] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('mindbloom_user');
    if (!stored) {
      setShow(true);
    }
  }, []);

  const validateUsername = (val: string): string => {
    if (!val) return '';
    if (val.length < 3) return 'Must be at least 3 characters';
    if (val.length > 20) return 'Must be 20 characters or less';
    if (!/^[a-zA-Z0-9_]+$/.test(val)) return 'Only letters, numbers, and underscores allowed';
    return '';
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\s/g, '');
    setUsername(raw);
    setUsernameError(validateUsername(raw));
  };

  const handleContinue = () => {
    if (step === 1) {
      const err = validateUsername(username.trim());
      if (err) { setUsernameError(err); return; }
      if (!username.trim()) return;
      setStep(2);
    } else if (step === 2 && communityName?.trim()) {
      localStorage.setItem('mindbloom_user', JSON.stringify({
        username: username.trim(),
        communityName: communityName.trim(),
        usernamePublic: true,
      }));
      setShow(false);
    }
  };

  const isStep1Valid = username.trim().length >= 3 && !usernameError;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="bg-white/90 backdrop-blur-xl rounded-4xl p-8 w-full max-w-sm border border-white/60 shadow-2xl"
          >
            {/* Logo area */}
            <div className="text-center mb-6">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="flex items-center justify-center mb-3"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-lg">
                  <span className="text-3xl">🌸</span>
                </div>
              </motion.div>
              <h1 className="font-nunito font-800 text-2xl text-purple-900 tracking-tight">AureMind</h1>
              <div className="mt-1 mb-3">
                <p className="text-sm font-dm font-semibold text-purple-600 leading-snug">Elevate Your Mind</p>
                <p className="text-sm font-dm font-semibold text-purple-600 leading-snug">Embrace Your Calm</p>
              </div>
              <p className="text-xs font-dm text-purple-400 leading-relaxed px-1">
                AureMind is your personal mental wellness companion designed to help you understand your emotions, track your mood, and build a healthier mind through reflection, motivation, and community support.
              </p>
            </div>

            {/* Step indicator */}
            <div className="flex gap-2 justify-center mb-6">
              <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-purple-400 w-8' : 'bg-purple-100 w-4'}`} />
              <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-pink-400 w-8' : 'bg-purple-100 w-4'}`} />
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <p className="font-nunito font-700 text-base text-purple-800 mb-1">What's your real name?</p>
                  <p className="text-xs font-dm text-purple-400 mb-4">
                    This becomes your <span className="font-semibold text-purple-600">@username</span> — letters, numbers & underscores only (3–20 chars) 💜
                  </p>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-dm text-purple-400 font-semibold">@</span>
                    <input
                      type="text"
                      value={username}
                      onChange={handleUsernameChange}
                      onKeyDown={(e) => { if (e?.key === 'Enter') handleContinue(); }}
                      placeholder="yourname"
                      maxLength={20}
                      className={`w-full bg-purple-50 rounded-2xl pl-8 pr-4 py-3 text-sm font-dm text-purple-900 placeholder-purple-300 border outline-none focus:ring-2 transition-all ${
                        usernameError ? 'border-red-300 focus:ring-red-200' : 'border-purple-100 focus:ring-purple-200'
                      }`}
                      autoFocus
                    />
                  </div>
                  {usernameError && (
                    <p className="text-xs text-red-500 mt-1.5 font-dm">{usernameError}</p>
                  )}
                  {username && !usernameError && (
                    <p className="text-xs text-purple-500 mt-1.5 font-dm">
                      Your handle: <span className="font-semibold text-purple-700">@{username}</span>
                    </p>
                  )}
                </motion.div>
              )}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <p className="font-nunito font-700 text-base text-purple-800 mb-1">Name your community 🌱</p>
                  <p className="text-xs font-dm text-purple-400 mb-4">This is your community display name — be creative! (e.g. "Mindful Mornings")</p>
                  <input
                    type="text"
                    value={communityName}
                    onChange={(e) => setCommunityName(e?.target?.value)}
                    onKeyDown={(e) => { if (e?.key === 'Enter') handleContinue(); }}
                    placeholder="Community name..."
                    className="w-full bg-purple-50 rounded-2xl px-4 py-3 text-sm font-dm text-purple-900 placeholder-purple-300 border border-purple-100 outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                    autoFocus
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleContinue}
              disabled={step === 1 ? !isStep1Valid : !communityName?.trim()}
              className="w-full mt-5 py-3 rounded-2xl font-nunito font-700 text-sm bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-md disabled:opacity-40 transition-all"
            >
              {step === 1 ? 'Continue →' : 'Enter MindBloom 🌸'}
            </motion.button>

            <p className="text-center text-[10px] font-dm text-purple-300 mt-3">Your data stays on your device. We respect your privacy.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
