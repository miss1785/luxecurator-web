import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import fs from 'fs';
import path from 'path';

// Cho phép Vercel Edge Runtime chạy nhanh hơn
export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  let chatbotData = "";
  try {
    const filePath = path.join(process.cwd(), 'chatbot_data.txt');
    chatbotData = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    chatbotData = "Bạn là chuyên gia Luxe Curator chuyên tư vấn hàng Authentic Châu Âu. Hãy hỏi tên khách trước.";
  }

  const result = await streamText({
    model: openai('ces-chatbot-gpt-5.4'),
    messages: [
      { role: 'system', content: chatbotData },
      ...messages,
      { role: 'system', content: "HÃY NHỚ: Trình bày gọn gàng. Chỉ xuống 1 dòng giữa các ý. Không để khoảng trống quá thưa." }
    ],
    temperature: 0.1,
  });

  return result.toDataStreamResponse();
}
