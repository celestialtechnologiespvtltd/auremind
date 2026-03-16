'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const tipCategories = [
  {
    category: 'Morning Rituals',
    emoji: '🌅',
    color: 'bg-amber-50 border-amber-100',
    headerColor: 'text-amber-800',
    tips: [
      { title: 'Hydrate before caffeine', desc: 'Drink a full glass of water before your morning coffee. It rehydrates your body after sleep and boosts alertness naturally.' },
      { title: 'No phone for 20 minutes', desc: 'Resist reaching for your phone immediately after waking. Give your mind 20 minutes of gentle waking before the world rushes in.' },
      { title: 'Set one intention', desc: 'Ask yourself: "What is the one thing that would make today feel meaningful?" Write it down or say it aloud.' },
      { title: 'Morning sunlight exposure', desc: 'Step outside or sit near a window for 5–10 minutes after waking. Natural light resets your circadian rhythm and boosts serotonin.' },
      { title: 'Gentle morning stretch', desc: 'Spend 3 minutes stretching in bed before getting up. This activates circulation and signals your body to wake up gently.' },
    ],
  },
  {
    category: 'Anxiety Relief',
    emoji: '🌊',
    color: 'bg-blue-50 border-blue-100',
    headerColor: 'text-blue-800',
    tips: [
      { title: 'Cold water on your face', desc: 'Splashing cold water on your face activates the dive reflex, slowing your heart rate and calming the nervous system in seconds.' },
      { title: 'Name it to tame it', desc: 'When anxiety strikes, name the emotion: "I notice I am feeling anxious." This activates the prefrontal cortex and reduces emotional intensity.' },
      { title: '5-minute worry window', desc: 'Give yourself a dedicated 5-minute window to worry fully, then close it. This contains anxiety rather than suppressing it.' },
      { title: 'Grounding with 5-4-3-2-1', desc: 'Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. This technique anchors you to the present moment.' },
      { title: 'Progressive muscle relaxation', desc: 'Tense each muscle group for 5 seconds, then release. Start from your toes and work upward. It physically discharges stored tension.' },
    ],
  },
  {
    category: 'Better Sleep',
    emoji: '🌙',
    color: 'bg-indigo-50 border-indigo-100',
    headerColor: 'text-indigo-800',
    tips: [
      { title: 'Consistent wake time', desc: 'Wake up at the same time every day — even weekends. This anchors your circadian rhythm more powerfully than any supplement.' },
      { title: 'Cool, dark room', desc: 'Your body temperature needs to drop 1-2 degrees to initiate sleep. Keep your bedroom cool and as dark as possible.' },
      { title: 'Write tomorrow\'s list tonight', desc: 'Offload tomorrow\'s to-do list before bed. Research shows this reduces pre-sleep cognitive arousal and helps you fall asleep faster.' },
      { title: 'No screens 45 minutes before bed', desc: 'Blue light from screens suppresses melatonin production. Replace screen time with reading, journaling, or light stretching.' },
      { title: 'The 4-7-8 sleep technique', desc: 'Inhale for 4 counts, hold for 7, exhale for 8. This breathing pattern activates the parasympathetic nervous system and induces drowsiness.' },
    ],
  },
  {
    category: 'Emotional Resilience',
    emoji: '💪',
    color: 'bg-purple-50 border-purple-100',
    headerColor: 'text-purple-800',
    tips: [
      { title: 'Reframe, don\'t suppress', desc: 'Instead of pushing away difficult emotions, ask: "What is this feeling trying to tell me?" Curiosity transforms suffering.' },
      { title: 'Celebrate micro-wins', desc: 'Your brain releases dopamine for any completed goal — big or tiny. Celebrate getting out of bed on hard days. It all counts.' },
      { title: 'Self-compassion break', desc: 'When you are struggling, place your hand on your heart and say: "This is a moment of suffering. I am not alone in this."' },
      { title: 'Build your emotional vocabulary', desc: 'The more precisely you can name your feelings, the better you can process them. "Frustrated" is different from "overwhelmed" or "disappointed."' },
      { title: 'The 24-hour rule', desc: 'Before reacting to something upsetting, give yourself 24 hours. Most emotional urgency fades, and your response will be wiser.' },
    ],
  },
  {
    category: 'Mindful Movement',
    emoji: '🧘',
    color: 'bg-green-50 border-green-100',
    headerColor: 'text-green-800',
    tips: [
      { title: 'Walk without your phone', desc: 'Take a 10-minute walk without headphones or your phone. Let your mind wander freely. This is active meditation.' },
      { title: 'Dance it out', desc: 'Put on a favorite song and move freely for 3 minutes. Movement releases endorphins and shifts emotional states faster than thinking.' },
      { title: 'Mindful dishwashing', desc: 'Turn a mundane task into a mindfulness practice. Feel the water temperature, notice the soap bubbles. Presence is available anywhere.' },
      { title: 'Shake your body', desc: 'Animals shake after stress to discharge cortisol. Try shaking your hands, arms, and legs for 30 seconds. It works for humans too.' },
      { title: 'Yoga nidra for rest', desc: 'A 20-minute yoga nidra session is said to provide the equivalent rest of 4 hours of sleep. Try a guided session when exhausted.' },
    ],
  },
  {
    category: 'Digital Wellness',
    emoji: '📵',
    color: 'bg-rose-50 border-rose-100',
    headerColor: 'text-rose-800',
    tips: [
      { title: 'Phone-free meals', desc: 'Eat at least one meal per day without any screens. This improves digestion, mindful eating, and genuine connection with others.' },
      { title: 'Curate your feed intentionally', desc: 'Unfollow accounts that make you feel inadequate. Follow accounts that educate, inspire, or genuinely make you smile.' },
      { title: 'Batch your notifications', desc: 'Check notifications at set times (e.g., 9am, 1pm, 6pm) rather than reactively. This reduces cognitive fragmentation.' },
      { title: 'Digital sunset ritual', desc: 'Create a consistent end-of-day digital shutdown. Close tabs, silence notifications, and signal to your brain that work is done.' },
    ],
  },
  {
    category: 'Nutrition & Energy',
    emoji: '🥗',
    color: 'bg-teal-50 border-teal-100',
    headerColor: 'text-teal-800',
    tips: [
      { title: 'Eat the rainbow', desc: 'Different colored fruits and vegetables contain different phytonutrients. Aim for 5 different colors on your plate each day.' },
      { title: 'Magnesium for calm', desc: 'Magnesium deficiency is linked to anxiety and poor sleep. Dark leafy greens, nuts, and seeds are excellent natural sources.' },
      { title: 'Gut-brain connection', desc: 'Your gut produces 90% of your serotonin. Fermented foods like yogurt, kefir, and kimchi support both gut health and mood.' },
      { title: 'Eat slowly, chew thoroughly', desc: 'Digestion begins in the mouth. Chewing each bite 20–30 times improves nutrient absorption and activates satiety signals.' },
    ],
  },
];

