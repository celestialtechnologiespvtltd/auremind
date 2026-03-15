'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Play, Pause } from 'lucide-react';

const sounds = [
  { name: 'Rain Drops', emoji: '🌧', gradient: 'gradient-blue', color: 'text-blue-800', duration: '∞', mood: 'Calming' },
  { name: 'Ocean Waves', emoji: '🌊', gradient: 'gradient-lavender', color: 'text-purple-800', duration: '∞', mood: 'Relaxing' },
  { name: 'Calm Piano', emoji: '🎹', gradient: 'gradient-peach', color: 'text-pink-800', duration: '∞', mood: 'Peaceful' },
  { name: 'Forest Birds', emoji: '🌲', gradient: 'gradient-green', color: 'text-green-800', duration: '∞', mood: 'Grounding' },
];

export default function SoundCards() {
  const [playing, setPlaying] = useState<number | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-nunito font-700 text-lg text-purple-900">Relaxing Sounds 🎶</h2>
        <span className="text-xs font-dm text-purple-400">Tap to play</span>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {sounds?.map((s, i) => (
          <motion.button
            key={s?.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setPlaying(playing === i ? null : i)}
            className={`${s?.gradient} rounded-3xl p-4 flex flex-col items-center gap-3 min-w-[100px] border border-white/60 shadow-sm transition-all duration-300 ${playing === i ? 'ring-2 ring-purple-300 shadow-lg' : ''}`}
          >
            <motion.span
              className="text-4xl"
              animate={playing === i ? { scale: [1, 1.15, 1] } : { scale: 1 }}
              transition={{ duration: 1.5, repeat: playing === i ? Infinity : 0 }}
            >
              {s?.emoji}
            </motion.span>
            <div className="text-center">
              <p className={`font-nunito font-700 text-xs ${s?.color} leading-tight`}>{s?.name}</p>
              <p className={`text-[10px] font-dm ${s?.color} opacity-60 mt-0.5`}>{s?.mood}</p>
            </div>
            <div className={`w-8 h-8 rounded-xl ${playing === i ? 'bg-white/80' : 'bg-white/50'} flex items-center justify-center transition-all`}>
              {playing === i
                ? <Pause size={14} className={s?.color} />
                : <Play size={14} className={s?.color} />
              }
            </div>
            {playing === i && (
              <div className="flex gap-0.5 items-end h-4">
                {[3, 5, 4, 6, 3]?.map((h, j) => (
                  <motion.div
                    key={j}
                    className="w-0.5 rounded-full bg-current opacity-60"
                    style={{ height: `${h * 2}px` }}
                    animate={{ scaleY: [1, 1.5, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: j * 0.1 }}
                  />
                ))}
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}