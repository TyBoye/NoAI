'use client';

import { useChat } from '@ai-sdk/react';
import { Loader2 } from 'lucide-react';

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, error, reload, status, stop } =
    useChat({
      api: '/api/chat',
      body: {
        user_id: '123', // assuming this is connected to the logged-in user - refer to our clerk docs
      },
    });

  return (
    <>
      <div className="flex flex-col gap-3 p-4">
        {messages.map(message => {
          const isUser = message.role === 'user'; // Check if the message is from the user
          
          const bubbleClasses = isUser 
            ? 'bg-orange-500 text-white self-end ' 
            : 'bg-[#c8a47b] text-black self-start';

          return (
            <div key={message.id} className={`max-w-sm p-4 rounded-3xl text-sm break-words ${bubbleClasses}`}>
              <div className="font-bold">{isUser ? 'User: ' : 'AI: '}</div>
              {message.content}
            </div>
          );
        })}
      </div>
      {(status === 'submitted' || status === 'streaming') && (
        <div>
          {status === 'submitted' && <Loader2 />}
          <button
          className=""
          type="button" onClick={() => stop()}>
            Stop
          </button>
        </div>
      )}

      {error && (
        <>
          <div>An error occurred.</div>
          <button type="button" onClick={() => reload()}>
            Retry
          </button>
        </>
      )}

    
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
