import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import fs from 'fs';
import path from 'path';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  let chatbotData = "";
  try {
    const filePath = path.join(process.cwd(), 'chatbot_data.txt');
    chatbotData = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    chatbotData = "Bạn là Luxe Curator. Hãy hỏi tên khách trước.";
  }

  const result = await streamText({
    model: openai('ces-chatbot-gpt-5.4'),
    messages: [
      { role: 'system', content: chatbotData },
      ...messages,
      { role: 'system', content: "HÃY NHỚ: Viết tin nhắn một cách tự nhiên thành một đoạn duy nhất, tránh ngắt dòng dư thừa. Luôn hỏi tên khách hàng trước." }
    ],
    temperature: 0.2,
  });

  return result.toDataStreamResponse();
}
