import React, { useState } from 'react';
import { Topic } from '../types';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

interface Props {
  module: Topic;
}

const TheoryModule: React.FC<Props> = ({ module }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < module.slides.length - 1) setCurrentSlide(prev => prev + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
  };

  const slide = module.slides[currentSlide];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 h-full flex flex-col">
      {/* Header */}
      <div className="bg-primary p-4 text-white flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          {module.title}
        </h2>
        <span className="text-sm bg-primary/80 px-2 py-1 rounded">
          Slide {currentSlide + 1} / {module.slides.length}
        </span>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8 flex flex-col md:flex-row gap-8 overflow-y-auto">
        <div className="flex-1 space-y-6">
          <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-secondary inline-block pb-2">
            {slide.title}
          </h3>
          <ul className="space-y-4">
            {slide.content.map((point, index) => (
              <li key={index} className="flex items-start gap-3 text-slate-700 leading-relaxed text-lg">
                <span className="mt-2 w-2 h-2 bg-secondary rounded-full flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Visual Placeholder (Simulating slides images) */}
        <div className="w-full md:w-1/3 bg-slate-100 rounded-lg flex items-center justify-center min-h-[200px] border-2 border-dashed border-slate-300 p-4">
          <div className="text-center text-slate-500">
             <img 
              src={`https://picsum.photos/400/300?random=${currentSlide + parseInt(module.id.length.toString())}`} 
              alt="Medical Illustration Placeholder" 
              className="rounded-md shadow-sm mb-2 object-cover w-full h-48"
             />
             <p className="text-xs italic">{slide.imagePrompt}</p>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="bg-slate-50 p-4 flex justify-between items-center border-t border-slate-200">
        <button 
          onClick={prevSlide} 
          disabled={currentSlide === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            currentSlide === 0 ? 'text-slate-400 cursor-not-allowed' : 'text-primary hover:bg-primary/10'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          Forrige
        </button>
        
        <div className="flex gap-2">
            {module.slides.map((_, idx) => (
                <div key={idx} className={`h-2 w-2 rounded-full ${idx === currentSlide ? 'bg-primary' : 'bg-slate-300'}`} />
            ))}
        </div>

        <button 
          onClick={nextSlide} 
          disabled={currentSlide === module.slides.length - 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            currentSlide === module.slides.length - 1 ? 'text-slate-400 cursor-not-allowed' : 'text-primary hover:bg-primary/10'
          }`}
        >
          Næste
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TheoryModule;