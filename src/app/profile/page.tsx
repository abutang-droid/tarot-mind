"use client"
import { useState, useEffect } from "react"

export default function ProfilePage() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch usage stats without requiring login
    Promise.allSettled([
      fetch("/api/history?type=reading&page=1"),
      fetch("/api/history?type=daily-card&page=1"),
      fetch("/api/history?type=wish&page=1"),
    ]).then(([readingRes, dailyRes, wishRes]) => {
      const reading = readingRes.status === "fulfilled" && readingRes.value.ok
        ? readingRes.value.json() : Promise.resolve({ total: 0 })
      const daily = dailyRes.status === "fulfilled" && dailyRes.value.ok
        ? dailyRes.value.json() : Promise.resolve({ total: 0 })
      const wish = wishRes.status === "fulfilled" && wishRes.value.ok
        ? wishRes.value.json() : Promise.resolve({ total: 0 })
      Promise.all([reading, daily, wish]).then(([r, d, w]) => {
        setStats({ reading: r.total || 0, daily: d.total || 0, wish: w.total || 0 })
        setLoading(false)
      })
    }).catch(() => setLoading(false))
  }, [])

  const FEATURES = [
    { href: "/daily-card",  emoji: "🃏", label: "每日抽卡",   desc: "每天接收一张灵卡指引" },
    { href: "/reading",     emoji: "🔮", label: "三牌阵占卜", desc: "过去·现在·未来全局解读" },
    { href: "/wish",        emoji: "💫", label: "心愿占卜",   desc: "倾诉心愿，获得塔罗指引" },
    { href: "/fortune",     emoji: "⭐", label: "今日日运",   desc: "爱情·事业·财运·心情" },
    { href: "/knowledge",   emoji: "📖", label: "塔罗知识",   desc: "每日一条塔罗智慧" },
    { href: "/history",     emoji: "📋", label: "历史记录",   desc: "回顾你的占卜档案" },
  ]

  return (
    <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: '0 20px' }}>

      {/* ── Header ── */}
      <div className="page-header animate-fade-in-up">
        <span className="label">TAROT MIND</span>
        <h1>星象指引</h1>
        <p>探索内心，连接宇宙能量</p>
      </div>

      {/* ── Brand Card ── */}
      <div className="animate-fade-in-up" style={{
        background: 'linear-gradient(135deg, var(--gold-subtle) 0%, var(--bg-card) 100%)',
        border: '1px solid rgba(201,149,74,0.25)',
        borderRadius: 'var(--radius-xl)',
        padding: '28px 24px',
        marginBottom: 20,
        boxShadow: 'var(--shadow-gold)',
        textAlign: 'center',
        animationDelay: '0.1s',
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: 18,
          background: 'linear-gradient(135deg, var(--gold-light), var(--gold-dark))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px',
          fontSize: 28, color: '#fff',
          fontFamily: 'var(--font-display)',
          boxShadow: 'var(--shadow-gold)',
        }}>✦</div>
        <div style={{
          fontSize: 18, fontWeight: 700,
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-display)',
          letterSpacing: '0.08em',
          marginBottom: 6,
        }}>TarotMind</div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.7 }}>
          将东方神秘学与现代心理学结合<br />为你提供内心的情绪指引
        </div>
      </div>

      {/* ── Stats ── */}
      {!loading && stats && (
        <div className="animate-fade-in-up" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          gap: 10, marginBottom: 20, animationDelay: '0.15s',
        }}>
          {[
            { label: "牌阵占卜", value: stats.reading, unit: "次" },
            { label: "每日抽卡", value: stats.daily,   unit: "次" },
            { label: "心愿占卜", value: stats.wish,    unit: "次" },
          ].map(item => (
            <div key={item.label} style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '14px 10px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{
                fontSize: 22, fontWeight: 700,
                color: 'var(--gold)',
                fontFamily: 'var(--font-serif)',
                lineHeight: 1,
                marginBottom: 4,
              }}>
                {item.value}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{item.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── Feature List ── */}
      <div className="animate-fade-in-up" style={{ marginBottom: 24, animationDelay: '0.2s' }}>
        <div className="section-label" style={{ marginBottom: 12 }}>全部功能</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {FEATURES.map(f => (
            <a key={f.href} href={f.href} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 16px',
                display: 'flex', alignItems: 'center', gap: 12,
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(201,149,74,0.3)'
                el.style.boxShadow = 'var(--shadow-gold)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--border)'
                el.style.boxShadow = 'var(--shadow-sm)'
              }}
              >
                <span style={{ fontSize: 20, flexShrink: 0 }}>{f.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 13, fontWeight: 600,
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-serif)',
                    marginBottom: 2,
                  }}>
                    {f.label}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{f.desc}</div>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="var(--text-faint)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{ textAlign: 'center', padding: '4px 0 8px' }}>
        <div className="section-label" style={{ opacity: 0.4 }}>✦ TAROT MIND · 2026 ✦</div>
      </div>
    </div>
  )
}
