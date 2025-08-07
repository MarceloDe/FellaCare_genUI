import { config } from 'dotenv';
config({ path: '.env.local' });

import '@/ai/flows/suggested-actions.ts';
import '@/ai/flows/render-dynamic-ui.ts';
import '@/ai/flows/suggest-next-action.ts';
import '@/ai/init.ts';
