'use client';

import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface FAQItem {
    question: string;
    answer: string;
}

const faqItems: FAQItem[] = [
    {
        question: 'Quanto tempo leva para criar um convite?',
        answer: 'Cerca de 5-10 minutos! Basta preencher os dados, adicionar fotos e o seu convite estará pronto para compartilhar.',
    },
    {
        question: 'Posso editar meu convite após criado?',
        answer: 'Sim! Você pode editar suas informações, fotos e layout quantas vezes quiser durante o período de acesso.',
    },
    {
        question: 'Quanto tempo o meu convite fica disponível?',
        answer: 'Seu convite fica disponível indefinidamente. Você terá acesso vitalício ao seu link personalizado.',
    },
    {
        question: 'Posso compartilhar com quantas pessoas quiser?',
        answer: 'Sim! Compartilhamento ilimitado. Você pode enviar seu link por WhatsApp, email, redes sociais ou impressão de QR Code.',
    },
    {
        question: 'Como recebo as confirmações de presença?',
        answer: 'Seus convidados confirmam presença direto no convite. A lista é organizada automaticamente no seu painel.',
    },
    {
        question: 'Qual é a forma de pagamento?',
        answer: 'Aceitamos cartão de crédito via Stripe. O pagamento é seguro e você recebe seu convite instantaneamente após confirmação.',
    },
];

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

export function FAQ() {
    return (
        <div className="max-w-3xl mx-auto">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
                    Perguntas Frequentes
                </h2>
            </motion.div>

            <motion.div
                variants={{
                    visible: {
                        transition: {
                            staggerChildren: 0.1,
                        },
                    },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-3"
            >
                <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                    {faqItems.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="w-full"
                        >
                            <AccordionItem
                                value={`item-${index}`}
                                className="border border-gray-200 rounded-xl bg-white hover:shadow-md transition-shadow overflow-hidden"
                            >
                                <AccordionTrigger className="flex w-full items-start justify-between p-6 sm:p-8 text-left hover:no-underline group">
                                    <div className="flex gap-3 items-start flex-1">
                                        <span className="text-purple-600 font-bold text-xl flex-shrink-0 pt-0.5">
                                            Q
                                        </span>
                                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                                            {item.question}
                                        </h3>
                                    </div>
                                    <ChevronDown className="w-5 h-5 text-purple-600 flex-shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180 mt-1 ml-3" />
                                </AccordionTrigger>
                                <AccordionContent className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 text-gray-600 animate-accordion-down data-[state=closed]:animate-accordion-up">
                                    <div className="pl-8">
                                        <p>{item.answer}</p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </motion.div>
                    ))}
                </Accordion>
            </motion.div>
        </div>
    );
}
