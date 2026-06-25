"use client"

interface LoadingSpinnerProps { text?: string }

export default function LoadingSpinner({ text = "占卜中..." }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-16 h-16 rounded-full border-2 border-[#D4A853]/20 border-t-[#D4A853] animate-spin mb-4" />
      <div className="text-[#D4A853] text-sm animate-pulse">{text}</div>
    </div>
  )
}
