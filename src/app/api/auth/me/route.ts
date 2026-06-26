import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    user: {
      id: "guest",
      nickname: "星月",
      email: "guest@tarot.app",
    }
  })
}
