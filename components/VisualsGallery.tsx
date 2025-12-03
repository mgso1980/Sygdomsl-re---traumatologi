
import React, { useState } from 'react';
import { Wind, Activity, Info, Layers, Droplets, ArrowRight, PlayCircle, Brain, MoveVertical } from 'lucide-react';

type VisualType = 'pneumo' | 'compartment' | 'rhabdo' | 'cranium' | 'columna';

const VisualsGallery: React.FC = () => {
  const [activeVisual, setActiveVisual] = useState<VisualType>('pneumo');

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Interaktiv Visualisering</h2>
        <p className="text-slate-600 mt-2">Vælg et emne herunder for at starte simulationen:</p>
      </div>

      {/* Navigation Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <NavButton 
            id="pneumo" 
            active={activeVisual} 
            onClick={setActiveVisual} 
            icon={Wind} 
            label="Pneumothorax" 
            sub="Lungekollaps"
            colorClass="blue"
        />
        <NavButton 
            id="compartment" 
            active={activeVisual} 
            onClick={setActiveVisual} 
            icon={Layers} 
            label="Kompartment" 
            sub="Muskeltryk"
            colorClass="red"
        />
        <NavButton 
            id="rhabdo" 
            active={activeVisual} 
            onClick={setActiveVisual} 
            icon={Droplets} 
            label="Rhabdomyolyse" 
            sub="Nyresvigt"
            colorClass="amber"
        />
        <NavButton 
            id="cranium" 
            active={activeVisual} 
            onClick={setActiveVisual} 
            icon={Brain} 
            label="Kranietraume" 
            sub="Hæmatomer"
            colorClass="purple"
        />
        <NavButton 
            id="columna" 
            active={activeVisual} 
            onClick={setActiveVisual} 
            icon={MoveVertical} 
            label="Columna" 
            sub="Rygmarvsskade"
            colorClass="emerald"
        />
      </div>

      {/* Active Animation Container */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden min-h-[500px] animate-fadeIn">
         {activeVisual === 'pneumo' && <PneumothoraxAnimation />}
         {activeVisual === 'compartment' && <CompartmentAnimation />}
         {activeVisual === 'rhabdo' && <RhabdoAnimation />}
         {activeVisual === 'cranium' && <CraniumAnimation />}
         {activeVisual === 'columna' && <ColumnaAnimation />}
      </div>
    </div>
  );
};

