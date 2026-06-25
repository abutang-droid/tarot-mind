"use client"

interface CrystalCardProps { name: string; spec: string; description: string }

export default function CrystalCard({ name, spec, description }: CrystalCardProps) {
  return (
    <div className="bg-gradient-to-r from-[#1A1040]/80 to-[#2d1b69]/80 rounded-xl border border-[#D4A853]/20 p-4 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4A853]/30 to-[#D4A853]/10 flex items-center justify-center text-2xl">💎</div>
        <div className="flex-1">
          <div className="font-bold text-[#D4A853]">{name}</div>
          <div className="text-xs text-[#F5F0E8]/60">{spec}</div>
        </div>
      </div>
      <div className="mt-2 text-sm text-[#F5F0E8]/80">{description}</div>
    </div>
  )
}
