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
    manifest: '/manifest.json',
    title: 'Cifra',
    themeColor: '#020618',
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
            <body className="min-h-full w-full flex flex-col justify-content-center bg-bg">
                {children}
            </body>
        </html>
    );
}
