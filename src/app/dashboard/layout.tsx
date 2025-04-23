import {  ClerkProvider } from '@clerk/nextjs'




export const metadata = {
  
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
      <body
        
      >
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}