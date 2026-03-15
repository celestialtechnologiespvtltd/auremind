'use client';

import { motion } from 'framer-motion';

export default function FloatingDoodles() {
  const doodles = [
    { emoji: '🌸', top: '5%', left: '5%', delay: 0, size: 'text-2xl' },
    { emoji: '⭐', top: '15%', right: '8%', delay: 0.5, size: 'text-xl' },
    { emoji: '🌿', top: '35%', left: '2%', delay: 1, size: 'text-lg' },
    { emoji: '💜', top: '55%', right: '4%', delay: 1.5, size: 'text-xl' },
    { emoji: '☁️', top: '70%', left: '6%', delay: 0.8, size: 'text-2xl' },
    { emoji: '🦋', top: '80%', right: '10%', delay: 0.3, size: 'text-lg' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {doodles.map((d, i) => (
        <motion.div
          key={i}
          className={`absolute ${d.size} opacity-30`}
          style={{ top: d.top, left: (d as any).left, right: (d as any).right }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: d.delay, ease: 'easeInOut' }}
        >
          {d.emoji}
        </motion.div>
      ))}
    </div>
  );
}