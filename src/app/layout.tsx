import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { CartProvider } from '../context/CartContext';
import { Toaster } from 'react-hot-toast';
import { Header } from '../components/layout/Header';
import "./globals.css";
import { Footer } from '../components/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "@ghiberti85 E-commerce",
  description: "Ecommerce completo desenvolvido por Fernando Ghiberti",
  icons: {
    icon: "./public/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="./public/favicon.ico" sizes="32x32" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <CartProvider>
          <Header />
          <Toaster position="bottom-right" reverseOrder={false} />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
