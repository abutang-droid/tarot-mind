"use client"
import { useState } from "react"
import BottomNav from "@/components/BottomNav"
import LoadingSpinner from "@/components/LoadingSpinner"
const CONCLUSIONS: Record<string, { label: string; color: string }> = { "可行": { label: "可行", color: "#6BAF8D" }, "蓄力": { label: "蓄力", color: "#C9954A" }, "暂缓": { label: "暂缓", color: "#D4786A" } }
export default function WishPage() {
  const [wish, setWish] = useState(""); const [result, setResult] = useState<any>(null); const [loading, setLoading] = useState(false)
  async function handleSubmit() {
    if (!wish.trim()) return; setLoading(true); setResult(null)
    try { const res = await fetch("/api/wish", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ wish: wish.trim() }) }); setResult(await res.json()) } catch (e) {}
    finally { setLoading(false) }
  }
  return (
    <div className="min-h-screen" style={{ paddingBottom: '84px' }}>
      <div className="max-w-lg mx-auto px-5 pt-10">
        <div className="text-center mb-2"><span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: 'var(--gold-dark)' }}>WISH DIVINATION</span></div>
        <h1 className="text-xl font-bold mb-1 text-center" style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)' }}>心愿占卜</h1>
        <p className="text-xs mb-8 text-center" style={{ color: 'var(--ivory-dim)' }}>写下心愿，获取塔罗指引</p>
        <div className="glass rounded-[var(--radius-lg)] p-5 mb-6">
          <textarea value={wish} onChange={e => setWish(e.target.value)} placeholder="写下一个简短的心愿…" className="w-full rounded-[var(--radius-sm)] p-4 text-sm resize-none h-24 outline-none transition-colors" style={{ background: 'rgba(5,8,20,0.6)', border: '1px solid rgba(201,149,74,0.1)', color: 'var(--ivory)' }} onFocus={e => e.target.style.borderColor = 'var(--gold)'} onBlur={e => e.target.style.borderColor = 'rgba(201,149,74,0.1)'} maxLength={200} />
          <div className="text-right text-[10px] mt-1" style={{ color: 'var(--ivory-dimmer)' }}>{wish.length}/200</div>
          <button onClick={handleSubmit} disabled={loading || !wish.trim()} className="w-full mt-3 py-3 rounded-[var(--radius-sm)] text-sm font-bold transition-all duration-200 disabled:opacity-40" style={{ background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)', color: 'var(--bg-deep)' }}>{loading ? "占卜中…" : "一键占卜"}</button>
        </div>
        {loading && <LoadingSpinner text="正在解读你的心愿…" />}
        {result && (
          <div className="space-y-3 animate-fade-in-up">
            <div className="glass rounded-[var(--radius-md)] p-5 text-center">
              <div className="text-[10px] tracking-wider mb-2" style={{ color: 'var(--ivory-dimmer)' }}>抽到的牌</div>
              <div className="text-base font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)' }}>{result.cardName}</div>
              <div className="text-[10px] mt-1" style={{ color: 'rgba(237,228,212,0.3)' }}>{result.orientation}</div>
            </div>
            <div className="glass rounded-[var(--radius-md)] p-5 text-center">
              <div className="text-2xl font-bold mb-2" style={{ color: CONCLUSIONS[result.conclusion]?.color || 'var(--ivory)' }}>{CONCLUSIONS[result.conclusion]?.label || result.conclusion}</div>
              <div className="text-sm leading-relaxed" style={{ color: 'var(--ivory-dim)' }}>{result.advice}</div>
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  )
}
