'use client';

import AppLayout from '@/components/AppLayout';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const professionals = [
  {
    name: 'Dr. Priya Sharma',
    specialty: 'Clinical Psychologist',
    emoji: '🧠',
    gradient: 'gradient-lavender',
    textColor: 'text-purple-800',
    email: 'dr.priya@mindbloom.care',
    whatsapp: '919876543210',
    phone: '+91 98765 43210',
    available: 'Mon–Fri, 9am–6pm',
    languages: 'English, Hindi',
  },
  {
    name: 'Dr. Arjun Mehta',
    specialty: 'Anxiety & Stress Therapist',
    emoji: '🌿',
    gradient: 'gradient-green',
    textColor: 'text-green-800',
    email: 'arjun.mehta@mindbloom.care',
    whatsapp: '919812345678',
    phone: '+91 98123 45678',
    available: 'Tue–Sat, 10am–7pm',
    languages: 'English, Marathi',
  },
  {
    name: 'Ms. Kavya Nair',
    specialty: 'Mindfulness & CBT Counselor',
    emoji: '🌸',
    gradient: 'gradient-peach',
    textColor: 'text-pink-800',
    email: 'kavya.nair@mindbloom.care',
    whatsapp: '919845678901',
    phone: '+91 98456 78901',
    available: 'Mon–Thu, 8am–5pm',
    languages: 'English, Malayalam',
  },
  {
    name: 'Dr. Rohan Verma',
    specialty: 'Depression & Mood Disorders',
    emoji: '💫',
    gradient: 'gradient-blue',
    textColor: 'text-blue-800',
    email: 'rohan.verma@mindbloom.care',
    whatsapp: '919867890123',
    phone: '+91 98678 90123',
    available: 'Wed–Sun, 11am–8pm',
    languages: 'English, Bengali',
  },
];

export default function ContactPage() {
  const router = useRouter();

  return (
    <AppLayout>
      <div className="space-y-5 py-2">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => router?.back()}
            className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-2xl bg-white/70 border border-purple-100 flex items-center justify-center text-purple-600 hover:bg-white transition-colors"
          >
            <ArrowLeft size={18} />
          </motion.button>
          <div>
            <h1 className="font-nunito font-800 text-2xl text-purple-900">Consult an Expert 💬</h1>
            <p className="text-sm font-dm text-purple-500 mt-0.5">Connect with a mental health professional</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 border border-amber-200 rounded-3xl p-4 flex items-start gap-3"
        >
          <span className="text-xl flex-shrink-0">⚠️</span>
          <div>
            <p className="font-nunito font-700 text-sm text-amber-800 mb-1">Professional Support</p>
            <p className="text-xs font-dm text-amber-700 leading-relaxed">
              These professionals are available for consultations. For emergencies, please call your local crisis helpline immediately.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {professionals?.map((pro, i) => (
            <motion.div
              key={pro?.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`${pro?.gradient} rounded-4xl p-5 border border-white/60 shadow-md`}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-14 h-14 rounded-3xl bg-white/50 flex items-center justify-center text-3xl border border-white/60 flex-shrink-0">
                  {pro?.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-nunito font-800 text-base ${pro?.textColor} leading-tight`}>{pro?.name}</h3>
                  <p className={`text-xs font-dm ${pro?.textColor} opacity-80 mt-0.5`}>{pro?.specialty}</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    <span className={`text-[10px] font-dm px-2 py-0.5 rounded-full bg-white/40 ${pro?.textColor}`}>{pro?.available}</span>
                    <span className={`text-[10px] font-dm px-2 py-0.5 rounded-full bg-white/40 ${pro?.textColor}`}>{pro?.languages}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className={`flex items-center gap-2 bg-white/40 rounded-2xl px-3 py-2 border border-white/60`}>
                  <Mail size={13} className={`${pro?.textColor} opacity-70 flex-shrink-0`} />
                  <span className={`text-xs font-dm ${pro?.textColor} truncate`}>{pro?.email}</span>
                </div>
                <div className={`flex items-center gap-2 bg-white/40 rounded-2xl px-3 py-2 border border-white/60`}>
                  <Phone size={13} className={`${pro?.textColor} opacity-70 flex-shrink-0`} />
                  <span className={`text-xs font-dm ${pro?.textColor}`}>{pro?.phone}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <motion.a
                  whileTap={{ scale: 0.95 }}
                  href={`https://wa.me/${pro?.whatsapp}?text=Hi%20${encodeURIComponent(pro?.name)}%2C%20I%20found%20you%20on%20AureMind%20and%20would%20like%20to%20book%20a%20consultation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-2xl bg-green-500 text-white font-nunito font-700 text-xs shadow-md hover:bg-green-600 transition-colors min-h-[44px]"
                >
                  <MessageCircle size={14} />
                  WhatsApp
                </motion.a>
                <motion.a
                  whileTap={{ scale: 0.95 }}
                  href={`mailto:${pro?.email}?subject=Consultation%20Request%20via%20AureMind`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-2xl bg-white/70 border border-white/60 font-nunito font-700 text-xs transition-colors hover:bg-white/90 min-h-[44px]"
                >
                  <Mail size={14} className={pro?.textColor} />
                  <span className={pro?.textColor}>Email</span>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-4 border border-white/60 text-center">
          <p className="text-xs font-dm text-purple-500 leading-relaxed">
            🔒 Your privacy is protected. All communications are between you and the professional directly.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
