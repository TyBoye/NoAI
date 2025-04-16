import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});



export const maxDuration = 30;

export async function POST(req: Request) {

  const { messages: initialMessages, scenarioId } = await req.json();

  let messages = initialMessages;

  if (!messages || messages.length === 0) {
    const STARTERS: Record<string, string> = {
      placeholder1: "I am a test",
      placeholder2: "I am a test 2",
    };

    const prompt = STARTERS[scenarioId] || STARTERS.default;

    messages = [
      {
        role: 'user',
        content: prompt,
      },
    ];
  }

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