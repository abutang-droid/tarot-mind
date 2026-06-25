"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import BottomNav from "@/components/BottomNav"

export default function HomePage() {
  const [user, setUser] = useState<any>(null)
  const [fortune, setFortune] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/auth/me").then(r => r.json()).then(d => {
      setUser(d.user)
      return fetch("/api/fortune")
    }).then(r => r.json()).then(d => {
      setFortune(d)
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const modules = [
    { href: "/daily-card", icon: "🃏", label: "每日抽卡", desc: "抽取今日专属灵卡", color: "from-purple-500/20 to-purple-500/5" },
    { href: "/wish", icon: "✨", label: "心愿占卜", desc: "输入心愿获取指引", color: "from-yellow-500/20 to-yellow-500/5" },
    { href: "/fortune", icon: "🌟", label: "日运播报", desc: "今日爱情工作财运", color: "from-pink-500/20 to-pink-500/5" },
    { href: "/reading", icon: "🔮", label: "三牌阵占卜", desc: "过去现在未来", color: "from-blue-500/20 to-blue-500/5" },
    { href: "/knowledge", icon: "📖", label: "塔罗知识", desc: "每日一条小知识", color: "from-green-500/20 to-green-500/5" },
    { href: "/history", icon: "📜", label: "历史记录", desc: "回顾占卜档案", color: "from-orange-500/20 to-orange-500/5" },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#D4A853]/20 border-t-[#D4A853] animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-lg mx-auto px-4 pt-8">
        <div className="text-center mb-8">
          <div className="text-3xl mb-2">🔮</div>
          <h1 className="text-xl font-bold text-[#D4A853]">TarotMind</h1>
          <p className="text-sm text-[#F5F0E8]/60 mt-1">你好，{user?.nickname || "星月"} ✨</p>
        </div>

        {fortune && (
          <div className="bg-gradient-to-r from-[#1A1040]/80 to-[#2d1b69]/80 rounded-2xl border border-[#D4A853]/20 p-4 mb-6 animate-fade-in-up">
            <div className="text-sm text-[#D4A853] mb-3">今日能量速览</div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "爱情", tag: fortune.love.tag, color: "text-pink-400" },
                { label: "事业", tag: fortune.work.tag, color: "text-blue-400" },
                { label: "财运", tag: fortune.wealth.tag, color: "text-yellow-400" },
                { label: "心情", tag: fortune.mood.tag, color: "text-green-400" },
              ].map(item => (
                <div key={item.label} className="bg-[#0B0E2A]/50 rounded-xl p-3">
                  <div className="text-xs text-[#F5F0E8]/50">{item.label}</div>
                  <div className={`text-sm font-medium ${item.color}`}>{item.tag}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          {modules.map(mod => (
            <Link key={mod.href} href={mod.href}
              className={`bg-gradient-to-br ${mod.color} rounded-xl border border-[#D4A853]/10 p-4 hover:border-[#D4A853]/30 transition-all`}>
              <div className="text-2xl mb-2">{mod.icon}</div>
              <div className="font-bold text-sm text-[#F5F0E8]">{mod.label}</div>
              <div className="text-xs text-[#F5F0E8]/50 mt-0.5">{mod.desc}</div>
            </Link>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
