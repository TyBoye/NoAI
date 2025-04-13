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
  title: "Negotiation AI | Home",
  description: "Need to improve your negotiation skills? Here it is. An AI-powered learning method to improve your negotiatiating skills!",
  keywords: ['negotiation', 'ai', 'practice', 'skills'],
  authors: [{name: 'NegotiationAI'}],
  creator: 'NegotiationAI',
  publisher: 'NegotiationAI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
