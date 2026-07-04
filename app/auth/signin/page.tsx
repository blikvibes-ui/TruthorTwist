'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Firebase sign-in logic will go here
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass p-8 rounded-2xl">
          <h1 className="text-3xl font-bold mb-2 text-center">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-center mb-8">Sign in to your account</p>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-3 font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-dark text-gray-400">Or continue with</span>
            </div>
          </div>

          <button className="w-full bg-white/10 border border-white/20 rounded-lg py-3 font-semibold hover:bg-white/20 transition-all mb-4">
            🔵 Google
          </button>

          <p className="text-center text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-cyan-400 hover:text-cyan-300">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
