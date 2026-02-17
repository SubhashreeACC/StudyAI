'use server';
/**
 * @fileOverview A Genkit flow that generates flashcards from user study notes.
 *
 * - generateFlashcardsFromNotes - A function that handles the flashcard generation process.
 * - GenerateFlashcardsFromNotesInput - The input type for the generateFlashcardsFromNotes function.
 * - GenerateFlashcardsFromNotesOutput - The return type for the generateFlashcardsFromNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFlashcardsFromNotesInputSchema = z.object({
  noteContent: z.string().describe('The study notes content from which to generate flashcards.'),
});
export type GenerateFlashcardsFromNotesInput = z.infer<typeof GenerateFlashcardsFromNotesInputSchema>;

const FlashcardSchema = z.object({
  question: z.string().describe('The question for the flashcard.'),
  answer: z.string().describe('The answer to the flashcard question.'),
});

const GenerateFlashcardsFromNotesOutputSchema = z.object({
  flashcards: z.array(FlashcardSchema).describe('An array of generated flashcard objects.'),
});
export type GenerateFlashcardsFromNotesOutput = z.infer<typeof GenerateFlashcardsFromNotesOutputSchema>;

export async function generateFlashcardsFromNotes(
  input: GenerateFlashcardsFromNotesInput
): Promise<GenerateFlashcardsFromNotesOutput> {
  return generateFlashcardsFromNotesFlow(input);
}

const generateFlashcardsPrompt = ai.definePrompt({
  name: 'generateFlashcardsFromNotesPrompt',
  input: {schema: GenerateFlashcardsFromNotesInputSchema},
  output: {schema: GenerateFlashcardsFromNotesOutputSchema},
  prompt: `You are an AI assistant specialized in generating flashcards from provided study notes.

Your task is to analyze the given 'noteContent' and extract key concepts, definitions, and facts to create a set of question-and-answer flashcards.

Each flashcard should consist of a concise question and a clear, accurate answer.

Notes Content: {{{noteContent}}}

Generate the flashcards as a JSON array of objects, where each object has a 'question' and an 'answer' field, as described in the output schema.`,
});

const generateFlashcardsFromNotesFlow = ai.defineFlow(
  {
    name: 'generateFlashcardsFromNotesFlow',
    inputSchema: GenerateFlashcardsFromNotesInputSchema,
    outputSchema: GenerateFlashcardsFromNotesOutputSchema,
  },
  async input => {
    const {output} = await generateFlashcardsPrompt(input);
    return output!;
  }
);
