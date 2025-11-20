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
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={() => setSelectedNFT(null)}
        >
          <div 
            className="relative bg-background border-2 border-primary rounded-lg p-4 sm:p-6 w-full max-w-4xl max-h-[95vh] overflow-y-auto crt-glow shadow-[0_0_50px_rgba(0,255,0,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - More Visible */}
            <button
              onClick={() => setSelectedNFT(null)}
              className="absolute top-2 right-2 z-10 p-3 bg-primary/30 hover:bg-primary/50 rounded-lg transition-all border border-primary shadow-lg"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-primary drop-shadow-[0_0_8px_rgba(0,255,0,0.8)]" />
            </button>

            {/* NFT Image - Better Scaling */}
            {selectedNFT.image && (
              <div className="relative w-full mb-6 rounded-lg overflow-hidden border-2 border-primary/50 bg-black">
                <div className="relative w-full" style={{ paddingBottom: '100%' }}>
                  <Image
                    src={selectedNFT.image}
                    alt={selectedNFT.name}
                    fill
                    className="object-contain p-2"
                    quality={100}
                    priority
                  />
                </div>
              </div>
            )}

            {/* NFT Details */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-primary crt-glow pr-12">{selectedNFT.name}</h2>
              
              {selectedNFT.url && (
                <a
                  href={selectedNFT.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/40 border-2 border-primary rounded-lg transition-all text-primary font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(0,255,0,0.5)]"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on Marketplace
                </a>
              )}
              
              <p className="text-sm text-foreground/60 crt-glow">
                Click outside or press the ✕ button to close
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
