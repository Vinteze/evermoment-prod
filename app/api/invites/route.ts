import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import nodemailer from 'nodemailer'

// Configurar transporte de email
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      inviteId,
      eventTitle,
      eventType,
      eventDate,
      eventTime,
      eventLocation,
      eventDescription,
      name1,
      name2,
      email,
      phone,
      photos,
      message,
      musicUrl,
      theme,
      plan,
      paymentId,
    } = body

    // Validar dados
    if (!eventTitle || !eventDate || !name1 || !email) {
      return NextResponse.json(
        { error: 'Dados obrigatórios ausentes' },
        { status: 400 }
      )
    }

    // Calcular data de expiração (30 dias após o evento)
    const eventDateObj = new Date(eventDate)
    const expiresAt = new Date(eventDateObj)
    expiresAt.setDate(expiresAt.getDate() + 30)

    // Criar convite no banco
    const invite = await prisma.invitation.create({
      data: {
        id: inviteId,
        title: eventTitle,
        eventType,
        eventDate: eventDateObj,
        eventTime: eventTime,
        location: eventLocation,
        description: eventDescription,
        hostName1: name1,
        hostName2: name2,
        email,
        phone,
        customMessage: message,
        musicUrl,
        planType: plan as any,
        photos: JSON.stringify(photos),
        expiresAt,
      },
    })

    // Enviar email de confirmação
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: `Seu Convite para ${eventTitle} foi criado com sucesso! 🎉`,
        html: `
          <h2>Parabéns, ${name1}!</h2>
          <p>Seu convite para <strong>${eventTitle}</strong> foi criado com sucesso!</p>
          
          <h3>Detalhes do Evento:</h3>
          <ul>
            <li><strong>Data:</strong> ${eventDate}</li>
            <li><strong>Hora:</strong> ${eventTime}</li>
            <li><strong>Local:</strong> ${eventLocation}</li>
          </ul>
          
          <p>
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/i/${inviteId}" style="display: inline-block; padding: 12px 24px; background-color: #a855f7; color: white; text-decoration: none; border-radius: 8px; margin: 20px 0;">
              Ver Meu Convite
            </a>
          </p>
          
          <p>Compartilhe este link com seus convidados para que eles confirmem presença!</p>
          <p><code>${process.env.NEXT_PUBLIC_BASE_URL}/i/${inviteId}</code></p>
          
          <hr style="margin: 30px 0;" />
          <p style="font-size: 12px; color: #666;">
            Este convite será automaticamente removido 30 dias após a data do evento.
          </p>
        `,
      })
    } catch (emailError) {
      console.error('Erro ao enviar email:', emailError)
      // Não falhar a criação se o email não foi enviado
    }

    return NextResponse.json({
      success: true,
      invite: {
        id: invite.id,
        shareUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/i/${invite.id}`,
      },
    })
  } catch (error: any) {
    console.error('Erro ao criar convite:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao criar convite' },
      { status: 500 }
    )
  }
}

// GET - Recuperar convite
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const inviteId = searchParams.get('id')

    if (!inviteId) {
      return NextResponse.json(
        { error: 'ID do convite obrigatório' },
        { status: 400 }
      )
    }

    const invite = await prisma.invitation.findUnique({
      where: { id: inviteId },
      include: { rsvps: true },
    })

    if (!invite) {
      return NextResponse.json(
        { error: 'Convite não encontrado' },
        { status: 404 }
      )
    }

    // Verificar se expirou
    if (invite.expiresAt && new Date() > invite.expiresAt) {
      return NextResponse.json(
        { error: 'Convite expirado' },
        { status: 410 }
      )
    }

    return NextResponse.json({ invite })
  } catch (error: any) {
    console.error('Erro ao buscar convite:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao buscar convite' },
      { status: 500 }
    )
  }
}
