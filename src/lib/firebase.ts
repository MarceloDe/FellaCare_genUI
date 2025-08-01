import { initializeApp, getApp, getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDUBmDbHaaJyA1B03ogy7NtlSvm2HDz5Tk",
  authDomain: "gen-lang-client-0220846018.firebaseapp.com",
  projectId: "gen-lang-client-0220846018",
  storageBucket: "gen-lang-client-0220846018.firebasestorage.app",
  messagingSenderId: "703319759376",
  appId: "1:703319759376:web:55405ca66a219b15ffc895",
  measurementId: "G-2D12GWTP1Z"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