// Helper Component for Navigation Buttons to clean up main render
const NavButton: React.FC<{
    id: VisualType, 
    active: VisualType, 
    onClick: (id: VisualType) => void, 
    icon: any, 
    label: string, 
    sub: string,
    colorClass: string
}> = ({ id, active, onClick, icon: Icon, label, sub, colorClass }) => {
    const isActive = active === id;
    
    // Color mapping
    const colors: Record<string, {active: string, ring: string, iconBg: string, iconColor: string}> = {
        blue: { active: 'border-blue-500 bg-blue-50', ring: 'ring-blue-200', iconBg: 'bg-blue-200', iconColor: 'text-blue-700' },
        red: { active: 'border-red-500 bg-red-50', ring: 'ring-red-200', iconBg: 'bg-red-200', iconColor: 'text-red-700' },
        amber: { active: 'border-amber-500 bg-amber-50', ring: 'ring-amber-200', iconBg: 'bg-amber-200', iconColor: 'text-amber-700' },
        purple: { active: 'border-purple-500 bg-purple-50', ring: 'ring-purple-200', iconBg: 'bg-purple-200', iconColor: 'text-purple-700' },
        emerald: { active: 'border-emerald-500 bg-emerald-50', ring: 'ring-emerald-200', iconBg: 'bg-emerald-200', iconColor: 'text-emerald-700' },
    };

    const c = colors[colorClass];

    return (
        <button 
          onClick={() => onClick(id)}
          className={`p-3 rounded-xl border-2 text-left transition-all hover:-translate-y-1 relative overflow-hidden ${
            isActive 
              ? `${c.active} ring-2 ${c.ring}` 
              : 'border-slate-200 bg-white hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`p-2 rounded-lg ${isActive ? c.iconBg : 'bg-slate-100'}`}>
              <Icon className={`w-5 h-5 ${isActive ? c.iconColor : 'text-slate-600'}`} />
            </div>
            {isActive && <PlayCircle className={`w-4 h-4 ${c.iconColor}`} />}
          </div>
          <h3 className="font-bold text-slate-800 text-sm">{label}</h3>
          <p className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-wide">{sub}</p>
        </button>
    );
}

// --- PNEUMOTHORAX ---
const PneumothoraxAnimation: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-blue-900 p-4 flex items-center justify-between text-white">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Wind className="w-5 h-5" />
          Pneumothorax Simulator
        </h3>
        <div className="hidden sm:flex items-center gap-2 text-xs bg-blue-800 px-3 py-1 rounded-full">
            <Info className="w-3 h-3" />
            Se lungen kollapse
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-1">
        <div className="flex-1 bg-gradient-to-br from-blue-50 to-white p-8 flex items-center justify-center relative min-h-[300px]">
          <svg viewBox="0 0 200 160" className="w-full max-w-sm drop-shadow-2xl">
            {/* Thorax/Ribs */}
            <path d="M95,10 L95,40 L80,55 M105,10 L105,40 L120,55" stroke="#94a3b8" strokeWidth="8" fill="none" strokeLinecap="round" />
            
            {/* Left Lung (Static) */}
            <path d="M50,55 Q20,55 20,90 Q20,130 50,130 Q80,130 80,90 Q80,55 50,55 Z" fill="#fca5a5" className="animate-pulse-slow" />
            
            {/* Right Lung (Animated) */}
            <g className="transition-all duration-1000 ease-in-out" style={{ transformOrigin: '120px 55px', transform: isCollapsed ? 'scale(0.4)' : 'scale(1)' }}>
               <path d="M150,55 Q180,55 180,90 Q180,130 150,130 Q120,130 120,90 Q120,55 150,55 Z" fill="#fca5a5" />
            </g>

            {/* Pleural Space Line (when collapsed) */}
            {isCollapsed && (
              <path d="M150,50 Q185,50 185,90 Q185,135 150,135 Q115,135 115,90 Q115,50 150,50 Z" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 2" className="opacity-50" />
            )}
            
            {/* Rib Cage Outline */}
            <path d="M10,40 Q100,20 190,40 M10,70 Q100,50 190,70 M10,100 Q100,80 190,100" stroke="#cbd5e1" strokeWidth="2" fill="none" opacity="0.3" />
            
            <text x="35" y="150" fontSize="6" fill="#64748b" textAnchor="middle">Normal</text>
            <text x="150" y="150" fontSize="6" fill={isCollapsed ? "#ef4444" : "#64748b"} textAnchor="middle" fontWeight={isCollapsed ? "bold" : "normal"}>{isCollapsed ? "Kollapset" : "Normal"}</text>
            
            {isCollapsed && (
                <g className="animate-bounce">
                    <path d="M170,70 L160,80 L170,90" stroke="#3b82f6" strokeWidth="2" fill="none" />
                    <text x="180" y="85" fontSize="6" fill="#3b82f6">Luft ind</text>
                </g>
            )}
          </svg>
        </div>

        <div className="w-full md:w-1/3 bg-white p-6 border-l border-slate-200 flex flex-col justify-center">
            <h4 className="font-bold text-slate-800 mb-4 uppercase text-sm tracking-wider">Kontrolpanel</h4>
            <div className="space-y-3">
                <button onClick={() => setIsCollapsed(false)} className={`w-full p-4 rounded-xl border transition-all flex items-center justify-between ${!isCollapsed ? 'border-blue-500 bg-blue-50 text-blue-700 font-bold shadow-sm' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
                    <span>Normal Tilstand</span>
                    {!isCollapsed && <CheckCircleIcon />}
                </button>
                <button onClick={() => setIsCollapsed(true)} className={`w-full p-4 rounded-xl border transition-all flex items-center justify-between ${isCollapsed ? 'border-red-500 bg-red-50 text-red-700 font-bold shadow-sm' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
                    <span>Pneumothorax</span>
                    {isCollapsed && <Activity className="w-4 h-4" />}
                </button>
            </div>
            <div className="mt-8 text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p><strong>Hvad sker der?</strong><br/>Når luft trænger ind i pleurahulen (mellem lungehinderne), forsvinder det undertryk, der normalt holder lungen foldet ud. Lungen kollapser pga. sin egen elasticitet.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- KOMPARTMENTSYNDROM ---
const CompartmentAnimation: React.FC = () => {
  const [pressure, setPressure] = useState(0); // 0 to 100

  // Calculations for visual changes
  const veinWidth = Math.max(1, 8 - (pressure / 10)); // Veins collapse
  const arteryWidth = 8; // Arteries stay open longer (high pressure system)
  const muscleColor = pressure > 70 ? '#475569' : pressure > 40 ? '#991b1b' : '#ef4444'; // Red -> Dark Red -> Grey (Necrosis)
  const fasciaScale = 1 + (pressure / 500); // Slight expansion but constrained

  return (
    <div className="flex flex-col h-full">
      <div className="bg-red-900 p-4 text-white flex justify-between items-center">
         <h3 className="text-lg font-bold flex items-center gap-2"><Layers className="w-5 h-5"/> Kompartmentsyndrom</h3>
         <span className="font-mono bg-red-800 px-2 py-1 rounded text-sm">{pressure} mmHg</span>
      </div>
      
      <div className="flex flex-col md:flex-row flex-1">
        <div className="flex-1 bg-slate-100 p-8 flex items-center justify-center relative overflow-hidden">
           {/* Background Grid */}
           <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>

           <svg viewBox="0 0 200 200" className="w-full max-w-sm drop-shadow-2xl z-10">
              {/* Skin/Fascia Boundary (Rigid container) */}
              <circle cx="100" cy="100" r="90" fill="#fef3c7" stroke="#92400e" strokeWidth="3" />
              <text x="100" y="15" fontSize="8" textAnchor="middle" fill="#92400e" fontWeight="bold">Fascie (Uelastisk)</text>

              {/* Muscle Compartment */}
              <circle 
                cx="100" cy="100" r="85" 
                fill={muscleColor} 
                className="transition-colors duration-500"
                style={{ transform: `scale(${fasciaScale})`, transformOrigin: 'center' }}
              />

              {/* Bone (Tibia) */}
              <path d="M60,100 Q70,70 100,70 Q130,70 140,100 Q130,130 100,130 Q70,130 60,100 Z" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />

              {/* Artery (Red - High Pressure) */}
              <circle cx="80" cy="90" r={arteryWidth/2} fill="#dc2626" stroke="white" strokeWidth="1">
                 <animate attributeName="r" values={`${arteryWidth/2};${arteryWidth/2 + 0.5};${arteryWidth/2}`} dur="0.8s" repeatCount="indefinite" />
              </circle>
              <text x="80" y="80" fontSize="6" fill="white" textAnchor="middle" fontWeight="bold">Arterie</text>

              {/* Vein (Blue - Low Pressure - Collapses first) */}
              <ellipse cx="120" cy="90" rx={veinWidth} ry={veinWidth} fill="#2563eb" stroke="white" strokeWidth="1" className="transition-all duration-300" />
              <text x="120" y="80" fontSize="6" fill="white" textAnchor="middle" fontWeight="bold">Vene</text>

              {/* Edema / Pressure Visuals */}
              {pressure > 30 && (
                 <g>
                    <text x="100" y="160" fontSize="10" fill="white" fontWeight="bold" textAnchor="middle" stroke="#000" strokeWidth="0.2">TRYK STIGER!</text>
                    <path d="M90,140 L110,140 M100,130 L100,150" stroke="white" strokeWidth="2" />
                 </g>
              )}
              {pressure > 80 && (
                 <rect x="50" y="170" width="100" height="15" fill="#000" rx="4" />
              )}
              {pressure > 80 && (
                 <text x="100" y="180" fontSize="8" fill="red" fontWeight="bold" textAnchor="middle" className="animate-pulse">ISKÆMI / NEKROSE</text>
              )}
           </svg>
        </div>

        <div className="w-full md:w-1/3 bg-white p-6 border-l border-slate-200 flex flex-col justify-center">
           <h4 className="font-bold text-slate-800 mb-4 uppercase text-sm tracking-wider">Juster Vævstryk (mmHg)</h4>
           
           <div className="mb-8">
             <input 
               type="range" 
               min="0" 
               max="100" 
               value={pressure} 
               onChange={(e) => setPressure(parseInt(e.target.value))}
               className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
             />
             <div className="flex justify-between text-xs text-slate-500 font-mono mt-2">
                <span>Normal (0-8)</span>
                <span>Kritisk (&gt;30)</span>
                <span>Død (&gt;80)</span>
             </div>
           </div>

           <div className={`p-4 rounded-xl text-sm border ${pressure > 30 ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100'}`}>
              <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                     <StatusDot active={pressure > 30} color="bg-red-500" />
                     <span className={pressure > 30 ? 'font-bold text-red-800' : 'text-slate-600'}>
                        {pressure > 30 ? 'Venerne kollapser: Blodet kan ikke komme væk.' : 'Venerne er åbne: Normalt tilbageløb.'}
                     </span>
                  </li>
                  <li className="flex items-start gap-2">
                     <StatusDot active={pressure > 30} color="bg-red-500" />
                     <span className={pressure > 30 ? 'font-bold text-red-800' : 'text-slate-600'}>
                        {pressure > 30 ? 'Ødem (hævelse) forværres drastisk.' : 'Ingen stase.'}
                     </span>
                  </li>
                  <li className="flex items-start gap-2">
                     <StatusDot active={pressure > 80} color="bg-slate-800" />
                     <span className={pressure > 80 ? 'font-bold text-slate-900' : 'text-slate-600'}>
                        {pressure > 80 ? 'NEKROSE: Muskelvævet dør pga. iltmangel.' : 'Arterielt blod kommer stadig ind.'}
                     </span>
                  </li>
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- RHABDOMYOLYSE ---
const RhabdoAnimation: React.FC = () => {
  const [stage, setStage] = useState(0); // 0: Normal, 1: Trauma, 2: Release, 3: Kidney Damage

  return (
    <div className="flex flex-col h-full">
      <div className="bg-amber-900 p-4 text-white">
         <h3 className="text-lg font-bold flex items-center gap-2"><Droplets className="w-5 h-5"/> Rhabdomyolyse Simulator</h3>
      </div>

      <div className="flex flex-col md:flex-row flex-1">
        <div className="flex-1 bg-amber-50/50 p-8 flex items-center justify-center relative overflow-hidden">
            <svg viewBox="0 0 300 150" className="w-full drop-shadow-xl">
                {/* Connection (Blood Vessel) */}
                <rect x="60" y="70" width="180" height="10" fill="#fecaca" rx="5" />
                <text x="150" y="65" fontSize="8" fill="#ef4444" textAnchor="middle" fontWeight="bold">Blodbane (Cirkulation)</text>

                {/* Muscle Cell (Left) */}
                <g transform="translate(20, 40)">
                    <rect x="0" y="0" width="60" height="70" rx="5" 
                        fill={stage > 0 ? "#7f1d1d" : "#ef4444"} 
                        stroke={stage > 0 ? "#450a0a" : "none"}
                        strokeWidth="2"
                        className="transition-colors duration-1000" 
                    />
                    <text x="30" y="-10" fontSize="10" textAnchor="middle" fill="#333" fontWeight="bold">Muskel</text>
                    
                    {/* Intact contents */}
                    <g opacity={stage > 1 ? 0 : 1} className="transition-opacity duration-500">
                      <circle cx="20" cy="20" r="3" fill="#4ade80" />
                      <circle cx="40" cy="30" r="3" fill="#4ade80" />
                      <circle cx="30" cy="50" r="3" fill="#4ade80" />
                      <text x="30" y="40" fontSize="6" fill="white" textAnchor="middle" opacity="0.8">Myoglobin</text>
                    </g>

                    {/* Damaged visual */}
                    {stage > 0 && <path d="M10,10 L50,60 M50,10 L10,60" stroke="white" strokeWidth="2" opacity="0.3" />}
                </g>

                {/* Kidney Tubule (Right) */}
                <g transform="translate(220, 40)">
                    <path d="M0,10 Q20,10 20,35 Q20,60 40,60" fill="none" stroke="#d97706" strokeWidth="14" strokeLinecap="round" />
                    <text x="20" y="-10" fontSize="10" textAnchor="middle" fill="#333" fontWeight="bold">Nyre Tubuli</text>
                    
                    {/* Blockage visualization */}
                    {stage === 3 && (
                        <g>
                           <circle cx="20" cy="35" r="5" fill="#4ade80" stroke="black" strokeWidth="0.5" className="animate-pulse" />
                           <text x="45" y="38" fontSize="6" fill="#d97706" fontWeight="bold">BLOKERET</text>
                        </g>
                    )}
                </g>

                {/* Moving Particles Animation - MYOGLOBIN */}
                {stage === 2 && (
                    <g>
                        <circle cx="80" cy="75" r="4" fill="#4ade80">
                           <animate attributeName="cx" from="80" to="220" dur="1.5s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="80" cy="75" r="4" fill="#4ade80">
                           <animate attributeName="cx" from="80" to="220" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
                        </circle>
                        <text x="150" y="85" fontSize="6" fill="#166534" textAnchor="middle">Myoglobin lækker til blod</text>
                    </g>
                )}

                {/* Urine Output */}
                <path d="M260,60 L260,100" stroke={stage === 3 ? "#451a03" : "#fef08a"} strokeWidth="4" strokeDasharray="4 2" />
                <rect x="250" y="100" width="20" height="30" fill={stage === 3 ? "#451a03" : "#fef08a"} stroke="#94a3b8" />
                <text x="260" y="145" fontSize="8" textAnchor="middle" fill="#64748b" fontWeight="bold">{stage === 3 ? "Mørk Urin" : "Normal Urin"}</text>
            </svg>
        </div>

        <div className="w-full md:w-1/3 bg-white p-6 border-l border-slate-200 flex flex-col justify-center gap-4">
             <h4 className="font-bold text-slate-800 uppercase text-sm tracking-wider">Vælg fase:</h4>
             <div className="space-y-2">
                 <button onClick={() => setStage(0)} disabled={stage===0} className="w-full text-left px-4 py-3 rounded-lg border hover:bg-slate-50 transition-colors disabled:bg-green-50 disabled:border-green-500 disabled:text-green-800 disabled:font-bold">1. Normal Tilstand</button>
                 <button onClick={() => setStage(1)} disabled={stage===1} className="w-full text-left px-4 py-3 rounded-lg border hover:bg-slate-50 transition-colors disabled:bg-red-50 disabled:border-red-500 disabled:text-red-800 disabled:font-bold">2. Traumet (Knusning)</button>
                 <button onClick={() => setStage(2)} disabled={stage===2} className="w-full text-left px-4 py-3 rounded-lg border hover:bg-slate-50 transition-colors disabled:bg-amber-50 disabled:border-amber-500 disabled:text-amber-800 disabled:font-bold">3. Lækage (Frigivelse)</button>
                 <button onClick={() => setStage(3)} disabled={stage===3} className="w-full text-left px-4 py-3 rounded-lg border hover:bg-slate-50 transition-colors disabled:bg-slate-800 disabled:text-white disabled:font-bold">4. Nyresvigt</button>
             </div>
             
             <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-700 mt-2 min-h-[100px] border border-slate-100 flex items-center">
                 <p className="leading-relaxed">
                 {stage === 0 && "Alt er normalt. Musklen er intakt, og nyrerne filtrerer blodet uden problemer."}
                 {stage === 1 && "Martin klemmes fast. Det massive tryk ødelægger muskelcellerne (nekrose). Cellemembranen brister."}
                 {stage === 2 && "Giftige stoffer som Myoglobin (grøn) og Kalium strømmer ud af de døde celler og ind i blodbanen."}
                 {stage === 3 && "Myoglobin-molekylet er stort og 'stopper' nyrernes fine rør (tubuli) til. Det giver akut nyresvigt, og urinen bliver mørk ('cola-farvet')."}
                 </p>
             </div>
        </div>
      </div>
    </div>
  );
};

// --- CRANIUM (BRAIN) ---
const CraniumAnimation: React.FC = () => {
  const [bleedingType, setBleedingType] = useState<'normal' | 'epidural' | 'subdural'>('normal');

  return (
    <div className="flex flex-col h-full">
      <div className="bg-purple-900 p-4 text-white flex justify-between items-center">
         <h3 className="text-lg font-bold flex items-center gap-2"><Brain className="w-5 h-5"/> Kranietraumer</h3>
      </div>
      
      <div className="flex flex-col md:flex-row flex-1">
        <div className="flex-1 bg-purple-50 p-8 flex items-center justify-center relative min-h-[300px]">
           <svg viewBox="0 0 200 200" className="w-full max-w-sm drop-shadow-xl">
              {/* Skull */}
              <circle cx="100" cy="100" r="95" fill="#f8fafc" stroke="#94a3b8" strokeWidth="6" />
              
              {/* Brain (Left Hemisphere - Affected) */}
              <path 
                d={
                    bleedingType === 'epidural' ? "M100,20 Q40,20 20,80 Q20,160 100,180" : 
                    bleedingType === 'subdural' ? "M100,20 Q50,20 35,80 Q35,160 100,180" :
                    "M100,20 Q20,20 20,100 Q20,180 100,180"
                } 
                fill="#fca5a5" 
                stroke="#fda4af" 
                className="transition-all duration-700"
              />

              {/* Brain (Right Hemisphere - Normal) */}
              <path d="M100,20 Q180,20 180,100 Q180,180 100,180" fill="#fca5a5" stroke="#fda4af" />

              {/* Midline / Falx */}
              <path 
                d={bleedingType === 'normal' ? "M100,20 L100,180" : "M100,20 Q110,100 100,180"} 
                stroke="#be123c" strokeWidth="1" strokeDasharray="4 2" className="transition-all duration-700" 
              />

              {/* Epidural Hematoma (Lens shape OUTSIDE dura/brain curve) */}
              <path 
                d="M25,60 Q55,100 25,140 Q5,100 25,60 Z" 
                fill="#dc2626" 
                className={`transition-opacity duration-500 ${bleedingType === 'epidural' ? 'opacity-100' : 'opacity-0'}`} 
              />

              {/* Subdural Hematoma (Crescent shape FOLLOWING brain curve) */}
              <path 
                d="M25,40 Q60,100 25,160 Q40,100 25,40 Z" 
                fill="#7f1d1d" 
                className={`transition-opacity duration-500 ${bleedingType === 'subdural' ? 'opacity-100' : 'opacity-0'}`} 
              />
              
              {/* Labels */}
              <text x="100" y="195" fontSize="8" textAnchor="middle" fill="#64748b">Tværsnit af hjernen</text>
              {bleedingType !== 'normal' && (
                 <g className="animate-pulse">
                    <text x="140" y="100" fontSize="8" fill="#dc2626" fontWeight="bold">Masseeffekt</text>
                    <path d="M120,100 L135,100" stroke="#dc2626" strokeWidth="1" markerEnd="url(#arrow)" />
                 </g>
              )}
           </svg>
        </div>

        <div className="w-full md:w-1/3 bg-white p-6 border-l border-slate-200 flex flex-col justify-center">
            <h4 className="font-bold text-slate-800 mb-4 uppercase text-sm tracking-wider">Vælg Skadestype</h4>
            <div className="space-y-3">
                <button onClick={() => setBleedingType('normal')} className={`w-full p-4 rounded-xl border text-left flex items-center gap-3 transition-colors ${bleedingType === 'normal' ? 'bg-green-50 border-green-500 text-green-800' : 'hover:bg-slate-50'}`}>
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <div>
                        <div className="font-bold text-sm">Normal Hjerne</div>
                        <div className="text-xs opacity-75">Ingen blødning</div>
                    </div>
                </button>
                <button onClick={() => setBleedingType('epidural')} className={`w-full p-4 rounded-xl border text-left flex items-center gap-3 transition-colors ${bleedingType === 'epidural' ? 'bg-red-50 border-red-500 text-red-800' : 'hover:bg-slate-50'}`}>
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <div>
                        <div className="font-bold text-sm">Epiduralt Hæmatom</div>
                        <div className="text-xs opacity-75">Arteriel blødning (linseform)</div>
                    </div>
                </button>
                <button onClick={() => setBleedingType('subdural')} className={`w-full p-4 rounded-xl border text-left flex items-center gap-3 transition-colors ${bleedingType === 'subdural' ? 'bg-purple-50 border-purple-800 text-purple-900' : 'hover:bg-slate-50'}`}>
                    <div className="w-4 h-4 rounded-full bg-purple-900"></div>
                    <div>
                        <div className="font-bold text-sm">Subduralt Hæmatom</div>
                        <div className="text-xs opacity-75">Venøs blødning (halvmåne)</div>
                    </div>
                </button>
            </div>
            <div className="mt-6 text-sm text-slate-600 bg-slate-50 p-4 rounded-lg">
                <p><strong>Bemærk:</strong> Se hvordan blødningen presser hjernen væk fra midten (midtlinjeskift). Dette øger trykket i kraniet (ICP) livstruende.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- COLUMNA (SPINE) ---
const ColumnaAnimation: React.FC = () => {
    const [compression, setCompression] = useState(0);

    return (
      <div className="flex flex-col h-full">
        <div className="bg-emerald-900 p-4 text-white flex justify-between items-center">
           <h3 className="text-lg font-bold flex items-center gap-2"><MoveVertical className="w-5 h-5"/> Columnatraumer</h3>
           <span className="font-mono bg-emerald-800 px-2 py-1 rounded text-sm">{compression}% Kompression</span>
        </div>
        
        <div className="flex flex-col md:flex-row flex-1">
          <div className="flex-1 bg-emerald-50/50 p-8 flex items-center justify-center relative overflow-hidden">
             <svg viewBox="0 0 200 200" className="w-full max-w-sm drop-shadow-xl">
                {/* Vertebrae Body (Bottom) */}
                <path d="M40,140 Q100,180 160,140 L160,110 Q100,150 40,110 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
                
                {/* Spinal Canal Background */}
                <circle cx="100" cy="80" r="30" fill="#0f172a" />
                
                {/* Spinal Cord (Yellow/White) - Gets squished */}
                <ellipse 
                    cx="100" 
                    cy="80" 
                    rx={20 - (compression * 0.15)} 
                    ry={20} 
                    fill={compression > 80 ? "#ef4444" : "#fef08a"} 
                    className="transition-all duration-300"
                />

                {/* Signals (Lightning) */}
                {compression < 80 ? (
                    <g className="animate-pulse">
                        <path d="M95,60 L105,70 L95,80 L105,90" stroke="#eab308" strokeWidth="2" fill="none" />
                    </g>
                ) : (
                    <text x="100" y="85" fontSize="10" fill="white" fontWeight="bold" textAnchor="middle">STOP</text>
                )}

                {/* Bone Fragment / Disc Herniation moving in */}
                <path 
                    d="M70,120 Q100,100 130,120" 
                    fill="#cbd5e1" 
                    stroke="#64748b" 
                    className="transition-all duration-300"
                    transform={`translate(0, ${-compression * 0.4})`}
                />

                {/* Vertebrae Arch (Top) */}
                <path d="M40,50 Q20,80 40,110 M160,50 Q180,80 160,110 M40,50 Q100,10 160,50" stroke="#94a3b8" strokeWidth="3" fill="none" strokeLinecap="round" />
                
                {/* Warning Text */}
                {compression > 75 && (
                    <text x="100" y="30" fontSize="12" fill="red" fontWeight="bold" textAnchor="middle" className="animate-bounce">PARALYSE RISIKO!</text>
                )}
             </svg>
          </div>
  
          <div className="w-full md:w-1/3 bg-white p-6 border-l border-slate-200 flex flex-col justify-center">
             <h4 className="font-bold text-slate-800 mb-4 uppercase text-sm tracking-wider">Simuler Kompression</h4>
             
             <div className="mb-8">
               <input 
                 type="range" 
                 min="0" 
                 max="100" 
                 value={compression} 
                 onChange={(e) => setCompression(parseInt(e.target.value))}
                 className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
               />
               <p className="text-center mt-2 font-bold text-slate-700">{compression}% Tryk</p>
             </div>
             
             <div className={`p-4 rounded-xl text-sm border transition-colors ${compression > 80 ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-100'}`}>
                <p className="leading-relaxed mb-2">
                    {compression < 30 && "Normal tilstand. Rygmarven har god plads i spinalkanalen. Nervesignaler passerer frit."}
                    {compression >= 30 && compression < 80 && "Kompression! Et knoglefragment eller en diskusprolaps trykker på rygmarven. Patienten kan opleve smerter, føleforstyrrelser eller nedsat kraft."}
                    {compression >= 80 && <span className="text-red-700 font-bold">KRITISK! Rygmarven er helt afklemt. Nervesignalerne kan ikke passere. Dette medfører lammelse (paralyse) nedenfor skadesstedet.</span>}
                </p>
             </div>
          </div>
        </div>
      </div>
    );
};

const StatusDot: React.FC<{active: boolean, color: string}> = ({active, color}) => (
    <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 transition-colors ${active ? color : 'bg-slate-200'}`} />
);

const CheckCircleIcon = () => (
    <div className="bg-blue-100 text-blue-600 rounded-full p-1"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
);

export default VisualsGallery;
