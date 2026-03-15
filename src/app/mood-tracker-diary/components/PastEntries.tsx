'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

// Backend: GET /api/diary-entries?userId=current&limit=10
const entries = [
  {
    id: 1, date: 'March 14, 2026', time: '9:32 PM', mood: 7, emoji: '😄',
    tags: ['Hopeful', 'Calm'],
    text: "Had a productive day. Managed to complete my morning routine and even went for a short walk. The fresh air really helped clear my head. Feeling grateful for small wins.",
    gradient: 'gradient-lavender',
  },
  {
    id: 2, date: 'March 13, 2026', time: '8:15 PM', mood: 4, emoji: '😕',
    tags: ['Tired', 'Anxious'],
    text: "Struggled with focus today. My mind kept wandering and I couldn\'t shake the feeling of unease. Did the breathing exercise before bed which helped a little.",
    gradient: 'gradient-blue',
  },
  {
    id: 3, date: 'March 12, 2026', time: '10:05 PM', mood: 8, emoji: '😁',
    tags: ['Excited', 'Grateful'],
    text: "Amazing day! Got great news from work and spent the evening with friends. Laughed so much my cheeks hurt. Days like this remind me why it\'s worth pushing through the hard ones.",
    gradient: 'gradient-peach',
  },
  {
    id: 4, date: 'March 11, 2026', time: '7:50 PM', mood: 5, emoji: '🙂',
    tags: ['Calm'],
    text: "Quiet day at home. Read for a couple of hours and made a proper meal instead of ordering in. Nothing special but it felt grounding.",
    gradient: 'gradient-green',
  },
  {
    id: 5, date: 'March 10, 2026', time: '11:20 PM', mood: 3, emoji: '😢',
    tags: ['Lonely', 'Tired'],
    text: "Hard day. Feeling disconnected from everything. Tried to reach out to a friend but they were busy. Will try the community section tomorrow.",
    gradient: 'gradient-pink',
  },
];

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

export default function PastEntries() {
  const [expanded, setExpanded] = useState<number | null>(1);
  const [items, setItems] = useState(entries);

  const deleteEntry = (id: number) => {
    // Backend: DELETE /api/diary-entries/:id
    setItems(prev => prev.filter(e => e.id !== id));
    toast.success('Entry removed');
  };

  return (
    <div>
      <h2 className="font-nunito font-700 text-lg text-purple-900 mb-3">Past Entries 📚</h2>
      <div className="space-y-3">
        <AnimatePresence>
          {items.map((entry) => (
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
                <div className={`w-11 h-11 rounded-2xl ${entry.gradient} flex items-center justify-center text-2xl flex-shrink-0 shadow-sm border border-white/60`}>
                  {entry.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-nunito font-700 text-sm text-purple-900">{entry.date}</p>
                    <div className="flex items-center gap-1">
                      <span className="font-dm text-xs text-purple-400 text-tabular">{entry.mood}/10</span>
                      <motion.div
                        animate={{ rotate: expanded === entry.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={16} className="text-purple-400" />
                      </motion.div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    {entry.tags.map(tag => (
                      <span key={tag} className={`text-[10px] font-dm px-2 py-0.5 rounded-full ${tagColors[tag] || 'bg-gray-100 text-gray-600'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
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
                        <p className="text-sm font-dm text-purple-800 leading-relaxed">{entry.text}</p>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-xs font-dm text-purple-400">Written at {entry.time}</p>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteEntry(entry.id)}
                          className="w-7 h-7 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-400 transition-colors"
                        >
                          <Trash2 size={13} />
                        </motion.button>
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
  );
}