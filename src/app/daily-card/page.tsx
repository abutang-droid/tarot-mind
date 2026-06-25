"use client"
import { useState, useEffect } from "react"
import BottomNav from "@/components/BottomNav"
import TarotCard from "@/components/TarotCard"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function DailyCardPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    fetch("/api/daily-card").then(r => r.json()).then(d => {
      setData(d)
      setLoading(false)
      setTimeout(() => setFlipped(true), 800)
    }).catch(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="min-h-screen pb-20 flex items-center justify-center">
      <LoadingSpinner text="抽取今日灵卡中..." />
    </div>
  )

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-lg mx-auto px-4 pt-8 text-center">
        <h1 className="text-lg font-bold text-[#D4A853] mb-2">每日抽卡</h1>
        <p className="text-sm text-[#F5F0E8]/60 mb-8">
          {data?.alreadyDrew ? "这是你今天抽到的牌" : "一键抽取今日专属灵卡"}
        </p>

        <div className="flex justify-center mb-8">
          <div onClick={() => setFlipped(!flipped)}>
            <TarotCard name={data?.cardName || ""} orientation="正位" flipped={flipped} />
          </div>
        </div>

        {flipped && (
          <div className="space-y-4 animate-fade-in-up">
            <div className="bg-gradient-to-r from-[#1A1040]/80 to-[#2d1b69]/80 rounded-2xl border border-[#D4A853]/20 p-5">
              <div className="inline-block px-3 py-1 rounded-full bg-[#D4A853]/20 text-[#D4A853] text-xs mb-3">{data?.cardType}</div>
              <div className="text-lg font-bold text-[#F5F0E8] mb-2">{data?.cardName}</div>
              <div className="text-sm text-[#F5F0E8]/80 leading-relaxed">{data?.message}</div>
            </div>
            {data?.luckyTip && (
              <div className="bg-[#0B0E2A]/50 rounded-xl border border-[#D4A853]/10 p-4">
                <div className="text-xs text-[#D4A853] mb-1">今日幸运提示</div>
                <div className="text-sm text-[#F5F0E8]/70">{data.luckyTip}</div>
              </div>
            )}
            <p className="text-xs text-[#F5F0E8]/40 mt-4">点击卡牌翻转 · 每日仅限一次</p>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  )
}
