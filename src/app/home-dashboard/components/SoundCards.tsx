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

// Rain animation: falling raindrops
function RainAnimation() {
  const drops = Array.from({ length: 12 }, (_, i) => i);
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
      {drops.map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-400/50"
          style={{
            width: '2px',
            height: `${6 + (i % 4) * 3}px`,
            left: `${(i * 8) % 90 + 5}%`,
            top: '-10px',
          }}
          animate={{ y: [0, 130], opacity: [0, 0.8, 0] }}
          transition={{
            duration: 0.8 + (i % 3) * 0.3,
            repeat: Infinity,
            delay: (i * 0.15) % 1.2,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

// Fire animation: rising flame particles
function FireAnimation() {
  const particles = Array.from({ length: 10 }, (_, i) => i);
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${6 + (i % 4) * 4}px`,
            height: `${6 + (i % 4) * 4}px`,
            background: i % 3 === 0 ? 'rgba(251,146,60,0.7)' : i % 3 === 1 ? 'rgba(239,68,68,0.6)' : 'rgba(253,224,71,0.6)',
            left: `${20 + (i * 7) % 60}%`,
            bottom: '5px',
          }}
          animate={{
            y: [0, -(40 + (i % 3) * 20)],
            x: [0, (i % 2 === 0 ? 6 : -6)],
            opacity: [0.8, 0],
            scale: [1, 0.3],
          }}
          transition={{
            duration: 0.9 + (i % 3) * 0.3,
            repeat: Infinity,
            delay: (i * 0.12) % 1,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

// Ocean animation: horizontal wave ripples
function OceanAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 rounded-full"
          style={{
            height: '3px',
            background: 'rgba(139,92,246,0.35)',
            bottom: `${10 + i * 12}px`,
          }}
          animate={{ scaleX: [0.6, 1.1, 0.6], x: ['-10%', '10%', '-10%'], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
        />
      ))}
    </div>
  );
}

// Forest animation: swaying leaves
function ForestAnimation() {
  const leaves = ['🍃', '🌿', '🍀'];
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
      {leaves.map((leaf, i) => (
        <motion.span
          key={i}
          className="absolute text-sm"
          style={{ left: `${15 + i * 28}%`, top: `${10 + i * 15}%` }}
          animate={{ rotate: [-12, 12, -12], y: [0, 4, 0] }}
          transition={{ duration: 2 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        >
          {leaf}
        </motion.span>
      ))}
    </div>
  );
}

// Thunder animation: lightning flash
function ThunderAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{ background: 'rgba(250,250,100,0.25)' }}
        animate={{ opacity: [0, 0, 0.7, 0, 0, 0, 0.4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', times: [0, 0.3, 0.35, 0.4, 0.6, 0.7, 0.72, 0.78] }}
      />
      <motion.div
        className="absolute"
        style={{ left: '40%', top: '5px', fontSize: '20px' }}
        animate={{ opacity: [0, 0, 1, 0, 0, 0, 0.8, 0], y: [0, 0, 0, 5, 5, 5, 5, 10] }}
        transition={{ duration: 3, repeat: Infinity, times: [0, 0.3, 0.35, 0.4, 0.6, 0.7, 0.72, 0.78] }}
      >
        ⚡
      </motion.div>
    </div>
  );
}

// White noise animation: static particle dots
function WhiteNoiseAnimation() {
  const dots = Array.from({ length: 16 }, (_, i) => i);
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
      {dots.map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-amber-400/40"
          style={{
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            left: `${(i * 6) % 90 + 5}%`,
            top: `${(i * 11) % 80 + 5}%`,
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
          transition={{ duration: 0.4 + (i % 4) * 0.15, repeat: Infinity, delay: (i * 0.07) % 0.8 }}
        />
      ))}
    </div>
  );
}

// Coffee shop animation: rising steam
function CoffeeAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-amber-300/30"
          style={{ width: '8px', height: '8px', left: `${25 + i * 22}%`, bottom: '15px' }}
          animate={{ y: [0, -50], x: [0, (i % 2 === 0 ? 8 : -8), 0], opacity: [0.6, 0], scale: [1, 2] }}
          transition={{ duration: 1.5 + i * 0.3, repeat: Infinity, delay: i * 0.4, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

// Tibetan bowls animation: expanding ripple circles
function BowlsAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none flex items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-purple-400/40"
          animate={{ scale: [0.3, 1.8], opacity: [0.7, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.65, ease: 'easeOut' }}
          style={{ width: '60px', height: '60px' }}
        />
      ))}
    </div>
  );
}

// Birds animation: flying bird shapes
function BirdsAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute text-xs"
          style={{ top: `${15 + i * 18}%`, left: '-10px' }}
          animate={{ x: [0, 130], y: [0, (i % 2 === 0 ? -8 : 8), 0], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.5 + i * 0.5, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }}
        >
          🐦
        </motion.span>
      ))}
    </div>
  );
}

// Deep space animation: floating stars
function SpaceAnimation() {
  const stars = Array.from({ length: 10 }, (_, i) => i);
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
      {stars.map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-200"
          style={{
            width: `${1 + (i % 3)}px`,
            height: `${1 + (i % 3)}px`,
            left: `${(i * 9) % 90 + 5}%`,
            top: `${(i * 13) % 80 + 5}%`,
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
          transition={{ duration: 1.5 + (i % 3) * 0.5, repeat: Infinity, delay: (i * 0.2) % 2 }}
        />
      ))}
    </div>
  );
}

// Stream animation: flowing water ripples
function StreamAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-green-400/40"
          style={{ width: `${20 + i * 10}px`, height: `${8 + i * 3}px`, left: `${10 + i * 18}%`, bottom: `${8 + i * 6}px` }}
          animate={{ scaleX: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3], x: [0, 8, 0] }}
          transition={{ duration: 1.5 + i * 0.3, repeat: Infinity, delay: i * 0.25, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// Piano animation: gentle floating notes
function PianoAnimation() {
  const notes = ['♩', '♪', '♫'];
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
      {notes.map((note, i) => (
        <motion.span
          key={i}
          className="absolute text-pink-400/60 text-sm font-bold"
          style={{ left: `${20 + i * 25}%`, bottom: '10px' }}
          animate={{ y: [0, -50], opacity: [0.7, 0], x: [0, (i % 2 === 0 ? 5 : -5)] }}
          transition={{ duration: 1.8 + i * 0.3, repeat: Infinity, delay: i * 0.5, ease: 'easeOut' }}
        >
          {note}
        </motion.span>
      ))}
    </div>
  );
}

function SoundAnimation({ type }: { type: string }) {
  switch (type) {
    case 'rain': return <RainAnimation />;
    case 'fire': return <FireAnimation />;
    case 'ocean': return <OceanAnimation />;
    case 'forest': return <ForestAnimation />;
    case 'thunder': return <ThunderAnimation />;
    case 'white': return <WhiteNoiseAnimation />;
    case 'coffee': return <CoffeeAnimation />;
    case 'bowls': return <BowlsAnimation />;
    case 'birds': return <BirdsAnimation />;
    case 'space': return <SpaceAnimation />;
    case 'stream': return <StreamAnimation />;
    case 'piano': return <PianoAnimation />;
    default: return null;
  }
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
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-nunito font-700 text-lg text-purple-900">Relaxing Sounds 🎶</h2>
        <span className="text-xs font-dm text-purple-400">Tap to play</span>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {sounds?.map((s, i) => (
          <motion.button
            key={s?.name}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -6, scale: 1.05, boxShadow: '0 14px 36px rgba(139,92,246,0.20)' }}
            whileTap={{ scale: 0.94, y: 0 }}
            onClick={() => togglePlay(i)}
            className={`relative ${s?.gradient} rounded-3xl p-4 flex flex-col items-center min-w-[100px] w-[100px] h-[170px] border border-white/60 shadow-sm transition-shadow duration-300 overflow-hidden ${playing === i ? 'ring-2 ring-purple-300 shadow-xl' : ''}`}
          >
            <AnimatePresence>
              {playing === i && <SoundAnimation type={s?.type} />}
            </AnimatePresence>

            {/* Top content area */}
            <div className="flex flex-col items-center flex-1 w-full relative z-10">
              <motion.span
                className="text-4xl"
                animate={playing === i ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                transition={{ duration: 1.5, repeat: playing === i ? Infinity : 0 }}
              >
                {s?.emoji}
              </motion.span>
              <div className="text-center mt-1">
                <p className={`font-nunito font-700 text-xs ${s?.color} leading-tight`}>{s?.name}</p>
                <p className={`text-[10px] font-dm ${s?.color} opacity-60 mt-0.5`}>{s?.mood}</p>
              </div>
              {playing === i && (
                <div className="flex gap-0.5 items-end h-4 mt-1">
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
            </div>

            {/* Play button always at bottom */}
            <div className={`w-8 h-8 rounded-xl shrink-0 ${playing === i ? 'bg-white/80' : 'bg-white/50'} flex items-center justify-center transition-all relative z-10 mt-2`}>
              {playing === i
                ? <Pause size={14} className={s?.color} />
                : <Play size={14} className={s?.color} />
              }
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}