
import { Topic, CaseEvent, QuizQuestion, Scenario } from './types';

export const TOPICS: Topic[] = [
  {
    id: 'intro',
    title: 'Generelt om Traumer',
    icon: 'Activity',
    slides: [
      {
        title: 'Definition af Traume',
        content: [
          'Legemlig eller psykisk beskadigelse eller kvæstelse pga. ydre påvirkning.',
          'Inddeles i mekaniske, kemiske eller termiske traumer.',
          'Mekaniske: Ulykker eller vold (sår, knoglebrud).',
          'Kemiske: Ætsning.',
          'Termiske: Brandsår og forfrysninger.',
          'Alle legemlige traumer efterfølges af en inflammatorisk betændelsesreaktion.'
        ],
        imagePrompt: 'Medical illustration of inflammation response'
      },
      {
        title: 'Klassifikation',
        content: [
          'Stumpe traumer vs. Penetrerende traumer.',
          'Lavenergi- vs. Højenergitraumer.',
          'Primære skader: Direkte følge af traumet (læsion, overrivning).',
          'Sekundære skader: Skyldes ofte blødninger og/eller hævelse (komplikationer).'
        ]
      }
    ]
  },
  {
    id: 'columna',
    title: 'Columnatraumer',
    icon: 'MoveVertical',
    slides: [
      {
        title: 'Definition & Funktion',
        content: [
          'Traumer involverende columna cervicalis, thoracalis eller lumbalis.',
          'Kan være med eller uden neurologisk skade (medulla spinalis).',
          'Funktion: Beskytte rygmarven, stabilisere kroppen, støddæmpe.'
        ],
        imagePrompt: 'Spine anatomy illustration'
      },
      {
        title: 'Traumetyper',
        content: [
          'Hyperfleksion: Typisk trafikulykker.',
          'Hyperekstension: Typisk påkørsel bagfra (piskesmæld).',
          'Aksial kompression: Udspring på lavt vand, knusningsfrakturer.'
        ]
      },
      {
        title: 'Behandling',
        content: [
          'Stiv halskrave indtil afklaring.',
          'Columna cervicalis: Udvendig stabilisering (Halo-vest, ca. 12 uger) eller osteosyntese.',
          'Columna thoracolumbalis: Konservativt sengeleje (op til 3 mdr) eller operativ fiksering.'
        ]
      }
    ]
  },
  {
    id: 'cranium',
    title: 'Kranietraumer',
    icon: 'Brain',
    slides: [
      {
        title: 'Læsionstyper',
        content: [
          'Primære læsioner: Kontusioner (coup/contrecoup), Diffus axonal skade (shearing).',
          'Sekundære læsioner: Intrakranielle hæmatomer (epiduralt, subduralt, intracerebralt), ødem.'
        ],
        imagePrompt: 'Brain cross-section showing hematoma types'
      },
      {
        title: 'Observation & Behandling',
        content: [
          'Symptomer: Bevidsthedsændring (GCS), hovedpine, kvalme, pupilforandringer.',
          'Behandling: Observation (min. 24 timer), trykmåling (ICP), hyperventilation, diuretika, evt. kirurgisk udtømning.'
        ]
      }
    ]
  },
  {
    id: 'thorax',
    title: 'Pneumothorax',
    icon: 'Wind',
    slides: [
      {
        title: 'Patogenese',
        content: [
          'Luft i pleurahulen.',
          'Spontan: Bristning af udposning på lungeoverflade.',
          'Traumatisk: Costafrakturer, CVK anlæggelse.',
          'Undertrykket forsvinder -> lungen klapper sammen.'
        ],
        imagePrompt: 'Pneumothorax schematic diagram'
      },
      {
        title: 'Klinik & Behandling',
        content: [
          'Symptomer: Åndenød, smerter.',
          'Diagnose: Røntgen af thorax.',
          'Behandling: < 1-2 cm kræver sjældent handling. Ellers pleuradræn (sug eller envejsventil).'
        ]
      }
    ]
  },
  {
    id: 'muscle',
    title: 'Kompartment & Rhabdo',
    icon: 'Layers',
    slides: [
      {
        title: 'Kompartmentsyndrom',
        content: [
          'Øget tryk i muskel-loge truer cirkulation -> risiko for nekrose.',
          'Årsager: Fastklemning, blødning, ødem, stramme forbindinger.',
          'Symptomer: Smerte (ude af proportion), spændt muskel, parestæsi, pulsløshed (sent tegn).',
          'Behandling: Akut fasciotomi.'
        ],
        imagePrompt: 'Leg muscle compartments diagram'
      },
      {
        title: 'Rhabdomyolyse',
        content: [
          'Nedbrydning af tværstribet muskulatur.',
          'Frigivelse af: Myoglobin (nyretoksisk), Kalium (hjertearytmi), Fosfat.',
          'Klinik: Mørk urin, muskelsmerter, nyresvigt.',
          'Behandling: Væske (forceret diurese), alkalisering af urin, evt. dialyse.'
        ]
      }
    ]
  },
   {
    id: 'coma',
    title: 'Koma & Hjernedød',
    icon: 'Moon',
    slides: [
      {
        title: 'Koma',
        content: [
          'Total manglende opmærksomhed på selv/omgivelser. Kan ikke vækkes.',
          'Årsager: Strukturelle (tumor, traume), Metaboliske (forgiftning, infektion).',
          'Undersøgelser: GCS, pupilrefleks, nakkestivhed, blodprøver.'
        ]
      },
      {
        title: 'Hjernedød',
        content: [
          'Uopretteligt ophør af al funktion i hjernestammen.',
          'Årsager: Svære læsioner, iltmangel efter hjertestop.',
          'Konstateres ved specifikke kliniske kriterier (reflekser, apnø-test).'
        ]
      }
    ]
  }
];

