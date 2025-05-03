"use client";
import Chat from "@/components/chatbot";
import { useUser } from "@clerk/nextjs";
import { AppSidebar } from "@/components/newsb";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Dashboard() {
  const { isSignedIn, isLoaded, user } = useUser();
  const [hasStarted, setHasStarted] = useState(false); // ✅ Track if chat started

  if (!isLoaded)
    return (
      <div className="flex justify-center items-center h-screen w-full animate-spin">
        <Image src="/NoAI.svg" alt="NoAI Logo" width={128} height={128} />
      </div>
    );

  if (!isSignedIn) return <div>Sign in to view this page</div>;

  return (
    <div className="flex h-screen w-full">
      <div className="flex-none">
        <AppSidebar />
      </div>

      <main className="flex-1 flex-col overflow-auto">
        <div className="max-w-5xl mx-auto p-4">
          {hasStarted && (
            <h1 className="text-3xl text-black/70 font-bold mb-4 animate-fade-in-up">
              Hey{" "}
              <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 bg-clip-text text-transparent">
                {user?.firstName}
              </span>
              , let&apos;s make this deal!
            </h1>
          )}

          <div className="flex flex-col h-[calc(100vh-10rem)]">
            <div className="flex-1 overflow-y-auto">{/* content */}</div>
            <Chat onStart={() => setHasStarted(true)} />
          </div>

          <div className="flex justify-center items-center mt-10 text-sm text-gray-500 gap-1">
            <Image src="/NoAI.svg" alt="NoAI Logo" width={16} height={16} />
            AI Insights, not legal advice. Check
            <Link href="/terms">
              <span className="underline text-orange-300"> Terms</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
