"use client"

import { useState } from "react"
import type { LucideIcon } from "lucide-react"
import useDecryptionJumble from "@/hooks/useDecryptionJumble"

interface FolderIconProps {
  label: string
  icon: LucideIcon
  onOpen: () => void
}

export default function FolderIcon({ label, icon: Icon, onOpen }: FolderIconProps) {
  const [hover, setHover] = useState(false)
  const scrambledLabel = useDecryptionJumble(label, { active: hover, duration: 500 })

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onOpen}
      className="flex flex-col items-center gap-1 focus:outline-none group transition-all duration-200"
    >
      <div className="relative">
        <Icon className="h-10 w-10 xs:h-11 xs:w-11 sm:h-10 sm:w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 stroke-[1.5px] text-primary drop-shadow-[0_0_12px_rgba(0,255,136,0.3)] transition-all duration-200 group-hover:drop-shadow-[0_0_20px_rgba(0,255,136,0.6)] group-hover:scale-110" />
      </div>
      <div className="text-[8px] xs:text-[9px] sm:text-[8px] md:text-[9px] lg:text-[10px] text-foreground crt-glow font-mono tracking-wide whitespace-nowrap">
        {scrambledLabel}
      </div>
    </button>
  )
}
