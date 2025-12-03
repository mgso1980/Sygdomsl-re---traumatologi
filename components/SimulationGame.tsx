import React, { useState, useEffect } from 'react';
import { Scenario } from '../types';
import { HeartPulse, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface Props {
  scenarios: Scenario[];
}

const SimulationGame: React.FC<Props> = ({ scenarios }) => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  // Reset game if the number of scenarios changes (fixes hot-reload/update issues)
  useEffect(() => {
    setCurrentScenarioIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowSummary(false);
  }, [scenarios.length]);

  const scenario = scenarios[currentScenarioIndex];

  // Guard clause if scenario is undefined (safety check)
  if (!scenario) {
      return <div>Indlæser scenarier...</div>;
  }

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (scenario.options[index].isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const nextScenario = () => {
    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowSummary(true);
    }
  };

  const restartGame = () => {
    setCurrentScenarioIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowSummary(false);
  };

  if (showSummary) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-100 p-12 text-center animate-fadeIn relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>
        
        <div className="w-24 h-24 bg-gradient-to-br from-teal-50 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <HeartPulse className="w-12 h-12 text-teal-600" />
        </div>
        
        <h2 className="text-4xl font-bold text-slate-800 mb-4">Simulation Gennemført!</h2>
        <p className="text-slate-500 mb-10 text-xl">
          Du fik <span className="font-bold text-primary text-2xl">{score}</span> ud af <span className="font-bold text-slate-800 text-2xl">{scenarios.length}</span> rigtige.
        </p>
        
        <div className="bg-slate-50 p-8 rounded-2xl mb-10 text-left border border-slate-100">
           <h3 className="font-bold text-slate-800 mb-4 text-lg">Centrale Læringspointer:</h3>
           <ul className="space-y-3 text-slate-600">
             <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />ABCDE-tilgangen er altid første prioritet.</li>
             <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />Pneumothorax kræver akut handling ved shock.</li>
             <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />Mørk urin og muskelsmerter = Rhabdomyolyse.</li>
             <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />Subkutant emfysem er luft i vævet.</li>
           </ul>
        </div>

        <button 
          onClick={restartGame}
          className="bg-slate-800 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-900 transition-all flex items-center justify-center gap-2 mx-auto hover:scale-105 shadow-lg"
        >
          <RotateCcw className="w-5 h-5" />
          Prøv Igen
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between px-2">
         <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
           Scenarie {currentScenarioIndex + 1} / {scenarios.length}
         </span>
         <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Score</span>
            <span className="font-bold text-white bg-primary px-3 py-1 rounded-full text-sm shadow-sm">
             {score}
            </span>
         </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Scenario Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <HeartPulse className="w-32 h-32" />
          </div>
          <h2 className="text-3xl font-bold mb-4 relative z-10">{scenario.title}</h2>
          <p className="text-slate-300 text-xl leading-relaxed relative z-10 font-light">{scenario.description}</p>
        </div>

        {/* Options */}
        <div className="p-8 space-y-4 bg-slate-50/50">
          {scenario.options.map((option, idx) => {
            let btnClass = "w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center justify-between group relative overflow-hidden ";
            
            if (isAnswered) {
              if (idx === selectedOption) {
                btnClass += option.isCorrect 
                  ? "border-green-500 bg-green-50 text-green-900 shadow-md" 
                  : "border-red-500 bg-red-50 text-red-900 shadow-md";
              } else if (option.isCorrect) {
                 btnClass += "border-green-500 bg-green-50 text-green-800 opacity-60 dashed"; 
              } else {
                btnClass += "border-slate-100 text-slate-400 opacity-40 bg-slate-50";
              }
            } else {
              btnClass += "border-white bg-white shadow-sm hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 text-slate-700";
            }

            return (
              <button 
                key={idx} 
                onClick={() => handleOptionClick(idx)}
                disabled={isAnswered}
                className={btnClass}
              >
                <span className="font-semibold text-lg relative z-10">{option.text}</span>
                {isAnswered && idx === selectedOption && (
                    <div className="relative z-10">
                        {option.isCorrect ? <CheckCircle2 className="w-8 h-8 text-green-600" /> : <XCircle className="w-8 h-8 text-red-600" />}
                    </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback Section */}
        {isAnswered && (
          <div className={`p-8 border-t-4 animate-fadeIn ${scenario.options[selectedOption!].isCorrect ? 'bg-green-50/50 border-green-500' : 'bg-red-50/50 border-red-500'}`}>
            <div className={`mb-3 font-bold text-xl flex items-center gap-2 ${scenario.options[selectedOption!].isCorrect ? 'text-green-800' : 'text-red-800'}`}>
               {scenario.options[selectedOption!].isCorrect ? (
                   <><CheckCircle2 className="w-6 h-6" /> Godt klaret!</>
               ) : (
                   <><XCircle className="w-6 h-6" /> Ikke helt korrekt</>
               )}
            </div>
            <p className="text-slate-700 text-lg leading-relaxed mb-8 max-w-3xl">
              {scenario.options[selectedOption!].feedback}
            </p>
            <div className="flex justify-end">
                <button 
                onClick={nextScenario}
                className="bg-slate-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-900 transition-colors flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                {currentScenarioIndex < scenarios.length - 1 ? 'Næste Scenarie' : 'Se Resultat'}
                <ArrowRight className="w-5 h-5" />
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimulationGame;