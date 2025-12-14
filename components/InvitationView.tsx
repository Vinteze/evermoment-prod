'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Heart, Users, Clock, Sparkles, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getTimeUntil, formatDate } from '@/lib/utils';
import type { Invitation, RSVP } from '@prisma/client';

interface InvitationViewProps {
    invitation: Invitation & {
        rsvps: RSVP[];
    };
}

export default function InvitationView({ invitation }: InvitationViewProps) {
    const [timeLeft, setTimeLeft] = useState(getTimeUntil(invitation.eventDate));
    const [showRSVP, setShowRSVP] = useState(false);
    const [rsvpData, setRsvpData] = useState({
        guestName: '',
        guestEmail: '',
        attending: true,
        guestsCount: 1,
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeUntil(invitation.eventDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [invitation.eventDate]);

    const handleRSVP = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/rsvp/${invitation.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(rsvpData),
            });

            if (response.ok) {
                setSubmitted(true);
                setShowRSVP(false);
            }
        } catch (error) {
            console.error('Error submitting RSVP:', error);
            alert('Erro ao confirmar presença. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getTemplateConfig = () => {
        switch (invitation.eventType) {
            case 'WEDDING':
                return {
                    gradient: 'from-rose-50 via-pink-50 to-red-50',
                    accentGradient: 'from-rose-400 via-pink-500 to-red-500',
                    textAccent: 'text-rose-600',
                    bgPattern: 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100 via-pink-50 to-transparent',
                    icon: '💍',
                    decorativeElements: (
                        <>
                            <motion.div
                                className="absolute top-10 left-10 text-6xl opacity-20"
                                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                                🌹
                            </motion.div>
                            <motion.div
                                className="absolute bottom-20 right-10 text-5xl opacity-20"
                                animate={{ rotate: -360, scale: [1, 1.1, 1] }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            >
                                💐
                            </motion.div>
                        </>
                    ),
                };
            case 'BIRTHDAY':
                return {
                    gradient: 'from-purple-50 via-fuchsia-50 to-pink-50',
                    accentGradient: 'from-purple-500 via-fuchsia-500 to-pink-500',
                    textAccent: 'text-purple-600',
                    bgPattern: 'bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-100 via-fuchsia-50 to-transparent',
                    icon: '🎂',
                    decorativeElements: (
                        <>
                            <motion.div
                                className="absolute top-20 right-20 text-5xl"
                                animate={{ y: [-10, 10, -10] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                🎈
                            </motion.div>
                            <motion.div
                                className="absolute bottom-32 left-16 text-4xl"
                                animate={{ y: [10, -10, 10] }}
                                transition={{ duration: 2.5, repeat: Infinity }}
                            >
                                🎉
                            </motion.div>
                            <motion.div
                                className="absolute top-40 left-32 text-3xl"
                                animate={{ rotate: [0, 15, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            >
                                🎊
                            </motion.div>
                        </>
                    ),
                };
            case 'BABY_SHOWER':
                return {
                    gradient: 'from-blue-50 via-cyan-50 to-teal-50',
                    accentGradient: 'from-blue-400 via-cyan-400 to-teal-400',
                    textAccent: 'text-blue-600',
                    bgPattern: 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100 via-cyan-50 to-transparent',
                    icon: '👶',
                    decorativeElements: (
                        <>
                            <motion.div
                                className="absolute top-16 right-24 text-4xl opacity-30"
                                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            >
                                🍼
                            </motion.div>
                            <motion.div
                                className="absolute bottom-24 left-20 text-5xl opacity-30"
                                animate={{ y: [-5, 5, -5] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                🧸
                            </motion.div>
                        </>
                    ),
                };
            case 'GRADUATION':
                return {
                    gradient: 'from-indigo-50 via-blue-50 to-cyan-50',
                    accentGradient: 'from-indigo-500 via-blue-500 to-cyan-500',
                    textAccent: 'text-indigo-600',
                    bgPattern: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-blue-50 to-transparent',
                    icon: '🎓',
                    decorativeElements: (
                        <>
                            <motion.div
                                className="absolute top-12 left-16 text-5xl opacity-25"
                                animate={{ y: [-20, 0, -20] }}
                                transition={{ duration: 5, repeat: Infinity }}
                            >
                                📚
                            </motion.div>
                            <motion.div
                                className="absolute bottom-16 right-16 text-4xl opacity-25"
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            >
                                🌟
                            </motion.div>
                        </>
                    ),
                };
            default:
                return {
                    gradient: 'from-pink-50 via-purple-50 to-blue-50',
                    accentGradient: 'from-pink-500 via-purple-500 to-blue-500',
                    textAccent: 'text-pink-600',
                    bgPattern: 'bg-gradient-to-br from-pink-100/50 to-purple-100/50',
                    icon: '✨',
                    decorativeElements: null,
                };
        }
    };

    const config = getTemplateConfig();

    return (
        <div className={`min-h-screen bg-gradient-to-br ${config.gradient} relative overflow-hidden`}>
            {/* Background Pattern */}
            <div className={`absolute inset-0 ${config.bgPattern} opacity-60`} />

            {/* Decorative Elements */}
            {config.decorativeElements}

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white/30 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 py-12 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto"
                >
                    {/* Main Card */}
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
                        {/* Elegant Header */}
                        <div className="relative p-8 sm:p-12 lg:p-16 text-center overflow-hidden">
                            {/* Header Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${config.accentGradient} opacity-5`} />

                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                                className="relative"
                            >
                                <div className="text-6xl sm:text-7xl lg:text-8xl mb-4 sm:mb-6 inline-block">
                                    {config.icon}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <h1 className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold bg-gradient-to-r ${config.accentGradient} bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight px-2`}>
                                    {invitation.title}
                                </h1>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-gray-700 mb-6 font-serif px-2">
                                    <motion.span
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.7 }}
                                    >
                                        {invitation.hostName1}
                                    </motion.span>
                                    {invitation.hostName2 && (
                                        <>
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                <Heart className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ${config.textAccent} fill-current`} />
                                            </motion.div>
                                            <motion.span
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.7 }}
                                            >
                                                {invitation.hostName2}
                                            </motion.span>
                                        </>
                                    )}
                                </div>

                                {invitation.customMessage && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.9 }}
                                        className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto italic font-serif leading-relaxed px-4"
                                    >
                                        &ldquo;{invitation.customMessage}&rdquo;
                                    </motion.p>
                                )}
                            </motion.div>

                            {/* Decorative Line */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 1, duration: 0.8 }}
                                className={`h-1 w-24 sm:w-32 mx-auto mt-6 sm:mt-8 rounded-full bg-gradient-to-r ${config.accentGradient}`}
                            />
                        </div>

                        {/* Elegant Countdown */}
                        <div className={`bg-gradient-to-r ${config.accentGradient} py-8 sm:py-10 lg:py-12 px-4`}>
                            <div className="max-w-4xl mx-auto">
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center text-white/90 text-xs sm:text-sm font-medium mb-6 uppercase tracking-widest"
                                >
                                    Contagem Regressiva
                                </motion.p>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 lg:gap-6">
                                    {[
                                        { label: 'Dias', value: timeLeft.days },
                                        { label: 'Horas', value: timeLeft.hours },
                                        { label: 'Min', value: timeLeft.minutes },
                                        { label: 'Seg', value: timeLeft.seconds },
                                    ].map((item, index) => (
                                        <motion.div
                                            key={item.label}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 1.2 + index * 0.1 }}
                                            className="text-center"
                                        >
                                            <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-white/30">
                                                <div className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-1 sm:mb-2 font-mono">
                                                    {item.value.toString().padStart(2, '0')}
                                                </div>
                                                <div className="text-xs text-white/80 uppercase tracking-wider font-medium">
                                                    {item.label}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Event Details */}
                        <div className="p-6 sm:p-8 lg:p-12 space-y-6 sm:space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.5 }}
                                className="grid sm:grid-cols-2 gap-4 sm:gap-6"
                            >
                                <div className="flex flex-col items-start gap-3 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-shadow">
                                    <div className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${config.accentGradient}`}>
                                        <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 mb-1 text-base sm:text-lg">Data e Horário</h3>
                                        <p className="text-sm sm:text-base text-gray-700 font-medium">
                                            {formatDate(invitation.eventDate)}
                                        </p>
                                        {invitation.eventTime && (
                                            <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 mt-2">
                                                <Clock className="w-4 h-4" />
                                                {invitation.eventTime}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {invitation.location && (
                                    <div className="flex flex-col items-start gap-3 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-shadow">
                                        <div className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${config.accentGradient}`}>
                                            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 mb-1 text-base sm:text-lg">Local</h3>
                                            <p className="text-sm sm:text-base text-gray-700">{invitation.location}</p>
                                        </div>
                                    </div>
                                )}
                            </motion.div>

                            {invitation.description && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.7 }}
                                    className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100"
                                >
                                    <div className="flex gap-3 sm:gap-4">
                                        <div className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${config.accentGradient} flex-shrink-0`}>
                                            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">Sobre o Evento</h3>
                                            <p className="text-xs sm:text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                                                {invitation.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {invitation.musicUrl && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.9 }}
                                    className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100"
                                >
                                    <div className="flex gap-3 sm:gap-4">
                                        <div className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${config.accentGradient} flex-shrink-0`}>
                                            <Music className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">Trilha Sonora</h3>
                                            <a
                                                href={invitation.musicUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`text-xs sm:text-sm ${config.textAccent} hover:underline font-medium break-all`}
                                            >
                                                Ouvir música do evento
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* RSVP Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2.1 }}
                                className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 py-4 sm:py-6 border-t border-b border-gray-200"
                            >
                                <Users className={`w-5 h-5 sm:w-6 sm:h-6 ${config.textAccent}`} />
                                <p className="text-gray-700 text-center text-sm sm:text-base">
                                    <span className={`font-bold text-lg sm:text-2xl ${config.textAccent}`}>{invitation.rsvpCount}</span>
                                    {' '}confirmações de presença
                                </p>
                            </motion.div>
                        </div>

                        {/* RSVP Section */}
                        <div className="p-6 sm:p-8 lg:p-12 pt-0">
                            <AnimatePresence mode="wait">
                                {!submitted ? (
                                    !showRSVP ? (
                                        <motion.div
                                            key="button"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                        >
                                            <Button
                                                onClick={() => setShowRSVP(true)}
                                                size="lg"
                                                className={`w-full bg-gradient-to-r ${config.accentGradient} text-white text-base sm:text-lg py-4 sm:py-6 rounded-xl sm:rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300`}
                                            >
                                                <Heart className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                                                Confirmar Presença
                                            </Button>
                                        </motion.div>
                                    ) : (
                                        <motion.form
                                            key="form"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            onSubmit={handleRSVP}
                                            className="space-y-4 sm:space-y-6 bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-gray-200"
                                        >
                                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 text-center">
                                                Confirme sua Presença
                                            </h3>

                                            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                                                <Input
                                                    placeholder="Seu nome"
                                                    value={rsvpData.guestName}
                                                    onChange={(e) =>
                                                        setRsvpData({ ...rsvpData, guestName: e.target.value })
                                                    }
                                                    required
                                                    className="h-10 sm:h-12 text-sm"
                                                />
                                                <Input
                                                    type="email"
                                                    placeholder="Seu e-mail (opcional)"
                                                    value={rsvpData.guestEmail}
                                                    onChange={(e) =>
                                                        setRsvpData({ ...rsvpData, guestEmail: e.target.value })
                                                    }
                                                    className="h-10 sm:h-12 text-sm"
                                                />
                                            </div>

                                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
                                                <label className={`flex items-center justify-center gap-2 sm:gap-3 cursor-pointer px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 transition-all text-sm sm:text-base ${rsvpData.attending
                                                    ? `border-green-500 bg-green-50`
                                                    : 'border-gray-200 hover:border-gray-300'
                                                    }`}>
                                                    <input
                                                        type="radio"
                                                        checked={rsvpData.attending}
                                                        onChange={() => setRsvpData({ ...rsvpData, attending: true })}
                                                        className="w-4 h-4 sm:w-5 sm:h-5 text-green-500"
                                                    />
                                                    <span className="font-medium">Vou comparecer ✓</span>
                                                </label>
                                                <label className={`flex items-center justify-center gap-2 sm:gap-3 cursor-pointer px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 transition-all text-sm sm:text-base ${!rsvpData.attending
                                                    ? 'border-red-500 bg-red-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                    }`}>
                                                    <input
                                                        type="radio"
                                                        checked={!rsvpData.attending}
                                                        onChange={() => setRsvpData({ ...rsvpData, attending: false })}
                                                        className="w-4 h-4 sm:w-5 sm:h-5 text-red-500"
                                                    />
                                                    <span className="font-medium">Não poderei ir ✗</span>
                                                </label>
                                            </div>

                                            {rsvpData.attending && (
                                                <Input
                                                    type="number"
                                                    min="1"
                                                    max="10"
                                                    placeholder="Número de pessoas"
                                                    value={rsvpData.guestsCount}
                                                    onChange={(e) =>
                                                        setRsvpData({
                                                            ...rsvpData,
                                                            guestsCount: parseInt(e.target.value) || 1,
                                                        })
                                                    }
                                                    className="h-10 sm:h-12 text-sm"
                                                />
                                            )}

                                            <Textarea
                                                placeholder="Deixe uma mensagem (opcional)"
                                                value={rsvpData.message}
                                                onChange={(e) =>
                                                    setRsvpData({ ...rsvpData, message: e.target.value })
                                                }
                                                rows={3}
                                                className="resize-none text-sm"
                                            />

                                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => setShowRSVP(false)}
                                                    className="flex-1 h-10 sm:h-12 text-sm"
                                                >
                                                    Cancelar
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className={`flex-1 h-10 sm:h-12 text-sm bg-gradient-to-r ${config.accentGradient} text-white`}
                                                >
                                                    {isSubmitting ? 'Enviando...' : 'Confirmar'}
                                                </Button>
                                            </div>
                                        </motion.form>
                                    )
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className={`bg-gradient-to-br ${config.accentGradient} text-white rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center shadow-2xl`}
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2, type: 'spring' }}
                                        >
                                            <Heart className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 fill-current" />
                                        </motion.div>
                                        <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                                            Presença Confirmada!
                                        </h3>
                                        <p className="text-sm sm:text-base text-white/90">
                                            Obrigado por confirmar. Estamos ansiosos para te ver!
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Footer */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5 }}
                        className="text-center text-gray-600 mt-6 sm:mt-8 text-xs sm:text-sm"
                    >
                        Feito com ❤️ por{' '}
                        <a href="/" className="font-semibold hover:underline">
                            EverMoment
                        </a>
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
}
