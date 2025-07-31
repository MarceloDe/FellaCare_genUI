'use server';

/**
 * @fileOverview A flow that renders dynamic UI elements based on user prompts.
 *
 * - renderDynamicUI - A function that handles the UI rendering process.
 * - RenderDynamicUIInput - The input type for the renderDynamicUI function.
 * - RenderDynamicUIOutput - The return type for the renderDynamicUI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RenderDynamicUIInputSchema = z.object({
  prompt: z.string().describe('The user prompt to generate UI elements.'),
});
export type RenderDynamicUIInput = z.infer<typeof RenderDynamicUIInputSchema>;

const RenderDynamicUIOutputSchema = z.object({
  uiElements: z.array(
    z.object({
      type: z.string().describe('The type of UI element (e.g., text, button, textarea, select).'),
      content: z.string().describe('The content of the UI element.'),
      color: z.string().describe('The color of the UI element (e.g., #33A6FF).'),
      clickable: z.boolean().optional().describe('Whether the UI element is clickable.'),
      options: z.array(z.string()).optional().describe('Available options for select elements.'),
    })
  ).describe('An array of UI elements to render, including select elements with options.'),
});
export type RenderDynamicUIOutput = z.infer<typeof RenderDynamicUIOutputSchema>;

export async function renderDynamicUI(input: RenderDynamicUIInput): Promise<RenderDynamicUIOutput> {
  return renderDynamicUIFlow(input);
}

const renderDynamicUIPrompt = ai.definePrompt({
  name: 'renderDynamicUIPrompt',
  input: {schema: RenderDynamicUIInputSchema},
  output: {schema: RenderDynamicUIOutputSchema},
  model: 'googleai/gemini-2.0-flash',
  prompt: `You are an AI assistant specialized in rendering dynamic UI elements for a health insurance application.

  Based on the user prompt, generate an array of UI elements including text, buttons, text areas, and select elements with options to facilitate user interaction. Make the UI elements clickable when appropriate.  Consider the color for each UI element.

  User Prompt: {{{prompt}}}

  Ensure the UI elements are tailored to assist the user in navigating insurance plans. Select elements should include a list of options where applicable.

  The primary color is HSL 210, 100%, 62% (Hex: #33A6FF). The background color is HSL 210, 15%, 95% (Hex: #F0F5FA). The accent color is HSL 180, 75%, 50% (Hex: #00BFA5).

  {{#if uiElements}}
  UI Elements:
  {{#each uiElements}}
  - Type: {{{type}}}, Content: {{{content}}}, Color: {{{color}}}, Clickable: {{{clickable}}}, Options: {{{options}}}
  {{/each}}
  {{/if}}`,
});

const renderDynamicUIFlow = ai.defineFlow(
  {
    name: 'renderDynamicUIFlow',
    inputSchema: RenderDynamicUIInputSchema,
    outputSchema: RenderDynamicUIOutputSchema,
  },
  async input => {
    const {output} = await renderDynamicUIPrompt(input);
    return output!;
  }
);
