"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Rnd } from "react-rnd"
import { motion } from "framer-motion"
import { Maximize2, X } from "lucide-react"

interface TerminalWindowProps {
  id: string
  title: string
  content: string | React.ReactNode
  onClose: () => void
  zIndex: number
  onFocus: () => void
  initialSize?: {
    x: number
    y: number
    width: number
    height: number
  }
}

export default function TerminalWindow({ title, content, onClose, zIndex, onFocus, initialSize }: TerminalWindowProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [previousSize, setPreviousSize] = useState({ x: 100, y: 100, width: 350, height: 250 })

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const getWindowSize = () => {
    if (isMobile || isTablet) {
      return {
        x: 12,
        y: 60,
        width: window.innerWidth - 24,
        height: window.innerHeight - 140,
      }
    }
    if (initialSize) {
      return initialSize
    }
    return {
      x: 100 + (zIndex - 1000) * 30,
      y: 100 + (zIndex - 1000) * 30,
      width: 350,
      height: 250,
    }
  }

  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMaximized(!isMaximized)
  }

  if (isMobile || isTablet) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-3 top-[60px] bottom-[72px] flex flex-col bg-background/95 backdrop-blur-sm border-2 border-primary rounded shadow-[0_0_20px_rgba(0,255,136,0.3)] crt-screen"
        style={{ zIndex }}
        onClick={onFocus}
      >
        <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/20">
          <div className="flex items-center gap-2">
            <button
              className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/80 border border-[#e0443e] transition-colors group relative flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              title="Close"
            >
              <X
                className="w-2 h-2 text-[#4d0000] opacity-0 group-hover:opacity-100 transition-opacity absolute"
                strokeWidth={3}
              />
            </button>
          </div>
          <span className="text-[10px] text-foreground font-mono truncate ml-2">{title}</span>
          <div className="w-3" />
        </div>

        <div className="flex-1 overflow-auto p-2 text-xs text-foreground crt-glow terminal-scrollbar">
          {typeof content === "string" ? (
            <pre className="whitespace-pre-wrap font-mono leading-relaxed">{content}</pre>
          ) : (
            content
          )}
        </div>

        <div className="px-3 py-1.5 border-t border-border bg-muted/20 text-[10px] text-secondary flex items-center justify-between">
          <span>READY</span>
          <span className="text-primary">ENCRYPTED</span>
        </div>
      </motion.div>
    )
  }

  return (
    <Rnd
      default={getWindowSize()}
      position={isMaximized ? { x: 0, y: 0 } : undefined}
      size={isMaximized ? { width: window.innerWidth - 48, height: window.innerHeight - 120 } : undefined}
      minWidth={200}
      minHeight={150}
      bounds="parent"
      dragHandleClassName="terminal-drag-handle"
      style={{ zIndex }}
      onMouseDown={onFocus}
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
      onDragStop={(e, d) => {
        if (!isMaximized) {
          setPreviousSize((prev) => ({ ...prev, x: d.x, y: d.y }))
        }
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        if (!isMaximized) {
          setPreviousSize({
            x: position.x,
            y: position.y,
            width: Number.parseInt(ref.style.width),
            height: Number.parseInt(ref.style.height),
          })
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="h-full flex flex-col bg-background/95 backdrop-blur-sm border-2 border-primary rounded shadow-[0_0_20px_rgba(0,255,136,0.3)] crt-screen overflow-hidden"
      >
        <div className="terminal-drag-handle flex items-center justify-between px-3 py-1.5 border-b border-border bg-muted/20 cursor-move">
          <div className="flex items-center gap-2">
            <button
              className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/80 border border-[#e0443e] transition-colors group relative flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              title="Close"
            >
              <X
                className="w-2 h-2 text-[#4d0000] opacity-0 group-hover:opacity-100 transition-opacity absolute"
                strokeWidth={3}
              />
            </button>
            <button
              className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#28c840]/80 border border-[#1dad2b] transition-colors group relative flex items-center justify-center"
              onClick={handleMaximize}
              title="Maximize"
            >
              <Maximize2
                className="w-2 h-2 text-[#003d00] opacity-0 group-hover:opacity-100 transition-opacity absolute"
                strokeWidth={3}
              />
            </button>
          </div>
          <span className="text-[10px] text-foreground font-mono truncate ml-2">{title}</span>
          <div className="w-3" />
        </div>

        <div className="flex-1 overflow-auto p-2 text-sm text-foreground crt-glow terminal-scrollbar relative">
          {typeof content === "string" ? (
            <pre className="whitespace-pre-wrap font-mono leading-relaxed">{content}</pre>
          ) : (
            content
          )}
        </div>

        <div className="px-4 py-1.5 border-t border-border bg-muted/20 text-xs text-secondary flex items-center justify-between">
          <span>READY</span>
          <span className="text-primary">ENCRYPTED</span>
        </div>
      </motion.div>
    </Rnd>
  )
}
