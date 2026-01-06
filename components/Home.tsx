
import React from 'react';
import { Exam, ScoreRecord } from '../types';

interface HomeProps {
  exams: Exam[];
  onSelectExam: (id: number) => void;
}

export const Home: React.FC<HomeProps> = ({ exams, onSelectExam }) => {
  const [history, setHistory] = React.useState<ScoreRecord[]>([]);

  React.useEffect(() => {
    const savedHistory = localStorage.getItem('quiz_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          أهلاً بك في منصة <span className="boss-text">Boss</span>ology
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
          استعد لامتحاناتك بذكاء. 1000 سؤال احترافي مقسمة على 10 امتحانات شاملة تغطي كافة جوانب طب الأسنان.
        </p>
      </div>

      {history.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            آخر المحاولات
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {history.slice(-4).reverse().map((record, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="text-xs text-slate-500 dark:text-slate-500 mb-1">{record.date}</div>
                <div className="font-bold dark:text-white">امتحان {record.examId}</div>
                <div className="text-2xl font-black text-blue-600 dark:text-blue-400">{record.percentage}%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{record.score} / {record.total} صحيحة</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {exams.map((exam) => (
          <div 
            key={exam.id}
            onClick={() => onSelectExam(exam.id)}
            className="group relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
          >
            <div className="h-2 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-500"></div>
            <div className="p-8 space-y-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
                {exam.id}
              </div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {exam.title}
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {exam.description}
              </p>
              <div className="flex items-center gap-4 pt-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  100 سؤال
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  60 دقيقة
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
