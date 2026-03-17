'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function ConsultCard() {
  const router = useRouter();

  return (
    <div>
      <motion.button
        whileHover={{ y: -6, scale: 1.04, boxShadow: '0 12px 32px rgba(139,92,246,0.22)' }}
        whileTap={{ scale: 0.92, y: 0 }}
        onClick={() => router?.push('/contact')}
        className="relative gradient-cream rounded-3xl p-5 flex items-center gap-4 shadow-sm border border-white/60 cursor-pointer w-full overflow-hidden"
      >
        {/* Ripple animation */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none flex items-center justify-center">
          {[0, 1]?.map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-amber-400/40"
              animate={{ scale: [0.5, 1.7], opacity: [0.6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.9, ease: 'easeOut' }}
              style={{ width: '45px', height: '45px' }}
            />
          ))}
        </div>

        <motion.span
          className="text-4xl relative z-10"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          💬
        </motion.span>

        <div className="text-left relative z-10 flex-1">
          <p className="font-nunito font-700 text-base text-amber-800 leading-tight">Consult</p>
          <p className="text-sm font-dm text-amber-800 opacity-70 leading-tight mt-0.5">Talk to an expert</p>
        </div>

        <motion.div
          className="relative z-10 text-amber-600 opacity-60"
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </motion.div>
      </motion.button>
    </div>
  );
}
