import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthUser } from "@/lib/auth"
import { generateFortune } from "@/lib/tarot/fortune"

export async function GET(req: NextRequest) {
  const auth = await getAuthUser()
  if (!auth) return NextResponse.json({ error: "未登录" }, { status: 401 })

  const dateParam = req.nextUrl.searchParams.get("date")
  const today = dateParam ? new Date(dateParam) : new Date()
  today.setHours(0, 0, 0, 0)

  const existing = await prisma.fortuneView.findUnique({
    where: { userId_date: { userId: auth.userId, date: today } },
  })

  if (existing) {
    return NextResponse.json({ love: existing.love, work: existing.work, wealth: existing.wealth, mood: existing.mood, date: today.toISOString() })
  }

  const seed = today.getTime() + auth.userId.charCodeAt(0)
  const fortune = generateFortune(seed)

  await prisma.fortuneView.create({
    data: { userId: auth.userId, date: today, love: fortune.love as any, work: fortune.work as any, wealth: fortune.wealth as any, mood: fortune.mood as any },
  })

  return NextResponse.json({ ...fortune, date: today.toISOString() })
}
