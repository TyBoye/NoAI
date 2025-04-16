"use client";
import { useChat } from "@ai-sdk/react";
import { Loader2 } from "lucide-react";
import { useRef, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function Page() {
  const { user } = useUser();

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    error,
    reload,
    status,
    stop,
  } = useChat({
    api: "/api/chat",
    body: {
      user_id: user?.id || "guest", // fallback if user not loaded yet
    },
  });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to the last message when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="flex flex-col h-96">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => {
            const isUser = message.role === "user"; // Check if the message is from the user

            const bubbleClasses = isUser
              ? "bg-orange-500 text-white"
              : "bg-[#c8a47b] text-black";

            const alignment = isUser ? "justify-end" : "justify-start";

            return (
              <div key={message.id} className={`flex ${alignment}`}>
                <div
                  className={`flex flex-col max-w-lg p-4 rounded-3xl text-sm break-words ${bubbleClasses}`}
                >
                  <div className="font-bold mb-1">
                    {isUser ? "You: " : "AI: "}
                  </div>
                  {message.content}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
          {/* This button will stop the chatbot from generating but the only issue is that the button is hard to click
          and the text is hard to read. Need to figure out a way to fix this */}
        </div>

        <div className="flex justify-end p-2">
          {(status === "submitted" || status === "streaming") && (
            <div className="flex items-center gap-2">
              {status === "submitted" && (
                <Loader2 className="animate-spin w-4 h-4" />
              )}
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 shadow-md"
                type="button"
                onClick={() => stop()}
              >
                Stop
              </button>
            </div>
          )}
        </div>

        {error && (
          <>
            <div className="p-4 text-red-600">An error occurred.</div>
            <button
              type="button"
              onClick={() => reload()}
              className="underline text-sm mt-1"
            >
              Retry
            </button>
          </>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <span className="flex col-2 gap-3 mt-4">
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
            className="w-full px-2 rounded-md border border-gray-300 resize-none"
            rows={2}
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-1 rounded-lg hover:bg-white hover:text-orange-500 border shadow-md border-orange-500 transition-colors duration-300"
            disabled={status !== "ready"}
          >
            Submit
          </button>
        </span>
      </form>
    </>
  );
}
