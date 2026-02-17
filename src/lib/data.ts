import type { Note, Flashcard, Goal } from './definitions';

export const placeholderNotes: Note[] = [
  {
    id: '1',
    title: 'Introduction to Quantum Mechanics',
    content: 'Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics including quantum chemistry, quantum field theory, quantum technology, and quantum information science.',
    createdAt: '2023-10-26T10:00:00Z',
  },
  {
    id: '2',
    title: 'The Process of Photosynthesis',
    content: 'Photosynthesis is a process used by plants and other organisms to convert light energy into chemical energy, through a process that converts carbon dioxide and water into glucose (sugar) and oxygen. The overall balanced equation is 6CO2 + 6H2O → C6H12O6 + 6O2.',
    createdAt: '2023-10-25T14:30:00Z',
  },
  {
    id: '3',
    title: 'Socrates and his Philosophy',
    content: 'Socrates was a Greek philosopher from Athens who is credited as one of the founders of Western philosophy. The Socratic method is a form of cooperative argumentative dialogue between individuals, based on asking and answering questions to stimulate critical thinking and to draw out ideas and underlying presuppositions.',
    createdAt: '2023-10-24T09:15:00Z',
  },
];

export const placeholderFlashcards: Flashcard[] = [
  {
    id: 'fc1',
    question: 'What is the Socratic method?',
    answer: 'A form of cooperative argumentative dialogue based on asking and answering questions to stimulate critical thinking.',
    isMastered: true,
  },
  {
    id: 'fc2',
    question: 'What is the chemical equation for photosynthesis?',
    answer: '6CO2 + 6H2O → C6H12O6 + 6O2.',
    isMastered: false,
  },
  {
    id: 'fc3',
    question: 'What does quantum mechanics describe?',
    answer: 'The physical properties of nature at the scale of atoms and subatomic particles.',
    isMastered: false,
  },
];

export const placeholderGoals: Goal[] = [
  {
    id: 'g1',
    title: 'Finish Quantum Mechanics chapter 1',
    deadline: '2023-11-05',
    isCompleted: true,
  },
  {
    id: 'g2',
    title: 'Review Photosynthesis flashcards',
    deadline: '2023-10-28',
    isCompleted: false,
  },
  {
    id: 'g3',
    title: 'Write an essay on Socrates',
    deadline: '2023-11-15',
    isCompleted: false,
  },
];
