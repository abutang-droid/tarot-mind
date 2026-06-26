import { NextRequest, NextResponse } from "next/server"
import { drawCards } from "@/lib/tarot/draw"
import { interpretReading } from "@/lib/tarot/reading"

export async function POST(req: NextRequest) {
  const { spreadType = "three", question = "" } = await req.json()
  if (!["single", "three", "diamond", "moon", "horseshoe", "celtic"].includes(spreadType)) {
    return NextResponse.json({ error: "无效的牌阵类型" }, { status: 400 })
  }

  const drawResult = drawCards(spreadType, question)
  const interpretation = interpretReading(drawResult.cards, spreadType)

  return NextResponse.json({
    id: crypto.randomUUID(),
    spreadType,
    question,
    cards: interpretation.cards,
    relationships: interpretation.relationships,
    conclusion: interpretation.conclusion,
    crystalName: interpretation.crystalName,
    crystalSpec: interpretation.crystalSpec,
    crystalDescription: interpretation.crystalDescription,
    seed: drawResult.seed,
    createdAt: new Date().toISOString(),
  })
}
