import { NextResponse } from "next/server"
import { TAROT_TIPS } from "@/lib/tarot/fortune"

export async function GET() {
  const d = new Date()
  const idx = Math.floor((d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 86400000) % TAROT_TIPS.length
  return NextResponse.json(TAROT_TIPS[idx])
}