export const MARTIN_CASE: CaseEvent[] = [
  {
    time: 'Ulykkesstedet',
    title: 'Traumet',
    description: 'Martin (31 år) rammes af betonelement i ryggen. Klemmes fast. Elektronik svigtede forinden. Ukontaktbar ved ambulanceankomst.',
    vitalSigns: [
      { label: 'GCS', value: '< 8', status: 'critical' },
      { label: 'Bevidsthed', value: 'Ukontaktbar', status: 'critical' }
    ]
  },
  {
    time: 'Ambulancen (Præhospitalt)',
    title: 'ABCDE Vurdering',
    description: 'Akutlægen foretager systematisk gennemgang: A (Airway): Intuberes pga. manglende vejrtrækning og bevidstløshed. B (Breathing): Bilateral hæmo/pneumothorax (mistanke om ribbensbrud) -> aflastes med venflon. C (Circulation): Lavt BT, høj puls -> væsketerapi opstartes. D (Disability): GCS vurderes lav (3-8). E (Exposure): Fejlstilling af UE, åbne brud på femur, hypotermi forebygges.',
    vitalSigns: [
      { label: 'A', value: 'Intuberet', status: 'critical' },
      { label: 'B', value: 'Pneumothorax', status: 'critical' },
      { label: 'C', value: 'Shock-tegn', status: 'critical' }
    ]
  },
  {
    time: 'Traumemodtagelsen',
    title: 'Scanning & Stabilisering',
    description: 'Traumescanning viser: Cranietraume m. hæmatom, Columnatraume (C6-C7, T1-T5), 12 ribbensbrud, Sprunget milt (splen), Bilaterale femurfrakturer + bækkenbrud.',
    vitalSigns: [
      { label: 'Hjertestop', value: 'x 2 (under transport)', status: 'critical' }
    ]
  },
  {
    time: 'Operation (18 timer)',
    title: 'Kirurgisk Intervention',
    description: 'Cranietomi (udtømning af hæmatom), Stabilisering af rygsøjle (plade/skruer), Fjernelse af milt (splenektomi), Hoftealloplastik.',
  },
  {
    time: 'Post-OP Dag 1-3',
    title: 'Komplikationer',
    description: 'Behandles for pneumothorax med dræn. Udvikler Kompartmentsyndrom i venstre lår -> Rhabdomyolyse.',
    vitalSigns: [
      { label: 'Urin', value: 'Mørk/Ingen', status: 'critical' },
      { label: 'Muskel', value: 'Hævet/Spændt', status: 'critical' }
    ]
  },
  {
    time: 'Post-OP Uge 1',
    title: 'Koma & Status',
    description: 'Sedering slukkes. Martin vågner ikke (Koma). CT viser svære hjerneødemer. Familie informeres om mulig hjernedød.',
  }
];

