import { MediMateClient } from '@/components/medimate-client';

export default async function Home() {
  const initialSuggestions = [
      'Compare health plans',
      'Find a doctor in my network',
      'Check my claim status'
  ];
  return <MediMateClient initialSuggestions={initialSuggestions} />;
}
