"use client"

import { useEffect, useState } from "react"
import FolderButton from "./FolderButton"

interface NFT {
  id: string
  name: string
  image: string | null
  url: string | null
}

export default function NFTsContent() {
  const [nfts, setNfts] = useState<NFT[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/nfts")
      .then((res) => res.json())
      .then((data) => {
        setNfts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-4 text-center crt-glow">Loading NFTs...</div>

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 justify-items-center">
          {nfts.map((nft) => (
            <div key={nft.id} className="flex flex-col items-center">
              <FolderButton
                icon={
                  <img
                    src={nft.image || "/placeholder.svg"}
                    alt={nft.name}
                    className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-md drop-shadow-[0_0_12px_rgba(57,255,20,0.5)]"
                  />
                }
                label={nft.name.length > 10 ? nft.name.substring(0, 10) + "..." : nft.name}
                onClick={() => {
                  if (nft.url) window.open(nft.url, "_blank")
                }}
                title={nft.name}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-border p-2 text-center">
        <p className="text-[9px] text-foreground/60 crt-glow">NFT Collection • {nfts.length} Items</p>
      </div>
    </div>
  )
}
