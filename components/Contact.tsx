"use client";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-zinc-950 border-t border-zinc-900">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-yellow-600 uppercase tracking-[0.2em] text-sm mb-4 font-medium">Liên hệ</p>
            <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-playfair)] text-white mb-6">Bắt đầu <span className="italic text-zinc-400">cùng tôi</span></h2>
            <p className="text-zinc-400 font-light mb-12 leading-relaxed">Để lại thông tin, tôi sẽ liên hệ lại với bạn trong vòng 30 phút để thiết kế giải pháp order tối ưu nhất.</p>
            
            <div className="space-y-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2 font-medium">Điện thoại</p>
                <p className="text-2xl text-white font-[family-name:var(--font-playfair)] text-yellow-500 hover:text-yellow-400 transition-colors cursor-pointer tracking-wider">090 123 4567</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2 font-medium">Email</p>
                <p className="text-xl text-white font-light hover:text-yellow-500 transition-colors cursor-pointer">hello@luxecurator.com</p>
              </div>
            </div>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 bg-zinc-900/50 backdrop-blur-sm p-8 md:p-10 border border-zinc-800 rounded-sm"
          >
            <div>
              <input 
                type="text" 
                placeholder="Tên của bạn" 
                className="w-full bg-transparent border-b border-zinc-700 py-4 text-white font-light focus:outline-none focus:border-yellow-600 transition-colors placeholder:text-zinc-500"
              />
            </div>
            <div>
              <input 
                type="tel" 
                placeholder="Số điện thoại" 
                className="w-full bg-transparent border-b border-zinc-700 py-4 text-white font-light focus:outline-none focus:border-yellow-600 transition-colors placeholder:text-zinc-500"
              />
            </div>
            <div>
              <textarea 
                rows={4}
                placeholder="Nội dung cần tư vấn..." 
                className="w-full bg-transparent border-b border-zinc-700 py-4 text-white font-light focus:outline-none focus:border-yellow-600 transition-colors placeholder:text-zinc-500 resize-none"
              />
            </div>
            <button className="w-full py-4 bg-yellow-600 hover:bg-yellow-500 text-zinc-950 uppercase tracking-widest text-sm font-bold transition-colors mt-6 shadow-[0_0_15px_rgba(202,138,4,0.2)]">
              Gửi Yêu Cầu
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
