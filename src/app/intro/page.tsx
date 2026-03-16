'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const sections = [
  {
    title: 'Problem Statement',
    emoji: '💭',
    gradient: 'from-purple-400 to-purple-500',
    bg: 'bg-white/70 backdrop-blur-sm border-white/80',
    text: 'Many people today struggle with stress, emotional burnout, and mental health challenges. In a fast-moving world, people rarely have a calm space to pause, reflect, and understand their emotions.',
  },
  {
    title: 'Solution',
    emoji: '✨',
    gradient: 'from-pink-400 to-pink-500',
    bg: 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100/60',
    text: 'AureMind offers a peaceful digital environment where users can track their mood, reflect through journaling, explore self-awareness tools, and stay motivated while connecting with a supportive community.',
  },
  {
    title: 'Why We Exist',
    emoji: '🌱',
    gradient: 'from-blue-400 to-purple-400',
    bg: 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100/60',
    text: 'AureMind exists to help individuals understand their inner world and build emotional balance through reflection, mindfulness, and positive daily habits.',
  },
];

export default function IntroPage() {
  const router = useRouter();

  const handleContinue = () => {
    localStorage.setItem('auremind_intro_seen', 'true');
    router.push('/home-dashboard');
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
    }),
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex flex-col">
      {/* Decorative background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-200/30 blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-pink-200/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-blue-200/20 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col h-full px-6 py-4 max-w-5xl mx-auto w-full">

        {/* ── Header ── */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mb-4 flex-shrink-0"
        >
          <div className="flex justify-center mb-1.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-lg">
              <span className="text-xl">🌸</span>
            </div>
          </div>
          <h1 className="font-nunito font-extrabold text-2xl md:text-3xl text-purple-900 tracking-tight mb-0.5">
            AureMind
          </h1>
          <p className="font-dm font-semibold text-sm text-purple-600 whitespace-nowrap">
            Elevate Your Mind, Embrace Your Calm
          </p>
        </motion.div>

        {/* ── Vertical Portrait Cards Row ── */}
        <div className="flex flex-row gap-4 flex-1 justify-center items-stretch min-h-0">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              custom={i + 1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              whileHover={{
                y: -8,
                boxShadow: '0 24px 48px -8px rgba(139, 92, 246, 0.30)',
                transition: { duration: 0.25, ease: 'easeOut' },
              }}
              className="flex-1 cursor-default"
            >
              <div
                className={`h-full rounded-3xl p-5 md:p-6 border shadow-md ${section.bg} transition-shadow duration-300 flex flex-col`}
                style={{ backdropFilter: 'blur(12px)' }}
              >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center shadow-md`}
                  >
                    <span className="text-2xl">{section.emoji}</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="font-nunito font-bold text-base md:text-lg text-purple-900 text-center mb-3">
                  {section.title}
                </h2>

                {/* Divider */}
                <div className={`h-0.5 w-10 mx-auto rounded-full bg-gradient-to-r ${section.gradient} mb-3 opacity-60`} />

                {/* Text */}
                <p className="font-dm text-xs md:text-sm text-purple-700 leading-relaxed text-center flex-1">
                  {section.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Continue Button ── */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex justify-center mt-4 flex-shrink-0"
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleContinue}
            className="px-10 py-3 rounded-2xl font-nunito font-bold text-base text-white bg-gradient-to-r from-purple-500 to-pink-400 shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 transition-shadow duration-300"
          >
            Continue →
          </motion.button>
        </motion.div>

        {/* Footer note */}
        <motion.p
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center text-xs font-dm text-purple-400 mt-2 mb-1 flex-shrink-0"
        >
          Your data stays on your device. We respect your privacy.
        </motion.p>
      </div>
    </div>
  );
}
