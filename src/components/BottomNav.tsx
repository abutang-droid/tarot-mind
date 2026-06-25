"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV_ITEMS = [
  { href: "/", label: "首页", icon: "✦" },
  { href: "/daily-card", label: "抽卡", icon: "🃏" },
  { href: "/reading", label: "占卜", icon: "🔮" },
  { href: "/knowledge", label: "知识", icon: "📖" },
  { href: "/profile", label: "我的", icon: "👤" },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0B0E2A]/95 backdrop-blur-sm border-t border-[#D4A853]/20">
      <div className="max-w-lg mx-auto flex justify-around items-center h-16 px-2">
        {NAV_ITEMS.map(item => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
          return (
            <Link key={item.href} href={item.href}
              className={`flex flex-col items-center justify-center w-16 py-1 rounded-lg transition-colors ${isActive ? "text-[#D4A853]" : "text-[#F5F0E8]/50"}`}>
              <span className="text-xl mb-0.5">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
