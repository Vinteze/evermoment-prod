import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { generateQRCode, getInvitationUrl } from '@/lib/qrcode';
import nodemailer from 'nodemailer';

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const preferredRegion = "auto";

export async function POST(req: NextRequest) {
  // Initialize Stripe and transporter inside the function
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16' as any,
  });

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const invitationId = session.metadata?.invitationId;

      if (!invitationId) {
        throw new Error('Missing invitation ID in session metadata');
      }

      // Get invitation from database
      const invitation = await prisma.invitation.findUnique({
        where: { id: invitationId },
      });

      if (!invitation) {
        throw new Error('Invitation not found');
      }

      // Generate QR code
      const invitationUrl = getInvitationUrl(invitationId);
      const qrCodeDataUrl = await generateQRCode(invitationUrl);

      // Update invitation status and add QR code
      await prisma.invitation.update({
        where: { id: invitationId },
        data: {
          status: 'PAID',
          qrCodeUrl: qrCodeDataUrl,
        },
      });

      // Create payment record
      await prisma.payment.create({
        data: {
          invitationId,
          stripeSessionId: session.id,
          stripePaymentIntent: session.payment_intent as string,
          amount: session.amount_total || 0,
          currency: session.currency || 'brl',
          status: 'succeeded',
          customerEmail: session.customer_email || invitation.email,
          customerName: session.customer_details?.name,
        },
      });

      // Send email with invitation link and QR code
      await sendInvitationEmail(transporter, {
        email: invitation.email,
        invitationUrl,
        qrCodeDataUrl,
        title: invitation.title,
        hostName: invitation.hostName1,
      });

      console.log(`✅ Invitation ${invitationId} activated and email sent`);
    } catch (error) {
      console.error('Error processing webhook:', error);
      // Don't return error to Stripe, log it instead
    }
  }

  return NextResponse.json({ received: true });
}

async function sendInvitationEmail(
  transporter: nodemailer.Transporter,
  {
    email,
    invitationUrl,
    qrCodeDataUrl,
    title,
    hostName,
  }: {
    email: string;
    invitationUrl: string;
    qrCodeDataUrl: string;
    title: string;
    hostName: string;
  }
) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'EverMoment <contato@evermoment.com.br>',
      to: email,
      subject: `✨ Seu convite "${title}" está pronto!`,
      text: `Olá ${hostName}!\n\nSeu convite "${title}" foi criado com sucesso!\n\nAcesse seu convite em: ${invitationUrl}\n\nQR Code: ${qrCodeDataUrl}\n\nFeito com ❤️ por EverMoment`,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'This endpoint only accepts POST requests' },
    { status: 405 }
  );
}

export async function HEAD() {
  return new NextResponse(null, { status: 405 });
}
