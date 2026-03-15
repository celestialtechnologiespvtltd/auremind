'use client';

import BottomNav from './BottomNav';
import AppLogo from '@/components/ui/AppLogo';
import { Bell, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface AppLayoutProps {
  children: React.ReactNode;
  hideHeader?: boolean;
}

export default function AppLayout({ children, hideHeader = false }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 pb-28">
      {!hideHeader && (
        <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-white/60 px-4 py-3">
          <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AppLogo size={32} />
              <span className="font-nunito font-800 text-xl text-purple-800 tracking-tight">MindBloom</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-2xl bg-purple-50 hover:bg-purple-100 flex items-center justify-center text-purple-500 transition-colors"
              >
                <Search size={18} />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-2xl bg-pink-50 hover:bg-pink-100 flex items-center justify-center text-pink-500 transition-colors relative"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-pink-400" />
              </motion.button>
            </div>
          </div>
        </header>
      )}
      <main className="max-w-screen-2xl mx-auto px-4 py-4 xl:px-8 2xl:px-12">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}