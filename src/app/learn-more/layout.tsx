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
  title: "Negotiation.AI | About Us",
  description: "About Us for Negotiation.AI",
  keywords: ['negotiation', 'ai', 'about', 'us', 'learn', 'more'],
  authors: [{name: 'NegotiationAI'}],
  creator: 'NegotiationAI',
  publisher: 'NegotiationAI',
};

export default function learnmoreLayout({
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