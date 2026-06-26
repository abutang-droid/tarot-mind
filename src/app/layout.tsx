import type { Metadata } from "next"
import "./globals.css"
import AppShell from "@/components/AppShell"

export const metadata: Metadata = {
  title: "TarotMind · 塔罗占卜",
  description: "东方神秘学与现代心理学的融合 · 每日塔罗指引",
  keywords: ["塔罗", "占卜", "塔罗牌", "每日运势"],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#F8F6F1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  )
}
