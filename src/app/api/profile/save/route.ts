import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { profile } = body
    if (!profile || !profile.name) {
      return NextResponse.json({ saved: false, reason: "no data" })
    }

    // In future: write to DB via prisma
    // await prisma.user.update({ where: { ... }, data: { nickname: profile.name, ... } })

    return NextResponse.json({ saved: true, profile })
  } catch (error) {
    return NextResponse.json({ saved: false, error: "failed" }, { status: 500 })
  }
}
