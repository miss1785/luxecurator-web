import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Cấu hình theo đúng hướng dẫn của thầy trong Bài 2
    const openai = new OpenAI({
      baseURL: "https://9router.vuhai.io.vn/v1",
      apiKey: "sk-4bd27113b7dc78d1-lh6j1d-f4f9c69f", // API Key từ ảnh hướng dẫn
    });

    const chatbotData = `
Tên chuyên gia: Luxe Curator
PHONG CÁCH PERSONA: Trẻ trung, gần gũi, năng động và cực kỳ lịch sự.

QUY TRÌNH HỘI THOẠI THÔNG MINH:
1. Nếu chưa biết Tên: BẮT BUỘC hỏi tên trước. Cấm hỏi các thông tin khác cùng lúc.
2. Khi tư vấn "Trẻ sơ sinh": Chỉ hỏi mốc tháng dưới 12 tháng. Trình bày rõ ràng.

YÊU CẦU TRÌNH BÀY (NGHIÊM NGẶT):
- Viết tin nhắn một cách tự nhiên thành một đoạn văn duy nhất.
- CẤM TUYỆT ĐỐI việc tự ý ngắt dòng hoặc dùng dòng trắng dư thừa giữa các ý.
- Trình bày gọn gàng, súc tích (< 2 câu). Luôn hàng Authentic Châu Âu.

YÊU CẦU KỸ THUẬT LEAD:
BẮT BUỘC xuất ||LEAD_DATA:{"name": "...", "phone": "...", "email": "...", "summary": "...", "product_examples": "...", "intent_level": "1-5"}|| khi có Tên hoặc SĐT.
`;

    const stream = await openai.chat.completions.create({
      model: 'ces-chatbot-gpt-5.4', // Model từ ảnh hướng dẫn
      messages: [
        { role: 'system', content: chatbotData },
        ...messages,
        { role: 'system', content: "HÃY NHỚ: Viết tin nhắn một cách tự nhiên thành một đoạn văn ngắn gọn, thân thiện. Luôn hỏi tên khách hàng trước." }
      ],
      temperature: 0.2,
      stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
          }
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
}
