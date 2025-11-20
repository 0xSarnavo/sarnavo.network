import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET() {
  try {
    const holdings = await prisma.holding.findMany({
      orderBy: { order: "asc" },
    })
    return NextResponse.json(holdings)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch holdings" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { name, logo, url, order } = body
    const holding = await prisma.holding.create({
      data: { name, logo, url, order: order || 0 },
    })
    return NextResponse.json(holding)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create holding" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 })

    await prisma.holding.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete holding" }, { status: 500 })
  }
}
