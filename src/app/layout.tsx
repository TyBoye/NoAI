import {  ClerkProvider } from '@clerk/nextjs'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://no-ai.vercel.app'),
  title: "Negotiation.AI | Home",
  description: "Need to improve your negotiation skills? Here it is. An AI-powered learning method to improve your negotiatiating skills!",
  keywords: ['negotiation', 'ai', 'practice', 'skills'],
  authors: [{name: 'NegotiationAI'}],
  creator: 'NegotiationAI',
  publisher: 'NegotiationAI',
  openGraph: {
    title: 'Negotiation.AI - Master The Art Of Negotiation',
    description: 'Practice your negotiation skills with our AI-powered chatbot. Get real-time feedback and improve with every conversation.',
    url: 'https://no-ai.vercel.app/op-image.png',
    siteName: 'Negotiation.AI',
    images: [
      {
        url: 'https://no-ai.vercel.app/op-image.png',
        width: 1200,
        height: 630,
        alt: 'Negotiation.AI - AI-Powered Negotiation Practice',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Negotiation.AI - Master The Art Of Negotiation',
    description: 'Practice your negotiation skills with our AI-powered chatbot. Get real-time feedback and improve with every conversation.',
    images: ['https://no-ai.vercel.app/op-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: 'bg-orange-500 hover:bg-orange-600',
        },
      }}
    >
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
