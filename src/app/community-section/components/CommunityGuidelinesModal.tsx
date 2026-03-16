'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Heart, Users, MessageCircle, AlertTriangle, CheckCircle } from 'lucide-react';

const GUIDELINES_KEY = 'mindbloom_community_guidelines_accepted';

const guidelines = [
  {
    icon: Heart,
    color: 'text-pink-500',
    bg: 'bg-pink-50',
    title: 'Be Kind & Supportive',
    desc: 'Treat every member with empathy and compassion. This is a safe space for everyone.',
  },
  {
    icon: Shield,
    color: 'text-purple-500',
    bg: 'bg-purple-50',
    title: 'Respect Privacy',
    desc: "Never share personal information about others. What's shared here, stays here.",
  },
  {
    icon: MessageCircle,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    title: 'No Harmful Content',
    desc: 'Avoid hate speech, bullying, or any content that could harm others mentally or emotionally.',
  },
  {
    icon: Users,
    color: 'text-green-500',
    bg: 'bg-green-50',
    title: "Support, Don't Diagnose",
    desc: 'Offer support and encouragement — avoid giving medical or clinical advice.',
  },
  {
    icon: AlertTriangle,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    title: 'Crisis Resources',
    desc: 'If someone is in crisis, encourage them to seek professional help immediately.',
  },
];

interface CommunityGuidelinesModalProps {
  onAccepted: () => void;
}

export default function CommunityGuidelinesModal({ onAccepted }: CommunityGuidelinesModalProps) {
  const [checked, setChecked] = useState(false);

  const handleAccept = () => {
    if (!checked) return;
    localStorage.setItem(GUIDELINES_KEY, 'true');
    onAccepted();
  };

  const handleDecline = () => {
    window.history.back();
  };

  return (
    <div className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6">
      <motion.div
        initial={{ y: 80, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        className="bg-white/95 backdrop-blur-xl w-full sm:max-w-md rounded-t-4xl sm:rounded-4xl border border-white/60 shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 px-6 pt-6 pb-5">
          <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-purple-200/30 blur-2xl" />
          <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-pink-200/30 blur-xl" />
          <div className="relative z-10 flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-md flex-shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-nunito font-800 text-lg text-purple-900 leading-tight">Community Guidelines</h2>
              <p className="text-xs font-dm text-purple-500">Please read before joining 💜</p>
            </div>
          </div>
          <p className="relative z-10 text-xs font-dm text-purple-600 leading-relaxed">
            AureMind Community is a safe, supportive space for mental wellness. To keep it that way, we ask everyone to follow these guidelines.
          </p>
        </div>

        {/* Guidelines list */}
        <div className="px-5 py-4 space-y-3 max-h-[42vh] overflow-y-auto scrollbar-hide">
          {guidelines.map((g, i) => {
            const IconComp = g.icon;
            return (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className="flex items-start gap-3"
              >
                <div className={`w-8 h-8 rounded-xl ${g.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <IconComp className={`w-4 h-4 ${g.color}`} />
                </div>
                <div>
                  <p className="font-nunito font-700 text-sm text-purple-900">{g.title}</p>
                  <p className="text-xs font-dm text-purple-500 leading-relaxed mt-0.5">{g.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 pb-6 pt-3 border-t border-purple-50">
          {/* Checkbox */}
          <button
            onClick={() => setChecked((v) => !v)}
            className="flex items-center gap-3 w-full mb-4 group"
          >
            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
              checked
                ? 'bg-gradient-to-br from-purple-400 to-pink-400 border-purple-400' :'border-purple-200 bg-white group-hover:border-purple-300'
            }`}>
              {checked && <CheckCircle className="w-3.5 h-3.5 text-white" />}
            </div>
            <span className="text-xs font-dm text-purple-700 text-left leading-relaxed">
              I have read and agree to follow the Community Guidelines
            </span>
          </button>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleDecline}
              className="flex-1 py-3 rounded-2xl font-nunito font-600 text-sm text-purple-400 border border-purple-100 bg-white hover:bg-purple-50 transition-all"
            >
              Go Back
            </button>
            <motion.button
              whileTap={{ scale: checked ? 0.96 : 1 }}
              onClick={handleAccept}
              disabled={!checked}
              className={`flex-1 py-3 rounded-2xl font-nunito font-700 text-sm text-white shadow-md transition-all duration-200 ${
                checked
                  ? 'bg-gradient-to-r from-purple-400 to-pink-400 opacity-100' :'bg-gradient-to-r from-purple-300 to-pink-300 opacity-50 cursor-not-allowed'
              }`}
            >
              Join Community 🤝
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
