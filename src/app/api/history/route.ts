import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  return NextResponse.json({ records: [], total: 0, page: 1, totalPages: 1 })
}
