import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "../auth/[...nextauth]/route"

// GET - Get all contact messages (admin only)
export async function GET() {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user?.email !== "sarnavoss.dev@gmail.com") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(messages)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

// POST - Submit contact form (public)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    const contactMessage = await prisma.contactMessage.create({
      data: { name, email, subject, message },
    })

    return NextResponse.json(contactMessage, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}

// DELETE - Delete a message (admin only)
export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user?.email !== "sarnavoss.dev@gmail.com") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    await prisma.contactMessage.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 })
  }
}
