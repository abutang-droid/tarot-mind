"use client"
interface TarotCardProps { name: string; orientation: "正位" | "逆位"; keywords?: string; flipped?: boolean; small?: boolean }
export default function TarotCard({ name, orientation, keywords, flipped, small }: TarotCardProps) {
  const sz = small ? "w-[88px] h-[132px]" : "w-[112px] h-[168px] sm:w-[128px] sm:h-[192px]"
  return (
    <div className={`${sz}`} style={{ perspective: '800px' }}>
      <div className="relative w-full h-full transition-all duration-700" style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(0deg)' : 'rotateY(180deg)' }}>
        <div className="absolute inset-0 rounded-[var(--radius-sm)] card-back flex items-center justify-center p-3" style={{ backfaceVisibility: 'hidden' }}>
          <div className="text-center">
            <div className="w-8 h-8 mx-auto rounded-full border border-[#C9954A]/40 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9954A" strokeWidth="1.5"><path d="M12 3a9 9 0 1 0 9 9"/><path d="M12 7a5 5 0 1 0 5 5"/><circle cx="12" cy="12" r="1" fill="#C9954A"/></svg>
            </div>
            <div className="text-[8px] tracking-[0.15em] mt-1.5" style={{ color: 'rgba(201,149,74,0.5)' }}>TAROT</div>
          </div>
        </div>
        <div className="absolute inset-0 rounded-[var(--radius-sm)] flex flex-col items-center justify-center p-3" style={{ backfaceVisibility: 'hidden', background: 'linear-gradient(145deg, rgba(12,15,35,0.95) 0%, rgba(26,16,64,0.95) 100%)', border: '1px solid rgba(201,149,74,0.25)', opacity: flipped ? 1 : 0, transition: 'opacity 0.3s' }}>
          <div className={`font-bold text-center ${small ? "text-[10px]" : "text-[11px] sm:text-xs"}`} style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)' }}>{name}</div>
          <div className={`${small ? "text-[8px]" : "text-[9px]"} mt-1`} style={{ color: orientation === '正位' ? 'rgba(237,228,212,0.5)' : 'rgba(212,120,106,0.6)' }}>{orientation === '正位' ? '↑ 正位' : '↓ 逆位'}</div>
          {keywords && !small && <div className="text-[8px] mt-2 text-center leading-relaxed px-1" style={{ color: 'rgba(237,228,212,0.3)' }}>{keywords}</div>}
          <div className="absolute top-1 left-2 text-[6px]" style={{ color: 'rgba(201,149,74,0.2)' }}>◈</div>
          <div className="absolute bottom-1 right-2 text-[6px]" style={{ color: 'rgba(201,149,74,0.2)' }}>◈</div>
        </div>
      </div>
    </div>
  )
}