export default function WellnessTipsList() {
  const [expanded, setExpanded] = useState<string | null>('Morning Rituals');
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  return (
    <div>
      <h2 className="font-nunito font-700 text-lg text-purple-900 mb-3">Wellness Wisdom 💡</h2>
      <div className="space-y-3">
        {tipCategories?.map((cat) => (
          <div key={cat?.category} className={`rounded-3xl border ${cat?.color} overflow-hidden`}>
            <button
              className="w-full p-4 flex items-center gap-3 text-left"
              onClick={() => setExpanded(expanded === cat?.category ? null : cat?.category)}
            >
              <span className="text-2xl">{cat?.emoji}</span>
              <p className={`font-nunito font-700 text-sm flex-1 ${cat?.headerColor}`}>{cat?.category}</p>
              <motion.div
                animate={{ rotate: expanded === cat?.category ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} className={`${cat?.headerColor} opacity-60`} />
              </motion.div>
            </button>

            <AnimatePresence>
              {expanded === cat?.category && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-2.5">
                    {cat?.tips?.map((tip) => (
                      <motion.div
                        key={tip?.title}
                        className="bg-white/60 rounded-2xl border border-white/80 overflow-hidden cursor-pointer"
                        onClick={() => setExpandedTip(expandedTip === tip?.title ? null : tip?.title)}
                      >
                        <div className="flex items-center justify-between p-3">
                          <p className={`font-nunito font-700 text-sm ${cat?.headerColor}`}>{tip?.title}</p>
                          <motion.div
                            animate={{ rotate: expandedTip === tip?.title ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown size={14} className={`${cat?.headerColor} opacity-50`} />
                          </motion.div>
                        </div>
                        <AnimatePresence>
                          {expandedTip === tip?.title && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <p className={`px-3 pb-3 text-xs font-dm leading-relaxed ${cat?.headerColor} opacity-80`}>
                                {tip?.desc}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}