'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const sections = [
  {
    side: 'left',
    title: 'Problem Statement',
    emoji: '💭',
    gradient: 'from-purple-400 to-purple-500',
    bg: 'bg-white/70 backdrop-blur-sm border-white/80',
    text: 'Many people today struggle with stress, emotional burnout, and mental health challenges. In a fast-moving world, people rarely have a calm space to pause, reflect, and understand their emotions.',
  },
  {
    side: 'right',
    title: 'Solution',
    emoji: '✨',
    gradient: 'from-pink-400 to-pink-500',
    bg: 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100/60',
    text: 'AureMind offers a peaceful digital environment where users can track their mood, reflect through journaling, explore self-awareness tools, and stay motivated while connecting with a supportive community.',
  },
  {
    side: 'left',
    title: 'Why We Exist',
    emoji: '🌱',
    gradient: 'from-blue-400 to-purple-400',
    bg: 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100/60',
    text: 'AureMind exists to help individuals understand their inner world and build emotional balance through reflection, mindfulness, and positive daily habits.',
  },
  {
    side: 'right',
    title: 'About AureMind',
    emoji: '🧠',
    gradient: 'from-purple-400 to-pink-400',
    bg: 'bg-white/70 backdrop-blur-sm border-white/80',
    text: 'AureMind is a personal mental wellness platform designed to support emotional wellbeing through mood tracking, journaling, self-reflection tools, daily motivation, and community support.',
  },
];

export default function IntroPage() {
  const router = useRouter();

  const handleContinue = () => {
    localStorage.setItem('auremind_intro_seen', 'true');
    router.push('/home-dashboard');
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 overflow-x-hidden">
      {/* Decorative background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-200/30 blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-pink-200/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-blue-200/20 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 py-12 pb-24">

        {/* ── Header ── */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mb-14"
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-lg">
              <span className="text-3xl">🌸</span>
            </div>
          </div>
          <h1 className="font-nunito font-extrabold text-4xl md:text-5xl text-purple-900 tracking-tight mb-3">
            AureMind
          </h1>
          <p className="font-dm font-semibold text-lg text-purple-600 whitespace-nowrap">
            Elevate Your Mind, Embrace Your Calm
          </p>
        </motion.div>

        {/* ── Alternating Sections ── */}
        <div className="flex flex-col gap-6 mb-12">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              custom={i + 1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className={`flex ${section.side === 'right' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`w-full md:w-[78%] rounded-3xl p-7 border shadow-sm ${section.bg}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${section.gradient} flex items-center justify-center shadow-sm flex-shrink-0`}
                  >
                    <span className="text-base">{section.emoji}</span>
                  </div>
                  <h2 className="font-nunito font-bold text-xl text-purple-900">
                    {section.title}
                  </h2>
                </div>
                <p className="font-dm text-sm text-purple-700 leading-relaxed">
                  {section.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Continue Button ── */}
        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleContinue}
            className="px-10 py-4 rounded-2xl font-nunito font-bold text-base text-white bg-gradient-to-r from-purple-500 to-pink-400 shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 transition-shadow duration-300"
          >
            Continue →
          </motion.button>
        </motion.div>

        {/* Footer note */}
        <motion.p
          custom={6}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center text-xs font-dm text-purple-400 mt-6"
        >
          Your data stays on your device. We respect your privacy.
        </motion.p>
      </div>
    </div>
  );
}
