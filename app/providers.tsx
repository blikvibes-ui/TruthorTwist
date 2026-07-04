'use client'

import { AuthProvider } from '@/context/AuthContext'
import { RoomProvider } from '@/context/RoomContext'
import SoundToggle from '@/components/SoundToggle'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <RoomProvider>
        {children}
        <SoundToggle />
      </RoomProvider>
    </AuthProvider>
  )
}
