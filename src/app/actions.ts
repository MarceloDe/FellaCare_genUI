'use server';

import { renderDynamicUI, type RenderDynamicUIInput, type RenderDynamicUIOutput } from '@/ai/flows/render-dynamic-ui';
import { getSuggestedActions, type SuggestedActionsInput, type SuggestedActionsOutput } from '@/ai/flows/suggested-actions';

export async function handleUserPrompt(input: RenderDynamicUIInput): Promise<RenderDynamicUIOutput> {
  const result = await renderDynamicUI(input);
  return result;
}

export async function fetchSuggestedActions(input: SuggestedActionsInput): Promise<SuggestedActionsOutput> {
  const result = await getSuggestedActions(input);
  return result;
}
