"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// ─── Starfield Canvas ─────────────────────────────────────────────
function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    const stars: { x: number; y: number; r: number; opacity: number; speed: number; hue: number }[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    for (let i = 0; i < 60; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.3 + 0.1,
        hue: Math.random() > 0.5 ? 40 : 260,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const star of stars) {
        star.y -= star.speed
        star.opacity += (Math.random() - 0.5) * 0.01
        star.opacity = Math.max(0.05, Math.min(0.6, star.opacity))
        if (star.y < -10) { star.y = canvas.height + 10; star.x = Math.random() * canvas.width }
        const color = star.hue === 40
          ? `rgba(201,149,74,${star.opacity})`
          : `rgba(126,111,168,${star.opacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
      }
      animId = requestAnimationFrame(animate)
    }
    animate()
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize) }
  }, [])

  return <canvas ref={canvasRef} className="star-canvas" aria-hidden="true" />
}

import CardFrame from "@/components/CardFrame"

// ─── Today's Energy ───────────────────────────────────────────────
function TodayEnergy() {
  const [energy, setEnergy] = useState<Record<string, { tag: string; text: string }> | null>(null)

  useEffect(() => {
    fetch("/api/fortune").then(r => r.json()).then(d => setEnergy(d)).catch(() => {})
  }, [])

  const dims = [
    { key: "love", label: "爱情", emoji: "💕" },
    { key: "work", label: "事业", emoji: "⭐" },
    { key: "wealth", label: "财运", emoji: "💰" },
    { key: "mood", label: "状态", emoji: "🧘" },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
      {dims.map(dim => (
        <div key={dim.key} style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)', padding: '14px 16px',
        }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>
            {dim.emoji} {dim.label}
          </div>
          {energy?.[dim.key]?.tag ? (
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold-light)' }}>
              {energy[dim.key].tag}
            </div>
          ) : (
            <div className="skeleton" style={{ height: 18, width: '70%' }} />
          )}
          {energy?.[dim.key]?.text && (
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>
              {energy[dim.key].text}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Homepage ────────────────────────────────────────────────────
export default function MantoHomePage() {
  const router = useRouter()

  return (
    <>
      <Starfield />
      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 'var(--content-max)', margin: '0 auto',
        padding: '0 20px',
      }}>
        {/* Hero: 3 Card Backs */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          paddingTop: 20, paddingBottom: 24,
        }} className="animate-fade-in-up">
          <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
            <div className="animate-float" style={{ animationDelay: '0s' }}>
              <CardFrame back width={130} glow />
            </div>
            <div className="animate-float" style={{ animationDelay: '1s' }}>
              <CardFrame back width={130} glow />
            </div>
            <div className="animate-float" style={{ animationDelay: '2s' }}>
              <CardFrame back width={130} glow />
            </div>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600,
            color: 'var(--text-primary)', textAlign: 'center', marginBottom: 4,
            letterSpacing: '0.02em', lineHeight: 1.35,
          }}>
            翻一张牌，看看今天怎么走
          </h1>
          <p style={{
            fontSize: 11, color: 'var(--text-secondary)', textAlign: 'center',
            marginBottom: 18, maxWidth: 260, lineHeight: 1.4,
          }}>
            Vire a carta. O divino te espera.
          </p>

          <button className="btn-primary" onClick={() => router.push("/reading")}
            style={{ width: '100%', maxWidth: 280, padding: '12px 28px', fontSize: 15 }}>
            🔮 开始占卜 · 首次免费
          </button>
        </div>

        {/* Today's Energy */}
        <section className="animate-fade-in-up delay-200" style={{ marginBottom: 24 }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 12,
          }}>
            <span className="section-label" style={{ fontSize: 10 }}>今日能量</span>
            <Link href="/fortune" style={{
              fontSize: 11, color: 'var(--gold)', textDecoration: 'none',
            }}>
              查看详情 →
            </Link>
          </div>
          <TodayEnergy />
        </section>

        {/* Temple banner */}
        <section className="animate-fade-in-up delay-300" style={{ marginBottom: 16 }}>
          <Link href="/temple" style={{ textDecoration: 'none' }}>
            <div className="card-gold card-hover" style={{
              padding: '24px 20px', display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'var(--bg-card-hover)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: 22,
                flexShrink: 0,
              }}>🛐</div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 15, fontWeight: 600, color: 'var(--text-primary)',
                  fontFamily: 'var(--font-serif)', marginBottom: 3,
                }}>每日拜神</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                  把手指放在神像上，感受被守护的一刻。
                </div>
              </div>
              <div style={{ color: 'var(--gold)', fontSize: 13 }}>→</div>
            </div>
          </Link>
        </section>
      </div>
    </>
  )
}
