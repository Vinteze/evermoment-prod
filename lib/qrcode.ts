import QRCode from 'qrcode';
import { nanoid } from 'nanoid';

export async function generateQRCode(url: string): Promise<string> {
    try {
        const qrCodeDataUrl = await QRCode.toDataURL(url, {
            width: 400,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF',
            },
        });
        return qrCodeDataUrl;
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw new Error('Failed to generate QR code');
    }
}

export function generateInvitationId(): string {
    return nanoid(10);
}

export function getInvitationUrl(id: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    return `${baseUrl}/i/${id}`;
}
