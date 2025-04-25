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
  title: "Negotiation.AI | Terms of Service",
  description: "Terms of Service for Negotiation.AI",
  keywords: ['negotiation', 'ai', 'terms', 'of', 'service', 'terms of service', 'tos'],
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
    <>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
    </>
  );
}