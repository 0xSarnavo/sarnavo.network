"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const BOOT_LINES = [
  "   ███████╗ █████╗ ██████╗ ███╗   ██╗ █████╗ ██╗   ██╗ ██████╗      ",
  "",
  "   ██╔════╝██╔══██╗██╔══██╗████╗  ██║██╔══██╗██║   ██║██╔═══██╗     ",
  "   ███████╗███████║██████╔╝██╔██╗ ██║███████║██║   ██║██║   ██║     ",
  "   ╚════██║██╔══██║██╔══██╗██║╚██╗██║██╔══██║╚██╗ ██╔╝██║   ██║     ",
  "   ███████║██║  ██║██║  ██║██║ ╚████║██║  ██║ ╚████╔╝ ╚██████╔╝     ",
  "   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝  ╚═══╝   ╚═════╝      ",
  "",
  "SARNAVO BIOS v3.14.159 (C) 2025 SARNAVO Systems",
  "Initializing SARNAVO.SYS............................................[OK]",
  "Loading kernel modules...............................................[OK]",
  "Running environment diagnostics......................................[OK]",
  "Verifying user credentials...........................................[OK]",
  "Checking blockchain integrity........................................[OK]",
  "Mounting NFT filesystem..............................................[OK]",
  "Decryption in progress...............................................[OK]",
  "Establishing secure session..........................................[OK]",
  "Access granted. Welcome, User: 0xSARNAVO",
]

export default function BootScreen({ onFinish }: { onFinish: () => void }) {
  const [logs, setLogs] = useState<string[]>([])
  const [showCursor, setShowCursor] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [flicker, setFlicker] = useState(true)

  // Adds lines one by one
  useEffect(() => {
    let lineIndex = 0

    const addLine = () => {
      if (lineIndex < BOOT_LINES.length) {
        setLogs((prev) => [...prev, BOOT_LINES[lineIndex]])
        lineIndex++

        const delay = lineIndex < 10 ? 150 : 350
        setTimeout(addLine, delay)
      } else {
        setTimeout(() => {
          setShowCursor(false)
          setFadeOut(true)
          setTimeout(onFinish, 1000)
        }, 1200)
      }
    }

    addLine()
  }, [onFinish])

  // Soft flicker pulse effect
  useEffect(() => {
    const flickerInterval = setInterval(() => {
      setFlicker((prev) => !prev)
    }, 500 + Math.random() * 300)
    return () => clearInterval(flickerInterval)
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: fadeOut ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: fadeOut ? 1 : 0.5 }}
        className="fixed inset-0 flex items-center justify-center z-50 bg-black scanlines noise crt-vignette crt-power-on"
      >
        <div className="flex items-center justify-center w-full h-full px-4 sm:px-8 md:px-12 pt-20">
          <motion.div
            // Subtle global CRT glow flicker
            animate={{
              opacity: flicker ? 1 : 0.92,
              filter: flicker ? "brightness(1)" : "brightness(0.85)",
            }}
            transition={{ duration: 0.15 }}
            className="text-left max-w-full sm:max-w-3xl md:max-w-4xl overflow-x-auto"
          >
            {logs.map((log, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="font-mono text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs leading-tight mb-0.5 whitespace-pre"
                style={{
                  color: "#00ff00",
                  textShadow: "0 0 8px rgba(0, 255, 0, 0.7)",
                }}
              >
                {log}
              </motion.div>
            ))}

            {logs.length === BOOT_LINES.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="mt-4 font-mono text-[9px] sm:text-[10px] md:text-xs text-[#00ff00]"
                style={{ textShadow: "0 0 6px rgba(0, 255, 0, 0.5)" }}
              >
                System ready. Launching desktop environment...
                {showCursor && <span className="cursor-blink ml-1">█</span>}
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
