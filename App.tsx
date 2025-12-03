
import React, { useState } from 'react';
import { TOPICS, MARTIN_CASE, STUDY_QUESTIONS, SIMULATION_SCENARIOS } from './constants';
import { Topic } from './types';
import TheoryModule from './components/TheoryModule';
import CaseTimeline from './components/CaseTimeline';
import QuizSection from './components/QuizSection';
import SimulationGame from './components/SimulationGame';
import VisualsGallery from './components/VisualsGallery';
import { LayoutDashboard, Book, Activity, HelpCircle, Stethoscope, ChevronLeft, Gamepad2, Eye, ArrowRight } from 'lucide-react';

type View = 'dashboard' | 'theory' | 'case' | 'quiz' | 'simulation' | 'visuals';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic);
    setCurrentView('theory');
  };

  const tabs = [
    { id: 'dashboard', label: 'Oversigt', icon: LayoutDashboard },
    { id: 'case', label: 'Casen om Martin', icon: Activity },
    { id: 'quiz', label: 'Refleksion', icon: HelpCircle },
    { id: 'simulation', label: 'Simulation', icon: Gamepad2 },
    { id: 'visuals', label: 'Visualisering', icon: Eye },
    { id: 'theory', label: 'Teori', icon: Book },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans relative overflow-hidden">
      {/* Background Decorational Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
         <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 animate-float"></div>
         <div className="absolute top-40 -left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl opacity-50 animate-float" style={{animationDelay: '2s'}}></div>
         <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl opacity-30 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Top Navigation Bar */}
      <header className="glass sticky top-0 z-50 border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 text-slate-800 font-bold text-xl cursor-pointer mr-8"
              onClick={() => setCurrentView('dashboard')}
            >
              <div className="bg-gradient-to-br from-primary to-teal-600 text-white p-2 rounded-lg shadow-md">
                <Stethoscope className="w-5 h-5" />
              </div>
              <span className="hidden sm:inline bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-800">TraumaTutor</span>
            </div>

            {/* Scrollable Tabs */}
            <nav className="flex-1 flex overflow-x-auto no-scrollbar mask-gradient">
              <div className="flex space-x-1 sm:space-x-2 py-1">
                {tabs.map((tab) => {
                  const isActive = currentView === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setCurrentView(tab.id as View)}
                      className={`
                        flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300
                        ${isActive 
                          ? 'bg-slate-800 text-white shadow-lg transform scale-105' 
                          : 'text-slate-600 hover:bg-white hover:shadow-sm'}
                      `}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-teal-300' : 'text-slate-400'}`} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 animate-fadeIn">
        
        {/* VIEW: DASHBOARD */}
        {currentView === 'dashboard' && (
          <div className="space-y-10">
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800 z-0"></div>
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')] opacity-10 z-0"></div>
               <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-primary/20 to-transparent z-0"></div>
               
               <div className="relative z-10 p-8 md:p-12 text-white">
                 <div className="inline-block px-3 py-1 bg-primary/30 border border-primary/50 rounded-full text-xs font-semibold mb-4 text-teal-200">
                    Sygdomslære 5. Semester
                 </div>
                 <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                   Velkommen til <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">TraumaTutor</span>
                 </h1>
                 <p className="text-slate-300 max-w-xl text-lg mb-8 leading-relaxed">
                   Din interaktive guide til traumatologi. Start med casen, test din viden i simulationen, eller dyk ned i teorien.
                 </p>
                 <button 
                   onClick={() => setCurrentView('case')}
                   className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-teal-50 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-200"
                 >
                   Start Casen
                   <ArrowRight className="w-5 h-5" />
                 </button>
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Action Cards */}
                <div onClick={() => setCurrentView('case')} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white hover:border-red-200 hover:shadow-xl hover:shadow-red-500/10 transition-all cursor-pointer group hover:-translate-y-1">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
                        <Activity className="w-7 h-7 text-red-600" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 mb-2">Casen om Martin</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">Patientforløbet fra ulykke til rehabilitering.</p>
                </div>

                <div onClick={() => setCurrentView('quiz')} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white hover:border-amber-200 hover:shadow-xl hover:shadow-amber-500/10 transition-all cursor-pointer group hover:-translate-y-1">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
                        <HelpCircle className="w-7 h-7 text-amber-600" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 mb-2">Refleksion</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">Vendekort med centrale spørgsmål.</p>
                </div>

                <div onClick={() => setCurrentView('simulation')} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10 transition-all cursor-pointer group hover:-translate-y-1">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
                        <Gamepad2 className="w-7 h-7 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 mb-2">Simulation</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">Træf de rigtige kliniske beslutninger.</p>
                </div>

                <div onClick={() => setCurrentView('visuals')} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white hover:border-purple-200 hover:shadow-xl hover:shadow-purple-500/10 transition-all cursor-pointer group hover:-translate-y-1">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
                        <Eye className="w-7 h-7 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 mb-2">Visualisering</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">Interaktive animationer af patologi.</p>
                </div>
            </div>

            <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-sm border border-white p-8 mt-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg"><Book className="w-5 h-5 text-primary" /></div>
                  Teori Moduler
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {TOPICS.map(topic => {
                      return (
                        <div 
                          key={topic.id}
                          onClick={() => handleTopicClick(topic)}
                          className="flex items-center p-4 rounded-xl border border-transparent bg-white hover:border-primary/30 hover:shadow-md cursor-pointer transition-all group"
                        >
                            <div className="bg-slate-50 p-3 rounded-lg mr-4 text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <Book className="w-5 h-5" />
                            </div>
                            <span className="font-semibold text-slate-700 group-hover:text-primary transition-colors">{topic.title}</span>
                        </div>
                      );
                    })}
                </div>
            </div>
          </div>
        )}

        {/* VIEW: THEORY */}
        {currentView === 'theory' && (
          <div className="h-full animate-fadeIn">
            {selectedTopic ? (
               <div className="h-full flex flex-col">
                 <button 
                   onClick={() => setSelectedTopic(null)}
                   className="flex items-center text-sm font-medium text-slate-500 hover:text-primary mb-6 w-fit transition-colors bg-white px-4 py-2 rounded-full shadow-sm hover:shadow"
                 >
                   <ChevronLeft className="w-4 h-4 mr-1" />
                   Tilbage til emneoversigt
                 </button>
                 <TheoryModule module={selectedTopic} />
               </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                 <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Vælg et emne</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {TOPICS.map(topic => (
                        <div 
                          key={topic.id}
                          onClick={() => handleTopicClick(topic)}
                          className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:scale-[1.02] cursor-pointer transition-all text-center group"
                        >
                            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-full mb-6 group-hover:from-primary group-hover:to-teal-500 transition-all duration-300">
                                <Book className="w-10 h-10 text-primary group-hover:text-white" />
                            </div>
                            <h3 className="font-bold text-xl text-slate-800 mb-1">{topic.title}</h3>
                            <p className="text-slate-400 text-sm">{topic.slides.length} slides</p>
                        </div>
                    ))}
                 </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW: CASE */}
        {currentView === 'case' && (
             <CaseTimeline events={MARTIN_CASE} />
        )}

        {/* VIEW: SIMULATION */}
        {currentView === 'simulation' && (
            <SimulationGame scenarios={SIMULATION_SCENARIOS} />
        )}

        {/* VIEW: VISUALS */}
        {currentView === 'visuals' && (
            <VisualsGallery />
        )}

        {/* VIEW: QUIZ */}
        {currentView === 'quiz' && (
            <QuizSection questions={STUDY_QUESTIONS} />
        )}

      </main>
    </div>
  );
};

export default App;