export const STUDY_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Hvilken form for traume er der tale om i Martins tilfælde?",
    answer: "Højenergitraume (stump traume ved klemning). Kraften fra betonelementet er stor nok til at forårsage omfattende skader på flere organsystemer.",
    category: "Traumetyper"
  },
  {
    id: 2,
    question: "Hvorfor er en skade på C6-C7 kritisk for respirationen, når N. Phrenicus udgår fra C3-C5?",
    answer: "Selvom skaden er på C6-C7, vil det efterfølgende ødem (hævelse) ofte brede sig opad (ascendere) i rygmarven. Hvis hævelsen når C3-C5, påvirkes N. Phrenicus, hvilket lammer mellemgulvet og stopper vejrtrækningen.",
    category: "Columnatraumer"
  },
  {
    id: 3,
    question: "Hvad er forskellen på primær og sekundær hjernelæsion?",
    answer: "Primær: Sker i selve skadesøjeblikket (f.eks. knusning af væv, overrivning af nerver). Sekundær: Opstår i timerne/dagene efter pga. blødning, ødem (hævelse) og iltmangel, som øger trykket i hjernen (ICP).",
    category: "Kranietraumer"
  },
  {
    id: 4,
    question: "Hvilken form for pneumothorax er farligst?",
    answer: "Trykpneumothorax (Tension). Her fungerer hullet som en ventil: Luft kommer ind, men kan ikke komme ud. Det presser hjertet og den raske lunge sammen, hvilket fører til hurtigt cirkulatorisk kollaps.",
    category: "Pneumothorax"
  },
  {
    id: 5,
    question: "Hvad er de klassiske tegn på kompartmentsyndrom?",
    answer: "De 5 P'er: Pain (Smerte ude af proportion), Pallor (Bleghed), Paresthesia (Føleforstyrrelser), Paralysis (Lammelse), Pulselessness (Manglende puls - meget sent tegn!). Spændt, hård muskel er også typisk.",
    category: "Kompartmentsyndrom"
  },
  {
    id: 6,
    question: "Hvorfor kan kompartmentsyndrom føre til rhabdomyolyse?",
    answer: "Det høje tryk i musklen stopper blodtilførslen, så muskelcellerne dør (nekrose). Når cellerne dør, sprænger de og frigiver deres indhold (myoglobin) til blodet. Dette kaldes rhabdomyolyse.",
    category: "Rhabdomyolyse"
  }
];

