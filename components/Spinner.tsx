'use client'

import { motion } from 'framer-motion'

interface SpinnerProps {
  isSpinning?: boolean
  onSpinEnd?: () => void
}

export default function Spinner({ isSpinning = false, onSpinEnd }: SpinnerProps) {
  return (
    <motion.div
      className="relative w-48 h-48 mx-auto mb-8"
      animate={isSpinning ? { rotate: 360 } : {}}
      transition={isSpinning ? { duration: 4, ease: 'easeOut' } : {}}
      onAnimationComplete={isSpinning ? onSpinEnd : undefined}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full opacity-75 blur-lg"></div>
      <div className="absolute inset-2 bg-dark rounded-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🎯
          </div>
        </div>
      </div>
    </motion.div>
  )
}
