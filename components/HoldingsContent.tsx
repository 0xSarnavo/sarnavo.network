"use client"

import { useEffect, useState } from "react"
import FolderButton from "./FolderButton"

interface Holding {
  id: string
  name: string
  logo: string | null
  url: string | null
}

export default function HoldingsContent() {
  const [holdings, setHoldings] = useState<Holding[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/holdings")
      .then((res) => res.json())
      .then((data) => {
        setHoldings(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-4 text-center crt-glow">Loading holdings...</div>

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 justify-items-center">
          {holdings.map((holding) => (
            <div key={holding.id} className="flex flex-col items-center">
              <FolderButton
                icon={
                  holding.logo ? (
                    <img
                      src={holding.logo}
                      alt={holding.name}
                      className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-[0_0_12px_rgba(57,255,20,0.5)]"
                    />
                  ) : (
                    <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-primary/20 rounded-full border border-primary/50">
                      <span className="text-xl font-bold text-primary">{holding.name[0]}</span>
                    </div>
                  )
                }
                label={holding.name.toLowerCase()}
                onClick={() => {
                  if (holding.url) window.open(holding.url, "_blank")
                }}
                title={holding.name}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t border-border/30 pt-2 mt-2">
        <p className="text-[9px] text-foreground/50 text-center italic">* Not investment suggestions</p>
      </div>
    </div>
  )
}
