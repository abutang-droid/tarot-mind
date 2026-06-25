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
    fetch("/api/daily-card").then(r => r.json()).then(d => { setData(d); setLoading(false); setTimeout(() => setFlipped(true), 900) }).catch(() => setLoading(false))
  }, [])
  if (loading) return (<div className="min-h-screen flex items-center justify-center"><LoadingSpinner text="抽取今日灵卡…" /></div>)
  return (
    <div className="min-h-screen" style={{ paddingBottom: '84px' }}>
      <div className="max-w-lg mx-auto px-5 pt-10 text-center">
        <div className="mb-2"><span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: 'var(--gold-dark)' }}>DAILY CARD</span></div>
        <h1 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)' }}>每日抽卡</h1>
        <p className="text-xs mb-10" style={{ color: 'var(--ivory-dim)' }}>{data?.alreadyDrew ? "这是你今天抽到的牌" : "点击卡牌翻转，接收今日讯息"}</p>
        <div className="flex justify-center mb-10">
          <div onClick={() => !flipped && setFlipped(true)} className="cursor-pointer" style={{ animation: flipped ? 'none' : 'float 3s ease-in-out infinite' }}>
            <TarotCard name={data?.cardName || ""} orientation="正位" flipped={flipped} />
          </div>
        </div>
        {flipped && (
          <div className="space-y-4 animate-fade-in-up">
            <div className="glass rounded-[var(--radius-lg)] p-6">
              <div className="inline-block px-3 py-1 rounded-full text-[10px] tracking-wider mb-3" style={{ background: 'rgba(201,149,74,0.12)', color: 'var(--gold)' }}>{data?.cardType}</div>
              <div className="text-lg font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)' }}>{data?.cardName}</div>
              <div className="text-sm leading-relaxed" style={{ color: 'var(--ivory-dim)' }}>{data?.message}</div>
            </div>
            {data?.luckyTip && (
              <div className="glass rounded-[var(--radius-md)] p-4 flex items-center gap-3">
                <div className="text-lg">✦</div>
                <div className="flex-1 text-left">
                  <div className="text-[10px] tracking-wider mb-0.5" style={{ color: 'var(--gold)' }}>今日幸运提示</div>
                  <div className="text-xs" style={{ color: 'var(--ivory-dim)' }}>{data.luckyTip}</div>
                </div>
              </div>
            )}
            <p className="text-[10px] pt-2" style={{ color: 'rgba(237,228,212,0.2)' }}>点击卡牌翻转 · 每日仅限一次</p>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  )
}
