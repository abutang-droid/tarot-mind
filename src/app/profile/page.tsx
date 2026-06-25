"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import BottomNav from "@/components/BottomNav"
import LoadingSpinner from "@/components/LoadingSpinner"
export default function ProfilePage() {
  const router = useRouter(); const [user, setUser] = useState<any>(null); const [loading, setLoading] = useState(true); const [saving, setSaving] = useState(false); const [nickname, setNickname] = useState(""); const [birthday, setBirthday] = useState("")
  useEffect(() => { fetch("/api/auth/me").then(r => r.json()).then(d => { setUser(d.user); setNickname(d.user?.nickname || ""); setBirthday(d.user?.birthday ? d.user.birthday.split("T")[0] : ""); setLoading(false) }).catch(() => { setLoading(false); router.push("/login") }) }, [router])
  async function handleSave() { setSaving(true); try { const res = await fetch("/api/profile", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ nickname, birthday: birthday || null }) }); setUser((await res.json()).user) } catch (e) {} finally { setSaving(false) } }
  async function handleLogout() { document.cookie = "tarot_token=; path=/; max-age=0"; router.push("/login") }
  if (loading) return (<div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>)
  return (
    <div className="min-h-screen" style={{ paddingBottom: '84px' }}>
      <div className="max-w-lg mx-auto px-5 pt-10">
        <div className="text-center mb-2"><span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: 'var(--gold-dark)' }}>PROFILE</span></div>
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-xl" style={{ background: 'linear-gradient(135deg, rgba(201,149,74,0.2), rgba(12,15,35,0.8))', border: '1px solid rgba(201,149,74,0.2)' }}>{user?.nickname?.[0] || "?"}</div>
          <h1 className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)' }}>{user?.nickname}</h1>
          <p className="text-xs" style={{ color: 'var(--ivory-dimmer)' }}>{user?.email}</p>
        </div>
        <div className="glass rounded-[var(--radius-lg)] p-5 space-y-4 mb-6">
          <div><label className="block text-[10px] mb-1.5" style={{ color: 'var(--ivory-dimmer)' }}>昵称</label><input type="text" value={nickname} onChange={e => setNickname(e.target.value)} className="w-full px-3 py-2.5 rounded-[var(--radius-sm)] text-sm outline-none transition-colors" style={{ background: 'rgba(5,8,20,0.6)', border: '1px solid rgba(201,149,74,0.1)', color: 'var(--ivory)' }} onFocus={e => e.target.style.borderColor = 'var(--gold)'} onBlur={e => e.target.style.borderColor = 'rgba(201,149,74,0.1)'} /></div>
          <div><label className="block text-[10px] mb-1.5" style={{ color: 'var(--ivory-dimmer)' }}>出生日期</label><input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} className="w-full px-3 py-2.5 rounded-[var(--radius-sm)] text-sm outline-none transition-colors" style={{ background: 'rgba(5,8,20,0.6)', border: '1px solid rgba(201,149,74,0.1)', color: 'var(--ivory)' }} onFocus={e => e.target.style.borderColor = 'var(--gold)'} onBlur={e => e.target.style.borderColor = 'rgba(201,149,74,0.1)'} /></div>
          <button onClick={handleSave} disabled={saving} className="w-full py-2.5 rounded-[var(--radius-sm)] text-sm font-bold disabled:opacity-40" style={{ background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)', color: 'var(--bg-deep)' }}>{saving ? "保存中…" : "保存修改"}</button>
        </div>
        <button onClick={handleLogout} className="w-full py-3 rounded-[var(--radius-sm)] text-xs glass" style={{ color: 'var(--rose)' }}>退出登录</button>
      </div>
      <BottomNav />
    </div>
  )
}
