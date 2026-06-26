import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ user: { id: "guest", nickname: "星月", email: "guest@tarot.app" } })
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  return NextResponse.json({ user: { id: "guest", nickname: body.nickname || "星月", email: "guest@tarot.app" } })
}
