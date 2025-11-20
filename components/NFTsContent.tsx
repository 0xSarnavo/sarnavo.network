"use client"

import Image from "next/image"
import FolderButton from "./FolderButton"
import { useData } from "@/contexts/DataContext"

export default function NFTsContent() {
  const { nfts } = useData()

  const openNFTWindow = (nft: any) => {
    if (nft.image) {
      // Open image in a new popup window
      const width = 800
      const height = 900
      const left = (window.screen.width - width) / 2
      const top = (window.screen.height - height) / 2
      
      window.open(
        nft.image,
        '_blank',
        `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
      )
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {nfts.length === 0 ? (
          <div className="p-4 text-center crt-glow text-foreground/60">
            No NFTs found
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 justify-items-center">
            {nfts.map((nft) => (
              <div key={nft.id} className="flex flex-col items-center">
                <FolderButton
                  icon={
                    nft.image ? (
                      <div className="relative w-12 h-12 md:w-16 md:h-16">
                        <Image
                          src={nft.image}
                          alt={nft.name}
                          fill
                          sizes="(max-width: 768px) 48px, 64px"
                          className="object-cover rounded-lg drop-shadow-[0_0_12px_rgba(57,255,20,0.5)]"
                          loading="lazy"
                          quality={75}
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-primary/20 rounded-lg border border-primary/50">
                        <span className="text-xl font-bold text-primary">NFT</span>
                      </div>
                    )
                  }
                  label={nft.name.toLowerCase()}
                  onClick={() => openNFTWindow(nft)}
                  title={nft.name}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="border-t border-border p-2 text-center">
        <p className="text-[9px] text-foreground/60 crt-glow">NFT Collection • {nfts.length} Items</p>
      </div>
    </div>
  )
}
