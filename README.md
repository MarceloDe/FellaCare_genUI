# FellaCare - Your AI-Powered Health Insurance Assistant

FellaCare is a next-generation health insurance assistant built with Next.js and powered by Google's Gemini generative AI. It provides a dynamic, conversational interface that allows users to get information about their health plans in an intuitive way.

This project was bootstrapped with [Firebase Studio](https://firebase.google.com/studio).

![FellaCare Screenshot](https://storage.googleapis.com/stabl-media/fella-care-screenshot.png)

## Core Technologies

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Generative AI:** [Google Gemini](https://deepmind.google/technologies/gemini/) via [Genkit](https://firebase.google.com/docs/genkit)
- **UI:** [React](https://react.dev/), [Shadcn UI](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/)
- **Deployment:** [Firebase App Hosting](https://firebase.google.com/docs/hosting)
- **PWA:** Configured as a Progressive Web App for an installable, native-like experience.

## Project Setup

To get a local copy up and running, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- A Google Account

### 1. Clone the Repository

First, clone this repository to your local machine.

```bash
git clone https://github.com/MarceloDe/FellaCare_genUI.git
cd FellaCare_genUI
```

### 2. Install Dependencies

Install the necessary npm packages.

```bash
npm install
```

### 3. Set Up Your Gemini API Key

This project uses the Google Gemini API to power its generative AI features.

1.  Go to the [Google AI Studio](https://aistudio.google.com/).
2.  Sign in with your Google account.
3.  Click on **"Get API key"** and then **"Create API key in new project"**.
4.  Copy the generated API key.
5.  In the root of your project, create a new file named `.env`.
6.  Add your API key to the `.env` file like this:

    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

### 4. Set Up Firebase (Optional, for Deployment)

This project is configured to deploy seamlessly to Firebase App Hosting. To use this feature, you'll need to connect it to a Firebase project.

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click **"Add project"** and follow the on-screen instructions to create a new Firebase project.
3.  Once your project is created, find the Firebase configuration object. Go to **Project Settings** (click the gear icon) > **Your apps**.
4.  If you don't have a web app, create one by clicking the `</>` (Web) icon.
5.  After registering the app, you will see a `firebaseConfig` object. Copy it.
6.  Open `src/lib/firebase.ts` in your project and replace the existing `firebaseConfig` object with the one you just copied.

### 5. Run the Development Server

The application uses Genkit to manage the AI flows and Next.js for the frontend. You can run both concurrently with a single command:

```bash
npm run dev
```

This will start:
- The Next.js frontend on `http://localhost:9002`
- The Genkit flows on `http://localhost:4000`

Open [http://localhost:9002](http://localhost:9002) in your browser to see the running application.

## How It Works

-   **`src/app`**: Contains the Next.js pages and routing. `page.tsx` is the entry point, and it loads the main client component.
-   **`src/components`**: Holds all the React components, including the main `fellacare-client.tsx` which manages the application state and user interactions.
-   **`src/ai/flows`**: This is where the Genkit magic happens. Each file defines a "flow" that calls the Gemini API. The main flow is `render-dynamic-ui.ts`, which takes a user prompt and returns a structured JSON object representing UI elements.
-   **`src/ai/genkit.ts`**: Initializes and configures Genkit with the Gemini plugin and your API key.

## Publishing to Firebase

Once your Firebase project is set up (Step 4), you can deploy the application using the Firebase CLI.

1. Install the Firebase CLI: `npm install -g firebase-tools`
2. Log in to Firebase: `firebase login`
3. Initialize App Hosting: `firebase init apphosting`
4. Deploy: `firebase apphosting:backends:deploy`

The CLI will guide you through the process and give you a live URL once it's done.
