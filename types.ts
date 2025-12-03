export interface SlideContent {
  title: string;
  content: string[];
  imagePrompt?: string; // Description for placeholder image
}

export interface Topic {
  id: string;
  title: string;
  icon: string;
  slides: SlideContent[];
}

export interface CaseEvent {
  time: string;
  title: string;
  description: string;
  vitalSigns?: {
    label: string;
    value: string;
    status: 'normal' | 'warning' | 'critical';
  }[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface Option {
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface Scenario {
  id: number;
  title: string;
  description: string;
  options: Option[];
}