import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthUser } from "@/lib/auth"
import { drawCards } from "@/lib/tarot/draw"
import { interpretReading } from "@/lib/tarot/reading"

export async function POST(req: NextRequest) {
  const auth = await getAuthUser()
  if (!auth) return NextResponse.json({ error: "未登录" }, { status: 401 })

  const { spreadType = "three", question = "" } = await req.json()
  if (!["single", "three", "diamond", "moon", "horseshoe", "celtic"].includes(spreadType)) {
    return NextResponse.json({ error: "无效的牌阵类型" }, { status: 400 })
  }

  const drawResult = drawCards(spreadType, question)
  const interpretation = interpretReading(drawResult.cards, spreadType)

  const record = await prisma.readingRecord.create({
    data: { userId: auth.userId, spreadType, question, cards: interpretation.cards as any, conclusion: interpretation.conclusion, crystalName: interpretation.crystalName },
  })

  return NextResponse.json({
    id: record.id,
    spreadType,
    question,
    cards: interpretation.cards,
    relationships: interpretation.relationships,
    conclusion: interpretation.conclusion,
    crystalName: interpretation.crystalName,
    crystalSpec: interpretation.crystalSpec,
    crystalDescription: interpretation.crystalDescription,
    seed: drawResult.seed,
    createdAt: record.createdAt.toISOString(),
  })
}
