"use client"
import { useState, useEffect } from "react"
import BottomNav from "@/components/BottomNav"
import LoadingSpinner from "@/components/LoadingSpinner"

type TabType = "reading" | "daily-card" | "wish"

export default function HistoryPage() {
  const [tab, setTab] = useState<TabType>("reading")
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/history?type=${tab}&page=${page}`).then(r => r.json()).then(d => {
      setData(d); setLoading(false)
    }).catch(() => setLoading(false))
  }, [tab, page])

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-lg mx-auto px-4 pt-8">
        <h1 className="text-lg font-bold text-[#D4A853] mb-6 text-center">历史记录</h1>
        <div className="flex bg-[#1A1040] rounded-xl p-1 mb-6">
          {[
            { key: "reading" as TabType, label: "占卜" },
            { key: "daily-card" as TabType, label: "抽卡" },
            { key: "wish" as TabType, label: "心愿" },
          ].map(t => (
            <button key={t.key} onClick={() => { setTab(t.key); setPage(1) }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t.key ? "bg-[#D4A853] text-[#0B0E2A]" : "text-[#F5F0E8]/50"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {loading && <LoadingSpinner />}

        {data && !loading && (
          <div className="space-y-3">
            {data.records?.length === 0 && <div className="text-center text-sm text-[#F5F0E8]/40 py-12">暂无记录</div>}

            {tab === "reading" && data.records?.map((r: any) => (
              <div key={r.id} className="bg-gradient-to-r from-[#1A1040]/80 to-[#2d1b69]/80 rounded-xl border border-[#D4A853]/10 p-4 animate-fade-in-up">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-bold text-[#F5F0E8] truncate flex-1">{r.question || "未命名占卜"}</div>
                  <div className="text-[10px] text-[#F5F0E8]/40 ml-2">{formatDate(r.createdAt)}</div>
                </div>
                <div className="flex gap-1 mb-2">
                  {(r.cards as any[])?.map((c: any, i: number) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4A853]/10 text-[#D4A853]">{c.cardName}</span>
                  ))}
                </div>
                {r.conclusion && <div className="text-xs text-[#F5F0E8]/60 line-clamp-2">{r.conclusion}</div>}
                {r.crystalName && <div className="text-[10px] text-[#D4A853]/60 mt-1">推荐水晶：{r.crystalName}</div>}
              </div>
            ))}

            {tab === "daily-card" && data.records?.map((r: any) => (
              <div key={r.id} className="bg-gradient-to-r from-[#1A1040]/80 to-[#2d1b69]/80 rounded-xl border border-[#D4A853]/10 p-4 animate-fade-in-up">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#D4A853]/10 text-[#D4A853]">{r.cardType}</span>
                    <span className="text-sm font-bold text-[#F5F0E8] ml-2">{r.cardName}</span>
                  </div>
                  <div className="text-[10px] text-[#F5F0E8]/40">{formatDate(r.createdAt)}</div>
                </div>
                <div className="text-xs text-[#F5F0E8]/60">{r.message}</div>
              </div>
            ))}

            {tab === "wish" && data.records?.map((r: any) => (
              <div key={r.id} className="bg-gradient-to-r from-[#1A1040]/80 to-[#2d1b69]/80 rounded-xl border border-[#D4A853]/10 p-4 animate-fade-in-up">
                <div className="flex justify-between items-start mb-1">
                  <div className="text-xs text-[#F5F0E8]/60">心愿</div>
                  <div className="text-[10px] text-[#F5F0E8]/40">{formatDate(r.createdAt)}</div>
                </div>
                <div className="text-sm text-[#F5F0E8] mb-2">「{r.wish}」</div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#F5F0E8]/50">{r.cardName}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4A853]/10 text-[#D4A853]">{r.conclusion}</span>
                </div>
                <div className="text-xs text-[#F5F0E8]/60 mt-1">{r.advice}</div>
              </div>
            ))}

            {data.totalPages > 1 && (
              <div className="flex justify-center gap-2 pt-4">
                {Array.from({ length: data.totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-lg text-xs ${p === page ? "bg-[#D4A853] text-[#0B0E2A]" : "bg-[#1A1040] text-[#F5F0E8]/50"}`}>
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  )
}
