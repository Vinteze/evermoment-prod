import { Heart, CheckCircle, Mail } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center">
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                        <CheckCircle className="w-12 h-12 text-green-500" />
                    </div>

                    <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
                        Pagamento Confirmado! 🎉
                    </h1>

                    <p className="text-xl text-gray-600 mb-8">
                        Seu convite foi criado com sucesso!
                    </p>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 mb-8">
                    <Mail className="w-12 h-12 text-pink-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Verifique seu e-mail
                    </h2>
                    <p className="text-gray-600">
                        Enviamos o link do seu convite e o QR Code para o e-mail cadastrado.
                        Você pode compartilhar com seus convidados agora mesmo!
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="flex items-start gap-3 text-left">
                        <Heart className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700">
                            <strong>Link único:</strong> Compartilhe o link direto com seus convidados
                        </p>
                    </div>
                    <div className="flex items-start gap-3 text-left">
                        <Heart className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700">
                            <strong>QR Code:</strong> Imprima e coloque em cartões físicos
                        </p>
                    </div>
                    <div className="flex items-start gap-3 text-left">
                        <Heart className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700">
                            <strong>RSVP:</strong> Acompanhe as confirmações de presença em tempo real
                        </p>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                    <Link href="/">
                        <Button size="lg" className="gradient-primary">
                            Voltar para Início
                        </Button>
                    </Link>
                </div>

                <p className="text-sm text-gray-500 mt-6">
                    Não recebeu o e-mail? Verifique sua caixa de spam ou entre em contato conosco.
                </p>
            </div>
        </div>
    );
}
