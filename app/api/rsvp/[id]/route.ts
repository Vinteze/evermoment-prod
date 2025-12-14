import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { rsvpSchema } from '@/lib/validations';

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const runtime = "nodejs";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {

    try {
        const body = await req.json();
        const validatedData = rsvpSchema.parse(body);

        const updatedInvitation = await prisma.invitation.update({
            where: { id: params.id },
            data: {
                rsvpCount: validatedData.guestsCount,
                customMessage: validatedData.message,
            },
        });

        return NextResponse.json({
            success: true,
            message: 'RSVP submitted successfully',
            data: updatedInvitation,
        });
    } catch (error: any) {
        console.error('RSVP error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error?.message || 'Failed to submit RSVP',
            },
            { status: 400 }
        );
    }
}

export async function GET() {
    return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
    );
}
