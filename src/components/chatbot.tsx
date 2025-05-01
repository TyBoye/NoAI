"use client";
import { useChat } from "@ai-sdk/react";
import { ArrowUp } from "lucide-react";
import { useRef, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import Image from "next/image";


export default function Page() {
  const { user } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    reload,
    status,
    stop,
  } = useChat({
    api: "/api/chat",
    body: {
      user_id: user?.id,
      data: {
        firstName: user?.firstName,
        lastName: user?.lastName,
      },
    },
    initialMessages: [
      {
        id: "1",
        role: "user",
        content: "Hey!",
      },
    ],
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    //THIS SENDS THE MESSAGE OMGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG

    reload();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages
          .filter((_, index) => index !== 0)
          .map((message) => {
            const isUser = message.role === "user";
            return (
              <div
                key={message.id}
                className={`flex flex-col ${
                  isUser ? "items-end" : "items-start"
                }`}
              >
                <div className="text-sm text-black/35 font-semibold mb-1 px-2">
                  {isUser ? `${user?.firstName || "You"}` : "Neon"}
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
              <Image className="animate-spin" src="/NoAI.svg" alt="NoAI Logo" width={16} height={16} />
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
        <div className="flex col-2 gap-3 mt-4">
          <textarea
            name="prompt"
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                // Just for new line stuff , Checking if Enter is pressed without Shift
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
