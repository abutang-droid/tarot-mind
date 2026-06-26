"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const ReadingIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke={active ? "var(--gold-light)" : "var(--text-muted)"}
    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" fill={active ? "rgba(201,149,74,0.12)" : "none"} />
    <circle cx="12" cy="10" r="3" stroke={active ? "#D4A853" : "var(--text-muted)"} strokeWidth="1.6" />
    <path d="M9 16c0-1.5 1.5-2.5 3-2.5s3 1 3 2.5" />
    <path d="M12 6v2" stroke={active ? "#D4A853" : "var(--text-muted)"} strokeWidth="1.6" />
  </svg>
)

const TempleIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke={active ? "var(--gold-light)" : "var(--text-muted)"}
    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18" />
    <path d="M5 21V9l4-4 3 2 3-2 4 4v12" fill={active ? "rgba(201,149,74,0.08)" : "none"} />
    <circle cx="12" cy="12" r="3" fill={active ? "rgba(201,149,74,0.15)" : "none"} stroke={active ? "#D4A853" : "var(--text-muted)"} />
    <path d="M12 15v2" /><path d="M9 12h6" />
  </svg>
)

const CrystalIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke={active ? "var(--gold-light)" : "var(--text-muted)"}
    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L15 8l6 2-5 4 1 7-5-3-5 3 1-7-5-4 6-2 3-6z" fill={active ? "rgba(201,149,74,0.1)" : "none"} />
    <circle cx="12" cy="11" r="2" fill={active ? "rgba(201,149,74,0.2)" : "none"} />
  </svg>
)

const ProfileIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke={active ? "var(--gold-light)" : "var(--text-muted)"}
    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" fill={active ? "rgba(201,149,74,0.08)" : "none"} />
    <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" />
  </svg>
)

const NAV_ITEMS = [
  { href: "/",        label: "占卜",   Icon: ReadingIcon },
  { href: "/temple",  label: "拜神",   Icon: TempleIcon },
  { href: "/crystal", label: "水晶",   Icon: CrystalIcon },
  { href: "/profile", label: "我",     Icon: ProfileIcon },
]

function BottomNav({ pathname }: { pathname: string }) {
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(13,13,13,0.95)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '0.5px solid var(--border)',
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      <div style={{
        maxWidth: 480, margin: '0 auto',
        display: 'flex', justifyContent: 'space-around',
        alignItems: 'center', height: 56,
      }}>
        {NAV_ITEMS.map(item => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
          return (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 3, width: 64, textDecoration: 'none',
              position: 'relative', padding: '6px 0',
            }}>
              {isActive && (
                <div style={{
                  position: 'absolute', top: 0, left: '50%',
                  transform: 'translateX(-50%)',
                  width: 20, height: 2, borderRadius: 1,
                  background: 'var(--gold-light)',
                }} />
              )}
              <item.Icon active={isActive} />
              <span style={{
                fontSize: 10, fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--gold-light)' : 'var(--text-muted)',
                transition: 'color 0.15s ease',
                fontFamily: 'var(--font-sans)',
                letterSpacing: '0.02em',
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

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <div style={{ minHeight: '100dvh' }}>
      <div style={{ paddingBottom: 76 }}>
        {children}
      </div>
      <BottomNav pathname={pathname} />
    </div>
  )
}
