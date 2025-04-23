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
    system: `Your name is Negotiation AI. You are a skilled negotiation coach helping users improve their negotiation strategies. Keep responses under 3 sentences unless asked to elaborate. Thank the by ${firstName} ${lastName} when the session ends and ask for a rating.`
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