'use client';
import { useChat } from '@ai-sdk/react';
import { Loader2 } from 'lucide-react';

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, error, reload, status, stop } =
    useChat({
      api: '/api/chat',
      body: {
        user_id: '123', // assuming this is connected to the logged-in user - refer to our clerk docs 
        // looking deeper into this im not sure if this will benefit us in the future
      },
    });

  return (
    <>
      <div className="flex flex-col h-96 ">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => {
          const isUser = message.role === 'user'; // Check if the message is from the user
          
          const bubbleClasses = isUser 
            ? 'bg-orange-500 text-white self-end' 
            : 'bg-[#c8a47b] text-black self-start';

          return (
            <div 
            key={message.id} className={`flex flex-col max-w-lg p-4 rounded-3xl text-sm break-words ${bubbleClasses}`}>
              <div className="font-bold mb-1">{isUser ? 'You: ' : 'AI: '}</div>
              {message.content}
            </div>
          );
        })}
      {/* This button will stop the chatbot from generating bt the only issue is that the button is hard to click
      and the text is hard to read. Need to figure out a way to fix this */}
      </div>
      <div className="flex justify-start">
      {(status === 'submitted' || status === 'streaming') && (
        <div>
          {status === 'submitted' && <Loader2 />}
          <button
          className="bg-orange-500 text-white px-2 py-2"
          type="button" onClick={() => stop()}>
            Stop
          </button>
        </div>
      )}
       </div>

      {error && (
        <>
          <div>An error occurred.</div>
          <button type="button" onClick={() => reload()}>
            Retry
          </button>
        </>
      )}
       </div>
 
    
      <form onSubmit={handleSubmit}>
        <span className="flex col-2 gap-3">
        <input
          name="prompt"
          value={input}
          onChange={handleInputChange}
          disabled={status !== 'ready'}
          className="w-full p-2 rounded-md border border-gray-300"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
        </span>
      </form>
      
    </>
  );
}
