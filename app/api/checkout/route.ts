import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createInvitationSchema } from '@/lib/validations';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: '2023-10-16' as any,
        });

        const body = await req.json();
        const validatedData = createInvitationSchema.parse(body);

        const priceId = validatedData.planType === 'PREMIUM'
            ? process.env.STRIPE_PRICE_PREMIUM!
            : process.env.STRIPE_PRICE_BASIC!;

        if (!priceId) {
            throw new Error('Stripe price ID not configured');
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'payment' as any,
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            customer_email: validatedData.email,
            metadata: {
                eventType: validatedData.eventType,
                planType: validatedData.planType,
                phone: validatedData.phone || '',
            },
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/criar`,
        } as any);

        return NextResponse.json({
            url: session.url,
            sessionId: session.id,
        });
    } catch (error) {
        console.error('Checkout error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
    );
}
