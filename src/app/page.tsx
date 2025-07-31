import { MediMateClient } from '@/components/medimate-client';
import { getSuggestedActions } from '@/ai/flows/suggested-actions';

export default async function Home() {
  const initialSuggestions = await getSuggestedActions({ previousInteractions: [] });
  return <MediMateClient initialSuggestions={initialSuggestions.actions} />;
}
