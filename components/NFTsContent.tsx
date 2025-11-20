"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ExternalLink } from "lucide-react"
import FolderButton from "./FolderButton"
import { useData } from "@/contexts/DataContext"

interface NFT {
  id: string
  name: string
  image: string | null
  url: string | null
}

export default function NFTsContent() {
  const { nfts } = useData()
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)

  return (
    <>
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
                    onClick={() => setSelectedNFT(nft)}
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

      {/* NFT Modal */}
      {selectedNFT && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedNFT(null)}
        >
          <div 
            className="relative bg-background border-2 border-primary rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto crt-glow"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedNFT(null)}
              className="absolute top-4 right-4 p-2 hover:bg-primary/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-primary" />
            </button>

            {/* NFT Image */}
            {selectedNFT.image && (
              <div className="relative w-full aspect-square mb-6 rounded-lg overflow-hidden border border-primary/30">
                <Image
                  src={selectedNFT.image}
                  alt={selectedNFT.name}
                  fill
                  className="object-contain"
                  quality={100}
                />
              </div>
            )}

            {/* NFT Details */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-primary crt-glow">{selectedNFT.name}</h2>
              
              {selectedNFT.url && (
                <a
                  href={selectedNFT.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 border border-primary rounded-lg transition-colors text-primary"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on Marketplace
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
