'use client'

import { useState } from 'react'
import { Heart, Loader } from 'lucide-react'

interface StripeCheckoutButtonProps {
  plan: string
  inviteId: string
  formData: {
    email: string
    name1: string
    name2?: string
    eventTitle: string
    eventType?: string
    eventDate?: string
    eventTime?: string
    eventLocation?: string
    eventDescription?: string
    phone?: string
    photos?: string[]
    message?: string
    musicUrl?: string
  }
  themeGradient: string
  disabled?: boolean
}

export default function StripeCheckoutButton({
  plan,
  inviteId,
  formData,
  themeGradient,
  disabled = false,
}: StripeCheckoutButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      // Primeiro, salvar o convite no banco de dados
      const inviteData = {
        inviteId,
        eventTitle: formData.eventTitle,
        eventType: formData.eventType || 'casamento',
        eventDate: formData.eventDate,
        eventTime: formData.eventTime,
        eventLocation: formData.eventLocation,
        eventDescription: formData.eventDescription || '',
        name1: formData.name1,
        name2: formData.name2 || '',
        email: formData.email,
        phone: formData.phone || '',
        photos: formData.photos || [],
        message: formData.message || '',
        musicUrl: formData.musicUrl || '',
        theme: '1',
        plan,
        paymentId: null,
      }

      // Salvar convite no banco
      const saveResponse = await fetch('/api/invites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inviteData),
      })

      if (!saveResponse.ok) {
        const error = await saveResponse.json()
        alert(`Erro ao salvar convite: ${error.error}`)
        setLoading(false)
        return
      }

      const savedInvite = await saveResponse.json()
      console.log('Convite salvo:', savedInvite)

      // Depois criar sessão de checkout
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan,
          inviteId,
          email: formData.email,
          name: `${formData.name1} ${formData.name2 || ''}`,
        }),
      })

      const { sessionId, error } = await response.json()

      if (error) {
        alert(`Erro: ${error}`)
        setLoading(false)
        return
      }

      // Redirecionar para Stripe Checkout usando script do Stripe
      if (typeof window !== 'undefined') {
        // Dynamically import stripe
        const { loadStripe } = await import('@stripe/stripe-js')
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

        const { error: stripeError } = await stripe!.redirectToCheckout({
          sessionId,
        })

        if (stripeError) {
          alert(`Erro do Stripe: ${stripeError.message}`)
        }
      }
    } catch (error: any) {
      console.error('Erro:', error)
      alert('Erro ao processar pagamento')
    } finally {
      setLoading(false)
    }
  }

  const prices: Record<string, { amount: string; currency: string }> = {
    basic: { amount: 'R$ 29,90', currency: 'BRL' },
    premium: { amount: 'R$ 49,90', currency: 'BRL' },
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={disabled || loading}
      className={`w-full py-4 rounded-lg font-bold text-lg text-white flex items-center justify-center gap-2 transition-all ${
        disabled || loading
          ? 'bg-gray-400 cursor-not-allowed'
          : `bg-gradient-to-r ${themeGradient} hover:from-purple-700 hover:to-pink-700`
      }`}
    >
      {loading ? (
        <>
          <Loader className="w-5 h-5 animate-spin" />
          Processando...
        </>
      ) : (
        <>
          <Heart className="w-5 h-5" />
          Pagar {prices[plan].amount} com Stripe
        </>
      )}
    </button>
  )
}
