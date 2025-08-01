import { FellaCareClient } from '@/components/fellacare-client';

export default async function Home() {
  // We will fetch initial suggestions on the client now
  return <FellaCareClient />;
}
