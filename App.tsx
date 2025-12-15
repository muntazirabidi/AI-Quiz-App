import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Brain, 
  ArrowRight, 
  Check, 
  X, 
  CalendarDays,
  Trophy,
  ChevronRight
} from 'lucide-react';
import { TEEN_QUIZ, ADULT_QUIZ } from './constants';
import { AudienceType, QuizConfig } from './types';
import { triggerSuccessConfetti, triggerCompletionConfetti } from './components/Confetti';

// --- Brand Colors ---
const BRAND = {
  NAVY: '#120f38',
  TEAL: '#5ce1e6',
  ORANGE: '#ff7e38',
  YELLOW: '#ffe045',
  WHITE: '#ffffff',
  BG: '#f8fafc',
};

// --- Components ---

const Card = ({ children, className = "", delay = 0 }: { children?: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={`bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-[0_10px_30px_rgba(18,15,56,0.05)] border border-slate-100 ${className}`}
  >
    {children}
  </motion.div>
);

const SelectionButton = ({ 
  onClick, 
  icon: Icon, 
  title, 
  subtitle, 
  colorClass, 
  accentColor 
}: { 
  onClick: () => void, 
  icon: any, 
  title: string, 
  subtitle: string, 
  colorClass: string,
  accentColor: string
}) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="group relative w-full text-left"
  >
    <div className={`absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${colorClass} blur-xl`} />
    <Card className="p-6 md:p-8 h-full relative overflow-hidden border-2 border-transparent active:border-slate-100 transition-colors">
      <div className={`absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 rounded-full -mr-12 -mt-12 opacity-10 transition-transform group-hover:scale-150 ${colorClass}`} />
      
      <div className="relative z-10 flex items-center gap-5">
        <div className={`p-3 md:p-4 rounded-xl ${colorClass} bg-opacity-10 text-${accentColor} shrink-0`}>
          <Icon className="w-6 h-6 md:w-8 md:h-8" style={{ color: accentColor }} />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-brand font-bold text-slate-900 mb-1">{title}</h3>
          <p className="text-slate-500 font-medium text-sm md:text-base leading-tight">{subtitle}</p>
        </div>
        <div className="text-slate-300">
          <ChevronRight className="w-6 h-6" />
        </div>
      </div>
    </Card>
  </motion.button>
);

