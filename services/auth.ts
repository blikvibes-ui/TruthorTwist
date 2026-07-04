import { auth } from './firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
} from 'firebase/auth'
import { db } from './firebase'
import { setDoc, doc } from 'firebase/firestore'

const googleProvider = new GoogleAuthProvider()

/**
 * Sign up with email and password
 */
export const signUpWithEmail = async (email: string, password: string, username: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    const user = result.user

    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      username: username,
      avatar: 'https://ui-avatars.com/api/?name=' + username,
      twistPoints: 0,
      level: 1,
      gamesPlayed: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return user
  } catch (error: any) {
    throw new Error(error.message)
  }
}

/**
 * Sign in with email and password
 */
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result.user
  } catch (error: any) {
    throw new Error(error.message)
  }
}

/**
 * Sign in with Google
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user

    // Create user document if it doesn't exist
    await setDoc(
      doc(db, 'users', user.uid),
      {
        uid: user.uid,
        email: user.email,
        username: user.displayName || 'User',
        avatar: user.photoURL || 'https://ui-avatars.com/api/?name=' + user.displayName,
        twistPoints: 0,
        level: 1,
        gamesPlayed: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { merge: true }
    )

    return user
  } catch (error: any) {
    throw new Error(error.message)
  }
}

/**
 * Sign out
 */
export const logout = async () => {
  try {
    await signOut(auth)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

/**
 * Get current user
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser
}

/**
 * Listen to auth state changes
 */
export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  return auth.onAuthStateChanged(callback)
}
