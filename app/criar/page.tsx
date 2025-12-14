'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Heart, MapPin, Users, Image, Music, MessageSquare, Check, ChevronRight, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { createInvitationSchema, type CreateInvitationInput } from '@/lib/validations';

const eventTypes = [
    { value: 'WEDDING', label: 'Casamento', icon: '💒' },
    { value: 'BIRTHDAY', label: 'Aniversário', icon: '🎂' },
    { value: 'BABY_SHOWER', label: 'Chá de Bebê', icon: '👶' },
    { value: 'GRADUATION', label: 'Formatura', icon: '🎓' },
    { value: 'OTHER', label: 'Outro', icon: '🎉' },
];

function CreateInvitationForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const planFromUrl = searchParams.get('plan') || 'BASIC';

    const [step, setStep] = useState(1);
    const [planType, setPlanType] = useState<'BASIC' | 'PREMIUM'>(
        planFromUrl === 'PREMIUM' ? 'PREMIUM' : 'BASIC'
    );

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
        setValue,
        trigger: triggerValidation,
    } = useForm<CreateInvitationInput>({
        resolver: zodResolver(createInvitationSchema),
        defaultValues: {
            planType,
        },
    });

    const formData = watch();

    const totalSteps = planType === 'PREMIUM' ? 4 : 3;

    // Ensure step doesn't exceed totalSteps when switching plans
    useEffect(() => {
        if (step > totalSteps) {
            setStep(totalSteps);
        }
    }, [totalSteps, step]);

    // Determine if should show payment button
    const shouldShowPayment = (planType === 'BASIC' && step === 3) || (planType === 'PREMIUM' && step === 4);

    // Navigate to next step
    const handleNextStep = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        }
    };

    const onSubmit = async (data: CreateInvitationInput) => {
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.url) {
                window.location.href = result.url;
            } else {
                alert(result.error || 'Erro ao criar convite. Tente novamente.');
            }
        } catch (error) {
            console.error('Error creating invitation:', error);
            alert('Erro ao criar convite. Tente novamente.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8 sm:mb-12"
                >
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full mb-4 sm:mb-6">
                        <Heart className="w-4 h-4 text-pink-500" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700">
                            Crie seu convite personalizado
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-2">
                        Crie Seu Convite Digital
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2">
                        Em {totalSteps} passos simples, você terá um convite elegante e personalizado pronto para encantar seus convidados
                    </p>
                </motion.div>

                {/* Progress Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-10 sm:mb-12"
                >
                    <div className="flex items-center justify-between mb-4">
                        {Array.from({ length: totalSteps }).map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center flex-1"
                            >
                                <div className={`relative w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                                    i + 1 < step
                                        ? 'bg-green-500 text-white'
                                        : i + 1 === step
                                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg scale-110'
                                        : 'bg-gray-200 text-gray-600'
                                }`}>
                                    {i + 1 < step ? (
                                        <Check className="w-5 h-5" />
                                    ) : (
                                        i + 1
                                    )}
                                </div>
                                {i < totalSteps - 1 && (
                                    <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                                        i + 1 < step ? 'bg-green-500' : 'bg-gray-300'
                                    }`} />
                                )}
                            </motion.div>
                        ))}
                    </div>
                    <div className="text-center">
                        <p className="text-xs sm:text-sm font-medium text-gray-600">
                            Passo <span className="font-bold text-pink-500">{step}</span> de <span className="font-bold">{totalSteps}</span>
                        </p>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Form */}
                    <motion.div
                        layout
                        className="lg:col-span-2"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100"
                        >
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <AnimatePresence mode="wait">
                                    {/* Step 1: Tipo de Evento e Plano */}
                                    {step === 1 && (
                                        <motion.div
                                            key="step-1"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6"
                                        >
                                            <motion.div>
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="flex items-center gap-3 mb-4"
                                                >
                                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                                                        Tipo de Evento
                                                    </h2>
                                                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                                                </motion.div>
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.1 }}
                                                    className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3"
                                                >
                                                    {eventTypes.map((type, idx) => (
                                                        <motion.button
                                                            key={type.value}
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ delay: idx * 0.05 }}
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            type="button"
                                                            onClick={() => {
                                                                setValue('eventType', type.value as 'WEDDING' | 'BIRTHDAY' | 'BABY_SHOWER' | 'GRADUATION' | 'OTHER');
                                                                triggerValidation('eventType');
                                                            }}
                                                            className={`relative flex flex-col items-center justify-center gap-2 p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.eventType === type.value
                                                                ? 'border-pink-500 bg-pink-50 shadow-md'
                                                                : 'border-gray-200 hover:border-pink-300'
                                                            }`}
                                                        >
                                                            <div className="text-4xl sm:text-5xl">{type.icon}</div>
                                                            <span className="text-xs sm:text-sm font-medium text-gray-900 text-center line-clamp-2">
                                                                {type.label}
                                                            </span>
                                                        </motion.button>
                                                    ))}
                                                </motion.div>
                                                {errors.eventType && (
                                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-sm text-red-600">
                                                        {errors.eventType.message}
                                                    </motion.p>
                                                )}
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.15 }}
                                            >
                                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                                                    Escolha seu Plano
                                                </h3>
                                                <div className="grid sm:grid-cols-2 gap-4">
                                                    <motion.button
                                                        whileHover={{ scale: 1.02, y: -5 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        type="button"
                                                        onClick={() => {
                                                            setPlanType('BASIC');
                                                            setValue('planType', 'BASIC');
                                                            triggerValidation('planType');
                                                        }}
                                                        className={`p-4 sm:p-6 rounded-lg border-2 transition-all text-left ${
                                                            planType === 'BASIC'
                                                                ? 'border-pink-500 bg-gradient-to-br from-pink-50 to-purple-50 shadow-lg'
                                                                : 'border-gray-200 hover:border-pink-200'
                                                        }`}
                                                    >
                                                        <div className="font-bold text-gray-900 text-sm sm:text-base">
                                                            Básico
                                                        </div>
                                                        <div className="text-2xl sm:text-3xl font-display font-bold text-pink-500 mt-2">
                                                            R$ 29,90
                                                        </div>
                                                        <div className="text-xs sm:text-sm text-gray-600 mt-2">
                                                            Convite simples e elegante
                                                        </div>
                                                    </motion.button>

                                                    <motion.button
                                                        whileHover={{ scale: 1.02, y: -5 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        type="button"
                                                        onClick={() => {
                                                            setPlanType('PREMIUM');
                                                            setValue('planType', 'PREMIUM');
                                                            triggerValidation('planType');
                                                        }}
                                                        className={`p-4 sm:p-6 rounded-lg border-2 transition-all text-left relative ${
                                                            planType === 'PREMIUM'
                                                                ? 'border-pink-500 bg-gradient-to-br from-pink-50 to-purple-50 shadow-lg'
                                                                : 'border-gray-200 hover:border-pink-200'
                                                        }`}
                                                    >
                                                        <motion.span
                                                            initial={{ opacity: 0, y: -10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="inline-block bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2"
                                                        >
                                                            Mais Escolhido ⭐
                                                        </motion.span>
                                                        <div className="font-bold text-gray-900 text-sm sm:text-base">
                                                            Premium
                                                        </div>
                                                        <div className="text-2xl sm:text-3xl font-display font-bold text-pink-500 mt-2">
                                                            R$ 49,90
                                                        </div>
                                                        <div className="text-xs sm:text-sm text-gray-600 mt-2">
                                                            + Música, mensagem e fotos
                                                        </div>
                                                    </motion.button>
                                                </div>
                                                {errors.planType && (
                                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-sm text-red-600">
                                                        {errors.planType.message}
                                                    </motion.p>
                                                )}
                                            </motion.div>

                                            {/* Título do Evento */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.25 }}
                                            >
                                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                                    Título do Evento
                                                </label>
                                                <Input
                                                    {...register('title')}
                                                    placeholder="Ex: Casamento de Maria e João"
                                                    error={errors.title?.message}
                                                    className="text-sm"
                                                />
                                            </motion.div>

                                            {/* Nomes */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                                className="grid grid-cols-2 gap-2 sm:gap-4"
                                            >
                                                <div>
                                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                                        Nome 1
                                                    </label>
                                                    <Input
                                                        {...register('hostName1')}
                                                        placeholder="Maria"
                                                        error={errors.hostName1?.message}
                                                        className="text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                                        Nome 2 (opcional)
                                                    </label>
                                                    <Input {...register('hostName2')} placeholder="João" className="text-sm" />
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    )}

                                    {/* Step 2: Detalhes do Evento */}
                                    {step === 2 && (
                                        <motion.div
                                            key="step-2"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-5"
                                        >
                                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                                                Detalhes do Evento
                                            </h2>

                                            {/* Data */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                                    <Calendar className="inline w-4 h-4 mr-1" />
                                                    Data do Evento
                                                </label>
                                                <Input
                                                    type="date"
                                                    {...register('eventDate')}
                                                    error={errors.eventDate?.message}
                                                    className="text-sm"
                                                />
                                            </motion.div>

                                            {/* Horário */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 }}
                                            >
                                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                                    Horário (opcional)
                                                </label>
                                                <Input type="time" {...register('eventTime')} className="text-sm" />
                                            </motion.div>

                                            {/* Local */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                                    <MapPin className="inline w-4 h-4 mr-1" />
                                                    Local (opcional)
                                                </label>
                                                <Input
                                                    {...register('location')}
                                                    placeholder="Endereço do evento"
                                                    className="text-sm"
                                                />
                                            </motion.div>

                                            {/* Descrição */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                                    Descrição (opcional)
                                                </label>
                                                <Textarea
                                                    {...register('description')}
                                                    placeholder="Conte mais sobre o evento..."
                                                    rows={4}
                                                    className="text-sm"
                                                />
                                            </motion.div>
                                        </motion.div>
                                    )}

                                            {/* Step 3: Contato */}
                                            {step === 3 && (
                                                <motion.div
                                                    key="step-3"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="space-y-5"
                                                >
                                                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                                                        Informações de Contato
                                                    </h2>

                                                    {/* Email */}
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                    >
                                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                                            Seu E-mail
                                                        </label>
                                                        <Input
                                                            type="email"
                                                            {...register('email')}
                                                            placeholder="seu@email.com"
                                                            error={errors.email?.message}
                                                            className="text-sm"
                                                        />
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            Enviaremos seu convite e QR Code para este e-mail
                                                        </p>
                                                    </motion.div>

                                                    {/* Telefone */}
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.1 }}
                                                    >
                                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                                            Telefone (opcional)
                                                        </label>
                                                        <Input
                                                            type="tel"
                                                            {...register('phone')}
                                                            placeholder="(11) 99999-9999"
                                                            className="text-sm"
                                                        />
                                                    </motion.div>
                                                </motion.div>
                                            )}

                                            {/* Step 4: Premium Features */}
                                            {step === 4 && planType === 'PREMIUM' && (
                                                <motion.div
                                                    key="step-4"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="space-y-5"
                                                >
                                                    <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg border border-pink-200 mb-6">
                                                        <p className="text-sm text-gray-700">
                                                            ✨ Esses recursos premium vão deixar seu convite ainda mais especial!
                                                        </p>
                                                    </div>

                                                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                                                        Recursos Premium
                                                    </h2>

                                                    {/* Música */}
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                    >
                                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                                            <Music className="inline w-4 h-4 mr-1" />
                                                            URL da Música de Fundo (opcional)
                                                        </label>
                                                        <Input {...register('musicUrl')} placeholder="https://..." className="text-sm" />
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            Cole o link de uma música do YouTube ou Spotify
                                                        </p>
                                                    </motion.div>

                                                    {/* Mensagem Personalizada */}
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.1 }}
                                                    >
                                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                                            <MessageSquare className="inline w-4 h-4 mr-1" />
                                                            Mensagem Personalizada (opcional)
                                                        </label>
                                                        <Textarea
                                                            {...register('customMessage')}
                                                            placeholder="Uma mensagem especial para seus convidados..."
                                                            rows={4}
                                                            className="text-sm"
                                                        />
                                                    </motion.div>

                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.2 }}
                                                        className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4"
                                                    >
                                                        <p className="text-xs sm:text-sm text-blue-800">
                                                            <Image className="inline w-4 h-4 mr-1" aria-label="info" />
                                                            Você poderá adicionar fotos após criar o convite
                                                        </p>
                                                    </motion.div>
                                                </motion.div>
                                            )}
                                </AnimatePresence>

                                {/* Navigation Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex flex-col-reverse sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-200"
                                >
                                    {step > 1 && (
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="button"
                                            onClick={() => setStep(step - 1)}
                                            className="flex-1 px-6 py-3 text-sm sm:text-base font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <ChevronRight className="w-4 h-4 transform rotate-180" />
                                            Voltar
                                        </motion.button>
                                    )}
                                    {step < totalSteps ? (
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="button"
                                            onClick={handleNextStep}
                                            className="flex-1 px-6 py-3 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                        >
                                            Próximo
                                            <ChevronRight className="w-4 h-4" />
                                        </motion.button>
                                    ) : null}
                                    {shouldShowPayment && (
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={isSubmitting}
                                            onClick={() => handleSubmit(onSubmit)()}
                                            className="flex-1 px-6 py-3 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity }}
                                                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                                    />
                                                    Processando...
                                                </>
                                            ) : (
                                                <>
                                                    Pagar e Criar
                                                    <ChevronRight className="w-4 h-4" />
                                                </>
                                            )}
                                        </motion.button>
                                    )}
                                </motion.div>
                            </form>
                        </motion.div>
                    </motion.div>

                    {/* Preview */}
                    {/* Preview */}
                    <motion.div
                        layout
                        className="hidden lg:block"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 sticky top-8 h-fit border border-gray-100"
                        >
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                                ✨ Pré-visualização
                            </h3>
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                                className="aspect-[9/16] rounded-xl overflow-hidden shadow-2xl"
                            >
                                {/* Event Type Based Gradient Background */}
                                <div className={`w-full h-full flex flex-col items-center justify-center p-6 sm:p-8 relative overflow-hidden ${
                                    formData.eventType === 'WEDDING' 
                                        ? 'bg-gradient-to-br from-pink-100 via-rose-100 to-red-100'
                                        : formData.eventType === 'BIRTHDAY'
                                        ? 'bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100'
                                        : formData.eventType === 'BABY_SHOWER'
                                        ? 'bg-gradient-to-br from-blue-100 via-cyan-100 to-green-100'
                                        : formData.eventType === 'GRADUATION'
                                        ? 'bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100'
                                        : 'bg-gradient-to-br from-pink-100 to-purple-100'
                                }`}>
                                    {/* Decorative Background Pattern */}
                                    <div className="absolute inset-0 opacity-10">
                                        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white blur-2xl" />
                                        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-white blur-3xl" />
                                    </div>

                                    <div className="relative z-10 text-center w-full h-full flex flex-col items-center justify-center">
                                        {/* Emoji Icon - Event Type Indicator */}
                                        <motion.div
                                            animate={{ 
                                                y: [0, -8, 0],
                                                scale: [1, 1.1, 1]
                                            }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                            className="text-6xl sm:text-7xl mb-4 sm:mb-6"
                                        >
                                            {formData.eventType === 'WEDDING' && '💒'}
                                            {formData.eventType === 'BIRTHDAY' && '🎂'}
                                            {formData.eventType === 'BABY_SHOWER' && '👶'}
                                            {formData.eventType === 'GRADUATION' && '🎓'}
                                            {formData.eventType === 'OTHER' && '🎉'}
                                        </motion.div>

                                        {formData.title ? (
                                            <>
                                                {/* Title */}
                                                <motion.h4
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.4 }}
                                                    className="text-xl sm:text-3xl font-display font-bold text-gray-900 mb-1 line-clamp-3"
                                                >
                                                    {formData.title}
                                                </motion.h4>

                                                {/* Host Names with Heart Divider */}
                                                {formData.hostName1 && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.45 }}
                                                        className="flex items-center justify-center gap-2 mb-4 sm:mb-6"
                                                    >
                                                        <p className="text-base sm:text-lg font-semibold text-gray-700">
                                                            {formData.hostName1}
                                                        </p>
                                                        {formData.hostName2 && (
                                                            <>
                                                                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500 fill-pink-500" />
                                                                <p className="text-base sm:text-lg font-semibold text-gray-700">
                                                                    {formData.hostName2}
                                                                </p>
                                                            </>
                                                        )}
                                                    </motion.div>
                                                )}

                                                {/* Separator Line */}
                                                <motion.div
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    transition={{ delay: 0.5 }}
                                                    className="w-16 sm:w-20 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mb-3 sm:mb-4"
                                                />

                                                {/* Date and Location Info */}
                                                {(formData.eventDate || formData.location) && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.55 }}
                                                        className="space-y-2"
                                                    >
                                                        {formData.eventDate && (
                                                            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600">
                                                                <Calendar className="w-4 h-4" />
                                                                <span>{new Date(formData.eventDate).toLocaleDateString('pt-BR', { 
                                                                    day: '2-digit',
                                                                    month: 'long',
                                                                    year: 'numeric'
                                                                })}</span>
                                                            </div>
                                                        )}
                                                        {formData.eventTime && (
                                                            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600">
                                                                <span>⏰</span>
                                                                <span>{formData.eventTime}</span>
                                                            </div>
                                                        )}
                                                        {formData.location && (
                                                            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600">
                                                                <MapPin className="w-4 h-4" />
                                                                <span className="line-clamp-2">{formData.location}</span>
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                )}

                                                {/* Plan Badge */}
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.6 }}
                                                    className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/30"
                                                >
                                                    <span className={`inline-block px-4 py-2 rounded-full text-xs sm:text-sm font-semibold ${
                                                        formData.planType === 'PREMIUM'
                                                            ? 'bg-pink-500 text-white'
                                                            : 'bg-white/40 text-gray-800'
                                                    }`}>
                                                        {formData.planType === 'PREMIUM' ? '⭐ Premium' : 'Convite Básico'}
                                                    </span>
                                                </motion.div>
                                            </>
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-center"
                                            >
                                                <p className="text-sm sm:text-base text-gray-500 font-medium">
                                                    Preencha os dados ao lado...
                                                </p>
                                                <p className="text-xs sm:text-sm text-gray-400 mt-2">
                                                    para ver como ficará seu convite
                                                </p>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Preview Info Footer */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-4 p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-100"
                            >
                                <p className="text-xs sm:text-sm text-gray-600">
                                    <span className="font-semibold">💡 Dica:</span> Seus convidados receberão um convite personalizado com QR Code para RSVP
                                </p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default function CreateInvitationPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Carregando...</p></div>}>
            <CreateInvitationForm />
        </Suspense>
    );
}
