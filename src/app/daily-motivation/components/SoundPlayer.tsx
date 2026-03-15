'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';

const sounds = [
  {
    name: 'Rain on Leaves',
    emoji: '🌧️',
    gradient: 'gradient-blue',
    textColor: 'text-blue-800',
    bgBar: 'bg-blue-300',
    mood: 'Calming',
    duration: '∞',
    waveColor: '#A2D2FF',
    desc: 'Soft rainfall on forest leaves',
  },
  {
    name: 'Ocean Waves',
    emoji: '🌊',
    gradient: 'gradient-lavender',
    textColor: 'text-purple-800',
    bgBar: 'bg-purple-300',
    mood: 'Relaxing',
    duration: '∞',
    waveColor: '#CDB4DB',
    desc: 'Gentle waves rolling ashore',
  },
  {
    name: 'Calm Piano',
    emoji: '🎹',
    gradient: 'gradient-peach',
    textColor: 'text-pink-800',
    bgBar: 'bg-pink-300',
    mood: 'Peaceful',
    duration: '∞',
    waveColor: '#FFC8DD',
    desc: 'Soft piano melodies for focus',
  },
  {
    name: 'Forest Dawn',
    emoji: '🌲',
    gradient: 'gradient-green',
    textColor: 'text-green-800',
    bgBar: 'bg-green-300',
    mood: 'Grounding',
    duration: '∞',
    waveColor: '#b7ebd8',
    desc: 'Birds and morning forest breeze',
  },
];

export default function SoundPlayer() {
  const [playing, setPlaying] = useState<number | null>(null);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(70);

  const toggle = (i: number) => {
    if (playing === i) {
      setPlaying(null);
      toast('Paused 🎵');
    } else {
      setPlaying(i);
      toast.success(`Now playing: ${sounds[i].name} ${sounds[i].emoji}`);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-nunito font-700 text-lg text-purple-900">Relaxing Sounds 🎵</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMuted(!muted)}
            className="w-8 h-8 rounded-xl bg-white/60 border border-purple-100 flex items-center justify-center text-purple-500 hover:bg-white/90 transition-all"
          >
            {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>
      </div>

      {/* Volume control */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-3 border border-white/60 mb-4 flex items-center gap-3">
        <Volume2 size={15} className="text-purple-400 flex-shrink-0" />
        <input
          type="range"
          min={0}
          max={100}
          value={muted ? 0 : volume}
          onChange={(e) => { setVolume(Number(e.target.value)); setMuted(false); }}
          className="flex-1 cursor-pointer"
          style={{
            background: `linear-gradient(to right, #CDB4DB 0%, #CDB4DB ${muted ? 0 : volume}%, #e8d5f5 ${muted ? 0 : volume}%, #e8d5f5 100%)`
          }}
        />
        <span className="text-xs font-dm text-purple-500 text-tabular w-8 text-right">{muted ? 0 : volume}%</span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {sounds.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -3 }}
            className={`${s.gradient} rounded-3xl p-4 border border-white/60 shadow-sm transition-all duration-300 ${playing === i ? 'ring-2 ring-offset-1 ring-purple-300 shadow-lg' : ''}`}
          >
            <div className="flex flex-col items-center gap-2">
              <motion.span
                className="text-4xl"
                animate={playing === i ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                transition={{ duration: 2, repeat: playing === i ? Infinity : 0 }}
              >
                {s.emoji}
              </motion.span>
              <p className={`font-nunito font-700 text-xs ${s.textColor} text-center leading-tight`}>{s.name}</p>
              <p className={`text-[10px] font-dm ${s.textColor} opacity-60 text-center`}>{s.desc}</p>

              {/* Waveform animation */}
              {playing === i && (
                <div className="flex gap-0.5 items-end h-5 my-1">
                  {[4, 7, 5, 8, 4, 6, 9, 5].map((h, j) => (
                    <motion.div
                      key={j}
                      className={`w-0.5 rounded-full ${s.bgBar}`}
                      style={{ height: `${h * 2}px` }}
                      animate={{ scaleY: [1, 1.6, 1] }}
                      transition={{ duration: 0.7, repeat: Infinity, delay: j * 0.08 }}
                    />
                  ))}
                </div>
              )}

              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => toggle(i)}
                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all shadow-sm ${
                  playing === i
                    ? 'bg-white/90 border border-white' :'bg-white/50 border border-white/60 hover:bg-white/80'
                }`}
              >
                {playing === i
                  ? <Pause size={16} className={s.textColor} />
                  : <Play size={16} className={s.textColor} />
                }
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Now playing bar */}
      {playing !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-3 ${sounds[playing].gradient} rounded-2xl p-3 border border-white/60 flex items-center gap-3`}
        >
          <span className="text-2xl">{sounds[playing].emoji}</span>
          <div className="flex-1">
            <p className={`font-nunito font-700 text-sm ${sounds[playing].textColor}`}>Now Playing</p>
            <p className={`text-xs font-dm ${sounds[playing].textColor} opacity-70`}>{sounds[playing].name} · {sounds[playing].mood}</p>
          </div>
          <div className="flex gap-0.5 items-end h-4">
            {[3, 5, 4, 6, 3, 5].map((h, j) => (
              <motion.div
                key={j}
                className={`w-0.5 rounded-full ${sounds[playing].bgBar}`}
                style={{ height: `${h * 2}px` }}
                animate={{ scaleY: [1, 1.5, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: j * 0.1 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}