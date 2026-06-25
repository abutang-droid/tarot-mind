"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [isRegister, setIsRegister] = useState(false)
  const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const url = isRegister ? "/api/auth/register" : "/api/auth/login"
      const body = isRegister ? { nickname, email, password } : { email, password }
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error((await res.json()).error || "操作失败")
      router.push("/")
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🔮</div>
          <h1 className="text-2xl font-bold text-[#D4A853]">TarotMind</h1>
          <p className="text-sm text-[#F5F0E8]/60 mt-1">塔罗占卜 · 每日指引</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-sm text-[#F5F0E8]/70 mb-1">昵称</label>
              <input type="text" value={nickname} onChange={e => setNickname(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#1A1040] border border-[#D4A853]/20 text-[#F5F0E8] placeholder-[#F5F0E8]/30 focus:outline-none focus:border-[#D4A853]/50"
                placeholder="你的昵称" required />
            </div>
          )}
          <div>
            <label className="block text-sm text-[#F5F0E8]/70 mb-1">邮箱</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#1A1040] border border-[#D4A853]/20 text-[#F5F0E8] placeholder-[#F5F0E8]/30 focus:outline-none focus:border-[#D4A853]/50"
              placeholder="your@email.com" required />
          </div>
          <div>
            <label className="block text-sm text-[#F5F0E8]/70 mb-1">密码</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#1A1040] border border-[#D4A853]/20 text-[#F5F0E8] placeholder-[#F5F0E8]/30 focus:outline-none focus:border-[#D4A853]/50"
              placeholder="至少6位" required minLength={6} />
          </div>

          {error && <div className="text-red-400 text-sm text-center">{error}</div>}

          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4A853] to-[#B8923F] text-[#0B0E2A] font-bold hover:opacity-90 transition-opacity disabled:opacity-50">
            {loading ? "处理中..." : isRegister ? "注册并开始" : "登录"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-[#F5F0E8]/50">
          {isRegister ? "已有账号？" : "没有账号？"}
          <button onClick={() => setIsRegister(!isRegister)} className="text-[#D4A853] ml-1 hover:underline">
            {isRegister ? "去登录" : "去注册"}
          </button>
        </div>
      </div>
    </div>
  )
}
