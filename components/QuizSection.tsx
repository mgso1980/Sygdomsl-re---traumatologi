import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { HelpCircle, RotateCw } from 'lucide-react';

interface Props {
  questions: QuizQuestion[];
}

const QuizSection: React.FC<Props> = ({ questions }) => {
  return (
    <div className="max-w-5xl mx-auto p-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">Refleksionsspørgsmål</h2>
            <p className="text-slate-600 text-lg">Klik på kortene for at vende dem og teste din viden.</p>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {questions.map((q) => (
          <FlipCard key={q.id} question={q} />
        ))}
      </div>
    </div>
  );
};

const FlipCard: React.FC<{ question: QuizQuestion }> = ({ question }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="h-72 w-full perspective-1000 cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* Front - Question */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-2xl shadow-sm hover:shadow-xl border-2 border-slate-100 hover:border-primary/30 p-8 flex flex-col justify-between transition-all">
          <div>
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
              {question.category}
            </span>
            <h3 className="text-xl font-bold text-slate-800 mt-6 leading-snug">
              {question.question}
            </h3>
          </div>
          <div className="flex items-center justify-center text-slate-400 text-sm mt-4 group-hover:text-primary transition-colors font-medium">
             <HelpCircle className="w-5 h-5 mr-2" />
             Klik for at se svaret
          </div>
        </div>

        {/* Back - Answer */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl p-8 flex flex-col justify-center text-white border border-slate-700">
          <div className="overflow-y-auto custom-scrollbar">
             <h4 className="text-teal-400 font-bold text-xs uppercase tracking-widest mb-3 border-b border-white/10 pb-2">Korrekt Svar:</h4>
             <p className="leading-relaxed text-slate-200 text-lg">{question.answer}</p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 flex justify-center">
             <RotateCw className="w-6 h-6 text-slate-500 hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSection;