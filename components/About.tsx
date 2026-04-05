"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-zinc-950 border-t border-zinc-900">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-playfair)] mb-6 text-white leading-tight">
              Hơn một thập kỷ <br/>
              <span className="text-yellow-600 italic">tận tâm vì khách hàng.</span>
            </h2>
            <p className="text-zinc-400 font-light leading-relaxed mb-6 text-lg">
              Với hơn 10 năm kinh nghiệm trong lĩnh vực order hàng Châu Âu, tôi không chỉ đơn thuần là một người mua hộ. Tôi coi mình là một "Luxe Curator" - người tuyển chọn những giá trị tốt nhất.
            </p>
            <p className="text-zinc-400 font-light leading-relaxed mb-8 text-lg">
              Sự tin tưởng và minh bạch là kim chỉ nam trong công việc của tôi. Mỗi đơn hàng đều được xử lý với sự cẩn trọng tuyệt đối, từ khâu tư vấn nguồn gốc đến khi sản phẩm tận tay người dùng.
            </p>
            
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-zinc-800">
              <div>
                <p className="text-yellow-500 text-3xl font-[family-name:var(--font-playfair)] font-bold mb-2">100%</p>
                <p className="text-sm text-zinc-500 uppercase tracking-widest font-medium">Chính hãng từ Store</p>
              </div>
              <div>
                <p className="text-yellow-500 text-3xl font-[family-name:var(--font-playfair)] font-bold mb-2">24/7</p>
                <p className="text-sm text-zinc-500 uppercase tracking-widest font-medium">Tư vấn hỗ trợ</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative md:aspect-[3/4] aspect-square w-full rounded-sm overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2000&auto=format&fit=crop" 
              alt="Luxury European Lifestyle" 
              className="absolute inset-0 object-cover w-full h-full grayscale-[10%] hover:grayscale-0 transition-all duration-700"
            />
            {/* Viền ảnh trang trí kiểu sang trọng bên trong hình */}
            <div className="absolute inset-0 border border-white/20 m-4 pointer-events-none"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
