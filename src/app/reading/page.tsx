"use client"
import { useState, useCallback, useRef, useEffect } from "react"
import Link from "next/link"

// ─── Types ─────────────────────────────────────────────────────────
type ReadingStep = "question" | "shuffle" | "reveal" | "interpreting" | "synthesis" | "profile" | "crystal_quiz" | "blessing"
type SpreadType = "single" | "three"

interface CardData {
  position: string
  positionLabel: string
  cardName: string
  cardNameEn: string
  orientation: "正位" | "逆位"
  element: string
  interpretation: string
  mantra: string
  revealed: boolean
}

// ─── Card Flip Component ─────────────────────────────────────────
function CardInReading({
  card, onClick, disabled, positionLabel,
}: {
  card: CardData; onClick: () => void; disabled: boolean; positionLabel: string
}) {
  const [flipping, setFlipping] = useState(false)

  const handleClick = () => {
    if (disabled || flipping || card.revealed) return
    setFlipping(true)
    setTimeout(() => { setFlipping(false); onClick() }, 500)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: disabled ? 0.4 : 1 }}>
      <div onClick={handleClick} style={{
        width: 100, height: 148, perspective: '600px',
        cursor: disabled || card.revealed ? 'default' : 'pointer', position: 'relative',
      }}>
        <div style={{
          width: '100%', height: '100%', position: 'relative',
          transformStyle: 'preserve-3d',
          transform: card.revealed ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: flipping ? 'transform 0.4s cubic-bezier(0.4,0,0.2,1)' : 'none',
        }}>
          {/* Back */}
          <div className="card-back card-breath" style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
            justifyContent: 'center', borderRadius: 'var(--radius-md)', backfaceVisibility: 'hidden',
          }}>
            <svg width="40" height="40" viewBox="0 0 60 60" fill="none">
              <circle cx="30" cy="30" r="26" stroke="rgba(201,149,74,0.2)" strokeWidth="0.8" />
              {[0,45,90,135,180,225,270,315].map((a, i) => (
                <line key={i} x1={30 + 7 * Math.cos(a * Math.PI / 180)} y1={30 + 7 * Math.sin(a * Math.PI / 180)}
                  x2={30 + 13 * Math.cos(a * Math.PI / 180)} y2={30 + 13 * Math.sin(a * Math.PI / 180)}
                  stroke="rgba(201,149,74,0.3)" strokeWidth="0.7" strokeLinecap="round" />
              ))}
              <circle cx="30" cy="30" r="3" fill="rgba(201,149,74,0.35)" />
            </svg>
          </div>
          {/* Front */}
          <div style={{
            position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #1a1008, #2C1F0E, #3D2B14)',
            border: '1.5px solid rgba(201,149,74,0.4)', borderRadius: 'var(--radius-md)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '12px 8px', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)',
            boxShadow: '0 0 18px rgba(201,149,74,0.2)',
          }}>
            <div style={{ fontSize: 10, color: 'var(--gold)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', marginBottom: 4 }}>{card.cardNameEn}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', textAlign: 'center' }}>{card.cardName}</div>
            <div style={{ marginTop: 8, fontSize: 10, color: 'var(--gold-light)', background: 'rgba(201,149,74,0.1)', padding: '2px 8px', borderRadius: 'var(--radius-pill)' }}>{card.orientation}位</div>
          </div>
        </div>
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>{positionLabel}</div>
    </div>
  )
}

// ─── Step Indicator ─────────────────────────────────────────────
const STEP_NAMES = ["问牌", "翻牌", "解读", "融通", "资料", "水晶", "护持"] as const
const STEP_KEYS: ReadingStep[] = ["question", "reveal", "interpreting", "synthesis", "profile", "crystal_quiz", "blessing"]

function StepIndicator({ step }: { step: ReadingStep }) {
  const activeKey = step === "shuffle" ? "reveal" : step
  const currentIdx = STEP_KEYS.indexOf(activeKey)
  const idx = currentIdx === -1 ? 0 : currentIdx

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 32 }}>
      {STEP_NAMES.map((name, i) => (
        <span
          key={name}
          style={{
            padding: '4px 12px', fontSize: 11, borderRadius: 'var(--radius-pill)',
            background: i <= idx ? 'var(--bg-card-hover)' : 'transparent',
            color: i <= idx ? 'var(--gold-light)' : 'var(--text-muted)',
            display: 'inline-block', fontFamily: 'var(--font-sans)',
          }}
        >
          {i < idx ? `✓ ${name}` : name}
        </span>
      ))}
    </div>
  )
}

