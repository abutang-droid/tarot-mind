"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import BottomNav from "@/components/BottomNav"

export default function HomePage() {
  const [user, setUser] = useState<any>(null)
  const [fortune, setFortune] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch("/api/auth/me").then(r => r.json()),
      fetch("/api/fortune").then(r => r.json()),
    ]).then(([u, f]) => {
      setUser(u.user)
      setFortune(f)
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-[1.5px] border-[rgba(201,149,74,0.2)] border-t-[#C9954A] animate-spin" />
        <span className="text-sm text-[rgba(237,228,212,0.4)] tracking-wider">加载中…</span>
      </div>
    </div>
  )

  const dims = fortune ? [
    { label: "爱情", tag: fortune.love?.tag || "今日顺遂", icon: "♀" },
    { label: "事业", tag: fortune.work?.tag || "稳中求进", icon: "♂" },
    { label: "财运", tag: fortune.wealth?.tag || "平稳致远", icon: "◎" },
    { label: "心情", tag: fortune.mood?.tag || "晴空万里", icon: "☽" },
  ] : []

  return (
    <div className="min-h-screen" style={{ paddingBottom: '84px' }}>
      <div className="max-w-lg mx-auto px-5 pt-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full glass-strong animate-glow-pulse mb-4" style={{ borderColor: 'var(--gold)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9954A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a9 9 0 1 0 9 9"/><path d="M12 7a5 5 0 1 0 5 5"/><circle cx="12" cy="12" r="1" fill="#C9954A"/></svg>
          </div>
          <h1 className="text-[22px] font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)', letterSpacing: '0.06em' }}>TarotMind</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--ivory-dim)' }}>你好，{user?.nickname || "星月"}</p>
        </div>

        {dims.length > 0 && (
          <div className="glass rounded-[var(--radius-lg)] p-5 mb-8 animate-fade-in-up ornament-border">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--gold)', fontFamily: 'var(--font-display)', letterSpacing: '0.08em' }}>今日能量</span>
              <span className="text-[10px]" style={{ color: 'var(--ivory-dimmer)' }}>每日更新</span>
            </div>
            <div className="grid grid-cols-2 gap-[10px]">
              {dims.map(item => (
                <div key={item.label} className="rounded-[var(--radius-sm)] p-3" style={{ background: 'rgba(237,228,212,0.03)', border: '1px solid rgba(201,149,74,0.08)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px]" style={{ color: 'var(--gold-dark)' }}>{item.icon}</span>
                    <span className="text-[10px] tracking-wider uppercase" style={{ color: 'var(--ivory-dimmer)' }}>{item.label}</span>
                  </div>
                  <span className="text-sm font-medium" style={{ color: 'var(--ivory)', letterSpacing: '0.02em' }}>{item.tag}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          {[
            { href: "/daily-card", label: "每日抽卡", sub: "抽取今日灵卡", glyph: "Ⅰ" },
            { href: "/wish", label: "心愿占卜", sub: "一键获取指引", glyph: "Ⅱ" },
            { href: "/fortune", label: "日运播报", sub: "爱情·事业·财运", glyph: "Ⅲ" },
            { href: "/reading", label: "三牌阵", sub: "过去·现在·未来", glyph: "Ⅳ" },
            { href: "/knowledge", label: "塔罗知识", sub: "每日一条", glyph: "Ⅴ" },
            { href: "/history", label: "历史记录", sub: "回顾档案", glyph: "Ⅵ" },
          ].map((mod) => (
            <Link key={mod.href} href={mod.href} className="glass rounded-[var(--radius-md)] p-4 group hover:border-[rgba(201,149,74,0.3)] transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <span className="text-[11px] font-mono" style={{ color: 'var(--gold-dark)', opacity: 0.5 }}>{mod.glyph}</span>
                <svg className="opacity-0 group-hover:opacity-100 transition-opacity" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </div>
              <div className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)', color: 'var(--ivory)' }}>{mod.label}</div>
              <div className="text-[11px] mt-0.5" style={{ color: 'var(--ivory-dimmer)' }}>{mod.sub}</div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12 mb-4"><div className="text-[9px] tracking-[0.15em]" style={{ color: 'rgba(237,228,212,0.12)' }}>TAROTMIND · 塔罗占卜</div></div>
      </div>
      <BottomNav />
    </div>
  )
}
