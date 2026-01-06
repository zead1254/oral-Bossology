
import React, { useState, useEffect, useRef } from 'react';
import { Home } from './components/Home';
import { Quiz } from './components/Quiz';
import { Exam } from './types';
import { DENTAL_EXAMS } from './questions';
import { motion, AnimatePresence } from 'framer-motion';

const REMINDERS = [
    "🌿 اذكر الله يطمئن قلبك", "🤍 ربك قريب فلا تقلق", "🕌 الصلاة راحة وليست عبئًا", "📿 سبحان الله وبحمده",
    "✨ ما خاب من توكل على الله", "🌙 قيامك لله شرف", "📖 ورد القرآن نور يومك", "🤲 ادعُ ربك فهو يسمعك",
    "💛 الله أرحم بك من نفسك", "⏰ استغفر… فالفرج قريب", "🌸 رب الخير لا يأتي إلا بالخير", "🌤️ صباحك ذكر وطمأنينة",
    "🌙 مساؤك رحمة من الله", "🕊️ ثِق بالله وكفى", "💫 الدعاء يغير الأقدار", "🕌 لا تؤخر الصلاة",
    "🌿 استعن بالله ولا تعجز", "🤍 الله جابر الخواطر", "📿 اذكر الله كثيرًا", "✨ مع الله لا تضيع",
    "🌸 الرضا باب السعادة", "🤲 اللهم طمئن قلوبنا", "📖 القرآن شفاء للقلوب", "🕊️ هونها، الله يدبر",
    "🌙 لا تنسَ أذكارك", "💛 رحمة الله أوسع", "🌿 الصبر مفتاح الفرج", "✨ ربك كريم فلا تيأس",
    "🕌 الصلاة أولًا", "🤍 الحمد لله دائمًا"
];

const App: React.FC = () => {
  const [currentExam, setCurrentExam] = useState<Exam | null>(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') !== 'light');
  
  // Audio & Reminder state
  const [audioPlaying, setAudioPlaying] = useState(() => localStorage.getItem('boss_audio_on') !== 'false');
  const [volume, setVolume] = useState(0.3);
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [showReminder, setShowReminder] = useState(false);
  const [reminderText, setReminderText] = useState(REMINDERS[0]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Audio Logic
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (audioPlaying) {
        audioRef.current.play().catch(() => setAudioPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
    localStorage.setItem('boss_audio_on', String(audioPlaying));
  }, [audioPlaying, volume]);

  // Reminder Logic (3 Minutes)
  useEffect(() => {
    // Show on entry
    const triggerReminder = () => {
      const randomIdx = Math.floor(Math.random() * REMINDERS.length);
      setReminderText(REMINDERS[randomIdx]);
      setShowReminder(true);
      setTimeout(() => setShowReminder(false), 8000);
    };

    triggerReminder(); // Initial

    const interval = setInterval(() => {
      if (remindersEnabled) triggerReminder();
    }, 180000); // 3 minutes

    return () => clearInterval(interval);
  }, [remindersEnabled]);

  const handleSelectExam = (examId: number) => {
    const exam = DENTAL_EXAMS.find(e => e.id === examId);
    if (exam) setCurrentExam(exam);
    window.scrollTo(0, 0);
  };

  const handleExitQuiz = () => setCurrentExam(null);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-500 font-sans selection:bg-amber-200 dark:selection:bg-amber-900/40">
      <audio ref={audioRef} src="P22.mp3" loop />
      
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700 h-16 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={handleExitQuiz}>
            <div className="w-10 h-10 bg-slate-900 dark:bg-amber-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:scale-105 transition-transform">
              B
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
              oral <span className="text-amber-600 dark:text-amber-500">Boss</span>ology
            </h1>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Audio Toggle */}
            <button 
                onClick={() => setAudioPlaying(!audioPlaying)}
                className={`p-2.5 rounded-xl transition-all ${audioPlaying ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-600' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}
                title="تشغيل/إيقاف الصوت"
            >
                {audioPlaying ? '🔊' : '🔇'}
            </button>

            {/* Reminder Toggle */}
            <button 
                onClick={() => setRemindersEnabled(!remindersEnabled)}
                className={`p-2.5 rounded-xl transition-all ${remindersEnabled ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}
                title="تفعيل/تعطيل التذكير"
            >
                {remindersEnabled ? '🔔' : '🔕'}
            </button>

            {/* Theme Toggle */}
            <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all shadow-sm"
                aria-label="Toggle Theme"
            >
                {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {currentExam ? (
            <motion.div key="quiz" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Quiz exam={currentExam} onExit={handleExitQuiz} />
            </motion.div>
          ) : (
            <motion.div key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Home exams={DENTAL_EXAMS} onSelectExam={handleSelectExam} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-xl font-bold">
            جميع الأسئلة تم إنشاؤها بواسطة الذكاء الاصطناعي
          </p>
          <p className="text-slate-500 dark:text-slate-500 text-sm font-medium">
            لا تنسوا الدعاء للـ <span className="text-amber-600 dark:text-amber-500 font-black uppercase tracking-widest">Boss</span> 🤲
          </p>
        </div>
      </footer>

      {/* Persistent Reminder Toast */}
      <AnimatePresence>
        {showReminder && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-2 border-amber-500/50 px-10 py-5 rounded-full shadow-2xl flex items-center justify-center min-w-[300px]"
          >
            <span className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-500 drop-shadow-sm whitespace-nowrap">
                {reminderText}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
