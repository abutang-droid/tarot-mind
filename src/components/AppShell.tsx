"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

// ─── Nav Icons ────────────────────────────────────────────────
const HomeIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke={active ? "var(--gold)" : "var(--text-muted)"}
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5z" fill={active ? "rgba(201,149,74,0.08)" : "none"} />
    <path d="M9 21V12h6v9"/>
  </svg>
)
const CardIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke={active ? "var(--gold)" : "var(--text-muted)"}
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="3" width="11" height="16" rx="2" fill={active ? "rgba(201,149,74,0.08)" : "none"} />
    <rect x="9" y="5" width="11" height="16" rx="2" fill={active ? "rgba(201,149,74,0.05)" : "none"} />
  </svg>
)
const ReadingIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke={active ? "var(--gold)" : "var(--text-muted)"}
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" fill={active ? "rgba(201,149,74,0.08)" : "none"} />
    <path d="M12 7v5l3 3"/>
  </svg>
)
const FortuneIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke={active ? "var(--gold)" : "var(--text-muted)"}
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      fill={active ? "rgba(201,149,74,0.08)" : "none"} />
  </svg>
)
const WishIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke={active ? "var(--gold)" : "var(--text-muted)"}
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill={active ? "rgba(201,149,74,0.08)" : "none"} />
  </svg>
)
const HistoryIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke={active ? "var(--gold)" : "var(--text-muted)"}
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8v4l3 3"/>
    <path d="M3.05 11a9 9 0 1 0 .5-3M3 4v4h4"/>
  </svg>
)
const ProfileIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke={active ? "var(--gold)" : "var(--text-muted)"}
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" fill={active ? "rgba(201,149,74,0.08)" : "none"} />
    <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7"/>
  </svg>
)
const AngelIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke={active ? "var(--gold)" : "var(--text-muted)"}
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8 6 4 8 4 12c0 2 1 3.5 2.5 4.5" fill={active ? "rgba(201,149,74,0.08)" : "none"}/>
    <path d="M12 2c4 4 8 6 8 10 0 2-1 3.5-2.5 4.5"/>
    <circle cx="12" cy="18" r="3" fill={active ? "rgba(201,149,74,0.12)" : "none"}/>
    <path d="M12 15v-4"/>
  </svg>
)
const DreamIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke={active ? "var(--gold)" : "var(--text-muted)"}
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill={active ? "rgba(201,149,74,0.08)" : "none"}/>
    <path d="M14 9l2 2-2 2"/>
    <path d="M10 9l-2 2 2 2"/>
  </svg>
)

const ALL_NAV_ITEMS = [
  { href: "/",            label: "首页",   Icon: HomeIcon },
  { href: "/daily-card",  label: "每日抽卡", Icon: CardIcon },
  { href: "/reading",     label: "牌阵占卜", Icon: ReadingIcon },
  { href: "/wish",        label: "心愿占卜", Icon: WishIcon },
  { href: "/fortune",     label: "日运播报", Icon: FortuneIcon },
  { href: "/angel-card",  label: "天使牌",  Icon: AngelIcon },
  { href: "/dream",       label: "梦境解析", Icon: DreamIcon },
  { href: "/history",     label: "历史记录", Icon: HistoryIcon },
  { href: "/profile",     label: "我的",   Icon: ProfileIcon },
]

// Mobile shows only 5 key items
const MOBILE_NAV = ALL_NAV_ITEMS.filter(i =>
  ['/', '/daily-card', '/angel-card', '/dream', '/profile'].includes(i.href)
)

// ─── Sidebar (Desktop) ────────────────────────────────────────
function Sidebar({ pathname }: { pathname: string }) {
  return (
    <aside
      id="app-sidebar"
      className="app-sidebar"
      style={{ display: 'none', flexDirection: 'column' }}
    >
      {/* Logo */}
      <div style={{ padding: '28px 20px 20px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, var(--gold-light), var(--gold-dark))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 17, color: '#fff', fontFamily: 'var(--font-display)',
            flexShrink: 0,
          }}>✦</div>
          <div>
            <div style={{
              fontSize: 14, fontWeight: 700,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.06em',
            }}>TarotMind</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.06em' }}>星象指引 · 内心探索</div>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: '14px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {ALL_NAV_ITEMS.map(item => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                background: isActive ? 'var(--gold-subtle)' : 'transparent',
                border: `1px solid ${isActive ? 'rgba(201,149,74,0.2)' : 'transparent'}`,
                transition: 'all 0.15s ease',
              }}
            >
              <item.Icon active={isActive} />
              <span style={{
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--gold)' : 'var(--text-secondary)',
              }}>
                {item.label}
              </span>
              {isActive && (
                <div style={{ marginLeft: 'auto', width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)' }} />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '14px 20px', borderTop: '1px solid var(--border)' }}>
        <div style={{ fontSize: 10, color: 'var(--text-faint)', textAlign: 'center', letterSpacing: '0.06em' }}>
          © 2026 TarotMind
        </div>
      </div>
    </aside>
  )
}

// ─── Bottom Nav (Mobile) ──────────────────────────────────────
function BottomNav({ pathname }: { pathname: string }) {
  return (
    <nav
      className="bottom-nav"
      style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        zIndex: 50,
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--border)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        boxShadow: '0 -2px 16px rgba(0,0,0,0.06)',
      }}
    >
      <div style={{
        maxWidth: 480, margin: '0 auto',
        display: 'flex', justifyContent: 'space-around',
        alignItems: 'center', height: 60,
      }}>
        {MOBILE_NAV.map(item => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 3, width: 60, textDecoration: 'none',
                position: 'relative', padding: '6px 0',
              }}
            >
              {isActive && (
                <div style={{
                  position: 'absolute', top: 0,
                  left: '50%', transform: 'translateX(-50%)',
                  width: 24, height: 2, borderRadius: 1,
                  background: 'var(--gold)',
                }} />
              )}
              <item.Icon active={isActive} />
              <span style={{
                fontSize: 10,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--gold)' : 'var(--text-muted)',
                transition: 'color 0.15s ease',
              }}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

// ─── App Shell ────────────────────────────────────────────────
export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <>
      <Sidebar pathname={pathname} />
      <div className="app-main-content" style={{ minHeight: '100dvh' }}>
        <div style={{ paddingBottom: 76 }}>
          {children}
        </div>
      </div>
      <BottomNav pathname={pathname} />
    </>
  )
}
