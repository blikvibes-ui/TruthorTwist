'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function RoomsBrowse() {
  const [rooms] = useState([
    {
      id: 1,
      name: 'Epic Party 🎉',
      players: 4,
      maxPlayers: 8,
      mode: 'Spicy',
      status: 'Playing',
    },
    {
      id: 2,
      name: 'Weekend Vibes',
      players: 2,
      maxPlayers: 6,
      mode: 'Classic',
      status: 'Waiting',
    },
  ])

  return (
    <div className="min-h-screen bg-gradient-dark px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Browse Rooms</h1>
          <div className="flex gap-4">
            <Link
              href="/rooms/create"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all"
            >
              Create Room
            </Link>
          </div>
        </motion.div>

        <div className="grid gap-4">
          {rooms.map((room) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-6 rounded-lg hover:bg-white/20 transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    {room.players} / {room.maxPlayers} players • {room.mode} Mode
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    room.status === 'Playing'
                      ? 'bg-cyan-400/20 text-cyan-400'
                      : 'bg-green-400/20 text-green-400'
                  }`}
                >
                  {room.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
