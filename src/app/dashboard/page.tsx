"use client";
import Chat from "@/components/chatbot";
import { useUser } from "@clerk/nextjs";
import Sidebar from "@/components/sidebar";

export default function Dashboard() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>Sign in to view this page</div>;

  return (
    <div className="flex">
      {/* Thy Sidebar */}
      <Sidebar />

      {/* This is all the content that will display inside the dashboard*/}
      <main className="flex-1 p-2 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 my-3">
            Welcome to Your Dashboard, {user?.firstName}
          </h1>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mt-10 h-full flex flex-col">
              <div className="flex-1 overflow-y-auto mb-4"></div>
              <div className="border-t py-4">
                {/* the chat bot will need a bit of a rework to make sure that it does 
                 not overflow the page and does not look silly*/}
                <Chat />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
