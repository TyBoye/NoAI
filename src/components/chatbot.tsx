"use client";

import { useChat } from "@ai-sdk/react";
import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import Image from "next/image";

// ✅ Animated Placeholder Component
function AnimatedPlaceholder() {
  const suggestions = [
    "What should I say to close the sale?",
    "Can you help me ask for a raise?",
    "Negotiate this contract in my favor.",
  ];

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false); // fade out
      setTimeout(() => {
        setIndex((i) => (i + 1) % suggestions.length);
        setVisible(true); // fade in
      }, 400); // match fade-out duration
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "absolute left-9 top-2 text-gray-400 pointer-events-none select-none text-sm transition-all duration-500 ease-in-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      )}
    >
      {suggestions[index]}
    </div>
  );
}

export default function Page({ onStart }: { onStart?: () => void }) {
  const { user } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [initialMessages, setInitialMessages] = useState<[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  // 1. Get or create session ID
  useEffect(() => {
    if (!user?.id) return;
    const stored = localStorage.getItem("neonSessionId");
    if (stored) {
      setSessionId(stored);
      return;
    }

    const createSession = async () => {
      const res = await fetch("/api/chat/new-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          title: "Chat with Neon",
        }),
      });
      const { sessionId } = await res.json();
      localStorage.setItem("neonSessionId", sessionId);
      setSessionId(sessionId);
    };

    createSession();
  }, [user?.id]);

  // 2. Load messages from DB
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
        const formatted = messages.map(
          (msg: { id: string; role: string; content: string }) => ({
            id: msg.id,
            role: msg.role === "ai" ? "assistant" : "user",
            content: msg.content,
          })
        );
        setInitialMessages(formatted);
      }

      setLoadingMessages(false);
    };

    loadMessages();
  }, [sessionId]);

  const { messages, input, handleInputChange, handleSubmit, status, stop } =
    useChat({
      api: "/api/chat",
      initialMessages,
      body: {
        data: {
          firstName: user?.firstName ?? "Guest",
          lastName: user?.lastName ?? "",
          userId: user?.id ?? "",
          sessionId,
        },
      },
    });
  const hasTriggeredStart = useRef(false);

  useEffect(() => {
    const hasUserMessage = messages.some(
      (m) => m.role === "user" && m.content.trim() !== ""
    );
    if (hasUserMessage && !hasTriggeredStart.current) {
      onStart?.(); // ✅ Notify parent
      hasTriggeredStart.current = true;
    }
  }, [messages, onStart]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const hasStarted = messages.some(
    (m) => m.role === "user" && m.content.trim() !== ""
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!hasStarted && !loadingMessages && (
          <div className="text-left text-gray-800 text-lg md:text-xl py-6 md:py-20">
            <p className="mb-2">
              Hi there, I&apos;m{" "}
              <span className="text-xl md:text-3xl font-bold text-[#ff914d]">
                Neon
              </span>
              , your personal negotiation assistant.
            </p>
            <br />
            <p className="hidden md:block">
              I&apos;m here to help you navigate deals, resolve conflicts, and
              find the best outcomes. Whether it&apos;s a business deal or daily
              decision, I&apos;m ready to support you with smart strategies and
              clear advice.
            </p>
            <p className="text-lg md:text-xl text-gray-800 mt-5 md:mt-10">
              What are we negotiating today?
            </p>
          </div>
        )}

        {messages.map((message) => {
          const isUser = message.role === "user";
          return (
            <div
              key={message.id}
              className={`flex flex-col ${
                isUser ? "items-end" : "items-start"
              }`}
            >
              <div className="text-sm text-black/35 font-semibold mb-1 px-2">
                {isUser ? user?.firstName || "You" : "Neon"}
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
              Cooking...
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
        <div className="relative w-full flex gap-3 mt-4">
          {!input && <AnimatedPlaceholder />}

          {/* Static Neon Logo Inside Textarea */}
          <Image
            src="/NoAI.svg"
            alt="Neon Logo"
            width={18}
            height={18}
            className="absolute left-2 top-2.5 z-10 opacity-100"
          />

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
            className="flex-1 min-h-7 max-h-60 pl-9 pr-3 py-2 rounded-md resize-none outline-none ring-2 ring-[#ff914d] border-transparent placeholder-transparent"
            rows={1}
            placeholder="Type your message..."
          />

          <button
            type="submit"
            className="bg-[#ff914d] text-white px-2 py-1 rounded-lg hover:bg-white hover:text-orange-400 shadow-md transition-colors duration-300 h-[40px] self-end"
            disabled={status !== "ready"}
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
