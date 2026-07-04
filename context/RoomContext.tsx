'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { onRoomUpdate, Room } from '@/services/rooms'
import { onRoomMessages, GameMessage } from '@/services/messages'

interface RoomContextType {
  room: Room | null
  messages: GameMessage[]
  loading: boolean
  error: string | null
  setRoom: (room: Room | null) => void
}

const RoomContext = createContext<RoomContextType>({
  room: null,
  messages: [],
  loading: false,
  error: null,
  setRoom: () => {},
})

export function RoomProvider({ children }: { children: React.ReactNode }) {
  const [room, setRoom] = useState<Room | null>(null)
  const [messages, setMessages] = useState<GameMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Subscribe to room updates when room changes
  useEffect(() => {
    if (!room?.id) return

    setLoading(true)
    const unsubscribeRoom = onRoomUpdate(room.id, (updatedRoom) => {
      setRoom(updatedRoom)
      setLoading(false)
    })

    const unsubscribeMessages = onRoomMessages(room.id, (msgs) => {
      setMessages(msgs)
    })

    return () => {
      unsubscribeRoom()
      unsubscribeMessages()
    }
  }, [room?.id])

  return (
    <RoomContext.Provider value={{ room, messages, loading, error, setRoom }}>
      {children}
    </RoomContext.Provider>
  )
}

export function useRoom() {
  const context = useContext(RoomContext)
  if (!context) {
    throw new Error('useRoom must be used within RoomProvider')
  }
  return context
}
