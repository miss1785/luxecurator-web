import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ChatBot from "@/components/ChatBot";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Luxe Curator | European Goods",
  description: "Dịch vụ mua hộ hàng Châu Âu cao cấp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`scroll-smooth ${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} antialiased bg-zinc-950 text-stone-100`}>
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
