import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "TarotMind - 塔罗占卜",
  description: "极简治愈风的在线塔罗占卜工具，每日抽卡、心愿占卜、日运播报",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gradient-to-b from-[#0B0E2A] via-[#1A1040] to-[#0B0E2A] text-[#F5F0E8]">
        {children}
      </body>
    </html>
  )
}
