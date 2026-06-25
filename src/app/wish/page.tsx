"use client"
import { useState } from "react"
import BottomNav from "@/components/BottomNav"
import LoadingSpinner from "@/components/LoadingSpinner"

const CONCLUSIONS: Record<string, { label: string; color: string }> = {
  "可行": { label: "可行 ✓", color: "text-green-400" },
  "蓄力": { label: "蓄力 ⏳", color: "text-yellow-400" },
  "暂缓": { label: "暂缓 ○", color: "text-orange-400" },
}

export default function WishPage() {
  const [wish, setWish] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!wish.trim()) return
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch("/api/wish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wish: wish.trim() }),
      })
      const data = await res.json()
      setResult(data)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-lg mx-auto px-4 pt-8">
        <div className="text-center mb-8">
          <h1 className="text-lg font-bold text-[#D4A853] mb-2">心愿占卜</h1>
          <p className="text-sm text-[#F5F0E8]/60">输入你的心愿，获取塔罗指引</p>
        </div>
        <div className="bg-gradient-to-r from-[#1A1040]/80 to-[#2d1b69]/80 rounded-2xl border border-[#D4A853]/20 p-5 mb-6">
          <textarea value={wish} onChange={e => setWish(e.target.value)}
            placeholder="写下一个简短的心愿..."
            className="w-full bg-[#0B0E2A]/50 rounded-xl p-4 text-[#F5F0E8] placeholder-[#F5F0E8]/30 border border-[#D4A853]/10 focus:outline-none focus:border-[#D4A853]/30 resize-none h-24 text-sm"
            maxLength={200} />
          <div className="text-right text-xs text-[#F5F0E8]/40 mt-1">{wish.length}/200</div>
          <button onClick={handleSubmit} disabled={loading || !wish.trim()}
            className="w-full mt-3 py-3 rounded-xl bg-gradient-to-r from-[#D4A853] to-[#B8923F] text-[#0B0E2A] font-bold hover:opacity-90 transition-opacity disabled:opacity-50">
            {loading ? "占卜中..." : "✨ 一键占卜"}
          </button>
        </div>
        {loading && <LoadingSpinner text="正在解读你的心愿..." />}
        {result && (
          <div className="space-y-4 animate-fade-in-up">
            <div className="bg-gradient-to-r from-[#1A1040]/80 to-[#2d1b69]/80 rounded-2xl border border-[#D4A853]/20 p-5 text-center">
              <div className="text-sm text-[#F5F0E8]/60 mb-2">抽到的牌</div>
              <div className="text-xl font-bold text-[#F5F0E8]">{result.cardName}</div>
              <div className="text-xs text-[#F5F0E8]/40 mt-1">{result.orientation}</div>
            </div>
            <div className="bg-gradient-to-r from-[#1A1040]/80 to-[#2d1b69]/80 rounded-2xl border border-[#D4A853]/20 p-5 text-center">
              <div className={`text-2xl font-bold mb-2 ${CONCLUSIONS[result.conclusion]?.color || "text-[#F5F0E8]"}`}>
                {CONCLUSIONS[result.conclusion]?.label || result.conclusion}
              </div>
              <div className="text-sm text-[#F5F0E8]/80 leading-relaxed">{result.advice}</div>
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  )
}
