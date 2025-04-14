import { auth } from "@clerk/nextjs/server";
import Nav from "@/components/navbar";
import Chat from '@/components/chatbot'

export default async function Dashboard() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return (
    <div className="min-h-screen bg-white">
        <Nav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome to Your Dashboard</h1>
        <Chat />
        
      </div>
    </div>
  );
} 