'use server';
/**
 * @fileOverview A Genkit flow for an AI study assistant chat. Allows users to chat with the AI and get study help.
 *
 * - chatWithStudyAssistant - A function that handles the AI chat interaction.
 * - ChatWithStudyAssistantInput - The input type for the chatWithStudyAssistant function.
 * - ChatWithStudyAssistantOutput - The return type for the chatWithStudyAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {Part} from '@genkit-ai/ai';

const ChatWithStudyAssistantInputSchema = z.object({
  userId: z.string().describe('The ID of the user initiating the chat.'),
  message: z.string().describe('The current message from the user.'),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'model']),
        parts: z.array(z.object({text: z.string()})),
      })
    )
    .optional()
    .describe('Previous chat messages to provide context to the AI.'),
});
export type ChatWithStudyAssistantInput = z.infer<
  typeof ChatWithStudyAssistantInputSchema
>;

const ChatWithStudyAssistantOutputSchema = z.object({
  response: z.string().describe("The AI assistant's response to the user's message."),
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
  async input => {
    const {message, history} = input;

    const promptParts: Part[] = [];

    if (history) {
      history.forEach(chatTurn => {
        promptParts.push(chatTurn);
      });
    }

    promptParts.push({role: 'user', parts: [{text: message}]});

    const {text} = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      prompt: promptParts,
      config: {
        // Configure safety settings if needed, for example:
        // safetySettings: [
        //   {
        //     category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        //     threshold: 'BLOCK_NONE',
        //   },
        // ],
      },
    });

    if (!text) {
      throw new Error('AI did not return a response.');
    }

    return {response: text};
  }
);
