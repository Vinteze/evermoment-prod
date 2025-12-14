'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Music, Heart, Download, Share2, X } from 'lucide-react'
import StripeCheckoutButton from '@/components/StripeCheckoutButton'
import PhotoUpload from '@/components/PhotoUpload'

const steps = [
  { id: 1, title: 'Detalhes do Evento', subtitle: 'Informações principais' },
  { id: 2, title: 'Dados dos Noivos', subtitle: 'Quem são os celebrantes' },
  { id: 3, title: 'Fotos', subtitle: 'Galeria de imagens' },
  { id: 4, title: 'Conteúdo Extra', subtitle: 'Mensagem e música' },
]

const themeColors: Record<string, string> = {
  '1': 'from-rose-400 to-pink-600',
  '2': 'from-purple-400 to-blue-600',
  '3': 'from-orange-400 to-red-600',
  '4': 'from-cyan-400 to-blue-600',
  '5': 'from-green-400 to-emerald-600',
  '6': 'from-yellow-400 to-amber-600',
}

export default function EditorPage() {
  const searchParams = useSearchParams()
  const theme = searchParams.get('theme') || '1'
  const plan = searchParams.get('plan') || 'basic'
  const maxPhotos = plan === 'premium' ? 10 : 3

  const [currentStep, setCurrentStep] = useState(1)
  const [published, setPublished] = useState(false)
  const [inviteId, setInviteId] = useState('')
  const [formData, setFormData] = useState({
    eventTitle: '',
    eventType: 'casamento',
    eventDate: '',
    eventTime: '',
    eventLocation: '',
    eventDescription: '',
    name1: '',
    name2: '',
    email: '',
    phone: '',
    photos: [] as string[],
    message: '',
    musicUrl: '',
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }))
  }

  const canContinue = () => {
    switch (currentStep) {
      case 1:
        return formData.eventTitle && formData.eventDate && formData.eventTime && formData.eventLocation
      case 2:
        return formData.name1 && formData.email && formData.phone
      case 3:
        return formData.photos.length > 0
      case 4:
        return true
      default:
        return false
    }
  }

  const publishInvite = async () => {
    const id = Math.random().toString(36).substring(7)
    const inviteData = {
      id,
      theme,
      plan,
      ...formData,
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem(`invite_${id}`, JSON.stringify(inviteData))
    setInviteId(id)
    setPublished(true)
  }

  const downloadAsJson = () => {
    const inviteData = {
      id: inviteId,
      theme,
      plan,
      ...formData,
      createdAt: new Date().toISOString(),
    }
    const json = JSON.stringify(inviteData, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `convite_${inviteId}.json`
    a.click()
  }

  const themeGradient = themeColors[theme] || 'from-purple-400 to-pink-600'

  if (published) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <div className="bg-white rounded-2xl shadow-2xl p-12">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Convite Publicado!</h2>
              <p className="text-gray-600 mb-8">Seu convite está pronto para compartilhar</p>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={downloadAsJson}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                >
                  <Download className="w-5 h-5" />
                  Baixar JSON
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Criar Convite</h2>
            <p className="text-gray-600">Passo {currentStep} de {steps.length}</p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                    <input
                      type="text"
                      value={formData.eventTitle}
                      onChange={(e) => handleInputChange('eventTitle', e.target.value)}
                      placeholder="Ex: Casamento de João e Maria"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
                    <input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => handleInputChange('eventDate', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hora</label>
                    <input
                      type="time"
                      value={formData.eventTime}
                      onChange={(e) => handleInputChange('eventTime', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Local</label>
                    <input
                      type="text"
                      value={formData.eventLocation}
                      onChange={(e) => handleInputChange('eventLocation', e.target.value)}
                      placeholder="Local do evento"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome 1</label>
                    <input
                      type="text"
                      value={formData.name1}
                      onChange={(e) => handleInputChange('name1', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <PhotoUpload
                    onPhotoAdd={(photo) => {
                      setFormData(prev => ({
                        ...prev,
                        photos: [...prev.photos, photo.url],
                      }))
                    }}
                    maxPhotos={maxPhotos}
                    currentCount={formData.photos.length}
                  />

                  {formData.photos.length > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                      {formData.photos.map((photo, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="relative group"
                        >
                          <img src={photo} alt={`Foto ${index + 1}`} className="w-full h-40 object-cover rounded-lg" />
                          <button
                            onClick={() => removePhoto(index)}
                            className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            type="button"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mensagem</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Uma mensagem especial..."
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 h-32 resize-none"
                    />
                  </div>

                  {plan === 'premium' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Música</label>
                      <input
                        type="url"
                        value={formData.musicUrl}
                        onChange={(e) => handleInputChange('musicUrl', e.target.value)}
                        placeholder="https://..."
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                      />
                    </div>
                  )}
                </div>
              )}
            </motion.div>

            <div className="flex justify-between gap-4 mt-8">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
                Anterior
              </button>

              {currentStep === 4 ? (
                <StripeCheckoutButton
                  plan={plan}
                  inviteId={inviteId || Math.random().toString(36).substring(7)}
                  formData={formData}
                  themeGradient={themeGradient}
                  disabled={!canContinue()}
                />
              ) : (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!canContinue()}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white ${
                    canContinue()
                      ? `bg-gradient-to-r ${themeGradient} hover:from-purple-700 hover:to-pink-700`
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Próximo
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`sticky top-8 bg-gradient-to-br ${themeGradient} rounded-2xl shadow-lg p-8 text-white`}
            >
              <h3 className="text-2xl font-bold mb-6">Preview</h3>

              <div className="space-y-4 text-sm">
                {formData.eventTitle && (
                  <div>
                    <p className="opacity-75">Evento</p>
                    <p className="font-bold text-lg">{formData.eventTitle}</p>
                  </div>
                )}

                {formData.eventDate && (
                  <div>
                    <p className="opacity-75">Data</p>
                    <p className="font-bold">{formData.eventDate} às {formData.eventTime}</p>
                  </div>
                )}

                {formData.photos.length > 0 && (
                  <div>
                    <p className="opacity-75">Fotos</p>
                    <p className="font-bold">{formData.photos.length} imagens</p>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-8 border-t border-white/30">
                <p className="text-xs opacity-75 text-center">Plano: {plan === 'premium' ? '✨ Premium' : 'Basic'}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
