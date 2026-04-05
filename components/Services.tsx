"use client";
import { motion } from "framer-motion";
import { Pill, Sparkles, Gem, ArrowRight } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Order Thuốc",
      description: "Cung cấp các loại thuốc nội địa Đức, Pháp, Ý theo đơn hoặc nhu cầu cá nhân, đảm bảo chuẩn dược phẩm.",
      icon: Pill
    },
    {
      title: "Thực phẩm chức năng",
      description: "Vitamins và khoáng chất cao cấp giúp chăm sóc sức khỏe toàn diện từ các thương hiệu uy tín.",
      icon: Sparkles
    },
    {
      title: "Mỹ phẩm & Dụng cụ",
      description: "Tư vấn đặt hàng dược mỹ phẩm cao cấp và các thiết bị làm đẹp chuẩn salon tại nhà.",
      icon: Gem
    }
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-zinc-950 border-t border-zinc-900">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="text-center md:text-left mb-16 md:flex justify-between items-end">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
          >
            <p className="text-yellow-600 uppercase tracking-[0.2em] text-sm mb-4 font-medium">Khám phá</p>
            <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-playfair)] text-white">Chuyên môn <span className="italic text-zinc-400">của chúng tôi</span></h2>
          </motion.div>
          <p className="text-zinc-400 font-light max-w-md mt-6 md:mt-0 leading-relaxed">Hỗ trợ tìm kiếm theo hình ảnh, so sánh giá và lựa chọn đơn vị vận chuyển tối ưu nhất dành riêng cho bạn.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group p-10 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 hover:border-yellow-600 transition-colors duration-500 rounded-sm"
            >
              <service.icon className="w-10 h-10 text-yellow-600 mb-8 stroke-[1.5]" />
              <h3 className="text-xl text-white font-[family-name:var(--font-playfair)] mb-4">{service.title}</h3>
              <p className="text-zinc-400 font-light leading-relaxed mb-8">{service.description}</p>
              <a href="#contact" className="inline-flex items-center text-xs uppercase tracking-widest text-zinc-300 group-hover:text-yellow-500 transition-colors">
                Khám phá ngay <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
