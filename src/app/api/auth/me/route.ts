import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthUser } from "@/lib/auth"

export async function GET() {
  const auth = await getAuthUser()
  if (!auth) return NextResponse.json({ error: "未登录" }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { id: auth.userId },
    select: { id: true, nickname: true, email: true, avatar: true, birthday: true, gender: true, createdAt: true },
  })
  if (!user) return NextResponse.json({ error: "用户不存在" }, { status: 404 })

  return NextResponse.json({ user })
}
