"use client"
import { useState, useEffect } from "react"
import Link from "next/link"

interface FortuneData {
  love?:   { tag?: string; text?: string }
  work?:   { tag?: string; text?: string }
  wealth?: { tag?: string; text?: string }
  mood?:   { tag?: string; text?: string }
}

const QUICK_ACTIONS = [
  {
    href: "/daily-card",
    emoji: "🃏",
    label: "每日抽卡",
    desc: "接收今日灵卡讯息",
    color: "#C9954A",
    bg: "rgba(201,149,74,0.08)",
  },
  {
    href: "/reading",
    emoji: "🔮",
    label: "三牌阵占卜",
    desc: "过去·现在·未来",
    color: "#7E6FA8",
    bg: "rgba(126,111,168,0.08)",
  },
  {
    href: "/wish",
    emoji: "💫",
    label: "心愿占卜",
    desc: "倾诉你的心愿",
    color: "#C87B6E",
    bg: "rgba(200,123,110,0.08)",
  },
  {
    href: "/fortune",
    emoji: "⭐",
    label: "今日日运",
    desc: "爱情·事业·财运",
    color: "#5B7FA6",
    bg: "rgba(91,127,166,0.08)",
  },
  {
    href: "/angel-card",
    emoji: "👼",
    label: "天使牌",
    desc: "神圣指引·天使讯息",
    color: "#D4A853",
    bg: "rgba(212,168,83,0.08)",
  },
  {
    href: "/dream",
    emoji: "🌙",
    label: "梦境解析",
    desc: "潜意识·符号解读",
    color: "#9882C0",
    bg: "rgba(152,130,192,0.08)",
  },
]

const FORTUNE_DIMS = [
  { key: "love",   label: "爱情", color: "#C87B6E" },
  { key: "work",   label: "事业", color: "#5B7FA6" },
  { key: "wealth", label: "财运", color: "#C9954A" },
  { key: "mood",   label: "心情", color: "#7E6FA8" },
]

export default function HomePage() {
  const [user, setUser] = useState<any>(null)
  const [fortune, setFortune] = useState<FortuneData | null>(null)
  const [tip, setTip] = useState<{ title?: string; content?: string } | null>(null)
  const [greeting, setGreeting] = useState("晚上好")

  useEffect(() => {
    const h = new Date().getHours()
    if (h < 6)       setGreeting("夜深了")
    else if (h < 12) setGreeting("早上好")
    else if (h < 18) setGreeting("下午好")
    else             setGreeting("晚上好")

    Promise.allSettled([
      fetch("/api/auth/me"),
      fetch("/api/fortune"),
      fetch("/api/knowledge"),
    ]).then(([meRes, fortuneRes, tipRes]) => {
      if (meRes.status === "fulfilled" && meRes.value.ok)
        meRes.value.json().then(d => setUser(d.user)).catch(() => {})
      if (fortuneRes.status === "fulfilled" && fortuneRes.value.ok)
        fortuneRes.value.json().then(d => setFortune(d)).catch(() => {})
      if (tipRes.status === "fulfilled" && tipRes.value.ok)
        tipRes.value.json().then(d => setTip(d)).catch(() => {})
    })
  }, [])

  return (
    <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: '0 20px' }}>

      {/* ── Hero Header ── */}
      <div className="animate-fade-in-up" style={{ padding: '32px 0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="section-label" style={{ marginBottom: 6 }}>TarotMind</div>
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 24, fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: 4,
            }}>
              {greeting}，{user?.nickname || "星探者"} ✨
            </h1>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
              星象已就位，今日的指引正在等待你
            </p>
          </div>
          <Link href="/profile" style={{
            width: 42, height: 42, borderRadius: '50%',
            border: '1.5px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--bg-card)',
            textDecoration: 'none',
            boxShadow: 'var(--shadow-sm)',
            flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="var(--text-muted)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7"/>
            </svg>
          </Link>
        </div>
      </div>

      {/* ── Quick Actions Grid ── */}
      <section className="animate-fade-in-up" style={{ marginBottom: 28, animationDelay: '0.1s' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {QUICK_ACTIONS.map((action, i) => (
            <Link
              key={action.href}
              href={action.href}
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '18px 16px',
                display: 'flex', flexDirection: 'column', gap: 10,
                minHeight: 110,
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = `${action.color}40`
                el.style.boxShadow = `0 4px 20px ${action.color}18`
                el.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--border)'
                el.style.boxShadow = 'var(--shadow-sm)'
                el.style.transform = 'none'
              }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: action.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20,
                }}>
                  {action.emoji}
                </div>
                <div>
                  <div style={{
                    fontSize: 14, fontWeight: 600,
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-serif)',
                    marginBottom: 3,
                  }}>
                    {action.label}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    {action.desc}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Today's Fortune ── */}
      <section className="animate-fade-in-up" style={{ marginBottom: 24, animationDelay: '0.2s' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span className="section-label">今日能量</span>
          <Link href="/fortune" style={{ fontSize: 12, color: 'var(--gold)', textDecoration: 'none' }}>
            查看详情 →
          </Link>
        </div>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '18px 20px',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {FORTUNE_DIMS.map(dim => {
              const data = fortune?.[dim.key as keyof FortuneData]
              return (
                <div key={dim.key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: dim.color, flexShrink: 0,
                  }} />
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>{dim.label}</div>
                    {data?.tag ? (
                      <div style={{
                        fontSize: 11, fontWeight: 600,
                        color: dim.color,
                        background: `${dim.color}12`,
                        padding: '1px 8px',
                        borderRadius: 20,
                        display: 'inline-block',
                      }}>
                        {data.tag}
                      </div>
                    ) : (
                      <div className="skeleton" style={{ height: 18, width: 56 }} />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Shortcuts ── */}
      <section className="animate-fade-in-up" style={{ marginBottom: 24, animationDelay: '0.3s' }}>
        <div style={{ display: 'flex', gap: 10 }}>
          {[
            { href: '/knowledge', emoji: '📖', label: '塔罗知识', sub: '每日一条' },
            { href: '/history',   emoji: '📋', label: '历史记录', sub: '回顾档案' },
          ].map(item => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none', flex: 1 }}>
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 16px',
                display: 'flex', alignItems: 'center', gap: 10,
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.2s ease',
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
                <span style={{ fontSize: 18 }}>{item.emoji}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.sub}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Tarot Tip ── */}
      {tip && (
        <section className="animate-fade-in-up" style={{ marginBottom: 24, animationDelay: '0.4s' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--gold-subtle) 0%, var(--bg-card) 100%)',
            border: '1px solid rgba(201,149,74,0.2)',
            borderRadius: 'var(--radius-lg)',
            padding: '18px 20px',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 14, color: 'var(--gold)' }}>✦</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>
                {tip.title || '塔罗智慧'}
              </span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.75, margin: 0 }}>
              {tip.content || (tip as any).tip || ''}
            </p>
          </div>
        </section>
      )}

      {/* ── Footer ornament ── */}
      <div style={{ textAlign: 'center', padding: '4px 0 8px' }}>
        <div className="section-label" style={{ opacity: 0.4 }}>✦ TAROT MIND ✦</div>
      </div>
    </div>
  )
}
