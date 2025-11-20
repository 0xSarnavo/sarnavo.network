"use client"

import type React from "react"

import { useState } from "react"
import useDecryptionJumble from "@/hooks/useDecryptionJumble"

interface FolderButtonProps {
  icon: React.ReactNode
  label: string
  onClick: () => void
  title: string
}

export default function FolderButton({ icon, label, onClick, title }: FolderButtonProps) {
  const [hover, setHover] = useState(false)
  const scrambledLabel = useDecryptionJumble(label, { active: hover, duration: 500 })

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="flex items-center justify-center hover:scale-110 transition-transform"
        title={title}
      >
        {icon}
      </button>
      <span className="text-[8px] xs:text-[9px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-mono text-foreground crt-glow drop-shadow-[0_0_8px_rgba(57,255,20,0.8)] whitespace-nowrap tracking-wide">
        {scrambledLabel}
      </span>
    </div>
  )
}
