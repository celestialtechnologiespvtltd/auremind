'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OnboardingModal() {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [communityName, setCommunityName] = useState('');
  const [step, setStep] = useState(1);

  useEffect(() => {
    const stored = localStorage.getItem('mindbloom_user');
    if (!stored) {
      setShow(true);
    }
  }, []);

  const handleContinue = () => {
    if (step === 1 && username?.trim()) {
      setStep(2);
    } else if (step === 2 && communityName?.trim()) {
      localStorage.setItem('mindbloom_user', JSON.stringify({ username: username?.trim(), communityName: communityName?.trim() }));
      setShow(false);
    }
  };

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
                className="text-6xl mb-3"
              >
                🌸
              </motion.div>
              <h1 className="font-nunito font-800 text-2xl text-purple-900">Welcome to MindBloom</h1>
              <p className="text-sm font-dm text-purple-500 mt-1">Your personal wellness sanctuary 🌿</p>
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
                  <p className="font-nunito font-700 text-base text-purple-800 mb-1">What should we call you?</p>
                  <p className="text-xs font-dm text-purple-400 mb-4">This is how you'll appear in the community 💜</p>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e?.target?.value)}
                    onKeyDown={(e) => { if (e?.key === 'Enter') handleContinue(); }}
                    placeholder="Your name or nickname..."
                    className="w-full bg-purple-50 rounded-2xl px-4 py-3 text-sm font-dm text-purple-900 placeholder-purple-300 border border-purple-100 outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                    autoFocus
                  />
                </motion.div>
              )}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <p className="font-nunito font-700 text-base text-purple-800 mb-1">Join a community</p>
                  <p className="text-xs font-dm text-purple-400 mb-4">Name your community or group (e.g. "Mindful Mornings") 🌱</p>
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
              disabled={step === 1 ? !username?.trim() : !communityName?.trim()}
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
