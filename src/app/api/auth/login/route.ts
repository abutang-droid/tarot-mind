import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createToken, setAuthCookie } from "@/lib/auth"
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: "请输入邮箱和密码" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !user.password) {
      return NextResponse.json({ error: "邮箱或密码错误" }, { status: 401 })
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return NextResponse.json({ error: "邮箱或密码错误" }, { status: 401 })
    }

    const token = await createToken({ userId: user.id, email: user.email || "" })
    const response = NextResponse.json({
      token,
      user: { id: user.id, nickname: user.nickname, email: user.email, avatar: user.avatar, birthday: user.birthday, gender: user.gender },
    })
    response.cookies.set(setAuthCookie(token))
    return response
  } catch (e) {
    return NextResponse.json({ error: "登录失败" }, { status: 400 })
  }
}
