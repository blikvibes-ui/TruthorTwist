'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-dark flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-10 left-10 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-40 h-40 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        className="text-center max-w-2xl z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo/Title */}
        <motion.h1 variants={itemVariants} className="text-6xl md:text-7xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            TruthOrTwist
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
          Spill the Tea or Take the Twist — Live with Friends
        </motion.p>

        {/* Description */}
        <motion.p variants={itemVariants} className="text-gray-400 mb-12 max-w-md mx-auto">
          The ultimate online Truth or Dare experience. Play with friends, earn points, and create unforgettable moments.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth/signin"
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all"
          >
            Create Room
          </Link>
          <Link
            href="/rooms"
            className="px-8 py-3 bg-transparent border-2 border-cyan-400 rounded-lg font-semibold hover:bg-cyan-400/10 transition-all"
          >
            Join Room
          </Link>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div variants={itemVariants} className="mt-16 grid grid-cols-3 gap-4 text-sm md:text-base">
          <div className="glass p-4 rounded-lg">
            <div className="text-cyan-400 mb-2">⚡</div>
            <p className="text-gray-300">Real-time</p>
          </div>
          <div className="glass p-4 rounded-lg">
            <div className="text-pink-400 mb-2">🎮</div>
            <p className="text-gray-300">Multiplayer</p>
          </div>
          <div className="glass p-4 rounded-lg">
            <div className="text-purple-400 mb-2">✨</div>
            <p className="text-gray-300">Premium</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
