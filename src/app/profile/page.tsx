"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import BottomNav from "@/components/BottomNav"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [nickname, setNickname] = useState("")
  const [birthday, setBirthday] = useState("")

  useEffect(() => {
    fetch("/api/auth/me").then(r => r.json()).then(d => {
      setUser(d.user)
      setNickname(d.user?.nickname || "")
      setBirthday(d.user?.birthday ? d.user.birthday.split("T")[0] : "")
      setLoading(false)
    }).catch(() => { setLoading(false); router.push("/login") })
  }, [router])

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, birthday: birthday || null }),
      })
      setUser((await res.json()).user)
    } catch (e) { console.error(e) }
    finally { setSaving(false) }
  }

  async function handleLogout() {
    document.cookie = "tarot_token=; path=/; max-age=0"
    router.push("/login")
  }

  if (loading) return (
    <div className="min-h-screen pb-20 flex items-center justify-center">
      <LoadingSpinner />
    </div>
  )

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-lg mx-auto px-4 pt-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4A853]/30 to-[#2d1b69] flex items-center justify-center text-2xl mx-auto mb-3">
            {user?.nickname?.[0] || "?"}
          </div>
          <h1 className="text-lg font-bold text-[#F5F0E8]">{user?.nickname}</h1>
          <p className="text-xs text-[#F5F0E8]/50">{user?.email}</p>
        </div>

        <div className="bg-gradient-to-r from-[#1A1040]/80 to-[#2d1b69]/80 rounded-2xl border border-[#D4A853]/20 p-5 space-y-4 mb-6">
          <div>
            <label className="block text-xs text-[#F5F0E8]/50 mb-1">昵称</label>
            <input type="text" value={nickname} onChange={e => setNickname(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#0B0E2A]/50 text-[#F5F0E8] border border-[#D4A853]/10 focus:outline-none focus:border-[#D4A853]/30 text-sm" />
          </div>
          <div>
            <label className="block text-xs text-[#F5F0E8]/50 mb-1">出生日期</label>
            <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#0B0E2A]/50 text-[#F5F0E8] border border-[#D4A853]/10 focus:outline-none focus:border-[#D4A853]/30 text-sm" />
          </div>
          <button onClick={handleSave} disabled={saving}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D4A853] to-[#B8923F] text-[#0B0E2A] font-bold hover:opacity-90 transition-opacity disabled:opacity-50 text-sm">
            {saving ? "保存中..." : "保存修改"}
          </button>
        </div>

        <div className="bg-gradient-to-r from-[#1A1040]/80 to-[#2d1b69]/80 rounded-2xl border border-[#D4A853]/10 p-4">
          <button onClick={handleLogout} className="w-full text-center text-sm text-red-400 hover:text-red-300 transition-colors">退出登录</button>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
