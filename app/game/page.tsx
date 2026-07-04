'use client'

import { useAuth } from '@/context/AuthContext'
import { useRoom } from '@/context/RoomContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import GameSpinner from '@/components/GameSpinner'
import ReactionPanel from '@/components/ReactionPanel'
import { soundManager } from '@/services/sound'
import { createConfetti, particleExplosion } from '@/utils/animations'
import questions from '@/data/questions.json'
import { sendMessage } from '@/services/messages'
import { updateUserPoints } from '@/services/stats'
import toast from 'react-hot-toast'

interface Question {
  id: number
  text: string
  intensity: string
  category: string
}

export default function GamePage() {
  const { user } = useAuth()
  const { room, messages } = useRoom()
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [currentType, setCurrentType] = useState<'truth' | 'dare' | null>(null)
  const [timer, setTimer] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [chatMessage, setChatMessage] = useState('')
  const [reactions, setReactions] = useState<{ [key: string]: number }>({})

  // Timer countdown
  useEffect(() => {
    if (timer > 0 && isPlaying) {
      const interval = setTimeout(() => setTimer(timer - 1), 1000)
      return () => clearTimeout(interval)
    } else if (timer === 0 && isPlaying && currentType === 'dare') {
      // Timer finished for dare
      soundManager.play('levelUp')
      setIsPlaying(false)
      createConfetti()
      toast.success('Time\'s up! Great job! 🎉')
    }
  }, [timer, isPlaying, currentType])

  const handleSpin = (result: 'truth' | 'dare') => {
    setCurrentType(result)
    soundManager.play('reveal')

    // Select random question
    const questionList = result === 'truth' ? questions.truths : questions.dares
    const randomQuestion = questionList[Math.floor(Math.random() * questionList.length)]
    setCurrentQuestion(randomQuestion as Question)

    // Set timer for dare
    if (result === 'dare' && 'duration' in randomQuestion && randomQuestion.duration > 0) {
      setTimer(randomQuestion.duration)
      setIsPlaying(true)
    }

    setReactions({})
  }

  const handleReaction = async (reaction: string) => {
    const newCount = (reactions[reaction] || 0) + 1
    setReactions({ ...reactions, [reaction]: newCount })

    // Send reaction as message
    if (user && room?.id) {
      try {
        await sendMessage(room.id, user.uid, user.displayName || 'Anonymous', reaction)
      } catch (error) {
        console.error('Failed to send reaction:', error)
      }
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatMessage.trim() || !user || !room?.id) return

    try {
      soundManager.play('click')
      await sendMessage(room.id, user.uid, user.displayName || 'Anonymous', chatMessage)
      setChatMessage('')n    } catch (error) {
      toast.error('Failed to send message')
    }
  }

  const handleCompleteChallenge = async () => {
    soundManager.play('success')
    createConfetti()
    setIsPlaying(false)

    if (user) {
      try {
        await updateUserPoints(user.uid, currentType === 'dare' ? 20 : 10)
        toast.success('Points earned! 🏆')
      } catch (error) {
        console.error('Failed to update points:', error)
      }
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-dark px-4 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Gameplay Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Game Header */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass p-6 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">
                  {room?.name || 'Game Room'}
                </h1>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Players: {room?.currentPlayers}/{room?.maxPlayers}</p>
                  <p className="text-sm text-cyan-400 font-semibold">Mode: {room?.mode}</p>
                </div>
              </div>
            </motion.div>

            {/* Spinner Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-8 rounded-xl text-center">
              <GameSpinner onSpinEnd={handleSpin} disabled={currentType !== null} />
            </motion.div>

            {/* Question Display */}
            {currentQuestion && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`glass p-8 rounded-xl text-center border-2 ${
                  currentType === 'truth'
                    ? 'border-purple-500/50 bg-purple-500/5'
                    : 'border-pink-500/50 bg-pink-500/5'
                }`}
              >
                <div className="mb-4">
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    currentType === 'truth'
                      ? 'bg-purple-500/30 text-purple-300'
                      : 'bg-pink-500/30 text-pink-300'
                  }`}>
                    {currentType === 'truth' ? '💬 TRUTH' : '🎯 DARE'}
                  </span>
                </div>
                <p className="text-2xl font-bold mb-4">{currentQuestion.text}</p>
                <p className="text-sm text-gray-400 mb-6">Intensity: {currentQuestion.intensity.toUpperCase()}</p>

                {/* Timer for Dare */}
                {currentType === 'dare' && isPlaying && 'duration' in currentQuestion && (currentQuestion as any).duration > 0 && (
                  <div className="mb-6">
                    <div className="inline-block">
                      <div className={`text-4xl font-bold ${
                        timer < 10 ? 'text-red-400 animate-pulse' : 'text-cyan-400'
                      }`}>
                        {timer}s
                      </div>
                    </div>
                  </div>
                )}

                {/* Reaction Panel */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                  <ReactionPanel onReaction={handleReaction} />
                </motion.div>

                {/* Complete Challenge Button */}
                {isPlaying && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCompleteChallenge}
                    className="mt-6 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all"
                  >
                    ✅ Completed!
                  </motion.button>
                )}
              </motion.div>
            )}

            {/* Player List */}
            {room?.players && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass p-6 rounded-xl">
                <h3 className="text-lg font-bold mb-4">Players in Room</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {room.players.map((playerId) => (
                    <div key={playerId} className="bg-white/5 p-3 rounded-lg text-center text-sm">
                      <div className="text-2xl mb-2">👤</div>
                      <p className="truncate text-gray-300">Player {playerId.slice(0, 4)}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Chat & Stats Sidebar */}
          <div className="space-y-6">
            {/* Chat */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass p-6 rounded-xl flex flex-col h-96">
              <h3 className="text-lg font-bold mb-4">Chat</h3>
              <div className="flex-1 overflow-y-auto mb-4 space-y-2">
                {messages.map((msg) => (
                  <div key={msg.id} className="text-sm">
                    <span className="text-cyan-400 font-semibold">{msg.username}:</span>
                    <span className="text-gray-300 ml-2">{msg.message}</span>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Say something..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-400 text-white placeholder-gray-500"
                />
                <button type="submit" className="bg-cyan-500 p-2 rounded-lg hover:bg-cyan-600 transition-all">
                  📤
                </button>
              </form>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-4">Your Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Twist Points:</span>
                  <span className="text-cyan-400 font-bold">2,450</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Level:</span>
                  <span className="text-purple-400 font-bold">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Streak:</span>
                  <span className="text-pink-400 font-bold">7 🔥</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
