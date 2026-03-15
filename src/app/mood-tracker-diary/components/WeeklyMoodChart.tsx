'use client';

import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell
} from 'recharts';

// Backend: GET /api/mood-entries?range=7days
const weeklyData = [
  { day: 'Mon', mood: 5, emoji: '😐' },
  { day: 'Tue', mood: 4, emoji: '😕' },
  { day: 'Wed', mood: 7, emoji: '😄' },
  { day: 'Thu', mood: 6, emoji: '😊' },
  { day: 'Fri', mood: 3, emoji: '😢' },
  { day: 'Sat', mood: 8, emoji: '😁' },
  { day: 'Sun', mood: 7, emoji: '😄' },
];

const moodColors = [
  '#A2D2FF', '#A2D2FF', '#CDB4DB', '#CDB4DB',
  '#A2D2FF', '#b7ebd8', '#b7ebd8'
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const d = weeklyData.find(w => w.day === label);
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-purple-100">
        <p className="font-nunito font-700 text-purple-900 text-sm">{label}</p>
        <p className="text-2xl">{d?.emoji}</p>
        <p className="font-dm text-purple-600 text-xs">{payload[0].value}/10</p>
      </div>
    );
  }
  return null;
};

export default function WeeklyMoodChart() {
  const avg = (weeklyData.reduce((a, b) => a + b.mood, 0) / weeklyData.length).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/70 backdrop-blur-sm rounded-4xl p-5 border border-white/60 shadow-md"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-nunito font-700 text-base text-purple-900">Weekly Mood 📊</h2>
          <p className="text-xs font-dm text-purple-400 mt-0.5">Last 7 days</p>
        </div>
        <div className="text-right">
          <p className="font-nunito font-800 text-2xl text-purple-700 text-tabular">{avg}</p>
          <p className="text-xs font-dm text-purple-400">avg score</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={weeklyData} barSize={28}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0e8f8" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 12, fontFamily: 'DM Sans', fill: '#a78bba' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis domain={[0, 10]} hide />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(205,180,219,0.1)', radius: 8 }} />
          <Bar dataKey="mood" radius={[8, 8, 4, 4]}>
            {weeklyData.map((_, i) => (
              <Cell key={i} fill={moodColors[i]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="flex justify-between mt-3">
        {weeklyData.map((d) => (
          <div key={d.day} className="flex flex-col items-center gap-0.5">
            <span className="text-base">{d.emoji}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}