"use client";
import Chat from "@/components/chatbot";
import { useUser } from "@clerk/nextjs";
import { AppSidebar } from "@/components/newsb";

export default function Dashboard() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>Sign in to view this page</div>;

  return (
    <div className="flex h-screen w-full">
      <div className="flex-none">
        <AppSidebar />
      </div>
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">
            Welcome to Your Dashboard, {user?.firstName}
          </h1>
          <div className="flex flex-col h-[calc(100vh-12rem)]">
            <div className="flex-1 overflow-y-auto">
              {/* Your dashboard content goes here */}
            </div>
              <Chat />
          </div>
        </div>
      </main>
    </div>
  );
}
