"use client"
import { useState, useEffect } from "react"
import BottomNav from "@/components/BottomNav"
import LoadingSpinner from "@/components/LoadingSpinner"
export default function KnowledgePage() {
  const [tip, setTip] = useState<any>(null); const [loading, setLoading] = useState(true)
  useEffect(() => { fetch("/api/knowledge").then(r => r.json()).then(d => { setTip(d); setLoading(false) }).catch(() => setLoading(false)) }, [])
  if (loading) return (<div className="min-h-screen flex items-center justify-center"><LoadingSpinner text="加载中…" /></div>)
  return (
    <div className="min-h-screen" style={{ paddingBottom: '84px' }}>
      <div className="max-w-lg mx-auto px-5 pt-10">
        <div className="text-center mb-2"><span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: 'var(--gold-dark)' }}>TAROT TIPS</span></div>
        <h1 className="text-xl font-bold mb-1 text-center" style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)' }}>塔罗小知识</h1>
        <p className="text-xs mb-8 text-center" style={{ color: 'var(--ivory-dim)' }}>每日一条 · 轻松入门</p>
        {tip && (
          <div className="glass rounded-[var(--radius-lg)] p-6 animate-fade-in-up ornament-border">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px]" style={{ background: 'rgba(201,149,74,0.15)', color: 'var(--gold)' }}>✦</div>
              <span className="text-[10px] tracking-wider" style={{ color: 'var(--gold-dark)' }}>今日知识</span>
            </div>
            <h2 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)' }}>{tip.title}</h2>
            <div className="text-sm leading-relaxed" style={{ color: 'var(--ivory-dim)' }}>{tip.content}</div>
          </div>
        )}
        <p className="text-center text-[10px] mt-8" style={{ color: 'rgba(237,228,212,0.2)' }}>明天再来学习新知识</p>
      </div>
      <BottomNav />
    </div>
  )
}
