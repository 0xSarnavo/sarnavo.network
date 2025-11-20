import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET() {
  try {
    const nfts = await prisma.nFT.findMany({
      where: { isVisible: true },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(nfts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch NFTs" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { name, image, url, tokenId, contractAddress, source } = body
    const nft = await prisma.nFT.create({
      data: {
        name,
        image,
        url,
        tokenId,
        contractAddress,
        source: source || "MANUAL",
        isVisible: true,
      },
    })
    return NextResponse.json(nft)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create NFT" }, { status: 500 })
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

    await prisma.nFT.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete NFT" }, { status: 500 })
  }
}
