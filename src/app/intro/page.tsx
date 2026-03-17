'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';

export default function IntroPage() {
  const router = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-reveal refs
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const handleContinue = () => {
    localStorage.setItem('auremind_intro_seen', 'true');
    router.push('/home-dashboard');
  };

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const elements = [
      { ref: card1Ref, delay: 0 },
      { ref: card2Ref, delay: 120 },
      { ref: card3Ref, delay: 240 },
      { ref: btnRef, delay: 360 },
    ];

    const observers: IntersectionObserver[] = [];

    elements.forEach(({ ref, delay }) => {
      if (!ref.current) return;
      const el = ref.current;

      // Set initial hidden state
      el.style.opacity = '0';
      el.style.transform = 'translateY(48px)';
      el.style.transition = 'none';

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                el.style.transition = 'opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1), transform 0.75s cubic-bezier(0.22, 1, 0.36, 1)';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
              }, delay);
              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.12 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen w-full relative flex flex-col"
      style={{
        background: 'linear-gradient(135deg, #f3e8ff 0%, #e8f4ff 35%, #fce4f0 65%, #ede9fe 100%)',
      }}
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large orb top-left */}
        <div
          className="absolute rounded-full opacity-40"
          style={{
            width: '520px',
            height: '520px',
            top: '-120px',
            left: '-100px',
            background: 'radial-gradient(circle, #CDB4DB 0%, #A2D2FF 50%, transparent 70%)',
            transform: `translate(${mousePos.x * 18}px, ${mousePos.y * 12}px)`,
            transition: 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            animation: 'floatOrb1 8s ease-in-out infinite',
          }}
        />
        {/* Medium orb bottom-right */}
        <div
          className="absolute rounded-full opacity-35"
          style={{
            width: '400px',
            height: '400px',
            bottom: '-80px',
            right: '-60px',
            background: 'radial-gradient(circle, #FFAFCC 0%, #FFC8DD 40%, transparent 70%)',
            transform: `translate(${-mousePos.x * 14}px, ${-mousePos.y * 10}px)`,
            transition: 'transform 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            animation: 'floatOrb2 10s ease-in-out infinite',
          }}
        />
        {/* Small orb center */}
        <div
          className="absolute rounded-full opacity-25"
          style={{
            width: '280px',
            height: '280px',
            top: '40%',
            left: '55%',
            background: 'radial-gradient(circle, #A2D2FF 0%, #CDB4DB 60%, transparent 80%)',
            transform: `translate(${mousePos.x * 22}px, ${-mousePos.y * 16}px)`,
            transition: 'transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            animation: 'floatOrb3 12s ease-in-out infinite',
          }}
        />
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${4 + (i % 4) * 3}px`,
              height: `${4 + (i % 4) * 3}px`,
              left: `${8 + i * 7.5}%`,
              top: `${15 + ((i * 37) % 65)}%`,
              background: i % 3 === 0
                ? 'rgba(205,180,219,0.6)'
                : i % 3 === 1
                ? 'rgba(162,210,255,0.6)'
                : 'rgba(255,175,204,0.6)',
              animation: `floatParticle ${5 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen px-5 md:px-10 py-8 max-w-5xl mx-auto w-full">

        {/* Header — brand identity */}
        <div className="text-center mb-10 md:mb-14" style={{ animation: 'slideInDown 0.8s cubic-bezier(0.22, 1, 0.36, 1) both' }}>
          {/* Logo image */}
          <div className="flex justify-center mb-4">
            <img
              src="/assets/images/ChatGPT_Image_Mar_16_2026_04_44_37_PM-1773661537529.png"
              alt="AureMind logo"
              style={{ width: '780px', height: '780px', objectFit: 'contain' }}
            />
          </div>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #CDB4DB)' }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#CDB4DB' }} />
            <div className="h-px w-16 rounded-full" style={{ background: 'linear-gradient(90deg, #A2D2FF, transparent)' }} />
          </div>
        </div>

        {/* Bento grid — asymmetric layout */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 mb-10">

          {/* Problem Statement — large card, spans 7 cols */}
          <div
            ref={card1Ref}
            className="md:col-span-7 rounded-3xl p-7 md:p-8 relative overflow-hidden group"
            style={{
              background: 'rgba(255,255,255,0.62)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(205,180,219,0.4)',
              boxShadow: '0 8px 32px rgba(205,180,219,0.18), 0 2px 8px rgba(0,0,0,0.04)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 60px rgba(205,180,219,0.35), 0 4px 16px rgba(0,0,0,0.06)';
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(205,180,219,0.18), 0 2px 8px rgba(0,0,0,0.04)';
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
            }}
          >
            {/* Accent blob inside card */}
            <div
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 pointer-events-none"
              style={{ background: 'radial-gradient(circle, #CDB4DB, transparent)' }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #e9d5ff, #CDB4DB)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#7c3aed" fillOpacity="0.8"/>
                  </svg>
                </div>
                <div>
                  <span
                    className="font-nunito font-bold text-xs uppercase tracking-widest"
                    style={{ color: '#7c3aed', opacity: 0.6 }}
                  >
                    The Challenge
                  </span>
                  <h2 className="font-nunito font-extrabold text-xl md:text-2xl text-purple-900 leading-tight">
                    Problem
                  </h2>
                </div>
              </div>
              <div className="h-px mb-5" style={{ background: 'linear-gradient(90deg, #CDB4DB, #A2D2FF, transparent)' }} />
              <p className="font-dm text-sm md:text-base text-purple-800 leading-relaxed" style={{ opacity: 0.85 }}>
                Many people today struggle with stress, anxiety, emotional burnout, and mental health challenges. In a fast-paced world, individuals rarely have a calm space to pause, reflect, and understand their emotions.
              </p>
              {/* Stat pills */}
              <div className="flex flex-wrap gap-2 mt-5">
                {['Stress', 'Anxiety', 'Burnout', 'Isolation'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-dm font-medium"
                    style={{
                      background: 'rgba(205,180,219,0.25)',
                      color: '#6b21a8',
                      border: '1px solid rgba(205,180,219,0.4)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Why We Exist — tall card, spans 5 cols */}
          <div
            ref={card2Ref}
            className="md:col-span-5 rounded-3xl p-7 relative overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.55)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(162,210,255,0.4)',
              boxShadow: '0 8px 32px rgba(162,210,255,0.18), 0 2px 8px rgba(0,0,0,0.04)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 60px rgba(162,210,255,0.35), 0 4px 16px rgba(0,0,0,0.06)';
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(162,210,255,0.18), 0 2px 8px rgba(0,0,0,0.04)';
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
            }}
          >
            <div
              className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-20 pointer-events-none"
              style={{ background: 'radial-gradient(circle, #A2D2FF, transparent)' }}
            />
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #dbeafe, #A2D2FF)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#3b82f6" fillOpacity="0.7"/>
                  </svg>
                </div>
                <div>
                  <span
                    className="font-nunito font-bold text-xs uppercase tracking-widest"
                    style={{ color: '#3b82f6', opacity: 0.6 }}
                  >
                    Our Purpose
                  </span>
                  <h2 className="font-nunito font-extrabold text-xl md:text-2xl text-purple-900 leading-tight">
                    Why We Exist
                  </h2>
                </div>
              </div>
              <div className="h-px mb-5" style={{ background: 'linear-gradient(90deg, #A2D2FF, #CDB4DB, transparent)' }} />
              <p className="font-dm text-sm md:text-base text-purple-800 leading-relaxed flex-1" style={{ opacity: 0.85 }}>
                AureMind exists to empower individuals to better understand their inner world and build emotional balance through reflection, awareness, and positive daily habits.
              </p>
              {/* Visual accent */}
              <div
                className="mt-5 rounded-2xl p-4"
                style={{ background: 'linear-gradient(135deg, rgba(162,210,255,0.2), rgba(205,180,219,0.2))' }}
              >
                <p className="font-nunito font-bold text-sm text-purple-700 text-center italic">
                  &ldquo;Your mind deserves a sanctuary.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Solution — full width bottom card */}
          <div
            ref={card3Ref}
            className="md:col-span-12 rounded-3xl p-7 md:p-8 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,175,204,0.35) 0%, rgba(255,200,221,0.25) 40%, rgba(205,180,219,0.3) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,175,204,0.4)',
              boxShadow: '0 8px 32px rgba(255,175,204,0.2), 0 2px 8px rgba(0,0,0,0.04)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 60px rgba(255,175,204,0.35), 0 4px 16px rgba(0,0,0,0.06)';
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(255,175,204,0.2), 0 2px 8px rgba(0,0,0,0.04)';
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
            }}
          >
            {/* Large decorative blob */}
            <div
              className="absolute -top-16 right-20 w-56 h-56 rounded-full opacity-15 pointer-events-none"
              style={{ background: 'radial-gradient(circle, #FFAFCC, transparent)' }}
            />
            <div className="relative z-10 md:flex md:items-center md:gap-10">
              <div className="md:flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #fce7f3, #FFAFCC)' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#be185d" fillOpacity="0.8"/>
                    </svg>
                  </div>
                  <div>
                    <span
                      className="font-nunito font-bold text-xs uppercase tracking-widest"
                      style={{ color: '#be185d', opacity: 0.6 }}
                    >
                      The Answer
                    </span>
                    <h2 className="font-nunito font-extrabold text-xl md:text-2xl text-purple-900 leading-tight">
                      Solution
                    </h2>
                  </div>
                </div>
                <div className="h-px mb-5" style={{ background: 'linear-gradient(90deg, #FFAFCC, #FFC8DD, transparent)' }} />
                <p className="font-dm text-sm md:text-base text-purple-800 leading-relaxed" style={{ opacity: 0.85 }}>
                  AureMind provides a peaceful digital environment where users can track their mood, reflect through journaling, explore self-reflection tools, stay motivated, and connect with a supportive community.
                </p>
              </div>
              {/* Feature pills — horizontal on desktop */}
              <div className="mt-5 md:mt-0 md:flex-shrink-0 grid grid-cols-2 md:grid-cols-1 gap-2 md:w-52">
                {[
                  { label: 'Mood Tracking', color: 'rgba(205,180,219,0.35)', border: 'rgba(205,180,219,0.5)', text: '#6b21a8' },
                  { label: 'Journaling', color: 'rgba(162,210,255,0.35)', border: 'rgba(162,210,255,0.5)', text: '#1d4ed8' },
                  { label: 'Community', color: 'rgba(255,175,204,0.35)', border: 'rgba(255,175,204,0.5)', text: '#be185d' },
                  { label: 'Self-Reflection', color: 'rgba(255,200,221,0.35)', border: 'rgba(255,200,221,0.5)', text: '#9d174d' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="px-4 py-2.5 rounded-2xl text-center"
                    style={{
                      background: item.color,
                      border: `1px solid ${item.border}`,
                    }}
                  >
                    <span className="font-dm font-semibold text-xs" style={{ color: item.text }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Continue button */}
        <div ref={btnRef} className="flex flex-col items-center gap-3 pb-8">
          <button
            onClick={handleContinue}
            className="relative group px-12 py-4 rounded-2xl font-nunito font-bold text-base text-white overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%)',
              boxShadow: '0 8px 32px rgba(124,58,237,0.4), 0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px) scale(1.03)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 16px 48px rgba(124,58,237,0.5), 0 4px 16px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0) scale(1)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(124,58,237,0.4), 0 2px 8px rgba(0,0,0,0.1)';
            }}
            onMouseDown={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0) scale(0.97)';
            }}
            onMouseUp={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px) scale(1.03)';
            }}
          >
            {/* Shimmer effect */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)',
                transition: 'opacity 0.3s ease',
              }}
            />
            <span className="relative flex items-center gap-2">
              Begin Your Journey
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-1 transition-transform duration-200">
                <path d="M8 5l7 7-7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>
          <p className="font-dm text-xs text-purple-500 opacity-70">
            Your data stays on your device. We respect your privacy.
          </p>
        </div>
      </div>

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes floatOrb1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -15px) scale(1.05); }
          66% { transform: translate(-10px, 10px) scale(0.97); }
        }
        @keyframes floatOrb2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          40% { transform: translate(-18px, 12px) scale(1.04); }
          70% { transform: translate(12px, -8px) scale(0.98); }
        }
        @keyframes floatOrb3 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(15px, -20px) scale(1.06); }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-18px) scale(1.2); opacity: 0.9; }
        }
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
