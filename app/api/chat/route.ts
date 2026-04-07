import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const chatbotData = `
Tên chuyên gia: Luxe Curator
PHONG CÁCH PERSONA: Trẻ trung, gần gũi, năng động và cực kỳ lịch sự.

QUY TRÌNH HỘI THOẠI THÔNG MINH:
1. Nếu chưa biết Tên: BẮT BUỘC hỏi tên trước. Cấm hỏi các thông tin khác cùng lúc.
2. Khi tư vấn "Trẻ sơ sinh": Chỉ hỏi mốc tháng dưới 12 tháng. Trinh bày rõ ràng.

YÊU CẦU TRÌNH BÀY (NGHIÊM NGẶT):
- Viết tin nhắn một cách tự nhiên thành một đoạn văn duy nhất.
- CẤM TUYỆT ĐỐI việc tự ý ngắt dòng hoặc dùng dòng trắng dư thừa giữa các ý.
- Trình bày gọn gàng, súc tích.

LUẬT BẤT BIẾN:
- Ngắn gọn (< 3 câu). Chỉ hàng Authentic Châu Âu. KHÔNG hàng Hàn Quốc.

YÊU CẦU KỸ THUẬT LEAD:
BẮT BUỘC xuất ||LEAD_DATA:{"name": "...", "phone": "...", "email": "...", "summary": "...", "product_examples": "...", "intent_level": "1-5"}|| khi có Tên hoặc SĐT.
`;

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: chatbotData },
        ...messages,
        { role: "system", content: "HÃY NHỚ: Viết tin nhắn một cách tự nhiên thành một đoạn duy nhất, tránh ngắt dòng dư thừa. Luôn hỏi tên khách hàng trước." }
      ],
      model: "gpt-4o",
      temperature: 0.2,
    });

    return NextResponse.json({
      content: chatCompletion.choices[0].message.content || ""
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
