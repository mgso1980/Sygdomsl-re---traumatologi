import React from 'react';
import { CaseEvent } from '../types';
import { Activity, Heart, Clock, AlertTriangle } from 'lucide-react';

interface Props {
  events: CaseEvent[];
}

const CaseTimeline: React.FC<Props> = ({ events }) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl shadow-xl border border-slate-700 p-8 mb-10 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-12"></div>
        <div className="flex items-center gap-6 relative z-10">
            <div className="bg-red-500/20 p-4 rounded-2xl backdrop-blur-sm border border-red-500/30">
                <Activity className="w-10 h-10 text-red-400" />
            </div>
            <div>
                <h2 className="text-3xl font-bold mb-2">Casen om Martin</h2>
                <p className="text-slate-300 text-lg">31-årig bygningsarbejder, klemt af betonelement.</p>
            </div>
        </div>
      </div>

      <div className="relative border-l-4 border-slate-300 ml-6 space-y-12">
        {events.map((event, index) => {
           // Determine styling based on content keywords
           const isCritical = event.description.toLowerCase().includes('hjertestop') || event.description.toLowerCase().includes('koma');
           const isUrgent = event.description.toLowerCase().includes('pneumothorax') || event.description.toLowerCase().includes('blod');
           
           let cardStyle = "bg-white border-slate-100";
           let dotColor = "bg-slate-200 border-slate-400";
           
           if (isCritical) {
               cardStyle = "bg-gradient-to-br from-red-50 to-white border-red-100";
               dotColor = "bg-red-500 border-red-200";
           } else if (isUrgent) {
               cardStyle = "bg-gradient-to-br from-amber-50 to-white border-amber-100";
               dotColor = "bg-amber-500 border-amber-200";
           } else {
               dotColor = "bg-primary border-teal-200";
           }

           return (
              <div key={index} className="relative pl-8">
                {/* Dot on timeline */}
                <div className={`absolute -left-[1.3rem] top-0 w-6 h-6 rounded-full transform translate-y-1 border-4 ${dotColor} shadow-sm`}></div>
                
                <div className={`${cardStyle} rounded-2xl shadow-sm hover:shadow-md transition-all p-6 border`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-slate-800">{event.title}</h3>
                    <div className="flex items-center text-xs font-bold uppercase tracking-wider text-slate-500 bg-white/50 px-3 py-1 rounded-full border border-slate-200 w-fit mt-2 md:mt-0">
                      <Clock className="w-3 h-3 mr-2" />
                      {event.time}
                    </div>
                  </div>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed text-lg">{event.description}</p>
                  
                  {event.vitalSigns && event.vitalSigns.length > 0 && (
                    <div className="bg-white/60 rounded-xl p-4 border border-slate-200/60 backdrop-blur-sm">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center">
                        <Heart className="w-3 h-3 mr-2" />
                        Vitale Værdier
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {event.vitalSigns.map((vital, vIndex) => (
                          <div key={vIndex} className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                            <span className="text-slate-500 font-medium text-sm">{vital.label}</span>
                            <div className="flex items-center">
                                <span className={`font-mono font-bold mr-2 ${vital.status === 'critical' ? 'text-red-600' : 'text-slate-800'}`}>{vital.value}</span>
                                {vital.status === 'critical' && <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
           );
        })}
      </div>
    </div>
  );
};

export default CaseTimeline;