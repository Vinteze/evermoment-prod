export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 px-4">
            <div className="text-center">
                <h1 className="text-6xl font-display font-bold text-gray-900 mb-4">
                    404
                </h1>
                <h2 className="text-3xl font-semibold text-gray-700 mb-4">
                    Convite Não Encontrado
                </h2>
                <p className="text-gray-600 mb-8">
                    O convite que você está procurando não existe ou foi removido.
                </p>
                <a
                    href="/"
                    className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                    Voltar para Início
                </a>
            </div>
        </div>
    );
}
