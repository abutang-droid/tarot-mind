"use client"
import { useState, useEffect } from "react"
import BottomNav from "@/components/BottomNav"
import LoadingSpinner from "@/components/LoadingSpinner"
type TabType = "reading" | "daily-card" | "wish"
const TABS = [
  { key: "reading" as TabType, label: "占卜" },
  { key: "daily-card" as TabType, label: "抽卡" },
  { key: "wish" as TabType, label: "心愿" },
]
export default function HistoryPage() {
  const [tab, setTab] = useState<TabType>("reading"); const [data, setData] = useState<any>(null); const [loading, setLoading] = useState(true); const [page, setPage] = useState(1)
  useEffect(() => { setLoading(true); fetch(`/api/history?type=${tab}&page=${page}`).then(r => r.json()).then(d => { setData(d); setLoading(false) }).catch(() => setLoading(false)) }, [tab, page])
  const fmt = (s: string) => { const d = new Date(s); return `${d.getMonth()+1}.${d.getDate()}` }
  return (
    <div className="min-h-screen" style={{ paddingBottom: '84px' }}>
      <div className="max-w-lg mx-auto px-5 pt-10">
        <div className="text-center mb-2"><span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: 'var(--gold-dark)' }}>ARCHIVE</span></div>
        <h1 className="text-xl font-bold mb-6 text-center" style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)' }}>历史记录</h1>
        <div className="flex rounded-[var(--radius-sm)] p-1 mb-6" style={{ background: 'rgba(12,15,35,0.8)' }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => { setTab(t.key); setPage(1) }}
              className="flex-1 py-2 rounded-[var(--radius-sm)] text-xs font-medium transition-all"
              style={{ background: tab === t.key ? 'rgba(201,149,74,0.15)' : 'transparent', color: tab === t.key ? 'var(--gold)' : 'var(--ivory-dimmer)' }}>{t.label}</button>
          ))}
        </div>
        {loading && <LoadingSpinner />}
        {data && !loading && (
          <div className="space-y-3">
            {data.records?.length === 0 && (<div className="text-center py-16"><div className="text-2xl mb-2 opacity-30">◈</div><div className="text-xs" style={{ color: 'var(--ivory-dimmer)' }}>暂无记录</div></div>)}
            {tab === "reading" && data.records?.map((r: any) => (
              <div key={r.id} className="glass rounded-[var(--radius-md)] p-4 animate-fade-in-up">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-bold truncate flex-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--ivory)' }}>{r.question || "占卜"}</div>
                  <div className="text-[10px] ml-2 shrink-0" style={{ color: 'var(--ivory-dimmer)' }}>{fmt(r.createdAt)}</div>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">{(r.cards as any[])?.map((c: any, i: number) => (<span key={i} className="text-[9px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(201,149,74,0.08)', color: 'var(--gold-dark)' }}>{c.cardName}</span>))}</div>
                {r.conclusion && <div className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--ivory-dim)' }}>{r.conclusion}</div>}
                {r.crystalName && <div className="text-[10px] mt-1" style={{ color: 'var(--gold-dark)' }}>推荐 {r.crystalName}</div>}
              </div>
            ))}
            {tab === "daily-card" && data.records?.map((r: any) => (
              <div key={r.id} className="glass rounded-[var(--radius-md)] p-4 animate-fade-in-up">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(201,149,74,0.1)', color: 'var(--gold)' }}>{r.cardType}</span>
                    <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--ivory)' }}>{r.cardName}</span>
                  </div>
                  <div className="text-[10px]" style={{ color: 'var(--ivory-dimmer)' }}>{fmt(r.createdAt)}</div>
                </div>
                <div className="text-xs" style={{ color: 'var(--ivory-dim)' }}>{r.message}</div>
              </div>
            ))}
            {tab === "wish" && data.records?.map((r: any) => (
              <div key={r.id} className="glass rounded-[var(--radius-md)] p-4 animate-fade-in-up">
                <div className="flex justify-between items-start mb-1"><div className="text-[10px]" style={{ color: 'var(--ivory-dimmer)' }}>心愿</div><div className="text-[10px]" style={{ color: 'var(--ivory-dimmer)' }}>{fmt(r.createdAt)}</div></div>
                <div className="text-sm mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--ivory)' }}>「{r.wish}」</div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px]" style={{ color: 'var(--ivory-dimmer)' }}>{r.cardName}</span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(201,149,74,0.1)', color: 'var(--gold)' }}>{r.conclusion}</span>
                </div>
              </div>
            ))}
            {data.totalPages > 1 && (
              <div className="flex justify-center gap-2 pt-4">
                {Array.from({ length: data.totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setPage(p)} className="w-8 h-8 rounded-[var(--radius-sm)] text-xs transition-all" style={{ background: p === page ? 'var(--gold)' : 'rgba(12,15,35,0.8)', color: p === page ? 'var(--bg-deep)' : 'var(--ivory-dimmer)' }}>{p}</button>
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
