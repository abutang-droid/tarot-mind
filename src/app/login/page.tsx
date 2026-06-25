"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
export default function LoginPage() {
  const router = useRouter(); const [isRegister, setIsRegister] = useState(false); const [nickname, setNickname] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [loading, setLoading] = useState(false); const [error, setError] = useState("")
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError("")
    try {
      const url = isRegister ? "/api/auth/register" : "/api/auth/login"
      const body = isRegister ? { nickname, email, password } : { email, password }
      const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error((await res.json()).error || "操作失败"); router.push("/")
    } catch (e: any) { setError(e.message) } finally { setLoading(false) }
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full glass-strong animate-glow-pulse mb-4" style={{ borderColor: 'var(--gold)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9954A" strokeWidth="1.5"><path d="M12 3a9 9 0 1 0 9 9"/><path d="M12 7a5 5 0 1 0 5 5"/><circle cx="12" cy="12" r="1" fill="#C9954A"/></svg>
          </div>
          <h1 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)', letterSpacing: '0.06em' }}>TarotMind</h1>
          <p className="text-xs mt-1.5" style={{ color: 'var(--ivory-dim)' }}>塔罗占卜 · 每日指引</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (<div><label className="block text-xs mb-1.5" style={{ color: 'var(--ivory-dim)' }}>昵称</label><input type="text" value={nickname} onChange={e => setNickname(e.target.value)} className="w-full px-4 py-3 rounded-[var(--radius-sm)] text-sm outline-none transition-all" style={{ background: 'rgba(12,15,35,0.8)', border: '1px solid rgba(201,149,74,0.12)', color: 'var(--ivory)' }} onFocus={e => e.target.style.borderColor = 'var(--gold)'} onBlur={e => e.target.style.borderColor = 'rgba(201,149,74,0.12)'} placeholder="你的昵称" required /></div>)}
          <div><label className="block text-xs mb-1.5" style={{ color: 'var(--ivory-dim)' }}>邮箱</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-[var(--radius-sm)] text-sm outline-none transition-all" style={{ background: 'rgba(12,15,35,0.8)', border: '1px solid rgba(201,149,74,0.12)', color: 'var(--ivory)' }} onFocus={e => e.target.style.borderColor = 'var(--gold)'} onBlur={e => e.target.style.borderColor = 'rgba(201,149,74,0.12)'} placeholder="your@email.com" required /></div>
          <div><label className="block text-xs mb-1.5" style={{ color: 'var(--ivory-dim)' }}>密码</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-[var(--radius-sm)] text-sm outline-none transition-all" style={{ background: 'rgba(12,15,35,0.8)', border: '1px solid rgba(201,149,74,0.12)', color: 'var(--ivory)' }} onFocus={e => e.target.style.borderColor = 'var(--gold)'} onBlur={e => e.target.style.borderColor = 'rgba(201,149,74,0.12)'} placeholder="至少 6 位" required minLength={6} /></div>
          {error && <div className="text-xs text-center" style={{ color: 'var(--rose)' }}>{error}</div>}
          <button type="submit" disabled={loading} className="w-full py-3 rounded-[var(--radius-sm)] text-sm font-bold disabled:opacity-40" style={{ background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)', color: 'var(--bg-deep)' }}>{loading ? "处理中…" : (isRegister ? "注册并开始" : "登录")}</button>
        </form>
        <div className="mt-5 text-center text-xs" style={{ color: 'var(--ivory-dimmer)' }}>
          {isRegister ? "已有账号？" : "没有账号？"}
          <button onClick={() => setIsRegister(!isRegister)} className="ml-1 hover:underline" style={{ color: 'var(--gold)' }}>{isRegister ? "去登录" : "去注册"}</button>
        </div>
      </div>
    </div>
  )
}