// ─── Streaming Text ───────────────────────────────────────────────
function StreamingText({ text, isStreaming }: { text: string; isStreaming: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [autoScroll, setAutoScroll] = useState(true)

  useEffect(() => {
    if (autoScroll && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [text, autoScroll])

  if (!text) return null

  return (
    <div style={{ position: 'relative' }}>
      <div ref={containerRef} onScroll={() => {
        if (containerRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = containerRef.current
          setAutoScroll(scrollHeight - scrollTop - clientHeight < 30)
        }
      }} style={{
        maxHeight: 280, overflowY: 'auto', padding: '16px 18px',
        background: 'var(--bg-card)', borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)', fontSize: 14, lineHeight: 1.8,
        color: 'var(--text-primary)', whiteSpace: 'pre-wrap',
      }}>
        {text}
        {isStreaming && <span style={{ display: 'inline-block', width: 8, height: 16, background: 'var(--gold-light)', marginLeft: 2, animation: 'fade-in 0.3s ease infinite alternate', verticalAlign: 'text-bottom', borderRadius: 1 }} />}
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────
export default function ReadingPage() {
  const [step, setStep] = useState<ReadingStep>("question")
  const [question, setQuestion] = useState("")
  const [spreadType, setSpreadType] = useState<SpreadType>("three")
  const [cards, setCards] = useState<CardData[]>([])
  const [synthesisText, setSynthesisText] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [blessing, setBlessing] = useState<{ wuxing: string; crystal: string; crystalName: string; affirmation: string } | null>(null)
  const [streamingText, setStreamingText] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const [currentCardIdx, setCurrentCardIdx] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [quizStep, setQuizStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<{wuxing:string;label:string}[]>([])
  const [quizData, setQuizData] = useState<{questions:{question:string;options:{label:string;wuxing:string}[]}[]}|null>(null)
  const [profileStep, setProfileStep] = useState(0) // 0,1,2,3 for 4 profile questions
  const [profile, setProfile] = useState({ name: "", birthdate: "", gender: "", occupation: "" })
  const [readingId, setReadingId] = useState<string | null>(null)

  const questionTags = [
    { emoji: "💕", label: "感情" }, { emoji: "💰", label: "财运" },
    { emoji: "💼", label: "工作" }, { emoji: "🏠", label: "家庭" },
    { emoji: "🧠", label: "选择" }, { emoji: "🎲", label: "今日运势" },
  ]

  const crystalMap: Record<string, { name: string; emoji: string }> = {
    "木": { name: "绿幽灵", emoji: "🌿" },
    "火": { name: "红玛瑙", emoji: "🔥" },
    "土": { name: "黄水晶", emoji: "⛰️" },
    "金": { name: "白水晶", emoji: "✨" },
    "水": { name: "黑曜石", emoji: "💧" },
  }

  const startReading = useCallback(async (skipQuestion = false) => {
    setError(null); setStep("shuffle")
    const q = skipQuestion ? "" : question
    try {
      const resp = await fetch("/api/reading", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, spreadType }),
      })
      if (!resp.ok) throw new Error("Failed")
      const data = await resp.json()
      setCards(data.cards.map((c: any) => ({ ...c, revealed: false, interpretation: "", mantra: "" })))
      setReadingId(data.readingId); setStep("reveal")
    } catch (e: any) {
      setError("连接星象失败，请重试"); setStep("question")
    }
  }, [question, spreadType])

  const revealCard = useCallback(async (cardIndex: number) => {
    const updated = cards.map((c, i) => i === cardIndex ? { ...c, revealed: true } : c)
    setCards(updated); setCurrentCardIdx(cardIndex); setStep("interpreting")

    const card = updated[cardIndex]
    const interpretation = card.orientation === "正位"
      ? `${card.cardName}在${card.position === "past" ? "过去位" : card.position === "present" ? "现在位" : "未来位"}——正位的力量正在顺畅地流动。这张牌暗示着${card.element === "火" ? "行动与激情" : card.element === "水" ? "情感与直觉" : card.element === "风" ? "思维与沟通" : card.element === "土" ? "稳固与现实" : "命运的安排"}正在主导这个阶段。${question ? `关于你问的"${question}"——牌面显示这是需要你主动迎接而非回避的事。` : "今天的能量偏向积极进取，适合做出决定。"}`
      : `${card.cardName}的逆位出现在${card.position === "past" ? "过去位" : card.position === "present" ? "现在位" : "未来位"}。逆位不是坏消息——它提醒你有些能量正在被压抑。${card.element === "火" ? "热情可能需要换个方向释放" : card.element === "水" ? "情绪或许需要一个出口" : card.element === "风" ? "想法可能需要重新整理" : card.element === "土" ? "根基可能需要在另一个方向重建" : "命运正在转弯"}。${question ? `对于"${question}"——牌面建议你退一步看全局，而非急于求成。` : "今天多给自己一点安静的时间。"}`

    const mantra = card.orientation === "正位"
      ? "顺势而行，不必强求。"
      : "有时候后退一步，是为了看清全貌。"

    setTimeout(() => {
      const final = [...cards]
      final[cardIndex] = { ...card, revealed: true, interpretation, mantra }
      setCards(final)

      if (cardIndex >= cards.length - 1) {
        doSynthesis(final)
      } else {
        setCurrentCardIdx(cardIndex + 1)
        setStep("reveal")
      }
    }, 800)
  }, [cards])

  const doSynthesis = useCallback((currentCards: CardData[]) => {
    setStep("synthesis")
    const elements = currentCards.map(c => c.element).filter(Boolean)
    const reversedCount = currentCards.filter(c => c.orientation === "逆位").length

    const fireCount = elements.filter(e => e === "火").length
    const waterCount = elements.filter(e => e === "水").length
    const windCount = elements.filter(e => e === "风").length
    const earthCount = elements.filter(e => e === "土").length
    const majorCount = elements.filter(e => !["火","水","风","土"].includes(e)).length

    let wuxing = "土"
    if (fireCount >= 2)            wuxing = "木"
    else if (waterCount >= 2)      wuxing = "火"
    else if (windCount >= 2)       wuxing = "金"
    else if (earthCount >= 2)      wuxing = "土"
    else if (reversedCount >= 2)   wuxing = "水"
    else if (fireCount === 1)      wuxing = "木"
    else if (waterCount === 1)     wuxing = "火"
    else if (windCount === 1)      wuxing = "金"
    else if (earthCount === 1)     wuxing = "土"
    else if (majorCount >= 1)      wuxing = "土"

    const c0 = currentCards[0] || { cardName: "?", orientation: "正位" as const }
    const c1 = currentCards[1] || { cardName: "?", orientation: "正位" as const }
    const c2 = currentCards[2] || { cardName: "?", orientation: "正位" as const }

    setSynthesisText(`这三张牌共同描绘了你当下的处境。${c0.cardName}在${c0.orientation === "正位" ? "顺流" : "提醒"}中指向你的过往——那段经历至今仍在塑造着你的选择。${c1.cardName}代表此刻的能量，${c1.orientation === "正位" ? "它正推动你向前" : "它在温柔地劝你慢下来"}。而${c2.cardName}已经在地平线上展开了未来的可能——${c2.orientation === "正位" ? "那是一条清晰的路" : "那是一条藏在迷雾中的路，需要你多一分耐心"}。`)

    setSuggestions([
      c0.orientation === "正位" ? "把过去的经验当成指南，而非包袱。" : "有些旧事不需要现在解决——允许自己放一放。",
      "接下来的三天里，做一件你一直拖着的小事。不为什么，就是为了证明给自己看。",
      c2.orientation === "正位" ? "信任你第一直觉给的方向——那就是对的。" : "在迷雾中，最好的策略不是乱冲，是站定了等风来。",
    ])

    // Fetch AI-generated quiz questions
    fetch("/api/reading/crystal-quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cards: currentCards, question, profile }),
    })
      .then(r => r.json())
      .then(data => { setQuizData(data); setStep("profile") })
      .catch(() => { setQuizData(null); setStep("profile") })
  }, [question, profile])

  const finishQuiz = useCallback(() => {
    // Count wuxing votes from all 3 answers
    const counts: Record<string,number> = {}
    quizAnswers.forEach(a => { counts[a.wuxing] = (counts[a.wuxing]||0) + 1 })
    let wuxing = "土"
    let max = 0
    for (const [k,v] of Object.entries(counts)) { if (v > max) { max = v; wuxing = k } }

    const crystal = crystalMap[wuxing] || { name: "白水晶", emoji: "✨" }

    setBlessing({
      wuxing,
      crystal: wuxing,
      crystalName: crystal.name,
      affirmation: wuxing === "木" ? "我允许自己生长，以我的速度。"
        : wuxing === "火" ? "我的热情足够温暖自己，也能照亮别人。"
        : wuxing === "土" ? "我站得很稳。没有什么能动摇我。"
        : wuxing === "金" ? "清晰即力量。我知道自己在做什么。"
        : "我的平静比任何风暴都更有力量。",
    })
    setStep("blessing")
  }, [quizAnswers])

  const positionLabels: Record<string, string> = {
    past: "过去", present: "现在", future: "未来", current: "此刻",
  }

  // ── Question Step ──
  if (step === "question") {
    return (
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ paddingTop: 40, paddingBottom: 32 }}>
          <div className="page-header" style={{ padding: '20px 0' }}>
            <span className="label">🔮 塔罗占卜</span>
            <h1>你想问什么？</h1>
            <p>也可以跳过，直接翻一张今日运势牌</p>
          </div>
          <div style={{ marginBottom: 20 }}>
            <input className="input-field" placeholder="换工作？TA 到底怎么想的？今天运势如何？"
              value={question} onChange={e => setQuestion(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") startReading(false) }} autoFocus maxLength={200} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
            {questionTags.map(tag => (
              <button key={tag.label} className="tag" onClick={() => setQuestion(tag.label === "今日运势" ? "" : `${tag.emoji} ${tag.label}`)}
                style={{ fontFamily: 'var(--font-sans)', border: 'none', cursor: 'pointer' }}>
                {tag.emoji} {tag.label}
              </button>
            ))}
          </div>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>牌阵选择</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { type: "three" as const, label: "三牌阵", desc: "过去·现在·未来", price: "$0.99" },
                { type: "single" as const, label: "单牌直断", desc: "快速指引", price: "$0.49" },
              ].map(s => (
                <button key={s.type} onClick={() => setSpreadType(s.type)} style={{
                  flex: 1, padding: '14px 16px',
                  background: spreadType === s.type ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                  border: `1px solid ${spreadType === s.type ? 'var(--border-focus)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-md)', cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.15s ease', color: 'var(--text-primary)',
                }}>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3 }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.desc} · {s.price}</div>
                </button>
              ))}
            </div>
          </div>
          <button className="btn-primary" onClick={() => startReading(false)} style={{ width: '100%' }}>🔮 开始翻牌</button>
          <button className="btn-ghost" onClick={() => startReading(true)} style={{ width: '100%', marginTop: 10 }}>跳过 · 直接翻今日运势</button>
        </div>
      </div>
    )
  }

  // ── Card Steps ──
  return (
    <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: '0 20px' }}>
      <div style={{ paddingTop: 32, paddingBottom: 32 }}>
        <StepIndicator step={step} />

        {question && <div style={{ textAlign: 'center', marginBottom: 24, fontSize: 14, color: 'var(--text-secondary)', fontFamily: 'var(--font-serif)' }}>"{question}"</div>}

        {/* Cards */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
          {cards.map((card, idx) => (
            <CardInReading key={idx} card={card} positionLabel={positionLabels[card.position] || card.position}
              disabled={step === "interpreting" || step === "synthesis" || step === "profile" || step === "crystal_quiz" || step === "blessing" || idx !== currentCardIdx}
              onClick={() => revealCard(idx)} />
          ))}
        </div>

        {(step === "reveal" || step === "interpreting") && currentCardIdx < cards.length && cards[currentCardIdx]?.interpretation && (
          <div className="animate-fade-in" style={{
            padding: '16px 18px', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)', fontSize: 14, lineHeight: 1.8, color: 'var(--text-primary)', marginBottom: 16,
          }}>
            {cards[currentCardIdx].interpretation}
            <div style={{ marginTop: 12, fontWeight: 600, color: 'var(--gold-light)', fontFamily: 'var(--font-serif)', fontSize: 15 }}>
              ✦ {cards[currentCardIdx].mantra}
            </div>
          </div>
        )}

        {step === "reveal" && (
          <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16, fontFamily: 'var(--font-serif)' }}>
            {currentCardIdx < cards.length ? `点一张牌翻开 · 从${positionLabels[cards[currentCardIdx]?.position] || "..."}开始 · 已翻 ${currentCardIdx}/${cards.length}` : "全部翻开完成"}
          </div>
        )}

        {/* Synthesis */}
        {step === "synthesis" && (
          <div className="animate-fade-in-up" style={{ marginBottom: 16 }}>
            <div style={{ padding: '20px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', marginBottom: 20 }}>
              <div className="section-label" style={{ marginBottom: 12 }}>牌面融通</div>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--text-primary)', marginBottom: 16 }}>{synthesisText}</p>
              {suggestions.length > 0 && (
                <div style={{ background: 'rgba(201,149,74,0.06)', borderRadius: 'var(--radius-md)', padding: '16px 18px' }}>
                  <div style={{ fontSize: 12, color: 'var(--gold-light)', marginBottom: 10, fontWeight: 600 }}>给你的建议</div>
                  {suggestions.map((s, i) => (
                    <div key={i} style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.7, marginBottom: 8, paddingLeft: 16, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--gold)', fontWeight: 600 }}>{i + 1}.</span>{s}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Profile — collect user info before crystal quiz */}
        {step === "profile" && (
          <div className="animate-fade-in-up" style={{ marginBottom: 16 }}>
            <div className="crystal-card" style={{ marginBottom: 24 }}>
              <div className="section-label" style={{ marginBottom: 16, textAlign: 'center' }}>让我更了解你</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', marginBottom: 20, fontFamily: 'var(--font-serif)' }}>
                以下问题可以跳过，但你的回答会让水晶匹配更准
              </div>

              {profileStep === 0 && (
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8 }}>你的名字 / 怎么称呼你？</div>
                  <input className="input-field" placeholder="输入名字（可跳过）"
                    value={profile.name}
                    onChange={e => setProfile({ ...profile, name: e.target.value })}
                    onKeyDown={e => { if (e.key === "Enter") setProfileStep(1) }}
                    autoFocus maxLength={30} />
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button className="tag" onClick={() => setProfileStep(1)} style={{ border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>下一题 →</button>
                    <button className="tag" onClick={() => { setProfileStep(1) }} style={{ border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', background: 'transparent', color: 'var(--text-muted)' }}>跳过</button>
                  </div>
                </div>
              )}

              {profileStep === 1 && (
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8 }}>你的出生日期？</div>
                  <input className="input-field" type="date" placeholder="YYYY-MM-DD（可跳过）"
                    value={profile.birthdate}
                    onChange={e => setProfile({ ...profile, birthdate: e.target.value })} />
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button className="tag" onClick={() => setProfileStep(2)} style={{ border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>下一题 →</button>
                    <button className="tag" onClick={() => setProfileStep(2)} style={{ border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', background: 'transparent', color: 'var(--text-muted)' }}>跳过</button>
                  </div>
                </div>
              )}

              {profileStep === 2 && (
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8 }}>你的性别？</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {["女","男","非二元","不想说"].map(g => (
                      <button key={g} className={profile.gender === g ? "tag" : "tag"}
                        onClick={() => setProfile({ ...profile, gender: g })}
                        style={{
                          border: profile.gender === g ? '1px solid var(--border-focus)' : '1px solid var(--border)',
                          background: profile.gender === g ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                          cursor: 'pointer', fontFamily: 'var(--font-sans)',
                        }}>
                        {g}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button className="tag" onClick={() => setProfileStep(3)} style={{ border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>下一题 →</button>
                    <button className="tag" onClick={() => setProfileStep(3)} style={{ border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', background: 'transparent', color: 'var(--text-muted)' }}>跳过</button>
                  </div>
                </div>
              )}

              {profileStep === 3 && (
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8 }}>你的身份？</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {["工作","待业","学生","自由职业"].map(o => (
                      <button key={o} className="tag"
                        onClick={() => setProfile({ ...profile, occupation: o })}
                        style={{
                          border: profile.occupation === o ? '1px solid var(--border-focus)' : '1px solid var(--border)',
                          background: profile.occupation === o ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                          cursor: 'pointer', fontFamily: 'var(--font-sans)',
                        }}>
                        {o}
                      </button>
                    ))}
                  </div>
                  <button className="btn-primary" style={{ width: '100%', marginTop: 16 }} onClick={() => {
                    // Save profile to user data (no-op for now, going to crystal quiz)
                    setStep("crystal_quiz"); setQuizStep(0)
                  }}>
                    {profile.name ? `好的，${profile.name} — 继续选水晶` : "继续选水晶"}
                  </button>
                  <button className="btn-ghost" style={{ width: '100%', marginTop: 8 }} onClick={() => {
                    setStep("crystal_quiz"); setQuizStep(0)
                  }}>
                    全部跳过
                  </button>
                </div>
              )}

              <div style={{ textAlign: 'center', marginTop: 16, fontSize: 11, color: 'var(--text-muted)' }}>
                {profileStep < 3 ? `第 ${profileStep + 1}/4 问` : "最后一步"}
              </div>
            </div>
          </div>
        )}

        {/* Crystal Quiz */}
        {step === "crystal_quiz" && (
          <div className="animate-fade-in-up" style={{ marginBottom: 16 }}>
            <div className="crystal-card" style={{ marginBottom: 24 }}>
              <div className="section-label" style={{ marginBottom: 16, textAlign: 'center' }}>找到你的补能水晶</div>

              {!quizData ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div className="spinner" style={{ margin: '0 auto 16px' }} />
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-serif)' }}>
                    牌正在为你准备问题...
                  </div>
                </div>
              ) : (
                <>
                  {quizData.questions.map((q, qi) => (
                    quizStep === qi ? (
                      <div key={qi}>
                        <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16, fontFamily: 'var(--font-serif)' }}>
                          {q.question}
                        </div>
                        {q.options.map((opt, oi) => (
                          <button key={oi}
                            onClick={() => {
                              const newAnswers = [...quizAnswers, {wuxing: opt.wuxing, label: opt.label}]
                              setQuizAnswers(newAnswers)
                              if (qi + 1 >= quizData!.questions.length) {
                                setQuizStep(qi + 1)
                                // Compute and finish on next tick after state settles
                                setTimeout(finishQuiz, 50)
                              } else {
                                setQuizStep(qi + 1)
                              }
                            }}
                            className="btn-outline"
                            style={{ width: '100%', marginBottom: 10, justifyContent: 'flex-start', fontSize: 13, textAlign: 'left' }}>
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    ) : null
                  ))}
                  {quizStep >= (quizData?.questions?.length || 0) && (
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                      <div className="spinner" style={{ margin: '0 auto 16px' }} />
                      <div style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-serif)' }}>
                        水晶正在回应你的选择...
                      </div>
                    </div>
                  )}
                </>
              )}

              {quizData && quizStep < quizData.questions.length && (
                <div style={{ textAlign: 'center', marginTop: 12, fontSize: 11, color: 'var(--text-muted)' }}>
                  第 {quizStep + 1}/{quizData.questions.length} 问
                </div>
              )}
            </div>
          </div>
        )}

        {/* Blessing */}
        {step === "blessing" && (
          <div className="animate-fade-in-up">
            <div style={{ padding: '20px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', marginBottom: 20 }}>
              <div className="section-label" style={{ marginBottom: 12 }}>牌面融通</div>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--text-primary)', marginBottom: 16 }}>{synthesisText}</p>
              {suggestions.length > 0 && (
                <div style={{ background: 'rgba(201,149,74,0.06)', borderRadius: 'var(--radius-md)', padding: '16px 18px' }}>
                  <div style={{ fontSize: 12, color: 'var(--gold-light)', marginBottom: 10, fontWeight: 600 }}>给你的建议</div>
                  {suggestions.map((s, i) => (
                    <div key={i} style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.7, marginBottom: 8, paddingLeft: 16, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--gold)', fontWeight: 600 }}>{i + 1}.</span>{s}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {blessing && (
              <div className="crystal-card" style={{ marginBottom: 24 }}>
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>你的能量此刻需要</div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--gold-light)', fontFamily: 'var(--font-serif)' }}>
                    {crystalMap[blessing.wuxing]?.emoji} 一点{crystalMap[blessing.wuxing]?.name}的力量
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(201,149,74,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>💎</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', marginBottom: 3 }}>{blessing.crystalName}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>五行属{blessing.wuxing}</div>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 16, color: 'var(--gold-light)' }}>$39.99</div>
                </div>
                <Link href={`/crystal/${blessing.wuxing}`} className="btn-outline" style={{ width: '100%', marginTop: 16, display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>查看水晶详情</Link>
                <div style={{ textAlign: 'center', marginTop: 20, fontSize: 16, fontWeight: 500, color: 'var(--gold-light)', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>"{blessing.affirmation}"</div>
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
              <Link href="/temple" className="btn-primary" style={{ display: 'flex', justifyContent: 'center', width: '100%', textDecoration: 'none' }}>🛐 请守护神加持</Link>
              <Link href="/" style={{ display: 'flex', justifyContent: 'center', color: 'var(--text-secondary)', fontSize: 13, textDecoration: 'none', padding: '10px 0' }}>返回首页</Link>
            </div>
          </div>
        )}

        {error && <div className="toast toast-info" style={{ position: 'relative', marginTop: 16, transform: 'none', left: 'auto' }}>{error}</div>}
      </div>
    </div>
  )
}
