import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDUBmDbHaaJyA1B03ogy7NtlSvm2HDz5Tk",
  authDomain: "gen-lang-client-0220846018.firebaseapp.com",
  projectId: "gen-lang-client-0220846018",
  storageBucket: "gen-lang-client-0220846018.firebasestorage.app",
  messagingSenderId: "703319759376",
  appId: "1:703319759376:web:922ffeae70f78736ffc895",
  measurementId: "G-MPRSMB32K4"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Analytics (only in browser environment)
let analytics;
if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };
