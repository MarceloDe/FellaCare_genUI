import { FellaCareClient } from '@/components/fellacare-client';
import { fetchSuggestedActions } from '@/app/actions';

export default async function Home() {
  const { actions } = await fetchSuggestedActions({ previousInteractions: [] });
  return <FellaCareClient initialSuggestions={actions} />;
}
