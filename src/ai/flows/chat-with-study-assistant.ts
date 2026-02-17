'use server';

/**
 * AI Study Assistant Chat Flow
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatWithStudyAssistantInputSchema = z.object({
  userId: z.string(),
  message: z.string(),
});

export type ChatWithStudyAssistantInput = z.infer<
  typeof ChatWithStudyAssistantInputSchema
>;

const ChatWithStudyAssistantOutputSchema = z.object({
  response: z.string(),
});

export type ChatWithStudyAssistantOutput = z.infer<
  typeof ChatWithStudyAssistantOutputSchema
>;

export async function chatWithStudyAssistant(
  input: ChatWithStudyAssistantInput
): Promise<ChatWithStudyAssistantOutput> {
  return chatWithStudyAssistantFlow(input);
}

const chatWithStudyAssistantFlow = ai.defineFlow(
  {
    name: 'chatWithStudyAssistantFlow',
    inputSchema: ChatWithStudyAssistantInputSchema,
    outputSchema: ChatWithStudyAssistantOutputSchema,
  },
  async (input) => {
    const { message } = input;

    const response = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      prompt: message, // ✅ simple string, NOT Part[]
    });

    if (!response.text) {
      throw new Error('AI did not return a response.');
    }

    return {
      response: response.text,
    };
  }
);
