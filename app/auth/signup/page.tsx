'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  })
  const [loading, setLoading] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Firebase sign-up logic will go here
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
            Join the Fun
          </h1>
          <p className="text-gray-400 text-center mb-8">Create your account</p>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Choose a username"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-3 font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-cyan-400 hover:text-cyan-300">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
