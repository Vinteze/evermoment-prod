'use client'

import { useState, useRef } from 'react'
import { Upload, X, Loader } from 'lucide-react'
import Image from 'next/image'

interface PhotoUploadProps {
  onPhotoAdd: (photo: { url: string; filename: string }) => void
  maxPhotos: number
  currentCount: number
}

export default function PhotoUpload({ onPhotoAdd, maxPhotos, currentCount }: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (!files) return

    setUploading(true)
    setError('')

    try {
      for (let i = 0; i < files.length; i++) {
        if (currentCount + i >= maxPhotos) {
          setError(`Máximo de ${maxPhotos} fotos atingido`)
          break
        }

        const file = files[i]
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || 'Erro ao fazer upload')
        }

        const data = await response.json()
        onPhotoAdd({ url: data.url, filename: data.filename })
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer upload')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-2">
          Clique ou arraste fotos aqui
        </p>
        <p className="text-sm text-gray-500">
          {currentCount}/{maxPhotos} fotos | Máx 5MB por arquivo
        </p>
        {uploading && (
          <div className="flex items-center justify-center gap-2 mt-4">
            <Loader className="w-4 h-4 animate-spin" />
            <span className="text-sm text-gray-600">Enviando...</span>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        disabled={uploading || currentCount >= maxPhotos}
        className="hidden"
      />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  )
}
