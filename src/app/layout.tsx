import type { Metadata } from "next";
import { Manrope, Space_Grotesk, Montserrat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/ui/Footer";

// Основной текст: Manrope - современный, четкий и хорошо читаемый шрифт
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

// Монотипный шрифт: Space Grotesk - стильный моноширинный шрифт с геометрическими формами
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Шрифт для заголовков: Montserrat - элегантный шрифт с современным характером
const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WebStudio | Премиальная веб-студия",
  description: "Создаем профессиональные сайты с уникальным дизайном и впечатляющей анимацией",
  keywords: ["веб-студия", "дизайн сайтов", "разработка сайтов", "анимация", "премиум"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${manrope.variable} ${spaceGrotesk.variable} ${montserrat.variable}`}>
      <body className="antialiased">
        <Header />
        <SmoothScroll>
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
