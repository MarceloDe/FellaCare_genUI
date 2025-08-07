#!/bin/bash
# Load environment variables
export GENKIT_ENV=dev
export GEMINI_API_KEY=AIzaSyCHNjbu6ORjWxM4bAlkwhqpBJQwKuhJGKw
export GOOGLE_CLOUD_PROJECT=gen-lang-client-0220846018
export GCLOUD_PROJECT=gen-lang-client-0220846018

# Start the Genkit runtime
npx tsx src/ai/dev.ts