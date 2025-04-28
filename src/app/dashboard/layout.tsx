import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";

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
  title: "Negotiation.AI | Dashboard",
  description: "Track your negotiation progress, view your history, and manage your AI-powered negotiation practice sessions.",
  keywords: ['negotiation', 'ai', 'practice', 'skills', 'dashboard', 'progress', 'analytics'],
  authors: [{name: 'NegotiationAI'}],
  creator: 'NegotiationAI',
  publisher: 'NegotiationAI',
  openGraph: {
    title: 'Negotiation.AI Dashboard - Track Your Progress',
    description: 'Monitor your negotiation skills development, review past sessions, and access personalized insights.',
    url: 'https://no-ai.vercel.app/dashboard',
    siteName: 'Negotiation.AI',
    images: [
      {
        url: 'https://no-ai.vercel.app/op-image.png',
        width: 1200,
        height: 630,
        alt: 'Negotiation.AI Dashboard - Track Your Progress',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Negotiation.AI Dashboard - Track Your Progress',
    description: 'Monitor your negotiation skills development, review past sessions, and access personalized insights.',
    images: ['https://no-ai.vercel.app/op-image.png'],
  },
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {children}
    </div>
  );
}