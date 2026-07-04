import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getDatabase, connectDatabaseEmulator } from 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const realtimeDb = getDatabase(app)

// Optional: Connect to emulators for local development
// Uncomment these lines to use Firebase emulators locally
// if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
//   try {
//     connectFirestoreEmulator(db, 'localhost', 8080)
//     connectDatabaseEmulator(realtimeDb, 'localhost', 9000)
//   } catch (e) {
//     // Emulator already connected
//   }
// }
