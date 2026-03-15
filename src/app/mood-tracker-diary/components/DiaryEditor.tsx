'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Save, Sparkles, X } from 'lucide-react';

const prompts = [
  "What made you smile today, even just a little?",
  "Describe one thing you\'re proud of yourself for this week.",
  "What\'s one thing you\'d like to let go of today?",
  "Who or what are you grateful for right now?",
  "What does your body need most today?",
  "What emotion am I carrying right now, and where do I feel it?",
  "What would I tell a friend going through what I\'m experiencing?",
];

interface DiaryEditorProps {
  onClose?: () => void;
}

export default function DiaryEditor({ onClose }: DiaryEditorProps) {
  const [text, setText] = useState('');
  const [promptIdx, setPromptIdx] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!text?.trim()) {
      toast?.error('Write something before saving 💜');
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      toast?.success('Diary entry saved! 🌸');
      setTimeout(() => {
        setSaved(false);
        onClose?.();
      }, 1500);
    }, 1000);
  };

  const nextPrompt = () => {
    setPromptIdx((p) => (p + 1) % prompts?.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      className="bg-white/95 backdrop-blur-xl rounded-4xl p-5 border border-white/60 shadow-2xl"
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-nunito font-700 text-base text-purple-900">New Entry ✍️</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs font-dm text-purple-400">
            {new Date()?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
          {onClose && (
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-xl bg-purple-50 hover:bg-purple-100 flex items-center justify-center text-purple-400 transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>
      {/* Writing prompt */}
      <motion.div
        key={promptIdx}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-3 mb-3 border border-purple-100/60"
      >
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-dm text-purple-700 italic leading-relaxed">
            💭 &ldquo;{prompts?.[promptIdx]}&rdquo;
          </p>
          <button
            onClick={nextPrompt}
            className="flex-shrink-0 w-6 h-6 rounded-lg bg-purple-100 hover:bg-purple-200 flex items-center justify-center text-purple-600 transition-colors"
          >
            <Sparkles size={12} />
          </button>
        </div>
      </motion.div>
      {/* Text area */}
      <textarea
        value={text}
        onChange={(e) => setText(e?.target?.value)}
        placeholder="Start writing... this is your safe space 🌸"
        rows={7}
        className="w-full bg-purple-50/50 rounded-2xl p-4 text-sm font-dm text-purple-900 placeholder-purple-300 border border-purple-100/60 outline-none resize-none focus:ring-2 focus:ring-purple-200 transition-all leading-relaxed"
        autoFocus
      />
      <div className="flex items-center justify-between mt-3">
        <p className="text-xs font-dm text-purple-400">{text?.length} characters</p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-nunito font-700 text-sm transition-all ${
            saved
              ? 'bg-green-100 text-green-700 border border-green-200' :'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-md hover:shadow-lg'
          }`}
        >
          {isSaving ? (
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
              <Save size={15} />
            </motion.div>
          ) : (
            <Save size={15} />
          )}
          {saved ? 'Saved! ✓' : isSaving ? 'Saving...' : 'Save Entry'}
        </motion.button>
      </div>
    </motion.div>
  );
}