'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Heart,
    Sparkles,
    Zap,
    MapPin,
    Users,
    MessageCircle,
    CheckCircle,
    ArrowRight,
    Music,
    Image as ImageIcon,
    QrCode,
    Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FAQ } from '@/components/FAQ';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

export default function HomePage() {
    const [selectedPlan, setSelectedPlan] = useState<'BASIC' | 'PREMIUM'>('PREMIUM');

    return (
        <main className="min-h-screen bg-white overflow-hidden">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="text-3xl">💌</div>
                            <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                EverMoment
                            </span>
                        </div>
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#features" className="text-gray-600 hover:text-gray-900 transition">
                                Recursos
                            </a>
                            <a href="#plans" className="text-gray-600 hover:text-gray-900 transition">
                                Planos
                            </a>
                            <a href="#faq" className="text-gray-600 hover:text-gray-900 transition">
                                Dúvidas
                            </a>
                        </div>
                        <Link href="/criar">
                            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-lg transition-all">
                                Criar Convite
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-hidden">
                {/* Decorative blobs */}
                <div className="absolute top-20 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
                <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
                <div className="absolute top-40 left-1/2 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto text-center relative z-10"
                >
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="text-6xl sm:text-7xl mb-6 inline-block"
                    >
                        💌
                    </motion.div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6 leading-tight">
                        Convites Digitais que{' '}
                        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                            Surpreendem
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Crie convites digitais personalizados em minutos. Com templates elegantes, contagem regressiva,
                        galeria de fotos e mapa interativo. Tudo pronto para encantar seus convidados.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/criar">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg px-8 hover:shadow-2xl transition-all"
                            >
                                Criar Meu Convite
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <a href="#features">
                            <Button
                                size="lg"
                                variant="outline"
                                className="text-lg px-8 border-2 hover:bg-gray-50 transition-all"
                            >
                                Saiba Mais
                            </Button>
                        </a>
                    </div>

                    <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm sm:text-base">
                        <div className="flex items-center gap-2 text-gray-600">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span>Sem mensalidade</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span>Pronto em minutos</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span>Totalmente personalizável</span>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Problems & Solutions */}
            <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
                            Você Não Precisa Ser Designer Para Ter um Convite Lindo!
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Deixe as preocupações com design de lado. Nós cuidamos disso para você.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 gap-8 mb-12"
                    >
                        {[
                            {
                                problem: '"Não tenho dinheiro para designer"',
                                solution:
                                    'Designer custa R$ 500+ e demora semanas para entregar',
                                answer:
                                    'Por menos de R$ 30 e pronto em minutos. Sem espera, sem complicação!',
                                icon: '💰',
                            },
                            {
                                problem: '"Não sei usar Canva/Photoshop"',
                                solution: 'Canva é confuso, Photoshop é caro e difícil',
                                answer:
                                    '3 cliques e pronto - Sem curso, sem complicação, sem frustração!',
                                icon: '🎨',
                            },
                            {
                                problem: '"Não tenho tempo para criar"',
                                solution: 'Criar do zero leva horas e horas de trabalho',
                                answer:
                                    'Templates prontos, você só personaliza. Pronto em menos de 5 minutos!',
                                icon: '⏱️',
                            },
                            {
                                problem: '"Não sei o que colocar no convite"',
                                solution: 'Fico perdido com tantas opções e não sei por onde começar',
                                answer: 'Te guia passo a passo, sem erro. Só preencher os campos!',
                                icon: '🤔',
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-shadow"
                            >
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {item.problem}
                                </h3>
                                <p className="text-gray-600 mb-4">{item.solution}</p>
                                <div className="pt-4 border-t border-gray-200">
                                    <p className="text-sm font-medium text-purple-600">
                                        ✓ Solução EverMoment:
                                    </p>
                                    <p className="text-gray-700 mt-2">{item.answer}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <Link href="/criar">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg px-8"
                            >
                                Pare de Se Preocupar com Design
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
                            Como Criar seu Convite em 3 Passos Simples
                        </h2>
                        <p className="text-lg text-gray-600">
                            Rápido, fácil e sem complicação
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {[
                            {
                                step: '1',
                                title: 'Escolha seu Template',
                                description:
                                    'Selecione entre templates elegantes e personalizáveis para o seu tipo de evento',
                                icon: '🎯',
                            },
                            {
                                step: '2',
                                title: 'Preencha os Dados',
                                description:
                                    'Adicione fotos, informações e mensagens - Te guiamos a cada passo',
                                icon: '✏️',
                            },
                            {
                                step: '3',
                                title: 'Compartilhe & Surpreenda',
                                description:
                                    'Receba seu link personalizado, QR Code e comece a receber confirmações',
                                icon: '🚀',
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="relative"
                            >
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white text-2xl font-bold mb-4">
                                        {item.step}
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600">{item.description}</p>
                                    {index < 2 && (
                                        <ArrowRight className="hidden md:absolute md:right-0 md:top-6 md:w-12 md:h-12 text-pink-300 transform translate-x-6" />
                                    )}
                                </div>
                                <div className="absolute inset-0 -z-10">
                                    <div className="w-24 h-24 bg-pink-100 rounded-full opacity-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-2xl" />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
                            Recursos Incríveis
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Tudo que você precisa para criar convites memoráveis
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {[
                            {
                                icon: Heart,
                                title: 'Templates Elegantes',
                                description:
                                    'Designs profissionais para casamentos, aniversários, formaturas e muito mais',
                            },
                            {
                                icon: Sparkles,
                                title: 'Galeria de Fotos',
                                description: 'Adicione e organize suas melhores fotos em uma galeria responsiva',
                            },
                            {
                                icon: Music,
                                title: 'Trilha Sonora',
                                description: 'Adicione música de fundo (YouTube, Spotify) para mais emoção',
                            },
                            {
                                icon: MapPin,
                                title: 'Mapa Interativo',
                                description:
                                    'Botão direto para Google Maps para seus convidados chegarem sem erro',
                            },
                            {
                                icon: Users,
                                title: 'Confirmação de Presença',
                                description:
                                    'Seus convidados confirmam direto no convite. Lista organizada automaticamente',
                            },
                            {
                                icon: Zap,
                                title: 'Contagem Regressiva',
                                description:
                                    'Timer animado mostrando quanto falta para o grande momento',
                            },
                        ].map((Feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/10 to-purple-600/10 group-hover:from-pink-500/20 group-hover:to-purple-600/20 transition-all mb-4">
                                    <Feature.icon className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {Feature.title}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {Feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Plans */}
            <section id="plans" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
                            Escolha seu Plano
                        </h2>
                        <p className="text-lg text-gray-600">
                            Planos simples e sem pegadinhas. Pague uma única vez!
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto"
                    >
                        {[
                            {
                                name: 'Básico',
                                price: 'R$ 29,90',
                                popular: false,
                                features: [
                                    'Templates personalizáveis',
                                    'Contagem regressiva',
                                    'Localização no mapa',
                                    'Confirmação de presença',
                                    'Compartilhamento ilimitado',
                                ],
                            },
                            {
                                name: 'Premium',
                                price: 'R$ 49,90',
                                popular: true,
                                badge: 'Mais Escolhido',
                                features: [
                                    'Tudo do Básico +',
                                    'Galeria com 10+ fotos',
                                    'Trilha sonora de fundo',
                                    'Mensagem personalizada',
                                    'QR Code personalizado',
                                    'Acesso vitalício',
                                ],
                            },
                        ].map((plan, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className={`relative rounded-2xl p-8 sm:p-10 transition-all duration-300 ${
                                    plan.popular
                                        ? 'bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-2xl scale-105 md:scale-110'
                                        : 'bg-white border-2 border-gray-100 hover:border-purple-300'
                                }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-4 py-1 rounded-full">
                                            {plan.badge}
                                        </span>
                                    </div>
                                )}

                                <h3 className={`text-2xl font-bold mb-2 ${
                                    plan.popular ? 'text-white' : 'text-gray-900'
                                }`}>
                                    {plan.name}
                                </h3>

                                <div className="mb-6">
                                    <span className={`text-4xl font-bold ${
                                        plan.popular ? 'text-white' : 'text-gray-900'
                                    }`}>
                                        {plan.price}
                                    </span>
                                    <p className={`text-sm mt-2 ${
                                        plan.popular ? 'text-pink-100' : 'text-gray-600'
                                    }`}>
                                        Pague uma única vez
                                    </p>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li
                                            key={i}
                                            className={`flex items-start gap-3 ${
                                                plan.popular ? 'text-white' : 'text-gray-600'
                                            }`}
                                        >
                                            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link href={`/criar?plan=${plan.name.toUpperCase()}`}>
                                    <Button
                                        size="lg"
                                        className={`w-full font-semibold text-base ${
                                            plan.popular
                                                ? 'bg-white text-purple-600 hover:bg-gray-50'
                                                : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg'
                                        }`}
                                    >
                                        Escolher Plano
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <p className="text-gray-600">
                            💳 Sem taxas escondidas • 🔄 Sem mensalidade • 🛡️ Sem complicações
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
                            Depoimentos de Quem Já Criou
                        </h2>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {[
                            {
                                quote:
                                    'Nossos convidados amaram o convite digital! Parecia um mini site do nosso amor com mapa e contagem regressiva.',
                                author: 'Ana & Lucas',
                                event: 'Casamento',
                            },
                            {
                                quote:
                                    'O convite ficou lindo e foi super fácil de criar. Recomendo demais para outros casais!',
                                author: 'Mariana & Pedro',
                                event: 'Casamento',
                            },
                            {
                                quote:
                                    'Adicionei fotos e música de fundo, ficou tão especial que meu namorado chorou quando viu. Gratidão!',
                                author: 'Julia & Rafael',
                                event: 'Aniversário',
                            },
                        ].map((testimonial, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="text-yellow-400">
                                            ★
                                        </span>
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                                <div className="border-t border-gray-200 pt-4">
                                    <p className="font-semibold text-gray-900">
                                        {testimonial.author}
                                    </p>
                                    <p className="text-sm text-purple-600">{testimonial.event}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-50">
                <FAQ />
            </section>

            {/* CTA Final */}
            <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/10" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto text-center relative z-10"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
                        🎉 Crie seu Convite Digital Agora!
                    </h2>
                    <p className="text-lg sm:text-xl text-white/90 mb-8">
                        ✅ Templates profissionais • ✅ Mapa interativo • ✅ Confirmação WhatsApp •
                        ✅ Sem mensalidade
                    </p>
                    <p className="text-white/80 mb-8">
                        Mais de 100 casais e eventos já criaram seus convites conosco!
                    </p>

                    <Link href="/criar">
                        <Button
                            size="lg"
                            className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-10 font-semibold"
                        >
                            Começar Agora
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="text-2xl">💌</div>
                                <span className="text-white font-bold">EverMoment</span>
                            </div>
                            <p className="text-sm">
                                Criando momentos memoráveis com convites digitais personalizados.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Links Rápidos</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a href="#features" className="hover:text-white transition">
                                        Recursos
                                    </a>
                                </li>
                                <li>
                                    <a href="#plans" className="hover:text-white transition">
                                        Planos
                                    </a>
                                </li>
                                <li>
                                    <a href="#faq" className="hover:text-white transition">
                                        FAQ
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a href="#" className="hover:text-white transition">
                                        Termos de Uso
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition">
                                        Política de Privacidade
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Contato</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a href="mailto:contato@everymoment.com.br" className="hover:text-white transition">
                                        contato@everymoment.com.br
                                    </a>
                                </li>
                                <li className="text-sm">
                                    WhatsApp: (11) 99999-9999
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-sm">
                        <p>
                            © 2025 EverMoment. Todos os direitos reservados. Feito com ❤️ para
                            criar momentos inesquecíveis.
                        </p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
