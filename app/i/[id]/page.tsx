import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import InvitationView from '@/components/InvitationView';
import type { Metadata } from 'next';

interface PageProps {
    params: {
        id: string;
    };
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const invitation = await prisma.invitation.findUnique({
        where: { id: params.id },
    });

    if (!invitation) {
        return {
            title: 'Convite não encontrado',
        };
    }

    return {
        title: `${invitation.title} - EverMoment`,
        description: invitation.description || `Convite para ${invitation.title}`,
        openGraph: {
            title: invitation.title,
            description: invitation.description || `Você está convidado para ${invitation.title}`,
            type: 'website',
            locale: 'pt_BR',
        },
        twitter: {
            card: 'summary_large_image',
            title: invitation.title,
            description: invitation.description || `Você está convidado para ${invitation.title}`,
        },
    };
}

export default async function InvitationPage({ params }: PageProps) {
    const invitation = await prisma.invitation.findUnique({
        where: { id: params.id },
        include: {
            rsvps: true,
        },
    });

    if (!invitation || invitation.status !== 'PAID') {
        notFound();
    }

    // Check if expired
    if (invitation.expiresAt && new Date() > invitation.expiresAt) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Convite Expirado
                    </h1>
                    <p className="text-gray-600">
                        Este convite não está mais disponível.
                    </p>
                </div>
            </div>
        );
    }

    // Increment view count
    await prisma.invitation.update({
        where: { id: params.id },
        data: {
            viewCount: {
                increment: 1,
            },
        },
    });

    return <InvitationView invitation={invitation} />;
}
