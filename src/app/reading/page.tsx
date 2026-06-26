"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import TarotCard from "@/components/TarotCard"
import CrystalCard from "@/components/CrystalCard"
import { ALL_CARDS } from "@/lib/tarot/cards"

const QUICK_QUESTIONS = [
  "近期感情走势如何",
  "工作是否顺利",
  "近期财运如何",
  "这个选择是否适合我",
  "我需要关注什么",
]

const POSITIONS = ["过去", "现在", "未来"]
const POSITION_COLORS = ["var(--purple)", "var(--gold)", "var(--green)"]
const POSITION_BG = ["var(--purple-pale)", "var(--gold-pale)", "var(--green-pale)"]

export default function ReadingPage() {
  const router = useRouter()
  const [question, setQuestion] = useState("")
  const [step, setStep] = useState<"input" | "drawing" | "result">("input")
  const [result, setResult] = useState<any>(null)
  const [flippedCards, setFlippedCards] = useState<boolean[]>([false, false, false])
  const [loading, setLoading] = useState(false)

  async function handleStart() {
    if (!question.trim()) return
    setLoading(true)
    setStep("drawing")
    try {
      const res = await fetch("/api/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spreadType: "three", question: question.trim() }),
      })
      if (!res.ok) throw new Error("占卜失败")
      const data = await res.json()
      setResult(data)
      setLoading(false)
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          setFlippedCards(prev => { const n = [...prev]; n[i] = true; return n })
        }, (i + 1) * 700)
      }
      setTimeout(() => setStep("result"), 3200)
    } catch {
      setLoading(false)
      setStep("input")
    }
  }

  const getCardMeta = (name: string) => ALL_CARDS.find(c => c.name === name)

  return (
    <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: '0 20px' }}>

      {/* ── Header ── */}
      <div className="page-header animate-fade-in-up">
        <span className="label">THREE-CARD SPREAD</span>
        <h1>三牌阵占卜</h1>
        <p>过去 · 现在 · 未来，洞见全局</p>
      </div>

      {/* ── Input Step ── */}
      {step === "input" && (
        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div style={{ marginBottom: 14 }}>
            <textarea
              className="input-field"
              rows={3}
              placeholder="写下你想占卜的问题，越具体越好…"
              value={question}
              onChange={e => setQuestion(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <div className="section-label" style={{ marginBottom: 10 }}>快速选择</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {QUICK_QUESTIONS.map(q => (
                <button
                  key={q}
                  onClick={() => setQuestion(q)}
                  style={{
                    padding: '7px 14px', borderRadius: 'var(--radius-pill)', fontSize: 12,
                    background: question === q ? 'var(--gold-pale)' : 'var(--bg-card)',
                    border: `1.5px solid ${question === q ? 'var(--gold)' : 'var(--border)'}`,
                    color: question === q ? 'var(--gold-dark)' : 'var(--text-secondary)',
                    cursor: 'pointer', transition: 'all 0.15s ease',
                    fontWeight: question === q ? 600 : 400,
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <button
            className="btn-primary"
            onClick={handleStart}
            disabled={!question.trim() || loading}
            style={{ width: '100%' }}
          >
            ✦ 开始占卜
          </button>
        </div>
      )}

      {/* ── Drawing Step ── */}
      {step === "drawing" && (
        <div className="animate-fade-in-up" style={{ textAlign: 'center', paddingTop: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 32 }}>
            {[0, 1, 2].map(i => {
              const card = result?.cards?.[i]
              const meta = card ? getCardMeta(card.cardName) : null
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    fontSize: 10, fontWeight: 600,
                    color: POSITION_COLORS[i],
                    background: POSITION_BG[i],
                    padding: '2px 10px', borderRadius: 20,
                    opacity: flippedCards[i] ? 1 : 0.4,
                    transition: 'opacity 0.3s ease',
                  }}>
                    {POSITIONS[i]}
                  </div>
                  <TarotCard
                    name={card?.cardName || ""}
                    orientation={card?.orientation || "正位"}
                    flipped={flippedCards[i]}
                    arcana={meta?.arcana}
                    suit={meta?.suit}
                    number={meta?.number}
                    symbol={meta?.symbol || "fool"}
                    small
                  />
                </div>
              )
            })}
          </div>
          {loading && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div className="spinner" />
              <div style={{ fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.06em' }}>星象解读中…</div>
            </div>
          )}
        </div>
      )}

      {/* ── Result Step ── */}
      {step === "result" && result && (
        <div className="animate-fade-in-up">

          {/* Question recap */}
          <div style={{
            background: 'var(--gold-subtle)',
            border: '1px solid rgba(201,149,74,0.2)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 16px',
            marginBottom: 20,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ fontSize: 14, color: 'var(--gold)' }}>◎</span>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontFamily: 'var(--font-serif)' }}>{question}</span>
          </div>

          {/* Cards summary */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
            {result.cards?.map((card: any, i: number) => {
              const meta = getCardMeta(card.cardName)
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{
                    fontSize: 10, fontWeight: 600,
                    color: POSITION_COLORS[i],
                    background: POSITION_BG[i],
                    padding: '2px 10px', borderRadius: 20,
                  }}>
                    {POSITIONS[i]}
                  </div>
                  <TarotCard
                    name={card.cardName}
                    orientation={card.orientation}
                    flipped={true}
                    arcana={meta?.arcana}
                    suit={meta?.suit}
                    number={meta?.number}
                    symbol={meta?.symbol || "fool"}
                    small
                  />
                  <div style={{
                    fontSize: 10, color: 'var(--text-muted)',
                    textAlign: 'center', maxWidth: 72,
                  }}>
                    {card.cardName}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Card interpretations */}
          {result.cards?.map((card: any, i: number) => (
            <div
              key={i}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '18px 20px',
                marginBottom: 12,
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{
                  fontSize: 10, fontWeight: 600,
                  color: POSITION_COLORS[i],
                  background: POSITION_BG[i],
                  padding: '2px 10px', borderRadius: 20,
                }}>
                  {card.position || POSITIONS[i]}
                </span>
                <span style={{
                  fontSize: 14, fontWeight: 700,
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-serif)',
                }}>
                  {card.cardName}
                </span>
                <span style={{
                  fontSize: 11, fontWeight: 500,
                  color: card.orientation === '正位' ? 'var(--green)' : 'var(--rose)',
                  background: card.orientation === '正位' ? 'var(--green-pale)' : 'var(--rose-pale)',
                  padding: '1px 8px', borderRadius: 20,
                  marginLeft: 'auto',
                }}>
                  {card.orientation === '正位' ? '↑ 正位' : '↓ 逆位'}
                </span>
              </div>
              {card.keywords && (
                <div style={{ fontSize: 11, color: 'var(--gold)', marginBottom: 8 }}>{card.keywords}</div>
              )}
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.85 }}>
                {card.interpretation}
              </div>
            </div>
          ))}

          {/* Relationships */}
          {result.relationships && (
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '18px 20px',
              marginBottom: 12,
              boxShadow: 'var(--shadow-sm)',
            }}>
              <div className="section-label" style={{ marginBottom: 10 }}>牌与牌的关联</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.85 }}>
                {result.relationships}
              </div>
            </div>
          )}

          {/* Conclusion */}
          {result.conclusion && (
            <div style={{
              background: 'linear-gradient(135deg, var(--gold-subtle), var(--bg-card))',
              border: '1px solid rgba(201,149,74,0.25)',
              borderRadius: 'var(--radius-lg)',
              padding: '22px',
              marginBottom: 14,
              boxShadow: 'var(--shadow-gold)',
            }}>
              <div className="section-label" style={{ marginBottom: 12 }}>综合解读</div>
              <div style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.9, fontFamily: 'var(--font-serif)' }}>
                {result.conclusion}
              </div>
            </div>
          )}

          {/* Crystal */}
          {result.crystalName && (
            <div style={{ marginBottom: 14 }}>
              <CrystalCard
                name={result.crystalName}
                spec={result.crystalSpec}
                description={result.crystalDescription}
              />
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10, paddingBottom: 8 }}>
            <button
              className="btn-outline"
              onClick={() => { setStep("input"); setQuestion(""); setResult(null); setFlippedCards([false, false, false]) }}
              style={{ flex: 1 }}
            >
              ↺ 再次占卜
            </button>
            <button
              className="btn-primary"
              onClick={() => router.push("/history?tab=reading")}
              style={{ flex: 1 }}
            >
              查看记录
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
