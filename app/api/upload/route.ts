import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'Arquivo não fornecido' },
        { status: 400 }
      )
    }

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Apenas imagens são permitidas' },
        { status: 400 }
      )
    }

    // Validar tamanho (máx 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Arquivo muito grande (máximo 5MB)' },
        { status: 400 }
      )
    }

    // Criar nome único para o arquivo
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(7)
    const ext = file.name.split('.').pop()
    const filename = `${timestamp}-${random}.${ext}`

    // Definir caminho
    const uploadsDir = join(process.cwd(), 'public', 'uploads')
    
    // Criar diretório se não existir
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Converter arquivo para buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Salvar arquivo
    const filepath = join(uploadsDir, filename)
    await writeFile(filepath, buffer)

    // Retornar URL pública
    const fileUrl = `/uploads/${filename}`

    return NextResponse.json({
      success: true,
      url: fileUrl,
      filename: filename,
      size: file.size,
    })
  } catch (error: any) {
    console.error('Erro ao fazer upload:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao fazer upload' },
      { status: 500 }
    )
  }
}
