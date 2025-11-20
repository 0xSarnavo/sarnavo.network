"use client"

import { useState } from "react"
import { aboutMe, disclosure } from "@/data/about"
import { FileText } from "lucide-react"

export default function AboutContent() {
  const [activeFile, setActiveFile] = useState<"me" | "disclosure">("me")

  return (
    <div className="flex flex-col h-full">
      {/* File tabs */}
      <div className="flex gap-2 mb-4 border-b border-border pb-2">
        <button
          onClick={() => setActiveFile("me")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-colors ${
            activeFile === "me"
              ? "bg-primary/20 text-primary border border-primary/50"
              : "text-secondary hover:text-foreground hover:bg-secondary/10"
          }`}
        >
          <FileText className="w-3 h-3" />
          me.txt
        </button>
        <button
          onClick={() => setActiveFile("disclosure")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-colors ${
            activeFile === "disclosure"
              ? "bg-primary/20 text-primary border border-primary/50"
              : "text-secondary hover:text-foreground hover:bg-secondary/10"
          }`}
        >
          <FileText className="w-3 h-3" />
          disclosure.txt
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto terminal-scrollbar">
        <pre className="whitespace-pre-wrap font-mono leading-relaxed text-sm">
          {activeFile === "me" ? aboutMe : disclosure}
        </pre>
      </div>
    </div>
  )
}
