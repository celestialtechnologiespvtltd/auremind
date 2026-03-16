'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

const sections = [
  {
    title: 'Problem Statement',
    align: 'start' as const,
    gradient: 'from-purple-500 to-purple-600',
    bg: 'bg-white/75 border-white/80',
    text: 'Many people today struggle with stress, anxiety, emotional burnout, and mental health challenges. In a fast-paced world, individuals rarely have a calm space to pause, reflect, and understand their emotions.',
  },
  {
    title: 'Solution',
    align: 'end' as const,
    gradient: 'from-pink-500 to-rose-500',
    bg: 'bg-white/75 border-white/80',
    text: 'AureMind provides a peaceful digital environment where users can track their mood, reflect through journaling, explore self-reflection tools, stay motivated, and connect with a supportive community.',
  },
  {
    title: 'Why We Exist',
    align: 'start' as const,
    gradient: 'from-blue-500 to-purple-500',
    bg: 'bg-white/75 border-white/80',
    text: 'AureMind exists to empower individuals to better understand their inner world and build emotional balance through reflection, awareness, and positive daily habits.',
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
    <div className="h-screen overflow-hidden relative flex flex-col">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/intro_bg_wellness.png"
          alt="Calm nature-inspired wellness background with soft sky and gentle landscape"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay to ensure readability */}
        <div className="absolute inset-0 bg-white/55" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-6 py-4 max-w-4xl mx-auto w-full">

        {/* Header */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mb-3 flex-shrink-0"
        >
          <h1 className="font-nunito font-extrabold text-3xl md:text-4xl text-purple-900 tracking-tight mb-1 drop-shadow-sm">
            AureMind
          </h1>
          <p className="font-dm font-semibold text-sm md:text-base text-purple-700 whitespace-nowrap">
            Elevate Your Mind, Embrace Your Calm
          </p>
        </motion.div>

        {/* Alternating Left/Right Cards */}
        <div className="flex flex-col gap-3 flex-1 justify-center min-h-0">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              custom={i + 1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              whileHover={{
                y: -6,
                boxShadow: '0 24px 48px -8px rgba(139, 92, 246, 0.30)',
                transition: { duration: 0.25, ease: 'easeOut' },
              }}
              className={`flex justify-${section.align} cursor-default`}
            >
              <div
                className={`w-[38%] min-h-[160px] rounded-3xl p-4 md:p-5 border shadow-md ${section.bg} transition-shadow duration-300 flex flex-col`}
                style={{ backdropFilter: 'blur(14px)' }}
              >
                <div className="flex items-center gap-3 mb-2">
                  {/* Title + Divider */}
                  <div className="flex flex-col">
                    <h2 className="font-nunito font-bold text-base md:text-lg text-purple-900">
                      {section.title}
                    </h2>
                    <div className={`h-0.5 w-8 rounded-full bg-gradient-to-r ${section.gradient} mt-1 opacity-60`} />
                  </div>
                </div>

                {/* Text */}
                <p className="font-dm text-xs md:text-sm text-purple-800 leading-relaxed">
                  {section.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Continue Button */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex justify-center mt-3 flex-shrink-0"
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleContinue}
            className="px-10 py-3 rounded-2xl font-nunito font-bold text-base text-white bg-gradient-to-r from-purple-500 to-pink-400 shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 transition-shadow duration-300"
          >
            Continue
          </motion.button>
        </motion.div>

        {/* Footer note */}
        <motion.p
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center text-xs font-dm text-purple-600 mt-2 mb-1 flex-shrink-0"
        >
          Your data stays on your device. We respect your privacy.
        </motion.p>
      </div>
    </div>
  );
}
