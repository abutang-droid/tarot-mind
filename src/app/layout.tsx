import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "TarotMind — 塔罗占卜 · 每日指引",
  description: "极简治愈风的在线塔罗占卜工具，每日抽卡、心愿占卜、日运播报、三牌阵解读",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
