import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createToken, setAuthCookie } from "@/lib/auth"
import bcrypt from "bcryptjs"
import { z } from "zod"

const schema = z.object({
  nickname: z.string().min(1).max(50),
  email: z.string().email().optional(),
  password: z.string().min(6).max(100).optional(),
  birthday: z.string().optional(),
  gender: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    const existing = data.email ? await prisma.user.findUnique({ where: { email: data.email } }) : null
    if (existing) {
      return NextResponse.json({ error: "该邮箱已注册" }, { status: 400 })
    }

    const hashedPassword = data.password ? await bcrypt.hash(data.password, 10) : undefined

    const user = await prisma.user.create({
      data: {
        nickname: data.nickname,
        email: data.email,
        password: hashedPassword,
        birthday: data.birthday ? new Date(data.birthday) : null,
        gender: data.gender,
      },
    })

    const token = await createToken({ userId: user.id, email: user.email || "" })
    const response = NextResponse.json({
      token,
      user: { id: user.id, nickname: user.nickname, email: user.email, avatar: user.avatar, birthday: user.birthday, gender: user.gender },
    })
    response.cookies.set(setAuthCookie(token))
    return response
  } catch (e) {
    return NextResponse.json({ error: "注册失败" }, { status: 400 })
  }
}
