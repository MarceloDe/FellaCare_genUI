import {genkit, GenkitError} from 'genkit';
import {googleAI, GoogleAIGenerativeAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY,
      client: (apiKey) => {
        if (apiKey === 'mock-api-key') {
          return {
            getGenerativeModel: () => ({
              generateContent: () => {
                throw new GenkitError({
                  message:
                    'Mock API key is not supported for this model. Please provide a valid API key.',
                  status: 'UNIMPLEMENTED',
                });
              },
            }),
          } as unknown as GoogleAIGenerativeAI;
        }
      },
    }),
  ],
  logLevel: 'debug',
  enableTracing: true,
});
