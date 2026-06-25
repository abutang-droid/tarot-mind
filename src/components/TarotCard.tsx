"use client"

interface TarotCardProps {
  name: string
  orientation: "正位" | "逆位"
  keywords?: string
  interpretation?: string
  flipped?: boolean
  onClick?: () => void
  small?: boolean
}

export default function TarotCard({ name, orientation, keywords, flipped, small }: TarotCardProps) {
  return (
    <div className={`perspective-[1000px] ${small ? "w-24 h-36" : "w-28 h-40 sm:w-32 sm:h-44"}`}>
      <div className={`relative w-full h-full transition-transform duration-600 preserve-3d ${flipped ? "animate-flip-in" : ""}`}>
        <div className={`absolute inset-0 rounded-xl card-back flex items-center justify-center backface-hidden ${small ? "p-2" : "p-3"}`}>
          <div className="text-center">
            <div className="text-[#D4A853] text-2xl mb-1">✦</div>
            <div className="text-[#D4A853]/60 text-xs">TarotMind</div>
          </div>
        </div>
        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-[#1A1040] to-[#2d1b69] border border-[#D4A853]/30 p-3 flex flex-col items-center justify-center ${flipped ? "" : "hidden"}`}>
          <div className={`text-[#D4A853] font-serif font-bold text-center ${small ? "text-xs" : "text-sm"}`}>{name}</div>
          <div className={`text-[#F5F0E8]/60 ${small ? "text-[10px]" : "text-xs"} mt-1`}>{orientation}</div>
          {keywords && !small && (
            <div className="text-[10px] text-[#F5F0E8]/40 mt-2 text-center leading-tight">{keywords}</div>
          )}
        </div>
      </div>
    </div>
  )
}
