export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export type Flashcard = {
  id: string;
  question: string;
  answer: string;
  isMastered: boolean;
};

export type Goal = {
  id: string;
  title: string;
  deadline: string;
  isCompleted: boolean;
};

export type ChatMessage = {
  role: 'user' | 'model';
  parts: { text: string }[];
};
