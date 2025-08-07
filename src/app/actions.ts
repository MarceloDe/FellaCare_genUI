'use server';

// Ensure environment variables are available
if (!process.env.GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is not set in environment variables');
}

import { renderDynamicUI, type RenderDynamicUIInput, type RenderDynamicUIOutput } from '@/ai/flows/render-dynamic-ui';
import { getSuggestedActions, type SuggestedActionsInput, type SuggestedActionsOutput } from '@/ai/flows/suggested-actions';

export async function handleUserPrompt(input: RenderDynamicUIInput): Promise<RenderDynamicUIOutput> {
  try {
    const result = await renderDynamicUI(input);
    return result;
  } catch (error) {
    console.error('Error in handleUserPrompt:', error);
    // Return a helpful error message to the user
    return {
      uiElements: [{
        type: 'text',
        content: 'I apologize, but I encountered an error processing your request. Please try again later.',
        color: '#FF0000',
        clickable: false
      }]
    };
  }
}

export async function fetchSuggestedActions(input: SuggestedActionsInput): Promise<SuggestedActionsOutput> {
  try {
    const result = await getSuggestedActions(input);
    return { actions: result.actions || [] };
  } catch (error) {
    console.error('Error in fetchSuggestedActions:', error);
    return { actions: ['Check my coverage', 'Find a doctor', 'View my benefits'] };
  }
}
