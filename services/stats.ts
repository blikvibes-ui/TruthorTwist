import { db } from './firebase'
import { collection, addDoc, query, where, getDocs, Timestamp, doc, updateDoc, getDoc } from 'firebase/firestore'

export interface GameRecord {
  id?: string
  roomId: string
  players: string[]
  winner?: string
  totalRounds: number
  scores: { [userId: string]: number }
  startTime: Timestamp
  endTime: Timestamp
}

export interface UserStats {
  uid: string
  email: string
  username: string
  avatar: string
  twistPoints: number
  level: number
  gamesPlayed: number
  gamesWon: number
  totalRounds: number
  achievements: string[]
  createdAt: Timestamp
  updatedAt: Timestamp
}

/**
 * Get user stats
 */
export const getUserStats = async (userId: string): Promise<UserStats | null> => {
  try {
    const docRef = doc(db, 'users', userId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data() as UserStats
    }
    return null
  } catch (error: any) {
    throw new Error(error.message)
  }
}

/**
 * Update user twist points
 */
export const updateUserPoints = async (userId: string, points: number) => {
  try {
    const userRef = doc(db, 'users', userId)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      const currentPoints = userSnap.data().twistPoints || 0
      const newLevel = Math.floor((currentPoints + points) / 100) + 1

      await updateDoc(userRef, {
        twistPoints: currentPoints + points,
        level: newLevel,
        updatedAt: Timestamp.now(),
      })
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

/**
 * Record a game
 */
export const recordGame = async (
  roomId: string,
  players: string[],
  scores: { [userId: string]: number },
  winner?: string
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'games'), {
      roomId,
      players,
      winner,
      totalRounds: Object.keys(scores).length,
      scores,
      startTime: Timestamp.now(),
      endTime: Timestamp.now(),
    })

    // Update user stats
    for (const userId in scores) {
      const points = scores[userId]
      await updateUserPoints(userId, points)

      const userRef = doc(db, 'users', userId)
      const userSnap = await getDoc(userRef)

      if (userSnap.exists()) {
        await updateDoc(userRef, {
          gamesPlayed: (userSnap.data().gamesPlayed || 0) + 1,
          gamesWon: (userSnap.data().gamesWon || 0) + (userId === winner ? 1 : 0),
          updatedAt: Timestamp.now(),
        })
      }
    }

    return docRef.id
  } catch (error: any) {
    throw new Error(error.message)
  }
}

/**
 * Get leaderboard (top 100 users by Twist Points)
 */
export const getLeaderboard = async (): Promise<UserStats[]> => {
  try {
    const q = query(collection(db, 'users'))
    const querySnapshot = await getDocs(q)

    const users = querySnapshot.docs
      .map((doc) => doc.data() as UserStats)
      .sort((a, b) => b.twistPoints - a.twistPoints)
      .slice(0, 100)

    return users
  } catch (error: any) {
    throw new Error(error.message)
  }
}
