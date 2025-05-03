"use client";

import { useEffect, useState, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { ArrowUp } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CoreMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const { user, isLoaded } = useUser();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [initialMessages, setInitialMessages] = useState<CoreMessage[]>([]);
  const [loadingHistory] = useState(false);

  useEffect(() => {
    if (!sessionId) return;
  
    const loadMessages = async () => {
      const res = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
  
      if (res.ok) {
        const { messages } = await res.json();
  
        setInitialMessages(
          messages.map((msg: { id: string; role: string; content: string; created_at: string }) => ({
            id: msg.id,
            role: msg.role === "ai" ? "assistant" : "user",
            content: msg.content,
            created_at: msg.created_at,
          }))
        );
      }
    };
  
    loadMessages();
  }, [sessionId]);
  

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    stop,
    status,
  } = useChat({
    api: "/api/chat",
    body: {
      sessionId,
      userId: user?.id,
      data: {
        firstName: user?.firstName || "Friend",
        lastName: user?.lastName || "",
      },
    },
    initialMessages,
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isLoaded || !user) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1 overflow-y-auto space-y-4">
        {loadingHistory && (
          <p className="text-sm text-gray-500">Loading previous messages...</p>
        )}
        {messages.map((message) => {
          const isUser = message.role === "user";
          return (
            <div
              key={message.id}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
            >
              <div className="text-sm text-black/35 font-semibold mb-1 px-2">
                {isUser ? user.firstName || "You" : "Neon"}
              </div>
              <div
                className={cn(
                  "flex max-w-lg p-4 rounded-3xl text-sm break-words",
                  isUser
                    ? "bg-white text-black drop-shadow-lg"
                    : "bg-[#ff914d] text-white drop-shadow-lg"
                )}
              >
                {message.content}
              </div>
            </div>
          );
        })}
        {status === "submitted" && (
          <div className="flex items-start gap-3 justify-start">
            <div className="bg-muted bg-gradient-to-r from-[#ff914d] via-[#ff5e62] to-[#ff3c38] bg-clip-text text-transparent rounded-lg p-3 text-sm animate-pulse">
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex justify-end p-1">
        {(status === "submitted" || status === "streaming") && (
          <div className="flex items-center gap-1">
            {status === "submitted" && (
              <Image
                className="animate-spin"
                src="/NoAI.svg"
                alt="Neon AI Logo"
                width={16}
                height={16}
              />
            )}
            <button
              className="bg-muted font-light bg-gradient-to-r from-[#ff914d] via-[#ff5e62] to-[#ff3c38] bg-clip-text text-transparent text-sm py-1 px-1 rounded-sm hover:bg-gray-600 shadow-md animate-pulse"
              type="button"
              onClick={() => stop()}
            >
              Stop
            </button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex gap-3 mt-4">
          <textarea
            name="prompt"
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            disabled={status !== "ready"}
            className="flex-1 min-h-7 max-h-60 px-3 py-2 rounded-md resize-none outline-none ring-2 ring-[#ff914d] border-transparent"
            rows={1}
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="bg-[#ff914d] text-white px-2 py-1 rounded-lg hover:bg-white hover:text-orange-400 border shadow-md border-orange-500 transition-colors duration-300 h-[40px] self-end"
            disabled={status !== "ready"}
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
