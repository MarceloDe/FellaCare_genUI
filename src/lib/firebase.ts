import { initializeApp, getApp, getApps } from 'firebase/app';

const firebaseConfig = {
  "projectId": "medimate-mb7in",
  "appId": "1:752324691585:web:dabbb9bbd7b23656bb6f80",
  "storageBucket": "medimate-mb7in.firebasestorage.app",
  "apiKey": "AIzaSyCNdQJzBbpdvoSoGv60bu4voYNKRpBxptY",
  "authDomain": "medimate-mb7in.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "752324691585"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
