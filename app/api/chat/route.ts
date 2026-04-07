import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const chatbotData = `
Tên chuyên gia: Luxe Curator
PHONG CÁCH PERSONA: Trẻ trung, gần gũi, năng động và cực kỳ lịch sự.

QUY TRÌNH HỘI THOẠI THÔNG MINH:
1. Nếu chưa biết Tên: BẮT BUỘC hỏi tên trước. Cấm hỏi các thông tin khác cùng lúc.
2. Khi tư vấn "Trẻ sơ sinh": Chỉ hỏi mốc tháng dưới 12 tháng. Trình bày rõ ràng.

YÊU CẦU TRÌNH BÀY (NGHIÊM NGẶT):
- Viết tin nhắn một cách tự nhiên thành một đoạn văn duy nhất.
- CẤM TUYỆT ĐỐI việc tự ý ngắt dòng hoặc dùng dòng trắng dư thừa giữa các ý.
- Trình bày gọn gàng, súc tích.

LUẬT BẤT BIẾN:
- Ngắn gọn (< 3 câu). Chỉ hàng Authentic Châu Âu. KHÔNG hàng Hàn Quốc.

YÊU CẦU KỸ THUẬT LEAD:
BẮT BUỘC xuất ||LEAD_DATA:{"name": "...", "phone": "...", "email": "...", "summary": "...", "product_examples": "...", "intent_level": "1-5"}|| khi có Tên hoặc SĐT.
`;

    const result = await streamText({
      model: openai('gpt-4o'),
      messages: [
        { role: 'system', content: chatbotData },
        ...messages,
        { role: 'system', content: "HÃY NHỚ: Viết tin nhắn một cách tự nhiên thành một đoạn văn ngắn gọn (< 2 câu), thân thiện. Luôn hỏi tên khách hàng trước." }
      ],
      temperature: 0.2,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
}
