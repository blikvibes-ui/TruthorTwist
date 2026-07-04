'use client'

import { useEffect, useState } from 'react'
import { getLeaderboard, UserStats } from '@/services/stats'
import { motion } from 'framer-motion'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import toast from 'react-hot-toast'

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<UserStats[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard()
        setLeaderboard(data)
      } catch (error) {
        toast.error('Failed to load leaderboard')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🏆</div>
          <p className="text-gray-300">Loading leaderboard...</p>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-dark px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
            <h1 className="text-5xl font-bold mb-2">🏆 Leaderboard</h1>
            <p className="text-gray-400">Top players by Twist Points</p>
          </motion.div>

          {/* Leaderboard Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Rank</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Player</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Level</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Twist Points</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Games Played</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Win Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((player, index) => {
                    const winRate = player.gamesPlayed > 0
                      ? ((player.gamesWon / player.gamesPlayed) * 100).toFixed(1)
                      : '0'
                    const getMedalEmoji = (rank: number) => {
                      if (rank === 0) return '🥇'
                      if (rank === 1) return '🥈'
                      if (rank === 2) return '🥉'
                      return `#${rank + 1}`
                    }

                    return (
                      <motion.tr
                        key={player.uid}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-white/10 hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4 text-lg font-bold">{getMedalEmoji(index)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl">
                              👤
                            </div>
                            <div>
                              <p className="font-semibold text-white">{player.username}</p>
                              <p className="text-xs text-gray-500">{player.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold">
                            Lvl {player.level}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-cyan-400 font-bold">{player.twistPoints}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-400">{player.gamesPlayed}</td>
                        <td className="px-6 py-4">
                          <span className="text-pink-400 font-semibold">{winRate}%</span>
                        </td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>

          {leaderboard.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-400 text-lg">No players yet. Be the first! 🚀</p>
            </motion.div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
