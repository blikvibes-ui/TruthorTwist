'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { logout } from '@/services/auth'
import { motion } from 'framer-motion'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { soundManager } from '@/services/sound'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const { user, userStats } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    soundManager.play('click')
    try {
      await logout()
      toast.success('Logged out successfully')
      router.push('/')
    } catch (error) {
      toast.error('Failed to logout')
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-dark px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-8 mb-8"
          >
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-5xl">
                👤
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-4xl font-bold mb-2">{userStats?.username || user?.email}</h1>
                <p className="text-gray-400 mb-4">{user?.email}</p>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-red-600/50 hover:bg-red-600 rounded-lg font-semibold transition-all"
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {[
              { label: 'Level', value: userStats?.level || 1, icon: '⭐', color: 'purple' },
              { label: 'Twist Points', value: userStats?.twistPoints || 0, icon: '💎', color: 'cyan' },
              { label: 'Games Played', value: userStats?.gamesPlayed || 0, icon: '🎮', color: 'pink' },
              { label: 'Games Won', value: userStats?.gamesWon || 0, icon: '🏆', color: 'yellow' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                className="glass p-6 rounded-lg text-center"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                <p className={`text-2xl font-bold text-${stat.color}-400`}>{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">🏅 Achievements</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {['First Truth', 'First Dare', 'Streak 7', 'Level 10', 'Games x10', 'Wins x5'].map((achievement) => (
                <div key={achievement} className="bg-white/5 p-4 rounded-lg text-center hover:bg-white/10 transition-all">
                  <div className="text-3xl mb-2">🎖️</div>
                  <p className="text-sm text-gray-300">{achievement}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