export const SIMULATION_SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: "Akut Forværring i Ambulancen",
    description: "På vej til hospitalet falder Martins saturation pludselig til 75%. Han er intuberet, men du kan mærke modstand, når du ventilerer ham med posen. Hvad er din første mistanke?",
    options: [
      {
        text: "Tubestop eller sekret i luftvejene",
        isCorrect: false,
        feedback: "Det er en mulighed, men i en traume-case med ribbensbrud skal du tænke på thorax først."
      },
      {
        text: "Udvikling af Trykpneumothorax",
        isCorrect: true,
        feedback: "Korrekt! Luft i pleurahulen under tryk (tension) klemmer lungen sammen. Det gør det svært at ventilere (høj modstand) og giver hypoxi. Kræver akut aflastning (nål/dræn)."
      },
      {
        text: "Han har brug for mere smertestillende",
        isCorrect: false,
        feedback: "Nej, lav saturation og ventilationsmodstand er A/B problemer, ikke smerteproblemer."
      }
    ]
  },
  {
    id: 2,
    title: "Hjertestop i Ambulancen",
    description: "Et minut senere får Martin hjertestop (PEA). Hvis du tænker på de reversible årsager (4 H'er og 4 T'er), hvad er så den mest sandsynlige årsag til stoppet i netop denne situation?",
    options: [
      {
        text: "Hypotermi (Afkøling)",
        isCorrect: false,
        feedback: "Hypotermi er sjældent årsag til pludselig indsættende PEA i dette akutte forløb sammenlignet med A/B/C problemer."
      },
      {
        text: "Hypovolæmi (Blodtab)",
        isCorrect: false,
        feedback: "Han har helt sikkert mistet blod, og hypovolæmi er en meget hyppig dødsårsag. MEN: I har lige observeret en akut ventilationsmodstand (trykpneumothorax), som ikke er løst endnu. Det akutte tryk dræber ham før blodmanglen lige nu."
      },
      {
        text: "Trykpneumothorax",
        isCorrect: true,
        feedback: "Korrekt! Du koblede observationen fra før (modstand) med hjertestoppet. Den ubehandlede trykpneumothorax klemmer hjertet sammen (obstruktivt shock). Aflastning er den livreddende handling før væske."
      }
    ]
  },
  {
    id: 3,
    title: "Post-OP Dag 2: Mørk Urin",
    description: "Operationen er overstået, men nu er Martins urin mørkebrun, nærmest cola-farvet. Timediuresen er faldende (< 30 ml/t). Han klager over ekstreme smerter i venstre lår. Hvad mistænker du?",
    options: [
      {
        text: "Urinvejsinfektion",
        isCorrect: false,
        feedback: "Infektion giver sjældent cola-farvet urin så hurtigt, og forklarer ikke smerterne i låret."
      },
      {
        text: "Dehydrering",
        isCorrect: false,
        feedback: "Dehydrering giver koncentreret (mørkegul) urin, men cola-farve tyder på myoglobin."
      },
      {
        text: "Rhabdomyolyse grundet Kompartmentsyndrom",
        isCorrect: true,
        feedback: "Korrekt! Smerterne i låret tyder på kompartmentsyndrom (muskeldød), som frigiver myoglobin. Myoglobin farver urinen mørk og skader nyrerne (akut nyresvigt)."
      }
    ]
  },
  {
    id: 4,
    title: "Handling ved Kompartmentsyndrom",
    description: "Du har mistanke om kompartmentsyndrom i Martins lår (se forrige scenarie). Benet er stenhårdt. Hvad gør du først?",
    options: [
      {
        text: "Lægger benet højt på en pude",
        isCorrect: false,
        feedback: "NEJ! Elevation sænker blodtrykket i benet yderligere, hvilket forværrer iltmanglen (iskæmien). Benet skal holdes i hjerteniveau."
      },
      {
        text: "Giver ham mere morfin og ser tiden an",
        isCorrect: false,
        feedback: "Farligt. Det maskerer symptomerne. Kompartmentsyndrom kræver handling, ikke bare lindring."
      },
      {
        text: "Tilkalder lægen akut mhp. fasciotomi",
        isCorrect: true,
        feedback: "Korrekt. Det eneste, der redder musklen, er at skære fascien op (fasciotomi) for at lette trykket. Det er en kirurgisk nødsituation."
      }
    ]
  },
  {
    id: 5,
    title: "Observation af Pleuradræn",
    description: "Martin har fået lagt dræn for sin pneumothorax. Da du tilser ham, mærker du en underlig 'knitrende' fornemmelse under huden omkring drænstedet og op på halsen, som om du trykker på krammesne. Hvad er dette?",
    options: [
      {
        text: "Infektion i huden",
        isCorrect: false,
        feedback: "Infektion føles varm og øm, ikke knitrende."
      },
      {
        text: "Subkutant Emfysem",
        isCorrect: true,
        feedback: "Korrekt! Det er luft, der er sluppet ud i underhuden (subkutant væv). Det er ufarligt i sig selv, men kan tyde på, at drænet ikke fungerer optimalt eller er placeret forkert."
      },
      {
        text: "Hæmatom (Blodansamling)",
        isCorrect: false,
        feedback: "Et hæmatom føles som en bule eller udfyldning, ikke knitrende."
      }
    ]
  },
  {
    id: 6,
    title: "Den Svære Samtale",
    description: "Martins familie er desperate. De spørger: 'Hvorfor vågner han ikke, når I har slukket for sovemedicinen? Er han hjernedød?'. CT-scanningen har vist svære ødemer, men ingen endelig konklusion. Hvad svarer du?",
    options: [
      {
        text: "'Ja, desværre. Når man ikke vågner, er man hjernedød.'",
        isCorrect: false,
        feedback: "Meget forkert. Hjernedød er en specifik diagnose, der kræver strenge tests. Du må ikke konkludere dette som sygeplejerske, og slet ikke uden bevis."
      },
      {
        text: "'Det ser ikke godt ud, men vi ved det ikke endnu. Hjernen er meget hævet efter slaget, og den hævelse kan forhindre ham i at vågne. Vi skal give det tid og se, om hævelsen falder.'",
        isCorrect: true,
        feedback: "Korrekt. Du er ærlig omkring alvoren ('ser ikke godt ud'), men fagligt præcis: Det er hævelsen (ødemet), der er problemet lige nu. Du undgår at bruge ordet 'hjernedød' for tidligt, men giver heller ikke falsk håb."
      },
      {
        text: "'I skal ikke bekymre jer. Han sover bare dybt pga. medicinen.'",
        isCorrect: false,
        feedback: "Uetisk og forkert. Du giver falsk håb. Medicinen er ude af kroppen, så der ER et problem."
      }
    ]
  }
];
