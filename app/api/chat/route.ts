import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

// Khởi tạo client OpenAI sử dụng cấu hình custom API theo yêu cầu (9Router)
const openai = new OpenAI({
  apiKey: "sk-4bd27113b7dc78d1-lh6jld-f4f9c69f",
  baseURL: "https://9router.vuhai.io.vn/v1",
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Tham số messages không hợp lệ." }, { status: 400 });
    }

    // Đọc system prompt từ file chatbot_data.txt
    const dataPath = path.join(process.cwd(), 'chatbot_data.txt');
    let systemPrompt = "Bạn là trợ lý ảo tư vấn khách hàng.";
    try {
      systemPrompt = fs.readFileSync(dataPath, 'utf-8');
    } catch (e) {
      console.warn("Không tìm thấy file chatbot_data.txt, sẽ sử dụng thiết lập mặc định.", e);
    }

    // Chèn system prompt làm tin nhắn đầu tiên (vai trò: system)
    const apiMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      }))
    ];

    // Gọi lên 9router API
    const response = await openai.chat.completions.create({
      model: "ces-chatbot-gpt-5.4",
      messages: apiMessages,
      temperature: 0.6,
      max_tokens: 600,
    });

    const replyContent = response.choices?.[0]?.message?.content || "Xin lỗi, hiện tại tôi không thể trả lời. Vui lòng thử lại sau.";

    return NextResponse.json({
      role: 'assistant',
      content: replyContent,
    });

  } catch (error: any) {
    console.error("Lỗi khi kết nối Chatbot API:", error?.message || error);
    return NextResponse.json(
      { error: "Rất tiếc, đường truyền đến AI đang bị gián đoạn. Xin thử lại sau." },
      { status: 500 }
    );
  }
}
