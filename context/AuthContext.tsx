'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from 'firebase/auth'
import { onAuthStateChanged, getCurrentUser } from '@/services/auth'
import { getUserStats, UserStats } from '@/services/stats'

interface AuthContextType {
  user: User | null
  userStats: UserStats | null
  loading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userStats: null,
  loading: true,
  error: null,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (authUser) => {
      try {
        setUser(authUser)
        if (authUser) {
          const stats = await getUserStats(authUser.uid)
          setUserStats(stats)
        } else {
          setUserStats(null)
        }
        setError(null)
      } catch (err: any) {
        setError(err.message)
        console.error('Auth error:', err)
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, userStats, loading, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
