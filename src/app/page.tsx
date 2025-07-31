import { MediMateClient } from '@/components/medimate-client';
import { fetchSuggestedActions } from '@/app/actions';

export default async function Home() {
  const initialSuggestions = (await fetchSuggestedActions({ previousInteractions: [] })).actions;
  return <MediMateClient initialSuggestions={initialSuggestions} />;
}
