// This is a Genkit flow
'use server';
/**
 * @fileOverview A flow to suggest the next action for the user based on conversation history and insurance plan.
 *
 * - suggestNextAction - A function that returns a suggested next action.
 * - SuggestNextActionInput - The input type for the suggestNextAction function.
 * - SuggestNextActionOutput - The return type for the suggestNextAction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestNextActionInputSchema = z.object({
  conversationHistory: z
    .array(z.string())
    .describe('A list of previous messages in the conversation.'),
  insurancePlanDetails: z
    .string()
    .describe('Details about the user’s insurance plan.'),
});
export type SuggestNextActionInput = z.infer<typeof SuggestNextActionInputSchema>;

const SuggestNextActionOutputSchema = z.object({
  nextAction: z.string().describe('The suggested next action for the user.'),
});
export type SuggestNextActionOutput = z.infer<typeof SuggestNextActionOutputSchema>;

export async function suggestNextAction(input: SuggestNextActionInput): Promise<SuggestNextActionOutput> {
  return suggestNextActionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestNextActionPrompt',
  input: {schema: SuggestNextActionInputSchema},
  output: {schema: SuggestNextActionOutputSchema},
  prompt: `You are an AI assistant helping users navigate their health insurance plans. Based on the conversation history and the user's insurance plan details, suggest the single most relevant next action for the user to take.

Conversation History: {{{conversationHistory}}}
Insurance Plan Details: {{{insurancePlanDetails}}}

Suggest the single best next action, be concise.`,
});

const suggestNextActionFlow = ai.defineFlow(
  {
    name: 'suggestNextActionFlow',
    inputSchema: SuggestNextActionInputSchema,
    outputSchema: SuggestNextActionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
