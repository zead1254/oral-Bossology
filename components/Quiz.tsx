
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Exam, Question, QuizState } from '../types';
import { ResultView } from './Result';

interface QuizProps {
  exam: Exam;
  onExit: () => void;
}

const EXAM_TIME = 3600; // 60 minutes
const QUESTION_TIME = 60; // 60 seconds per question (optional mode)

// Utility to shuffle array
const shuffle = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const Quiz: React.FC<QuizProps> = ({ exam, onExit }) => {
  // Shuffle questions once on component mount
  const shuffledQuestions = useMemo(() => shuffle(exam.questions), [exam]);

  const [state, setState] = useState<QuizState>(() => {
    // Try to restore from LocalStorage
    const saved = localStorage.getItem(`quiz_progress_${exam.id}`);
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      currentQuestionIndex: 0,
      answers: new Array(exam.questions.length).fill(null),
      isSubmitted: false,
      timeLeft: EXAM_TIME,
      questionTimeLeft: QUESTION_TIME,
      isPaused: false,
    };
  });

  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Save progress
  useEffect(() => {
    if (!state.isSubmitted) {
      localStorage.setItem(`quiz_progress_${exam.id}`, JSON.stringify(state));
    }
  }, [state, exam.id]);

  // Timers
  useEffect(() => {
    if (state.isSubmitted || state.isPaused) return;

    const timer = setInterval(() => {
      setState(prev => {
        if (prev.timeLeft <= 0) {
          clearInterval(timer);
          return { ...prev, timeLeft: 0, isSubmitted: true };
        }
        
        const nextTimeLeft = prev.timeLeft - 1;
        const nextQTimeLeft = prev.questionTimeLeft - 1;

        // Auto next on question timeout
        if (nextQTimeLeft <= 0) {
          const isLast = prev.currentQuestionIndex === shuffledQuestions.length - 1;
          return {
            ...prev,
            timeLeft: nextTimeLeft,
            questionTimeLeft: QUESTION_TIME,
            currentQuestionIndex: isLast ? prev.currentQuestionIndex : prev.currentQuestionIndex + 1,
            isSubmitted: isLast ? true : prev.isSubmitted
          };
        }

        return {
          ...prev,
          timeLeft: nextTimeLeft,
          questionTimeLeft: nextQTimeLeft
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.isSubmitted, state.isPaused, shuffledQuestions.length]);

  // Reload protection
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!state.isSubmitted) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [state.isSubmitted]);

  const handleSelectAnswer = (optionIndex: number) => {
    if (state.isSubmitted) return;
    
    setState(prev => {
      const newAnswers = [...prev.answers];
      newAnswers[prev.currentQuestionIndex] = optionIndex;
      return { ...prev, answers: newAnswers };
    });
  };

  const goToNext = () => {
    if (state.currentQuestionIndex < shuffledQuestions.length - 1) {
      setState(prev => ({ 
        ...prev, 
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        questionTimeLeft: QUESTION_TIME 
      }));
    }
  };

  const goToPrev = () => {
    if (state.currentQuestionIndex > 0) {
      setState(prev => ({ 
        ...prev, 
        currentQuestionIndex: prev.currentQuestionIndex - 1,
        questionTimeLeft: QUESTION_TIME
      }));
    }
  };

  const handleSubmit = () => {
    setState(prev => ({ ...prev, isSubmitted: true }));
    localStorage.removeItem(`quiz_progress_${exam.id}`);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (state.isSubmitted) {
    return <ResultView exam={exam} shuffledQuestions={shuffledQuestions} answers={state.answers} onReset={onExit} />;
  }

  const currentQ = shuffledQuestions[state.currentQuestionIndex];
  const progress = ((state.currentQuestionIndex + 1) / shuffledQuestions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Info */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4 sticky top-[4.5rem] z-40">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-bold">
            سؤال {state.currentQuestionIndex + 1} / {shuffledQuestions.length}
          </div>
          <div className={`flex items-center gap-2 font-mono text-xl font-bold ${state.timeLeft < 300 ? 'text-red-500 animate-pulse' : 'dark:text-white'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            {formatTime(state.timeLeft)}
          </div>
        </div>

        <div className="flex items-center gap-2">
           <button 
            onClick={() => setShowExitConfirm(true)}
            className="text-slate-500 hover:text-red-500 transition-colors p-2"
          >
            خروج
          </button>
          <button 
            onClick={handleSubmit}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-bold transition-all shadow-md active:scale-95"
          >
            إنهاء وتسليم
          </button>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
          <div 
            className="h-full bg-blue-600 transition-all duration-500" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-6 sm:p-10 space-y-8">
          <div className="space-y-4">
             {/* Question Timer Bar */}
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500 font-bold uppercase tracking-widest">
              <span>الوقت المتبقي للسؤال</span>
              <span>{state.questionTimeLeft} ثانية</span>
            </div>
            <div className="w-full h-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-500 transition-all duration-1000" 
                style={{ width: `${(state.questionTimeLeft / QUESTION_TIME) * 100}%` }}
              />
            </div>
            
            <h3 className="text-xl sm:text-2xl font-bold leading-relaxed text-slate-900 dark:text-white" dir="ltr">
              {currentQ.text}
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {currentQ.options.map((option, idx) => {
              const isSelected = state.answers[state.currentQuestionIndex] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  className={`
                    group flex items-center p-4 rounded-2xl border-2 transition-all duration-200 text-left
                    ${isSelected 
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-slate-600'
                    }
                  `}
                  dir="ltr"
                >
                  <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg mr-4 flex-shrink-0 transition-colors
                    ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 group-hover:bg-blue-100'}
                  `}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className={`text-lg font-medium ${isSelected ? 'text-blue-900 dark:text-blue-100' : 'text-slate-700 dark:text-slate-300'}`}>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 flex items-center justify-between border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={goToPrev}
            disabled={state.currentQuestionIndex === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-400 disabled:opacity-30 hover:bg-white dark:hover:bg-slate-700 transition-all"
          >
            <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            السابق
          </button>

          <button
            onClick={goToNext}
            disabled={state.currentQuestionIndex === shuffledQuestions.length - 1}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 disabled:opacity-30 transition-all active:scale-95"
          >
            التالي
            <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          </button>
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl max-w-sm w-full shadow-2xl space-y-6 text-center">
            <h4 className="text-2xl font-bold dark:text-white">هل تريد الخروج؟</h4>
            <p className="text-slate-600 dark:text-slate-400">سيتم حفظ تقدمك الحالي في هذا المتصفح.</p>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setShowExitConfirm(false)}
                className="p-3 rounded-xl font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
              >
                إلغاء
              </button>
              <button 
                onClick={onExit}
                className="p-3 rounded-xl font-bold bg-red-600 text-white"
              >
                تأكيد الخروج
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
