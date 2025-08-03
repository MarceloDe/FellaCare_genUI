
'use server';
import { nextHandler } from '@genkit-ai/next';
import { config } from 'dotenv';
config();

import '@/ai/flows/suggested-actions.ts';
import '@/ai/flows/render-dynamic-ui.ts';
import '@/ai/flows/suggest-next-action.ts';

export const GET = nextHandler();
export const POST = nextHandler();
