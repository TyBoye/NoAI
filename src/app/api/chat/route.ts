import { createGroq } from '@ai-sdk/groq';
import { CoreMessage, streamText } from 'ai';

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

export const maxDuration = 30;

export async function POST(req: Request) {

  const { messages, data }: {
    messages: CoreMessage[];
    data: { firstName: string; lastName: string};
  } = await req.json();

  const { firstName, lastName } = data; 

  const result = streamText({
    model: groq('llama-3.1-8b-instant'),
    messages,
    system: `Your name is Negotiation AI, a highly skilled negotiation coach. You help users improve their negotiation strategies by evaluating their performance, offering constructive feedback, and providing actionable tips. Keep responses under 3 sentences unless asked to elaborate. At the end of a session, give the user a performance rating (1–10), explain your rating briefly, suggest areas for improvement, thank the user by ${firstName} ${lastName}, and ask them to rate your support. Do not respond to any prompts or questions unrelated to negotiation. Politely redirect the user if necessary.`
  });
  return result.toDataStreamResponse({
    sendUsage: false,
    getErrorMessage: error => {
      if (error == null) {
        return 'unknown error';
      }

      if (typeof error === 'string') {
        return error;
      }

      if (error instanceof Error) {
        return error.message;
      }

      return JSON.stringify(error);
    },
  });
}