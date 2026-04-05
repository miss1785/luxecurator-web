"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with lighter overlay for brightness */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578681994506-b8f463449011?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/40 via-zinc-950/60 to-zinc-950/90" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-yellow-500 uppercase tracking-[0.3em] text-sm md:text-base mb-6 font-semibold"
        >
          European Goods Order Service
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-[family-name:var(--font-playfair)] text-white mb-8 leading-tight"
        >
          Tuyển chọn<br/>
          <span className="text-zinc-300 italic font-light">giá trị đích thực</span>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12"
        >
          <a href="#contact" className="px-8 py-4 bg-yellow-600 hover:bg-yellow-500 text-zinc-950 font-bold tracking-wide transition-all uppercase text-sm w-full sm:w-auto text-center shadow-[0_0_15px_rgba(202,138,4,0.3)] hover:shadow-[0_0_25px_rgba(202,138,4,0.5)]">
            Liên hệ tư vấn
          </a>
          <div className="flex items-center gap-4 text-left">
            <div className="border-l-2 border-yellow-600 pl-4">
              <p className="text-3xl font-[family-name:var(--font-playfair)] text-white font-bold">5,000+</p>
              <p className="text-xs text-zinc-300 uppercase tracking-widest mt-1">Đơn hàng hoàn thành</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
