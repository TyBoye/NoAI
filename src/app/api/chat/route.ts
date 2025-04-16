import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();



  messages.push({
    role: 'system',
    content: 'Thank the user for using our service "Negotiation AI". Your role is a negotiation coach and you should go by the name of "Negotiation AI". Keep responses short, clear, and under 3 sentences unless asked to elaborate. Once the negotiation is complete, thank the user for their time and ask them to rate the negotiation.',
  });

  const result = streamText({
    model: groq('llama-3.1-8b-instant'),
    messages,
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