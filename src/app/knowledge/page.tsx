"use client"
import { useState, useEffect } from "react"
import BottomNav from "@/components/BottomNav"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function KnowledgePage() {
  const [tip, setTip] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/knowledge").then(r => r.json()).then(d => {
      setTip(d); setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="min-h-screen pb-20 flex items-center justify-center">
      <LoadingSpinner text="加载中..." />
    </div>
  )

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-lg mx-auto px-4 pt-8">
        <div className="text-center mb-8">
          <h1 className="text-lg font-bold text-[#D4A853] mb-2">塔罗小知识</h1>
          <p className="text-sm text-[#F5F0E8]/60">每日一条 · 轻松入门</p>
        </div>
        {tip && (
          <div className="bg-gradient-to-r from-[#1A1040]/80 to-[#2d1b69]/80 rounded-2xl border border-[#D4A853]/20 p-6 animate-fade-in-up">
            <div className="text-xs text-[#D4A853]/60 mb-2">今日知识</div>
            <h2 className="text-lg font-bold text-[#D4A853] mb-4">{tip.title}</h2>
            <p className="text-sm text-[#F5F0E8]/80 leading-relaxed">{tip.content}</p>
          </div>
        )}
        <p className="text-center text-xs text-[#F5F0E8]/40 mt-8">每天更新一条，明天再来学习新知识吧</p>
      </div>
      <BottomNav />
    </div>
  )
}
