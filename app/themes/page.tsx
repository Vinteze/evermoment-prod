'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, Heart } from 'lucide-react'

export default function ThemesPage() {
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan') || 'basic'
  const [selected, setSelected] = useState<number | null>(null)

  const themes = [
    { id: 1, name: 'Romantic', emoji: '💕', color: 'from-rose-400 to-pink-600' },
    { id: 2, name: 'Aurora', emoji: '🌌', color: 'from-purple-400 to-blue-600' },
    { id: 3, name: 'Sunset', emoji: '🌅', color: 'from-orange-400 to-red-600' },
    { id: 4, name: 'Ocean', emoji: '🌊', color: 'from-cyan-400 to-blue-600' },
    { id: 5, name: 'Forest', emoji: '🌿', color: 'from-green-400 to-emerald-600' },
    { id: 6, name: 'Gold', emoji: '✨', color: 'from-yellow-400 to-amber-600' },
  ]

  const available = plan === 'premium' ? themes : [themes[0]]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Escolha Seu Tema</h1>
          <p className="text-gray-600">
            Plano: <span className="font-bold text-purple-600">{plan === 'premium' ? 'Premium' : 'Basic'}</span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {available.map((theme, i) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelected(theme.id)}
              className={`cursor-pointer p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 bg-white border-4 ${
                selected === theme.id ? 'border-purple-600' : 'border-transparent'
              }`}
            >
              <div className="text-6xl mb-4">{theme.emoji}</div>
              <h3 className="text-2xl font-bold text-gray-900">{theme.name}</h3>
              {selected === theme.id && <Heart className="w-6 h-6 text-purple-600 mt-4 fill-purple-600" />}
            </motion.div>
          ))}
        </div>

        {plan === 'basic' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-purple-100 rounded-2xl p-8 text-center mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Desbloqueie Mais Temas</h3>
            <p className="text-gray-700 mb-6">Upgrade para Premium e acesse todos os 6 temas</p>
            <Link href="/#pricing">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700">
                Ver Plano Premium
              </button>
            </Link>
          </motion.div>
        )}

        <div className="text-center">
          {selected ? (
            <Link href={`/editor?theme=${selected}&plan=${plan}`}>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 text-lg">
                Continuar <ArrowRight className="w-5 h-5 inline ml-2" />
              </button>
            </Link>
          ) : (
            <p className="text-gray-600">Selecione um tema para continuar</p>
          )}
        </div>
      </div>
    </div>
  )
}
