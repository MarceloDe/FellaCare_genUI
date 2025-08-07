'use client';

import { useEffect } from 'react';
import { app, analytics } from '@/lib/firebase';

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Firebase is initialized when the module is imported
    // Analytics is initialized conditionally in the firebase.ts file
    if (app) {
      console.log('Firebase initialized');
    }
  }, []);

  return <>{children}</>;
}