"use client"
import { useState, useEffect } from "react"
import BottomNav from "@/components/BottomNav"
import LoadingSpinner from "@/components/LoadingSpinner"

const ICONS: Record<string, string> = { love: "💕", work: "💼", wealth: "💰", mood: "🌤" }

export default function FortunePage() {
  const [fortune, setFortune] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/fortune").then(r => r.json()).then(d => {
      setFortune(d)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="min-h-screen pb-20 flex items-center justify-center">
      <LoadingSpinner text="生成日运中..." />
    </div>
  )

  const dimensions = [
    { key: "love", label: "爱情" },
    { key: "work", label: "事业" },
    { key: "wealth", label: "财运" },
    { key: "mood", label: "心情" },
  ]

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-lg mx-auto px-4 pt-8">
        <div className="text-center mb-8">
          <h1 className="text-lg font-bold text-[#D4A853] mb-2">日运播报</h1>
          <p className="text-sm text-[#F5F0E8]/60">今日四大能量维度</p>
        </div>
        <div className="space-y-3">
          {dimensions.map((dim, idx) => {
            const d = fortune?.[dim.key]
            if (!d) return null
            return (
              <div key={dim.key}
                className="bg-gradient-to-r from-[#1A1040]/80 to-[#2d1b69]/80 rounded-xl border border-[#D4A853]/20 p-4 animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span>{ICONS[dim.key]}</span>
                    <span className="font-bold text-[#F5F0E8]">{dim.label}</span>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#D4A853]/20 text-[#D4A853]">{d.tag}</span>
                </div>
                <div className="text-sm text-[#F5F0E8]/70 leading-relaxed">{d.text}</div>
              </div>
            )
          })}
        </div>
        <p className="text-center text-xs text-[#F5F0E8]/40 mt-6">日运每日更新，明早再来看看吧</p>
      </div>
      <BottomNav />
    </div>
  )
}
