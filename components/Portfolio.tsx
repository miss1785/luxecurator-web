"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Portfolio() {
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const fixedImages = [
    { src: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2000&auto=format&fit=crop", 
      category: "Mỹ phẩm (Serum, KCN)", colSpan: "md:col-span-2", fallback: "Ảnh Serum, Mỹ phẩm Châu Âu" },
    { src: "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=2000&auto=format&fit=crop", 
      category: "Thực phẩm chức năng", colSpan: "md:col-span-2", fallback: "Ảnh Hộp Thuốc, TPCN" },
    { src: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
      category: "Nước hoa", colSpan: "md:col-span-2", fallback: "Ảnh Nước Hoa Pháp" },
    { src: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2000&auto=format&fit=crop", 
      category: "Kính & Phụ kiện", colSpan: "md:col-span-3", fallback: "Ảnh Kính Mát & Phụ Kiện" },
    { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2000&auto=format&fit=crop", 
      category: "Hàng hiệu Luxury", colSpan: "md:col-span-3", fallback: "Ảnh Đồng Hồ & Phụ Kiện Luxury" },
  ];

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-zinc-950 border-t border-zinc-900">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-yellow-600 uppercase tracking-[0.2em] text-sm mb-4 font-semibold">Đơn hàng tiêu biểu</p>
          <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-playfair)] text-white">
            Minh chứng cho <span className="italic text-zinc-400">chất lượng</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {fixedImages.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={`relative aspect-video md:aspect-[4/3] group overflow-hidden cursor-pointer rounded-sm shadow-xl ${img.colSpan}`}
            >
              {!imgErrors[i] ? (
                <img 
                  src={img.src} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  alt={img.category} 
                  onError={() => setImgErrors(prev => ({ ...prev, [i]: true }))}
                />
              ) : (
                <div className="absolute inset-0 w-full h-full bg-zinc-900/80 border border-zinc-800 flex items-center justify-center p-6 text-center transition-transform duration-1000 group-hover:scale-105">
                   <p className="text-zinc-500 font-serif italic text-lg sm:text-xl px-4 py-2 border border-zinc-700/50 rounded-sm">
                     {img.fallback}
                   </p>
                </div>
              )}
              <div className="absolute inset-0 bg-zinc-950/40 group-hover:bg-zinc-950/20 transition-colors duration-500 pointer-events-none" />
              <div className="absolute bottom-8 left-8 pointer-events-none">
                <p className="text-white text-xl font-[family-name:var(--font-playfair)] opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 tracking-wide font-medium relative z-10 drop-shadow-md">
                  {img.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
