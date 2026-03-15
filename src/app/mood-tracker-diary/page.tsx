'use client';

import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import MoodInput from './components/MoodInput';
import DiaryEditor from './components/DiaryEditor';
import WeeklyMoodChart from './components/WeeklyMoodChart';
import PastEntries from './components/PastEntries';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

export default function MoodTrackerDiaryPage() {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <AppLayout>
      <div className="space-y-6 py-2 relative">
        <div>
          <h1 className="font-nunito font-800 text-2xl text-purple-900">My Diary 📖</h1>
          <p className="text-sm font-dm text-purple-500 mt-0.5">
            {new Date()?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <MoodInput />
        <WeeklyMoodChart />
        <PastEntries />

        {/* Floating + button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
          onClick={() => setShowEditor(true)}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="fixed bottom-24 right-5 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 text-white shadow-xl flex items-center justify-center border-2 border-white/60"
          aria-label="New diary entry"
        >
          <Plus size={26} strokeWidth={2.5} />
        </motion.button>

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
                <DiaryEditor onClose={() => setShowEditor(false)} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}