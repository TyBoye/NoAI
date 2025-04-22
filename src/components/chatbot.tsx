"use client";
import { useChat } from "@ai-sdk/react";
import { Loader2 } from "lucide-react";
//import { supabase } from "@/lib/supabase";
import { useRef, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
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
      user_id: user?.id, // we don't need to fallback if user not loaded yet
    },
  });

  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to the last message when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //const chatHistory = async () => {
    //const { data, error } = await supabase
  //}


  return (
    <>
      <div className="flex flex-col h-96">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {messages.map((message) => {
            const isUser = message.role === "user"; // Check if the message is from the user

            const bubbleClasses = isUser
              ? "bg-[#ff914d] text-white"
              : "bg-[#c8a47b] text-black";

            const alignment = isUser ? "justify-end" : "justify-start";

            return (
              <div key={message.id} className={`flex ${alignment}`}>
                <div
                  className={`flex flex-col max-w-lg p-4 rounded-3xl text-sm break-words ${bubbleClasses}`}
                >
                  <div className="font-bold mb-1">
                    {isUser ? `${user?.firstName || "You"}` : "Negotiation AI "} {/* chat takes on users first name */}
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

        <div className="flex justify-end p-1">
          {(status === "submitted" || status === "streaming") && (
            <div className="flex items-center gap-2">
              {status === "submitted" && (
                <Loader2 className="animate-spin w-3 h-4" />
              )}
              <button

                className="font-light text-gray-400 text-sm py-1 px-1 rounded-sm hover:bg-gray-600 shadow-md"
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
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </>
  );
}
