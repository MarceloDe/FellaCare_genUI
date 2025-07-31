// This is a Genkit flow
'use server';
/**
 * @fileOverview A flow to suggest initial actions to the user.
 *
 * - getSuggestedActions - A function that returns a list of suggested actions.
 * - SuggestedActionsInput - The input type for the getSuggestedActions function.
 * - SuggestedActionsOutput - The return type for the getSuggestedActions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestedActionsInputSchema = z.object({
  previousInteractions: z
    .array(z.string())
    .describe('A list of previous user interactions.'),
});
export type SuggestedActionsInput = z.infer<typeof SuggestedActionsInputSchema>;

const SuggestedActionsOutputSchema = z.object({
  actions: z.array(z.string()).describe('A list of suggested actions for the user.'),
});
export type SuggestedActionsOutput = z.infer<typeof SuggestedActionsOutputSchema>;

export async function getSuggestedActions(input: SuggestedActionsInput): Promise<SuggestedActionsOutput> {
  return suggestedActionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestedActionsPrompt',
  input: {schema: SuggestedActionsInputSchema},
  output: {schema: SuggestedActionsOutputSchema},
  prompt: `You are a helpful AI assistant designed to guide users in using a health insurance application. Based on the user's previous interactions, suggest the next best action for them to take.  Here are some previous interactions: {{{previousInteractions}}}

Suggest 3 next actions the user can take. Return the actions as a JSON array of strings.  Do not return any text other than the array.`,
  //   prompt: `Based on these previous interactions: {{{previousInteractions}}}, suggest three next actions, formatted as a JSON array.
});

const suggestedActionsFlow = ai.defineFlow(
  {
    name: 'suggestedActionsFlow',
    inputSchema: SuggestedActionsInputSchema,
    outputSchema: SuggestedActionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
