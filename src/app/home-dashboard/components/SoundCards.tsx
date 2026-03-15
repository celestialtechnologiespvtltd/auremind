'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

const sounds = [
  { name: 'Rain Drops', emoji: '🌧️', gradient: 'gradient-blue', color: 'text-blue-800', duration: '∞', mood: 'Calming', type: 'rain' },
  { name: 'Ocean Waves', emoji: '🌊', gradient: 'gradient-lavender', color: 'text-purple-800', duration: '∞', mood: 'Relaxing', type: 'ocean' },
  { name: 'Calm Piano', emoji: '🎹', gradient: 'gradient-peach', color: 'text-pink-800', duration: '∞', mood: 'Peaceful', type: 'piano' },
  { name: 'Forest Birds', emoji: '🌲', gradient: 'gradient-green', color: 'text-green-800', duration: '∞', mood: 'Grounding', type: 'forest' },
  { name: 'Thunderstorm', emoji: '⛈️', gradient: 'gradient-blue', color: 'text-blue-800', duration: '∞', mood: 'Powerful', type: 'thunder' },
  { name: 'White Noise', emoji: '🌫️', gradient: 'gradient-cream', color: 'text-amber-800', duration: '∞', mood: 'Focus', type: 'white' },
  { name: 'Coffee Shop', emoji: '☕', gradient: 'gradient-cream', color: 'text-amber-800', duration: '∞', mood: 'Cozy', type: 'coffee' },
  { name: 'Fireplace', emoji: '🔥', gradient: 'gradient-peach', color: 'text-pink-800', duration: '∞', mood: 'Warm', type: 'fire' },
  { name: 'Tibetan Bowls', emoji: '🎵', gradient: 'gradient-lavender', color: 'text-purple-800', duration: '∞', mood: 'Meditative', type: 'bowls' },
  { name: 'Birds at Dawn', emoji: '🐦', gradient: 'gradient-green', color: 'text-green-800', duration: '∞', mood: 'Uplifting', type: 'birds' },
  { name: 'Deep Space', emoji: '🌌', gradient: 'gradient-blue', color: 'text-blue-800', duration: '∞', mood: 'Cosmic', type: 'space' },
  { name: 'Gentle Stream', emoji: '🏞️', gradient: 'gradient-green', color: 'text-green-800', duration: '∞', mood: 'Serene', type: 'stream' },
];

function GenericAnimation({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-15"
          style={{ background: color, width: `${60 + i * 20}px`, height: `${60 + i * 20}px`, bottom: `-${i * 10}px`, left: `${i * 15}%` }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        />
      ))}
    </div>
  );
}

export default function SoundCards() {
  const [playing, setPlaying] = useState<number | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mindbloom_sound_prefs');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.lastPlaying !== null && parsed.lastPlaying !== undefined) {
          // Don't auto-resume, just restore preference
        }
      }
    } catch {}
  }, []);

  const togglePlay = (i: number) => {
    const next = playing === i ? null : i;
    setPlaying(next);
    try {
      localStorage.setItem('mindbloom_sound_prefs', JSON.stringify({ lastPlaying: next }));
    } catch {}
  };

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
            transition={{ delay: i * 0.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => togglePlay(i)}
            className={`relative ${s?.gradient} rounded-3xl p-4 flex flex-col items-center gap-3 min-w-[100px] border border-white/60 shadow-sm transition-all duration-300 overflow-hidden min-h-[44px] ${playing === i ? 'ring-2 ring-purple-300 shadow-lg' : ''}`}
          >
            <AnimatePresence>
              {playing === i && <GenericAnimation color="#CDB4DB" />}
            </AnimatePresence>

            <motion.span
              className="text-4xl relative z-10"
              animate={playing === i ? { scale: [1, 1.15, 1] } : { scale: 1 }}
              transition={{ duration: 1.5, repeat: playing === i ? Infinity : 0 }}
            >
              {s?.emoji}
            </motion.span>
            <div className="text-center relative z-10">
              <p className={`font-nunito font-700 text-xs ${s?.color} leading-tight`}>{s?.name}</p>
              <p className={`text-[10px] font-dm ${s?.color} opacity-60 mt-0.5`}>{s?.mood}</p>
            </div>
            <div className={`w-8 h-8 rounded-xl ${playing === i ? 'bg-white/80' : 'bg-white/50'} flex items-center justify-center transition-all relative z-10`}>
              {playing === i
                ? <Pause size={14} className={s?.color} />
                : <Play size={14} className={s?.color} />
              }
            </div>
            {playing === i && (
              <div className="flex gap-0.5 items-end h-4 relative z-10">
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