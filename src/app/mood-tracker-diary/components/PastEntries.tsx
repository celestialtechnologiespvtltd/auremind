'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Trash2, X } from 'lucide-react';

interface DiaryEntry {
  id: number;
  text: string;
  mood?: number;
  moodLabel?: string;
  date: string;
  time: string;
  timestamp: string;
  emoji?: string;
  tags?: string[];
  gradient?: string;
}

const tagColors: Record<string, string> = {
  Hopeful: 'bg-yellow-100 text-yellow-700',
  Calm: 'bg-green-100 text-green-700',
  Tired: 'bg-indigo-100 text-indigo-700',
  Anxious: 'bg-blue-100 text-blue-700',
  Excited: 'bg-orange-100 text-orange-700',
  Grateful: 'bg-pink-100 text-pink-700',
  Lonely: 'bg-purple-100 text-purple-700',
  Stressed: 'bg-red-100 text-red-700',
};

const moodEmoji = (mood?: number) => {
  if (!mood) return '📝';
  if (mood <= 2) return '😢';
  if (mood <= 4) return '😕';
  if (mood <= 6) return '🙂';
  if (mood <= 8) return '😄';
  return '🥳';
};

const gradients = ['gradient-lavender', 'gradient-blue', 'gradient-peach', 'gradient-green', 'gradient-pink'];

interface PastEntriesProps {
  refreshTrigger?: number;
}

export default function PastEntries({ refreshTrigger }: PastEntriesProps) {
  const [items, setItems] = useState<DiaryEntry[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [fullViewEntry, setFullViewEntry] = useState<DiaryEntry | null>(null);

  const loadEntries = useCallback(() => {
    try {
      const notes: DiaryEntry[] = JSON.parse(localStorage.getItem('mindbloom_notes') || '[]');
      setItems(notes);
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    loadEntries();
  }, [loadEntries, refreshTrigger]);

  const deleteEntry = (id: number) => {
    const updated = items.filter(e => e.id !== id);
    setItems(updated);
    try {
      localStorage.setItem('mindbloom_notes', JSON.stringify(updated));
    } catch {}
    if (fullViewEntry?.id === id) setFullViewEntry(null);
  };

  return (
    <>
      <div>
        <h2 className="font-nunito font-700 text-lg text-purple-900 mb-3">Past Entries 📚</h2>
        {items.length === 0 && (
          <div className="bg-white/60 rounded-3xl p-6 text-center border border-white/60">
            <p className="text-4xl mb-2">📖</p>
            <p className="font-nunito font-600 text-purple-700 text-sm">No entries yet</p>
            <p className="font-dm text-purple-400 text-xs mt-1">Start writing to see your entries here</p>
          </div>
        )}
        <div className="space-y-3">
          <AnimatePresence>
            {items.map((entry, idx) => (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                className="bg-white/70 backdrop-blur-sm rounded-3xl border border-white/60 shadow-sm overflow-hidden"
              >
                <button
                  className="w-full p-4 flex items-center gap-3 text-left"
                  onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}
                >
                  <div className={`w-11 h-11 rounded-2xl ${gradients[idx % gradients.length]} flex items-center justify-center text-2xl flex-shrink-0 shadow-sm border border-white/60`}>
                    {entry.emoji || moodEmoji(entry.mood)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-nunito font-700 text-sm text-purple-900">{entry.date}</p>
                      <div className="flex items-center gap-1">
                        {entry.mood && <span className="font-dm text-xs text-purple-400">{entry.mood}/10</span>}
                        <motion.div
                          animate={{ rotate: expanded === entry.id ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={16} className="text-purple-400" />
                        </motion.div>
                      </div>
                    </div>
                    <p className="text-xs font-dm text-purple-500 mt-0.5 truncate">{entry.text?.slice(0, 60)}…</p>
                  </div>
                </button>

                <AnimatePresence>
                  {expanded === entry.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4">
                        <div className="bg-purple-50/60 rounded-2xl p-3 border border-purple-100/40">
                          <p className="text-sm font-dm text-purple-800 leading-relaxed line-clamp-3">{entry.text}</p>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-xs font-dm text-purple-400">Written at {entry.time}</p>
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setFullViewEntry(entry)}
                              className="px-3 py-1 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-500 text-xs font-nunito font-600 transition-colors"
                            >
                              Read more
                            </motion.button>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => deleteEntry(entry.id)}
                              className="w-7 h-7 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-400 transition-colors"
                            >
                              <Trash2 size={13} />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Full-view slide-up sheet with smooth backdrop */}
      <AnimatePresence>
        {fullViewEntry && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              onClick={() => setFullViewEntry(null)}
            />
            {/* Slide-up sheet */}
            <motion.div
              key="sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 36 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-4xl shadow-2xl max-h-[85vh] flex flex-col"
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
                <div className="w-10 h-1 rounded-full bg-purple-200" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-purple-50 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl ${gradients[items.findIndex(e => e.id === fullViewEntry.id) % gradients.length]} flex items-center justify-center text-xl border border-white/60`}>
                    {fullViewEntry.emoji || moodEmoji(fullViewEntry.mood)}
                  </div>
                  <div>
                    <p className="font-nunito font-700 text-sm text-purple-900">{fullViewEntry.date}</p>
                    <p className="text-xs font-dm text-purple-400">{fullViewEntry.time}{fullViewEntry.mood ? ` · ${fullViewEntry.mood}/10` : ''}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteEntry(fullViewEntry.id)}
                    className="w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-400 transition-colors"
                  >
                    <Trash2 size={15} />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setFullViewEntry(null)}
                    className="w-9 h-9 rounded-xl bg-purple-50 hover:bg-purple-100 flex items-center justify-center text-purple-500 transition-colors"
                  >
                    <X size={16} />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto flex-1 px-5 py-4">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-4 border border-purple-100/40">
                  <p className="text-sm font-dm text-purple-800 leading-relaxed whitespace-pre-wrap">{fullViewEntry.text}</p>
                </div>
                {fullViewEntry.tags && fullViewEntry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {fullViewEntry.tags.map(tag => (
                      <span key={tag} className={`text-xs font-dm px-2.5 py-1 rounded-full ${tagColors[tag] || 'bg-gray-100 text-gray-600'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="h-6" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}