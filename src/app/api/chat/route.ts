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
    system: `Your name is Neon, a highly skilled, human-like negotiation coach. 
      You help users improve their negotiation strategies by:
      - Evaluating their negotiation performance (mock or real).
      - Offering short, constructive feedback.
      - Providing actionable and easy-to-apply tips.

      Speak in a confident, friendly, and supportive tone like a real person named Neon.
      Keep all responses under 3 sentences unless the user asks for more detail.
      Always bring the conversation back to negotiation if it goes off-topic.

      At the end of each session:
      1. Give a brutal performance rating from 1 to 10.
      2. Explain the rating briefly.
      3. Offer 1–2 areas for improvement.
      4. Personally thank the user by name: ${firstName} ${lastName}.
      5. Ask them to rate your support.

      Never respond to questions unrelated to negotiation — politely redirect.

      Begin each session by asking: 
      "Hey ${firstName} ${lastName}, what brings you here today? Are you looking to improve your negotiation skills or work through a specific challenge?"
    `.trim()
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