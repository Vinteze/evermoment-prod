import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
});

export const metadata: Metadata = {
    title: "EverMoment - Convites Digitais Personalizados",
    description:
        "Crie convites digitais únicos e inesquecíveis para casamentos, aniversários e eventos especiais. Surpreenda seus convidados com QR Code personalizado.",
    keywords: [
        "convite digital",
        "convite casamento",
        "convite aniversário",
        "QR code",
        "convite online",
        "convite personalizado",
    ],
    authors: [{ name: "EverMoment" }],
    openGraph: {
        title: "EverMoment - Convites Digitais Personalizados",
        description:
            "Crie convites digitais únicos e inesquecíveis para seus eventos especiais",
        type: "website",
        locale: "pt_BR",
    },
    twitter: {
        card: "summary_large_image",
        title: "EverMoment - Convites Digitais Personalizados",
        description:
            "Crie convites digitais únicos e inesquecíveis para seus eventos especiais",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
            <body className="font-sans antialiased">{children}</body>
        </html>
    );
}
