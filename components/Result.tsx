
import React, { useMemo } from 'react';
import { Exam, Question, ScoreRecord } from '../types';

interface ResultViewProps {
  exam: Exam;
  shuffledQuestions: Question[];
  answers: (number | null)[];
  onReset: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ exam, shuffledQuestions, answers, onReset }) => {
  const stats = useMemo(() => {
    let correct = 0;
    shuffledQuestions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) correct++;
    });
    const total = shuffledQuestions.length;
    const percentage = Math.round((correct / total) * 100);
    
    let evaluation = "محتاج مراجعة";
    let emoji = "💪";
    let color = "text-red-500";
    
    if (percentage >= 90) {
      evaluation = "ممتاز جداً";
      emoji = "👑";
      color = "text-yellow-500";
    } else if (percentage >= 75) {
      evaluation = "جيد جداً";
      emoji = "👏";
      color = "text-blue-500";
    } else if (percentage >= 50) {
      evaluation = "جيد";
      emoji = "👍";
      color = "text-green-500";
    }

    return { correct, total, percentage, evaluation, emoji, color };
  }, [shuffledQuestions, answers]);

  React.useEffect(() => {
    const record: ScoreRecord = {
      examId: exam.id,
      score: stats.correct,
      total: stats.total,
      percentage: stats.percentage,
      date: new Date().toLocaleString('ar-EG'),
    };
    const saved = localStorage.getItem('quiz_history');
    const history = saved ? JSON.parse(saved) : [];
    history.push(record);
    localStorage.setItem('quiz_history', JSON.stringify(history));
  }, [stats, exam.id]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Summary Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden text-center p-10 space-y-6">
        <div className="space-y-2">
          <div className="text-6xl mb-4">{stats.emoji}</div>
          <h2 className="text-4xl font-black dark:text-white">{stats.evaluation}</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">لقد أتممت {exam.title}</p>
        </div>

        <div className="flex justify-center items-center gap-12 py-8">
          <div className="space-y-1">
            <div className="text-4xl font-black text-slate-900 dark:text-white">{stats.percentage}%</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">النسبة المئوية</div>
          </div>
          <div className="w-px h-16 bg-slate-200 dark:bg-slate-700"></div>
          <div className="space-y-1">
            <div className="text-4xl font-black text-blue-600 dark:text-blue-400">{stats.correct} / {stats.total}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">الإجابات الصحيحة</div>
          </div>
        </div>

        <button 
          onClick={onReset}
          className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-600/30 active:scale-95"
        >
          العودة للرئيسية
        </button>
      </div>

      {/* Review Section */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold dark:text-white flex items-center gap-2">
          <svg className="w-7 h-7 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
          مراجعة الإجابات
        </h3>
        
        {shuffledQuestions.map((q, i) => {
          const userAnswer = answers[i];
          const isCorrect = userAnswer === q.correctAnswer;
          return (
            <div key={q.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h4 className="text-lg font-bold dark:text-white leading-relaxed" dir="ltr">{i + 1}. {q.text}</h4>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {isCorrect ? '✓' : '✕'}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((opt, idx) => {
                  const isUserPick = userAnswer === idx;
                  const isRight = q.correctAnswer === idx;
                  let bgClass = 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400';
                  if (isRight) bgClass = 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800';
                  if (isUserPick && !isRight) bgClass = 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800';
                  
                  return (
                    <div key={idx} className={`p-3 rounded-xl text-sm font-medium flex gap-2 items-center ${bgClass}`} dir="ltr">
                      <span className="font-bold opacity-50">{String.fromCharCode(65 + idx)}.</span>
                      {opt}
                    </div>
                  );
                })}
              </div>

              {!isCorrect && q.explanation && (
                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl border-l-4 border-yellow-400 text-sm text-yellow-800 dark:text-yellow-200">
                  <span className="font-bold">توضيح: </span> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