export default function App() {
  const [screen, setScreen] = useState<'WELCOME' | 'QUIZ' | 'RESULT'>('WELCOME');
  const [audience, setAudience] = useState<AudienceType>('TEEN');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const activeQuiz: QuizConfig = audience === 'TEEN' ? TEEN_QUIZ : ADULT_QUIZ;
  const currentQuestion = activeQuiz.questions[currentQuestionIdx];
  const isLastQuestion = currentQuestionIdx === activeQuiz.questions.length - 1;

  const handleStart = (type: AudienceType) => {
    setAudience(type);
    setCurrentQuestionIdx(0);
    setScore(0);
    setScreen('QUIZ');
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
  };

  const handleAnswerSelect = (option: string) => {
    if (isAnswerChecked) return;
    
    setSelectedAnswer(option);
    setIsAnswerChecked(true);

    if (option === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
      triggerSuccessConfetti();
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setScreen('RESULT');
      triggerCompletionConfetti();
    } else {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
    }
  };

  const handleRestart = () => {
    setScreen('WELCOME');
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-slate-900 font-sans selection:bg-[#5ce1e6] selection:text-[#120f38] overflow-x-hidden flex flex-col">
      
      {/* --- Background Elements --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -right-[20%] w-[300px] h-[300px] md:w-[800px] md:h-[800px] rounded-full bg-[#5ce1e6] opacity-[0.05] blur-[80px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, -45, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -left-[20%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-[#ff7e38] opacity-[0.05] blur-[80px]" 
        />
      </div>

      {/* --- Header --- */}
      <header className="relative z-50 w-full p-6 flex justify-center">
        <div className="flex items-center gap-2 md:gap-3">
             {/* Logo Image Slot */}
             <img 
               src="https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png" 
               alt="CamEdVenture Logo" 
               className="h-8 md:h-10 w-auto object-contain" 
               onError={(e) => e.currentTarget.style.display = 'none'}
             />
             
             {/* CamEdVenture Text Logo - Black with Highlight */}
             <div className="relative">
                {/* Fun marker highlight effect */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: "circOut" }}
                  className="absolute bottom-1 left-[-4px] right-[-4px] h-3 md:h-4 bg-[#5ce1e6] opacity-60 -rotate-1 rounded-sm origin-left -z-10"
                />
                <div className="text-2xl md:text-3xl font-bold tracking-tight text-black font-['Fredoka'] relative z-10">
                   CamEdVenture
                </div>
             </div>
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pb-8 w-full max-w-lg mx-auto md:max-w-4xl">
        <AnimatePresence mode="wait">

          {/* WELCOME SCREEN */}
          {screen === 'WELCOME' && (
            <motion.div 
              key="welcome"
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex flex-col items-center"
            >
              <div className="text-center w-full mb-8 md:mb-12 space-y-4 md:space-y-6">
                
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-7xl font-brand font-bold text-[#120f38] leading-tight"
                >
                  Test Your <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5ce1e6] to-[#ff7e38]">
                    AI Knowledge
                  </span>
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-base md:text-xl text-slate-500 max-w-xs md:max-w-lg mx-auto"
                >
                  Select your experience level to begin the challenge.
                </motion.p>
              </div>

              <div className="flex flex-col gap-4 w-full">
                <SelectionButton 
                  onClick={() => handleStart('TEEN')}
                  icon={Sparkles}
                  title="For Teens"
                  subtitle="Fun, fast & futuristic"
                  colorClass="bg-[#5ce1e6]"
                  accentColor={BRAND.NAVY}
                />
                <SelectionButton 
                  onClick={() => handleStart('ADULT')}
                  icon={Brain}
                  title="Professionals"
                  subtitle="Industry insights & trends"
                  colorClass="bg-[#ff7e38]"
                  accentColor={BRAND.ORANGE}
                />
              </div>
            </motion.div>
          )}

          {/* QUIZ SCREEN */}
          {screen === 'QUIZ' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="w-full"
            >
              {/* Progress Bar */}
              <div className="w-full h-2 bg-slate-200 rounded-full mb-6 overflow-hidden">
                <motion.div 
                  className="h-full rounded-full"
                  style={{ backgroundColor: audience === 'TEEN' ? BRAND.TEAL : BRAND.ORANGE }}
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestionIdx + 1) / activeQuiz.questions.length) * 100}%` }}
                  transition={{ type: "spring", stiffness: 50 }}
                />
              </div>

              <Card className="p-6 md:p-10 relative overflow-hidden flex flex-col min-h-[50vh] justify-between">
                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-24 h-24 opacity-5 rounded-bl-[100%] transition-colors duration-500 ${audience === 'TEEN' ? 'bg-[#5ce1e6]' : 'bg-[#ff7e38]'}`} />

                <div className="relative z-10">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-3 block">
                    Question {currentQuestionIdx + 1} / {activeQuiz.questions.length}
                  </span>
                  
                  <h2 className="text-2xl md:text-4xl font-brand font-bold text-[#120f38] mb-6 md:mb-10 leading-snug">
                    {currentQuestion.text}
                  </h2>

                  <div className="flex flex-col gap-3">
                    {currentQuestion.options.map((option, idx) => {
                      const isSelected = selectedAnswer === option;
                      const isCorrect = option === currentQuestion.correctAnswer;
                      const showCorrect = isAnswerChecked && isCorrect;
                      const showWrong = isAnswerChecked && isSelected && !isCorrect;

                      return (
                        <motion.button
                          key={idx}
                          onClick={() => handleAnswerSelect(option)}
                          disabled={isAnswerChecked}
                          whileTap={!isAnswerChecked ? { scale: 0.98 } : {}}
                          className={`
                            relative w-full p-4 rounded-xl text-left font-semibold text-base md:text-lg transition-all duration-200 border
                            flex items-center justify-between group
                            ${showCorrect 
                              ? 'bg-[#5ce1e6]/10 border-[#5ce1e6] text-[#0f172a]' 
                              : showWrong
                              ? 'bg-[#ff7e38]/10 border-[#ff7e38] text-[#ff7e38]'
                              : isAnswerChecked 
                              ? 'bg-slate-50 border-slate-100 text-slate-400' 
                              : 'bg-white border-slate-200 text-slate-700 hover:border-[#120f38]/20'
                            }
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`
                              w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-colors
                              ${showCorrect ? 'bg-[#5ce1e6] border-[#5ce1e6] text-white' : 
                                showWrong ? 'bg-[#ff7e38] border-[#ff7e38] text-white' : 
                                'border-slate-200 text-slate-400 group-hover:border-slate-400 group-hover:text-slate-600'}
                            `}>
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="leading-tight">{option}</span>
                          </div>

                          {showCorrect && <Check className="w-5 h-5 text-[#5ce1e6] shrink-0" />}
                          {showWrong && <X className="w-5 h-5 text-[#ff7e38] shrink-0" />}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Navigation */}
                <div className="mt-8 flex justify-end h-12">
                   <AnimatePresence>
                     {isAnswerChecked && (
                       <motion.button
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: 10 }}
                         onClick={handleNext}
                         className={`px-6 py-2 rounded-full font-bold text-white flex items-center gap-2 shadow-lg active:scale-95 ${audience === 'TEEN' ? 'bg-[#120f38]' : 'bg-[#ff7e38]'}`}
                       >
                         {isLastQuestion ? "Finish" : "Next"}
                         <ChevronRight className="w-4 h-4" />
                       </motion.button>
                     )}
                   </AnimatePresence>
                </div>
              </Card>
            </motion.div>
          )}

          {/* RESULT SCREEN */}
          {screen === 'RESULT' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full text-center"
            >
              <Card className="p-8 md:p-14 overflow-hidden relative">
                 <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#5ce1e6] via-[#ffe045] to-[#ff7e38]" />

                 <div className="mb-6 relative inline-block">
                    <div className="absolute inset-0 bg-[#ffe045] rounded-full blur-2xl opacity-20 animate-pulse"></div>
                    <Trophy className="w-20 h-20 md:w-24 md:h-24 text-[#ffe045] relative z-10 mx-auto drop-shadow-sm" />
                 </div>

                 <h2 className="text-3xl md:text-4xl font-brand font-bold text-[#120f38] mb-2">
                   {score === activeQuiz.questions.length ? "Perfect!" : "Well Done!"}
                 </h2>
                 <div className="text-slate-500 mb-8 font-medium">
                   You scored <span className="text-[#120f38] font-bold text-xl">{score}</span> / {activeQuiz.questions.length}
                 </div>

                 {/* CTA Box */}
                 <div className="bg-[#f8fafc] rounded-2xl p-5 border border-slate-100 mb-6">
                   <div className="flex items-center justify-center gap-2 mb-2">
                      <CalendarDays className="w-5 h-5 text-[#ff7e38]" />
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Next Session</span>
                   </div>
                   <div className="text-xl md:text-2xl font-bold text-[#120f38] mb-1">
                      {activeQuiz.eventDate}
                   </div>
                   <p className="text-xs md:text-sm text-slate-500">
                     Join our Free {audience === 'TEEN' ? 'Teen' : 'Professional'} Bootcamp
                   </p>
                 </div>

                 <button 
                   onClick={handleRestart}
                   className="w-full py-3 md:py-4 rounded-xl font-bold border-2 border-slate-100 text-slate-500 hover:text-[#120f38] hover:border-[#120f38] transition-colors"
                 >
                   Take Quiz Again
                 </button>
              </Card>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}