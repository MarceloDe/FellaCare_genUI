import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY || 'mock-api-key',
    }),
  ],
  logLevel: 'debug',
  enableTracing: true,
});
