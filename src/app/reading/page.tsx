"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import BottomNav from "@/components/BottomNav"
import TarotCard from "@/components/TarotCard"
import LoadingSpinner from "@/components/LoadingSpinner"
import CrystalCard from "@/components/CrystalCard"

const QUICK_QUESTIONS = [
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
    if (!question.trim()) return
    setLoading(true)
    setStep("drawing")
    try {
      const res = await fetch("/api/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spreadType: "three", question: question.trim() }),
      })
      const data = await res.json()
      setResult(data)
      setLoading(false)
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          setFlippedCards(prev => { const n = [...prev]; n[i] = true; return n })
        }, (i + 1) * 600)
      }
      setTimeout(() => setStep("result"), 3000)
    } catch (e) { setLoading(false) }
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-lg mx-auto px-4 pt-8">
        <div className="text-center mb-8">
          <h1 className="text-lg font-bold text-[#D4A853] mb-2">三牌阵占卜</h1>
          <p className="text-sm text-[#F5F0E8]/60">过去 · 现在 · 未来</p>
        </div>

        {step === "input" && (
          <div className="animate-fade-in-up">
            <div className="bg-gradient-to-r from-[#1A1040]/80 to-[#2d1b69]/80 rounded-2xl border border-[#D4A853]/20 p-5 mb-4">
              <textarea value={question} onChange={e => setQuestion(e.target.value)}
                placeholder="写下你想问的问题..."
                className="w-full bg-[#0B0E2A]/50 rounded-xl p-4 text-[#F5F0E8] placeholder-[#F5F0E8]/30 border border-[#D4A853]/10 focus:outline-none focus:border-[#D4A853]/30 resize-none h-20 text-sm" />
              <button onClick={handleStart} disabled={!question.trim()}
                className="w-full mt-3 py-3 rounded-xl bg-gradient-to-r from-[#D4A853] to-[#B8923F] text-[#0B0E2A] font-bold hover:opacity-90 transition-opacity disabled:opacity-50">
                🔮 开始占卜
              </button>
            </div>
            <div>
              <div className="text-sm text-[#F5F0E8]/50 mb-3 text-center">快速选择问题</div>
              <div className="grid grid-cols-2 gap-2">
                {QUICK_QUESTIONS.map(q => (
                  <button key={q.label} onClick={() => { setQuestion(q.text); setTimeout(() => handleStart(), 100) }}
                    className="bg-[#1A1040]/50 rounded-xl p-3 border border-[#D4A853]/10 text-sm text-[#F5F0E8]/70 hover:border-[#D4A853]/30 transition-all">
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === "drawing" && (
          <div className="text-center py-8 animate-fade-in-up">
            <div className="flex justify-center gap-4 mb-8">
              {[0, 1, 2].map(i => (
                <TarotCard key={i} name={result?.cards[i]?.cardName || ""}
                  orientation={result?.cards[i]?.orientation || "正位"} flipped={flippedCards[i]} small />
              ))}
            </div>
            {loading && <LoadingSpinner text="解读中..." />}
            {!loading && !flippedCards.includes(false) && <div className="text-[#D4A853] animate-pulse">解读完成 ✓</div>}
          </div>
        )}

        {step === "result" && result && (
          <div className="space-y-4 animate-fade-in-up">
            <div className="bg-gradient-to-r from-[#1A1040]/80 to-[#2d1b69]/80 rounded-2xl border border-[#D4A853]/20 p-5">
              <div className="text-sm text-[#D4A853] mb-4">牌阵展示</div>
              {result.cards.map((card: any, i: number) => (
                <div key={i} className="flex items-start gap-3 mb-4 last:mb-0">
                  <div className="w-12 h-16 rounded-lg bg-gradient-to-br from-[#D4A853]/30 to-[#2d1b69] border border-[#D4A853]/30 flex items-center justify-center text-xs font-bold text-[#D4A853] shrink-0">
                    {card.cardName.slice(0, 2)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm text-[#F5F0E8]">{card.position}</span>
                      <span className="text-xs text-[#F5F0E8]/50">{card.cardName} · {card.orientation}</span>
                    </div>
                    <div className="text-[10px] text-[#D4A853]/70 mb-1">{card.keywords}</div>
                    <div className="text-xs text-[#F5F0E8]/70 leading-relaxed">{card.interpretation}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-[#1A1040]/80 to-[#2d1b69]/80 rounded-2xl border border-[#D4A853]/20 p-5">
              <div className="text-sm text-[#D4A853] mb-2">牌间关系</div>
              <div className="text-sm text-[#F5F0E8]/70 leading-relaxed">{result.relationships}</div>
            </div>
            <div className="bg-gradient-to-r from-[#D4A853]/20 to-[#B8923F]/20 rounded-2xl border border-[#D4A853]/30 p-5">
              <div className="text-sm text-[#D4A853] mb-2">综合解读</div>
              <div className="text-sm text-[#F5F0E8]/80 leading-relaxed">{result.conclusion}</div>
            </div>
            <div>
              <div className="text-sm text-[#D4A853] mb-3">推荐水晶</div>
              <CrystalCard name={result.crystalName} spec={result.crystalSpec} description={result.crystalDescription} />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => { setStep("input"); setQuestion(""); setResult(null); setFlippedCards([false, false, false]) }}
                className="flex-1 py-3 rounded-xl bg-[#1A1040] border border-[#D4A853]/20 text-[#F5F0E8] font-bold hover:bg-[#2d1b69] transition-colors">再次占卜</button>
              <button onClick={() => router.push("/history")}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#D4A853] to-[#B8923F] text-[#0B0E2A] font-bold hover:opacity-90 transition-opacity">查看记录</button>
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  )
}
