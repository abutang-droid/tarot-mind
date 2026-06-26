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

// ─── Card Back ────────────────────────────────────────────────────
function CardBack({ floatDelay = 0 }: { floatDelay?: number }) {
  return (
    <div style={{
      width: 100, height: 148, position: 'relative',
      animation: `float 3s ease-in-out infinite`, animationDelay: `${floatDelay}s`,
    }}>
      <div className="card-back card-breath" style={{
        width: '100%', height: '100%', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        borderRadius: 'var(--radius-md)',
      }}>
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <circle cx="30" cy="30" r="28" stroke="rgba(201,149,74,0.2)" strokeWidth="0.8" />
          <circle cx="30" cy="30" r="22" stroke="rgba(201,149,74,0.15)" strokeWidth="0.5" />
          <circle cx="30" cy="30" r="16" stroke="rgba(201,149,74,0.1)" strokeWidth="0.5" />
          {[0,45,90,135,180,225,270,315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180
            return (
              <line key={i}
                x1={30 + 8 * Math.cos(rad)} y1={30 + 8 * Math.sin(rad)}
                x2={30 + 14 * Math.cos(rad)} y2={30 + 14 * Math.sin(rad)}
                stroke="rgba(201,149,74,0.35)" strokeWidth="0.8" strokeLinecap="round"
              />
            )
          })}
          <circle cx="30" cy="30" r="3" fill="rgba(201,149,74,0.4)" />
        </svg>
        {/* Corner ornaments */}
        {[
          { top: 6, left: 6, bt: 1, bl: 1 },
          { top: 6, right: 6, bt: 1, br: 1 },
          { bottom: 6, left: 6, bb: 1, bl: 1 },
          { bottom: 6, right: 6, bb: 1, br: 1 },
        ].map((p, i) => (
          <div key={i} style={{
            position: 'absolute', ...p, width: 8, height: 8,
            borderTop: p.bt ? '1px solid rgba(201,149,74,0.2)' : undefined,
            borderLeft: p.bl ? '1px solid rgba(201,149,74,0.2)' : undefined,
            borderRight: p.br ? '1px solid rgba(201,149,74,0.2)' : undefined,
            borderBottom: p.bb ? '1px solid rgba(201,149,74,0.2)' : undefined,
          }} />
        ))}
      </div>
    </div>
  )
}

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
          paddingTop: 48, paddingBottom: 32,
        }} className="animate-fade-in-up">
          <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
            <CardBack floatDelay={0} />
            <CardBack floatDelay={1} />
            <CardBack floatDelay={2} />
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600,
            color: 'var(--text-primary)', textAlign: 'center', marginBottom: 8,
            letterSpacing: '0.02em',
          }}>
            翻一张牌，看看今天怎么走
          </h1>
          <p style={{
            fontSize: 13, color: 'var(--text-secondary)', textAlign: 'center',
            marginBottom: 24, maxWidth: 280,
          }}>
            Vire a carta. O divino te espera.
          </p>

          <button className="btn-primary" onClick={() => router.push("/reading")}
            style={{ width: '100%', maxWidth: 300 }}>
            🔮 开始占卜 · 首次免费
          </button>

          <Link href="/temple" style={{
            marginTop: 16, fontSize: 13, color: 'var(--text-secondary)',
            textDecoration: 'none', fontFamily: 'var(--font-sans)',
          }}>
            🛐 先去拜个神，让今天被守护
          </Link>
        </div>

        {/* Today's Energy */}
        <section className="animate-fade-in-up delay-200" style={{ marginBottom: 32 }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 14,
          }}>
            <span className="section-label" style={{ fontSize: 11 }}>今日能量</span>
            <Link href="/fortune" style={{
              fontSize: 11, color: 'var(--gold)', textDecoration: 'none',
            }}>
              查看详情 →
            </Link>
          </div>
          <TodayEnergy />
        </section>

        {/* Temple banner */}
        <section className="animate-fade-in-up delay-300" style={{ marginBottom: 32 }}>
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

        {/* Footer */}
        <div style={{ textAlign: 'center', padding: '8px 0 24px' }}>
          <div className="section-label" style={{ fontSize: 9, letterSpacing: '0.2em' }}>
            SOB O MANTO
          </div>
        </div>
      </div>
    </>
  )
}
