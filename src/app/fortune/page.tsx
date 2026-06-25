"use client"
import { useState, useEffect } from "react"
import BottomNav from "@/components/BottomNav"
import LoadingSpinner from "@/components/LoadingSpinner"
const DIMS = [
  { key: "love", label: "爱情", symbol: "♀", color: "#D4786A" },
  { key: "work", label: "事业", symbol: "♂", color: "#5B8CBF" },
  { key: "wealth", label: "财运", symbol: "◎", color: "#C9954A" },
  { key: "mood", label: "心情", symbol: "☽", color: "#9882C0" },
]
export default function FortunePage() {
  const [fortune, setFortune] = useState<any>(null); const [loading, setLoading] = useState(true)
  useEffect(() => { fetch("/api/fortune").then(r => r.json()).then(d => { setFortune(d); setLoading(false) }).catch(() => setLoading(false)) }, [])
  if (loading) return (<div className="min-h-screen flex items-center justify-center"><LoadingSpinner text="生成日运…" /></div>)
  return (
    <div className="min-h-screen" style={{ paddingBottom: '84px' }}>
      <div className="max-w-lg mx-auto px-5 pt-10">
        <div className="text-center mb-2"><span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: 'var(--gold-dark)' }}>DAILY FORTUNE</span></div>
        <h1 className="text-xl font-bold mb-1 text-center" style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)' }}>日运播报</h1>
        <p className="text-xs mb-8 text-center" style={{ color: 'var(--ivory-dim)' }}>今日四大能量维度</p>
        <div className="space-y-3">
          {DIMS.map((dim, idx) => {
            const d = fortune?.[dim.key]; if (!d) return null
            return (
              <div key={dim.key} className="glass rounded-[var(--radius-md)] p-4 animate-fade-in-up" style={{ animationDelay: `${idx * 0.08}s`, borderLeft: `2px solid ${dim.color}40` }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm" style={{ color: dim.color }}>{dim.symbol}</span>
                    <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--ivory)' }}>{dim.label}</span>
                  </div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full" style={{ background: `${dim.color}15`, color: dim.color }}>{d.tag}</span>
                </div>
                <div className="text-sm leading-relaxed" style={{ color: 'var(--ivory-dim)' }}>{d.text}</div>
              </div>
            )
          })}
        </div>
        <p className="text-center text-[10px] mt-8" style={{ color: 'rgba(237,228,212,0.2)' }}>日运每日更新 · 明早再来</p>
      </div>
      <BottomNav />
    </div>
  )
}
