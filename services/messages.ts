import { db } from './firebase'
import { collection, addDoc, query, where, getDocs, onSnapshot, Timestamp, doc, updateDoc } from 'firebase/firestore'

export interface GameMessage {
  id?: string
  roomId: string
  userId: string
  username: string
  message: string
  reaction?: string
  timestamp: Timestamp
}

/**
 * Send a message to room chat
 */
export const sendMessage = async (
  roomId: string,
  userId: string,
  username: string,
  message: string
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'messages'), {
      roomId,
      userId,
      username,
      message,
      timestamp: Timestamp.now(),
    })
    return docRef.id
  } catch (error: any) {
    throw new Error(error.message)
  }
}

/**
 * Listen to room messages in real-time
 */
export const onRoomMessages = (roomId: string, callback: (messages: GameMessage[]) => void) => {
  const q = query(
    collection(db, 'messages'),
    where('roomId', '==', roomId)
  )
  return onSnapshot(q, (querySnapshot) => {
    const messages = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as GameMessage))
      .sort((a, b) => a.timestamp.toMillis() - b.timestamp.toMillis())
    callback(messages)
  })
}
