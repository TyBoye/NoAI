"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

interface Session {
  id: string;
  title: string;
  created_at: string;
}

export default function HistoryPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user?.id) return;

    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/chat/history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id }),
        });

        if (res.ok) {
          const { sessions } = await res.json();
          setSessions(sessions);
        }
      } catch (err) {
        console.error("Error fetching chat history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [isLoaded, isSignedIn, user?.id]); 

  if (!isLoaded) return <div className="p-6">Loading user...</div>;
  if (!isSignedIn || !user) return <div className="p-6">Please sign in.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Chat History</h1>
      {loading ? (
        <p>Loading...</p>
      ) : sessions.length === 0 ? (
        <p>No past sessions found.</p>
      ) : (
        <ul className="space-y-3">
          {sessions.map((s) => (
           <Link href={`/dashboard/chat?sessionId=${s.id}`}>
           <li key={s.id} className="p-4 bg-white rounded shadow hover:bg-gray-100 transition cursor-pointer">
             <div className="font-medium">{s.title}</div>
             <div className="text-sm text-gray-500">
               {new Date(s.created_at).toLocaleString()}
             </div>
           </li>
         </Link>
         
          ))}
        </ul>
      )}
    </div>
  );
}
