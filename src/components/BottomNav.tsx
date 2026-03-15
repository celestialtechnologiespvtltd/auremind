'use client';

import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
  {
    label: 'Home',
    path: '/home-dashboard',
    emoji: '🏠',
    doodle: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    label: 'Community',
    path: '/community-section',
    emoji: '👥',
    doodle: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="3" />
        <circle cx="15" cy="7" r="3" />
        <path d="M3 20c0-3.3 2.7-6 6-6h6c3.3 0 6 2.7 6 6" />
      </svg>
    ),
  },
  {
    label: 'Diary',
    path: '/mood-tracker-diary',
    emoji: '📓',
    doodle: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M8 6h8M8 10h8M8 14h5" />
        <circle cx="17" cy="17" r="3" fill="currentColor" fillOpacity="0.2" />
        <path d="M16 17h2M17 16v2" />
      </svg>
    ),
  },
  {
    label: 'Tests',
    path: '/psychology-tests',
    emoji: '🧠',
    doodle: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3C6.2 3 4 5.2 4 8c0 1.8.9 3.4 2.3 4.4L6 19h12l-.3-6.6C19.1 11.4 20 9.8 20 8c0-2.8-2.2-5-5-5a5 5 0 00-6 0z" />
        <path d="M9 21h6" />
      </svg>
    ),
  },
  {
    label: 'Motivation',
    path: '/daily-motivation',
    emoji: '✨',
    doodle: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-safe">
      <div className="bg-white/80 backdrop-blur-xl rounded-t-3xl shadow-2xl border border-white/60 px-2 py-2">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {navItems?.map((item) => {
            const isActive = pathname === item?.path;
            return (
              <motion.button
                key={item?.path}
                onClick={() => router?.push(item?.path)}
                className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-2xl transition-all duration-200 min-w-[56px] ${
                  isActive
                    ? 'bg-gradient-to-br from-purple-100 to-pink-100 text-purple-700' :'text-purple-300 hover:text-purple-500 hover:bg-purple-50'
                }`}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`transition-all duration-200 ${isActive ? 'scale-110' : ''}`}>
                  {item?.doodle}
                </div>
                <span className={`text-[10px] font-nunito font-700 transition-all ${isActive ? 'font-bold text-purple-700' : 'text-purple-300'}`}>
                  {item?.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-2 w-1 h-1 rounded-full bg-purple-400"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}