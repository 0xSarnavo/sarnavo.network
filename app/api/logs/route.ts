import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET() {
  try {
    const items = await prisma.log.findMany({ orderBy: { order: "asc" } })
    return NextResponse.json(items)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.email !== "sarnavoss.dev@gmail.com") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const item = await prisma.log.create({ data: body })
    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create log" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.email !== "sarnavoss.dev@gmail.com") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 })

    await prisma.log.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete log" }, { status: 500 })
  }
}
