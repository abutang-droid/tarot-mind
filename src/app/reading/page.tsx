"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import BottomNav from "@/components/BottomNav"
import TarotCard from "@/components/TarotCard"
import LoadingSpinner from "@/components/LoadingSpinner"
import CrystalCard from "@/components/CrystalCard"
const QUICK = [
  { label: "感情近况", text: "近期感情走势如何" },
  { label: "工作发展", text: "工作是否顺利" },
  { label: "财运方向", text: "近期财运如何" },
  { label: "决策参考", text: "这个选择是否适合我" },
]
export default function ReadingPage() {
  const router = useRouter()
  const [question, setQuestion] = useState("")
  const [step, setStep] = useState<"input" | "drawing" | "result">("input")
  const [result, setResult] = useState<any>(null)
  const [flippedCards, setFlippedCards] = useState<boolean[]>([false, false, false])
  const [loading, setLoading] = useState(false)
  async function handleStart() {
    if (!question.trim()) return; setLoading(true); setStep("drawing")
    try {
      const res = await fetch("/api/reading", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ spreadType: "three", question: question.trim() }) })
      const data = await res.json(); setResult(data); setLoading(false)
      for (let i = 0; i < 3; i++) setTimeout(() => { setFlippedCards(prev => { const n = [...prev]; n[i] = true; return n }) }, (i + 1) * 700)
      setTimeout(() => setStep("result"), 3200)
    } catch (e) { setLoading(false) }
  }
  return (
    <div className="min-h-screen" style={{ paddingBottom: '84px' }}>
      <div className="max-w-lg mx-auto px-5 pt-10">
        <div className="text-center mb-2"><span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: 'var(--gold-dark)' }}>THREE-CARD SPREAD</span></div>
        <h1 className="text-xl font-bold mb-1 text-center" style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)' }}>三牌阵占卜</h1>
        <p className="text-xs mb-8 text-center" style={{ color: 'var(--ivory-dim)' }}>过去 · 现在 · 未来</p>
        {step === "input" && (
          <div className="animate-fade-in-up">
            <div className="glass rounded-[var(--radius-lg)] p-5 mb-4">
              <textarea value={question} onChange={e => setQuestion(e.target.value)} placeholder="写下你想问的问题…"
                className="w-full rounded-[var(--radius-sm)] p-4 text-sm resize-none h-20 outline-none transition-colors"
                style={{ background: 'rgba(5,8,20,0.6)', border: '1px solid rgba(201,149,74,0.1)', color: 'var(--ivory)' }}
                onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                onBlur={e => e.target.style.borderColor = 'rgba(201,149,74,0.1)'} />
              <button onClick={handleStart} disabled={!question.trim()}
                className="w-full mt-3 py-3 rounded-[var(--radius-sm)] text-sm font-bold disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)', color: 'var(--bg-deep)' }}>开始占卜</button>
            </div>
            <div>
              <div className="text-[10px] tracking-wider text-center mb-3" style={{ color: 'var(--ivory-dimmer)' }}>快速选择问题</div>
              <div className="grid grid-cols-2 gap-2">
                {QUICK.map(q => (
                  <button key={q.label} onClick={() => { setQuestion(q.text); setTimeout(() => handleStart(), 100) }}
                    className="glass rounded-[var(--radius-sm)] p-3 text-xs" style={{ color: 'var(--ivory-dim)' }}>{q.label}</button>
                ))}
              </div>
            </div>
          </div>
        )}
        {step === "drawing" && (
          <div className="text-center py-8 animate-fade-in-up">
            <div className="flex justify-center gap-4 mb-8">
              {[0, 1, 2].map(i => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <TarotCard name={result?.cards[i]?.cardName || ""} orientation={result?.cards[i]?.orientation || "正位"} flipped={flippedCards[i]} small />
                  {flippedCards[i] && <span className="text-[9px] tracking-wider animate-fade-in" style={{ color: 'var(--gold-dark)' }}>{i === 0 ? "过去" : i === 1 ? "现在" : "未来"}</span>}
                </div>
              ))}
            </div>
            {loading && <LoadingSpinner text="解读中…" />}
          </div>
        )}
        {step === "result" && result && (
          <div className="space-y-4 animate-fade-in-up">
            <div className="glass rounded-[var(--radius-lg)] p-5">
              <div className="text-[10px] tracking-wider mb-4" style={{ color: 'var(--gold)' }}>牌阵展示</div>
              {result.cards.map((card: any, i: number) => (
                <div key={i} className="flex items-start gap-3 mb-4 last:mb-0">
                  <div className="w-12 h-[60px] rounded-[var(--radius-sm)] flex items-center justify-center text-sm font-bold shrink-0" style={{ background: 'linear-gradient(135deg, rgba(201,149,74,0.15), rgba(12,15,35,0.8))', border: '1px solid rgba(201,149,74,0.15)', color: 'var(--gold-light)', fontFamily: 'var(--font-display)' }}>{card.cardName.slice(0, 2)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)' }}>{card.position}</span>
                      <span className="text-[10px]" style={{ color: 'var(--ivory-dimmer)' }}>{card.cardName} · {card.orientation}</span>
                    </div>
                    <div className="text-[9px] mb-1" style={{ color: 'var(--gold-dark)' }}>{card.keywords}</div>
                    <div className="text-xs leading-relaxed" style={{ color: 'var(--ivory-dim)' }}>{card.interpretation}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="glass rounded-[var(--radius-md)] p-5"><div className="text-[10px] tracking-wider mb-2" style={{ color: 'var(--gold)' }}>牌间关系</div><div className="text-sm leading-relaxed" style={{ color: 'var(--ivory-dim)' }}>{result.relationships}</div></div>
            <div className="rounded-[var(--radius-md)] p-5" style={{ background: 'linear-gradient(135deg, rgba(201,149,74,0.1), rgba(166,123,62,0.05))', border: '1px solid rgba(201,149,74,0.2)' }}>
              <div className="text-[10px] tracking-wider mb-2" style={{ color: 'var(--gold)' }}>综合解读</div>
              <div className="text-sm leading-relaxed" style={{ color: 'var(--ivory)' }}>{result.conclusion}</div>
            </div>
            <div>
              <div className="text-[10px] tracking-wider mb-2" style={{ color: 'var(--gold)' }}>推荐水晶</div>
              <CrystalCard name={result.crystalName} spec={result.crystalSpec} description={result.crystalDescription} />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => { setStep("input"); setQuestion(""); setResult(null); setFlippedCards([false, false, false]) }} className="flex-1 py-3 rounded-[var(--radius-sm)] text-sm font-bold glass">再次占卜</button>
              <button onClick={() => router.push("/history")} className="flex-1 py-3 rounded-[var(--radius-sm)] text-sm font-bold" style={{ background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)', color: 'var(--bg-deep)' }}>查看记录</button>
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  )
}
