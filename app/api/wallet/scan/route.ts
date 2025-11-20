import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { Network, Alchemy } from "alchemy-sdk"
import { authOptions } from "../../auth/[...nextauth]/route"

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET, // Default to ETH, can be made dynamic
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { address, chain } = await req.json()
    
    if (!address) {
      return NextResponse.json({ error: "Address required" }, { status: 400 })
    }

    // Configure network based on request
    let currentSettings = { ...settings }
    if (chain === 'AVAX') {
        currentSettings.network = Network.AVAX_MAINNET
    } else if (chain === 'POLYGON') {
        currentSettings.network = Network.MATIC_MAINNET
    }
    
    const currentAlchemy = new Alchemy(currentSettings)

    const nfts = await currentAlchemy.nft.getNftsForOwner(address)

    const formattedNfts = nfts.ownedNfts.map((nft) => ({
      name: nft.name || `#${nft.tokenId}`,
      tokenId: nft.tokenId,
      contractAddress: nft.contract.address,
      image: nft.image?.originalUrl || nft.image?.thumbnailUrl || "",
      description: nft.description,
      type: nft.tokenType,
    }))

    return NextResponse.json({ nfts: formattedNfts })
  } catch (error) {
    console.error("Alchemy Error:", error)
    return NextResponse.json({ error: "Failed to fetch NFTs from wallet" }, { status: 500 })
  }
}
