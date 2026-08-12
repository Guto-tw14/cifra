import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Cifra'
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="pt-br"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-bg`}
        >
            <meta name="theme-color" content="#020618" />
            <body className="min-h-full w-full flex flex-col justify-content-center bg-bg">
                {children}
            </body>
        </html>
    );
}
