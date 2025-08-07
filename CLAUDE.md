# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FellaCare is an AI-powered health insurance assistant built with Next.js 15 and Google's Gemini AI via Firebase Genkit. It provides a dynamic, conversational interface for health insurance information through AI-generated UI elements.

## Essential Commands

### Development
```bash
# Install dependencies
npm install

# Run everything (Next.js + Genkit runtime + Genkit UI)
npm run dev

# Run services separately
npm run next:dev      # Next.js on port 9002
npm run genkit:dev    # Genkit runtime (required for AI flows)
npm run genkit:ui     # Genkit Developer UI on port 4000

# Type checking and linting
npm run typecheck
npm run lint
```

### Deployment
```bash
# Deploy to Firebase App Hosting
firebase apphosting:backends:deploy
```

## Architecture

### AI Flow Architecture
The application uses Firebase Genkit for server-side AI operations:
- All AI flows are defined in `/src/ai/flows/`
- Main flows:
  - `render-dynamic-ui.ts`: Generates UI elements from user prompts
  - `suggested-actions.ts`: Provides conversation starters
  - `suggest-next-action.ts`: Generates contextual follow-up actions
- Flows are exposed via server actions in `/src/app/actions.ts`
- Client components call server actions, never AI flows directly

### Server Actions Pattern
```typescript
// In actions.ts
'use server';
import { runFlow } from '@genkit-ai/flow';
import { renderDynamicUI } from '@/ai/flows/render-dynamic-ui';

export async function generateUI(prompt: string) {
  const result = await runFlow(renderDynamicUI, { prompt });
  return result;
}
```

### Component Architecture
- Server Components: Used for layout and initial data
- Client Components: Interactive UI with `'use client'` directive
- Main client component: `/src/components/fellacare-client.tsx` manages entire app state
- UI components from Shadcn in `/src/components/ui/`

## Environment Configuration

Required environment variables in `.env.local`:
```bash
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_CLOUD_PROJECT=gen-lang-client-0220846018
GCLOUD_PROJECT=gen-lang-client-0220846018
```

## Key Design Patterns

### 1. Type-Safe AI Responses
All AI flows use Zod schemas for input/output validation:
```typescript
const elementSchema = z.object({
  type: z.enum(['text', 'button', 'textarea', 'select']),
  content: z.string().optional(),
  options: z.array(z.string()).optional(),
});
```

### 2. Loading States
Use React's `useTransition` for server action loading states:
```typescript
const [isPending, startTransition] = useTransition();
startTransition(async () => {
  const result = await generateUI(prompt);
});
```

### 3. Progressive Web App
Configured as installable PWA with service workers. Configuration in `next.config.ts` uses `@ducanh2912/next-pwa`.

## Common Pitfalls

1. **Genkit Runtime**: The Genkit runtime MUST be running for AI flows to work. Without it, server actions will fail.

2. **Environment Variables**: The app requires `GENKIT_ENV=dev` for the Genkit runtime to connect to the UI.

3. **Port Conflicts**: 
   - Next.js: 9002
   - Genkit UI: 4000
   - Genkit Runtime: 3100
   - Genkit Telemetry: 4033

4. **Build Errors**: TypeScript and ESLint errors are ignored during builds (see `next.config.ts`). Be cautious when modifying type definitions.

## Testing AI Flows

Use the Genkit Developer UI at http://localhost:4000 to:
- Test individual flows with custom inputs
- View execution traces
- Debug flow failures
- Monitor performance

## Firebase Services

Currently configured services:
- Firebase App Hosting (deployment)
- Firestore (configured but not actively used)
- Firebase telemetry for Genkit tracing

Firebase project: `gen-lang-client-0220846018`