'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function ConsultCard() {
  const router = useRouter();

  return (
    <motion.button
      whileHover={{ y: -4, boxShadow: '0 20px 48px rgba(139,92,246,0.30)' }}
      whileTap={{ scale: 0.97, y: 0 }}
      onClick={() => router?.push('/contact')}
      className="relative w-full overflow-hidden rounded-3xl cursor-pointer text-left"
      style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 45%, #ec4899 100%)' }}
    >
      {/* Decorative blobs */}
      <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-20 bg-white pointer-events-none" />
      <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full opacity-10 bg-white pointer-events-none" />
      {/* Ripple rings */}
      <div className="absolute inset-0 flex items-center justify-end pr-8 pointer-events-none">
        {[0, 1, 2]?.map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border-2 border-white/20"
            animate={{ scale: [0.6, 2.2], opacity: [0.5, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }}
            style={{ width: '60px', height: '60px' }}
          />
        ))}
      </div>
      <div className="relative z-10 p-6 flex items-center gap-5">
        {/* Icon bubble */}
        <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner">
          <motion.span
            className="text-3xl"
            animate={{ scale: [1, 1.12, 1], rotate: [0, -6, 6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            💬
          </motion.span>
        </div>

        {/* Text */}
        <div className="flex-1">
          <p className="font-nunito font-800 text-xl text-white leading-tight tracking-tight">
            Consult an Expert
          </p>
          <p className="text-sm font-dm text-white/80 mt-1 leading-snug">
            Get personalised guidance from a wellness professional
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1">
            <span className="text-xs font-dm font-600 text-white">Book a session</span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </motion.svg>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
