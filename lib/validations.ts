import { z } from 'zod';

export const eventTypeSchema = z.enum([
    'WEDDING',
    'BIRTHDAY',
    'BABY_SHOWER',
    'GRADUATION',
    'OTHER',
]);

export const planTypeSchema = z.enum(['BASIC', 'PREMIUM']);

export const createInvitationSchema = z.object({
    eventType: eventTypeSchema,
    planType: planTypeSchema,
    title: z.string().min(3, 'Título deve ter no mínimo 3 caracteres'),
    eventDate: z.string().or(z.date()),
    eventTime: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    hostName1: z.string().min(2, 'Nome é obrigatório'),
    hostName2: z.string().optional(),
    email: z.string().email('Email inválido'),
    phone: z.string().optional(),
    photos: z.array(z.string()).optional(),
    musicUrl: z.string().url('URL inválida').optional().or(z.literal('')),
    customMessage: z.string().optional(),
});

export const rsvpSchema = z.object({
    guestName: z.string().min(2, 'Nome é obrigatório'),
    guestEmail: z.string().email('Email inválido').optional().or(z.literal('')).nullable(),
    guestPhone: z.string().optional(),
    attending: z.boolean(),
    guestsCount: z.number().min(1).max(10),
    message: z.string().optional(),
});

export type CreateInvitationInput = z.infer<typeof createInvitationSchema>;
export type RSVPInput = z.infer<typeof rsvpSchema>;
export type EventType = z.infer<typeof eventTypeSchema>;
export type PlanType = z.infer<typeof planTypeSchema>;
