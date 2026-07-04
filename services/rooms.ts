import { db } from './firebase'
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  Timestamp,
  onSnapshot,
  QueryConstraint,
} from 'firebase/firestore'

export interface Room {
  id?: string
  name: string
  hostId: string
  hostName: string
  maxPlayers: number
  currentPlayers: number
  mode: 'Classic' | 'Spicy' | 'Extreme' | 'Icebreaker' | 'Couples' | '18+' | 'Family-Friendly' | 'Horror Night' | 'Party Royale'
  isPublic: boolean
  password?: string
  players: string[]
  status: 'waiting' | 'playing' | 'finished'
  createdAt: Timestamp
  updatedAt: Timestamp
}

/**
 * Create a new room
 */
export const createRoom = async (
  name: string,
  hostId: string,
  hostName: string,
  maxPlayers: number,
  mode: Room['mode'],
  isPublic: boolean,
  password?: string
): Promise<string> => {
  try {
    const roomData: Room = {
      name,
      hostId,
      hostName,
      maxPlayers,
      currentPlayers: 1,
      mode,
      isPublic,
      password,
      players: [hostId],
      status: 'waiting',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    }

    const docRef = await addDoc(collection(db, 'rooms'), roomData)
    return docRef.id
  } catch (error: any) {
    throw new Error(error.message)
  }
}

/**
 * Get room by ID
 */
export const getRoom = async (roomId: string): Promise<Room | null> => {
  try {
    const docRef = doc(db, 'rooms', roomId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Room
    }
    return null
  } catch (error: any) {
    throw new Error(error.message)
  }
}

/**
 * Get all public rooms
 */
export const getPublicRooms = async (): Promise<Room[]> => {
  try {
    const q = query(collection(db, 'rooms'), where('isPublic', '==', true), where('status', '==', 'waiting'))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Room[]
  } catch (error: any) {
    throw new Error(error.message)
  }
}

/**
 * Get user's rooms
 */
export const getUserRooms = async (userId: string): Promise<Room[]> => {
  try {
    const q = query(collection(db, 'rooms'), where('players', 'array-contains', userId))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Room[]
  } catch (error: any) {
    throw new Error(error.message)
  }
}

/**
 * Join room
 */
export const joinRoom = async (roomId: string, userId: string) => {
  try {
    const roomRef = doc(db, 'rooms', roomId)
    const roomSnap = await getDoc(roomRef)

    if (!roomSnap.exists()) {
      throw new Error('Room does not exist')
    }

    const room = roomSnap.data() as Room

    if (room.currentPlayers >= room.maxPlayers) {
      throw new Error('Room is full')
    }

    if (room.players.includes(userId)) {
      throw new Error('User already in room')
    }

    await updateDoc(roomRef, {
      players: [...room.players, userId],
      currentPlayers: room.currentPlayers + 1,
      updatedAt: Timestamp.now(),
    })
  } catch (error: any) {
    throw new Error(error.message)
  }
}

/**
 * Leave room
 */
export const leaveRoom = async (roomId: string, userId: string) => {
  try {
    const roomRef = doc(db, 'rooms', roomId)
    const roomSnap = await getDoc(roomRef)

    if (!roomSnap.exists()) {
      throw new Error('Room does not exist')
    }

    const room = roomSnap.data() as Room
    const updatedPlayers = room.players.filter((id) => id !== userId)

    // If room is empty, delete it
    if (updatedPlayers.length === 0) {
      await deleteDoc(roomRef)
    } else {
      // If host left, assign new host
      const newHostId = room.hostId === userId ? updatedPlayers[0] : room.hostId
      await updateDoc(roomRef, {
        players: updatedPlayers,
        currentPlayers: updatedPlayers.length,
        hostId: newHostId,
        updatedAt: Timestamp.now(),
      })
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

/**
 * Update room status
 */
export const updateRoomStatus = async (roomId: string, status: Room['status']) => {
  try {
    const roomRef = doc(db, 'rooms', roomId)
    await updateDoc(roomRef, {
      status,
      updatedAt: Timestamp.now(),
    })
  } catch (error: any) {
    throw new Error(error.message)
  }
}

/**
 * Listen to room updates in real-time
 */
export const onRoomUpdate = (roomId: string, callback: (room: Room | null) => void) => {
  const roomRef = doc(db, 'rooms', roomId)
  return onSnapshot(roomRef, (doc) => {
    if (doc.exists()) {
      callback({
        id: doc.id,
        ...doc.data(),
      } as Room)
    } else {
      callback(null)
    }
  })
}

/**
 * Listen to all public rooms in real-time
 */
export const onPublicRoomsUpdate = (callback: (rooms: Room[]) => void) => {
  const q = query(
    collection(db, 'rooms'),
    where('isPublic', '==', true),
    where('status', '==', 'waiting')
  )
  return onSnapshot(q, (querySnapshot) => {
    const rooms = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Room[]
    callback(rooms)
  })
}
