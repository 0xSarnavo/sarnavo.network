"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { User, Trophy, Code, FileText, Share2, Wallet, Image, Coins } from "lucide-react"
import { motion } from "framer-motion"
import FolderIcon from "./FolderIcon"
import TerminalWindow from "./TerminalWindow"
import AboutContent from "./AboutContent"
import ConnectContent from "./ConnectContent"
import HoldingsContent from "./HoldingsContent"
import NFTsContent from "./NFTsContent"
import { getCurrentTime, getCurrentDate } from "@/lib/time"
import { useToast } from "@/hooks/use-toast"
import FolderButton from "./FolderButton" // Assuming FolderButton is a new component

export type WindowContent = {
  id: string
  title: string
  content: string | React.ReactNode
  type: "text" | "component"
  initialSize?: {
    x: number
    y: number
    width: number
    height: number
  }
}

function EncryptedText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text)
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`"

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    const cycle = () => {
      setDisplayText(text)

      setTimeout(() => {
        let iterations = 0
        const maxIterations = 8

        intervalId = setInterval(() => {
          setDisplayText(
            text
              .split("")
              .map((char) => {
                if (char === " " || char === ".") return char
                return chars[Math.floor(Math.random() * chars.length)]
              })
              .join(""),
          )

          iterations++
          if (iterations >= maxIterations) {
            clearInterval(intervalId)
            setTimeout(cycle, 100)
          }
        }, 100)
      }, 3000)
    }

    cycle()

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [text])

  return <span>{displayText}</span>
}

export default function Desktop() {
  const [currentTime, setCurrentTime] = useState(getCurrentTime())
  const [openWindows, setOpenWindows] = useState<WindowContent[]>([])
  const [focusedWindowId, setFocusedWindowId] = useState<string | null>(null)
  const [minimizedWindows] = useState<string[]>(["nfts-collection", "public-wallet", "hodl"])
  const { toast } = useToast()

  useEffect(() => {
    const updateWindowSizes = () => {
      setOpenWindows([])
    }

    updateWindowSizes()
    window.addEventListener("resize", updateWindowSizes)

    return () => {
      window.removeEventListener("resize", updateWindowSizes)
    }
  }, [toast])

  const openMinimizedWindow = (windowId: string) => {
    const isOpen = openWindows.find((w) => w.id === windowId)
    if (isOpen) {
      closeWindow(windowId)
      return
    }

    const isMobile = window.innerWidth < 768
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024
    const walletWidth = isMobile ? 180 : isTablet ? 220 : 450
    const walletHeight = isMobile ? 60 : isTablet ? 70 : 45

    let newWindow: WindowContent | null = null

    if (windowId === "nfts-collection") {
      const nftsWidth = isMobile ? 300 : isTablet ? 400 : 600
      const nftsHeight = isMobile ? 400 : isTablet ? 500 : 600

      newWindow = {
        id: "nfts-collection",
        title: "NFT COLLECTION",
        content: <NFTsContent />,
        type: "component",
        initialSize: {
          x: isMobile
            ? (window.innerWidth - 300) / 2
            : isTablet
              ? window.innerWidth - 450
              : window.innerWidth - nftsWidth - 50,
          y: isMobile ? 80 : isTablet ? 100 : 80,
          width: nftsWidth,
          height: nftsHeight,
        },
      }
    } else if (windowId === "hodl") {
      const holdingsWidth = isMobile ? 280 : isTablet ? 320 : 360
      const holdingsHeight = isMobile ? 320 : isTablet ? 380 : 420

      newWindow = {
        id: "hodl",
        title: "HODL",
        content: <HoldingsContent />,
        type: "component",
        initialSize: {
          x: isMobile ? (window.innerWidth - 280) / 2 : isTablet ? 50 : 50,
          y: isMobile ? 50 : isTablet ? 60 : 80,
          width: holdingsWidth,
          height: holdingsHeight,
        },
      }
    } else if (windowId === "public-wallet") {
      newWindow = {
        id: "public-wallet",
        title: "PUBLIC ADDRESS",
        content: (
          <div className="flex items-center justify-center h-full px-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText("0x94a50E9419aA3D4d9872D746D48337b1368a971C")
                toast({
                  title: "Copied!",
                  description: "Wallet address copied to clipboard",
                })
              }}
              className="text-foreground crt-glow hover:text-primary transition-colors font-mono text-[11px] whitespace-nowrap"
              title="Click to copy full address"
            >
              0x94a50E9419aA3D4d9872D746D48337b1368a971C
            </button>
          </div>
        ),
        type: "component",
        initialSize: {
          x: isMobile ? 210 : isTablet ? window.innerWidth - 250 : window.innerWidth - walletWidth - 50,
          y: isMobile ? 50 : isTablet ? 60 : 80,
          width: walletWidth,
          height: walletHeight,
        },
      }
    }

    if (newWindow) {
      setOpenWindows((prev) => [...prev, newWindow!])
      setFocusedWindowId(windowId)
    }
  }

  const openWindow = (windowContent: WindowContent) => {
    const exists = openWindows.find((w) => w.id === windowContent.id)
    if (!exists) {
      let windowToOpen = windowContent
      const isMobile = window.innerWidth < 768
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024

      // Make all windows bigger and position them to avoid overlapping icons
      if (!isMobile && !isTablet) {
        // Calculate available space (leave room for right-side icons)
        const iconSpace = 120 // Space for right-side icons
        const availableWidth = window.innerWidth - iconSpace - 48
        const availableHeight = window.innerHeight - 120

        windowToOpen = {
          ...windowContent,
          initialSize: {
            x: 24,
            y: 60,
            width: Math.min(availableWidth, 1200), // Max 1200px wide
            height: Math.min(availableHeight, 800), // Max 800px tall
          },
        }
      }
      setOpenWindows((prev) => [...prev, windowToOpen])
      setFocusedWindowId(windowContent.id)
    } else {
      setFocusedWindowId(windowContent.id)
    }
  }

  const closeWindow = (id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id))
    if (focusedWindowId === id) {
      setFocusedWindowId(openWindows.length > 1 ? openWindows[openWindows.length - 2].id : null)
    }
  }

  const getWindowZIndex = (windowId: string) => {
    if (windowId === focusedWindowId) {
      return 1000 + openWindows.length
    }
    const index = openWindows.findIndex((w) => w.id === windowId)
    return 1000 + index
  }


  const FolderView = ({ folderType }: { folderType: string }) => {
    const [items, setItems] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const fetchItems = async () => {
        try {
          const endpoint = `/api/${folderType}`
          const res = await fetch(endpoint)
          if (res.ok) {
            const data = await res.json()
            setItems(data)
          }
        } catch (error) {
          console.error(`Failed to fetch ${folderType}:`, error)
        } finally {
          setLoading(false)
        }
      }
      fetchItems()
    }, [folderType])

    if (loading) {
      return (
        <div className="flex flex-col gap-4">
          <div className="text-primary crt-glow">
            {"> "} {folderType.toUpperCase()} DIRECTORY
          </div>
          <div className="text-foreground/60 crt-glow text-sm">Loading...</div>
        </div>
      )
    }

    return (
      <div className="flex flex-col gap-4">
        <div className="text-primary crt-glow">
          {"> "} {folderType.toUpperCase()} DIRECTORY
        </div>
        <div className="grid grid-cols-3 gap-6">
          {items.map((item) => (
            <FolderIcon
              key={item.id}
              label={item.title}
              icon={FileText}
              onOpen={() =>
                openWindow({
                  id: `${folderType}-${item.id}`,
                  title: `${item.title}.txt`,
                  content: `${item.content}\n\n${item.date ? `Date: ${item.date}` : ""}${item.link ? `\nLink: ${item.link}` : ""}`,
                  type: "text",
                })
              }
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen bg-black p-3 md:p-6 scanlines noise crt-screen crt-vignette overflow-hidden"
    >
      {/* Header */}
      <header className="flex flex-row justify-between items-center gap-2 text-foreground mb-4 md:mb-8 pb-3 md:pb-4 border-b border-border">
        <div className="text-xs sm:text-sm crt-glow text-foreground">
          {">"} <EncryptedText text="SARNAVO.SYS" />
        </div>
        <div className="text-xs sm:text-sm crt-glow flex gap-2 sm:gap-4 text-foreground">
          <span className="hidden sm:inline">{getCurrentDate()}</span>
          <span className="tabular-nums">{currentTime}</span>
        </div>
      </header>

      {/* Minimized Window Icons */}
      <div className="fixed top-20 right-4 z-[997] flex flex-col gap-6">
        {minimizedWindows.includes("public-wallet") && (
          <FolderButton
            icon={<Wallet className="h-10 w-10 xs:h-11 xs:w-11 sm:h-10 sm:w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 stroke-[1.5px] text-primary drop-shadow-[0_0_12px_rgba(0,255,136,0.3)]" />}
            label="wallet"
            onClick={() => openMinimizedWindow("public-wallet")}
            title="PUBLIC ADDRESS"
          />
        )}
        {minimizedWindows.includes("nfts-collection") && (
          <FolderButton
            icon={<Image className="h-10 w-10 xs:h-11 xs:w-11 sm:h-10 sm:w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 stroke-[1.5px] text-primary drop-shadow-[0_0_12px_rgba(0,255,136,0.3)]" />}
            label="nfts"
            onClick={() => openMinimizedWindow("nfts-collection")}
            title="NFT Collection"
          />
        )}
        {minimizedWindows.includes("hodl") && (
          <FolderButton
            icon={<Coins className="h-10 w-10 xs:h-11 xs:w-11 sm:h-10 sm:w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 stroke-[1.5px] text-primary drop-shadow-[0_0_12px_rgba(0,255,136,0.3)]" />}
            label="hodl"
            onClick={() => openMinimizedWindow("hodl")}
            title="HODL"
          />
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-[998] bg-background/80 backdrop-blur-sm border border-border rounded-2xl sm:rounded-xl md:rounded-lg px-3 sm:px-4 py-3 sm:py-3"
      >
        <div className="flex items-center justify-center gap-3 sm:gap-3 md:gap-6">
          <FolderIcon
            label="About"
            icon={User}
            onOpen={() =>
              openWindow({
                id: "about",
                title: "about.sys",
                content: <AboutContent />,
                type: "component",
              })
            }
          />
          <FolderIcon
            label="Achievements"
            icon={Trophy}
            onOpen={() =>
              openWindow({
                id: "achievements-folder",
                title: "achievements/",
                content: <FolderView folderType="achievements" />,
                type: "component",
              })
            }
          />
          <FolderIcon
            label="Projects"
            icon={Code}
            onOpen={() =>
              openWindow({
                id: "projects-folder",
                title: "projects/",
                content: <FolderView folderType="projects" />,
                type: "component",
              })
            }
          />
          <FolderIcon
            label="Logs"
            icon={FileText}
            onOpen={() =>
              openWindow({
                id: "logs-folder",
                title: "logs/",
                content: <FolderView folderType="logs" />,
                type: "component",
              })
            }
          />
          <FolderIcon
            label="Connect"
            icon={Share2}
            onOpen={() =>
              openWindow({
                id: "connect",
                title: "connect.sys",
                content: <ConnectContent />,
                type: "component",
              })
            }
          />
        </div>
      </motion.div>

      {/* Footer Status Bar */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/90 backdrop-blur-sm p-2 md:p-3 z-[999] crt-flicker-subtle">
        <div className="flex flex-row items-center justify-between text-[10px] sm:text-xs crt-glow gap-2">
          <div className="flex items-center gap-2 sm:gap-6 text-foreground whitespace-nowrap">
            <span className="hidden md:inline">STATUS: SECURE CONNECTION ACTIVE</span>
            <span className="md:hidden">SECURE</span>
            <span>SYS ONLINE</span>
            <span className="hidden lg:inline">NO ERRORS DETECTED</span>
          </div>
          <div className="text-foreground tabular-nums whitespace-nowrap">WINDOWS: {openWindows.length}</div>
        </div>
      </footer>

      {/* Terminal Windows */}
      {openWindows.map((window) => (
        <TerminalWindow
          key={window.id}
          id={window.id}
          title={window.title}
          content={window.content}
          onClose={() => closeWindow(window.id)}
          zIndex={getWindowZIndex(window.id)}
          onFocus={() => setFocusedWindowId(window.id)}
          initialSize={window.initialSize}
        />
      ))}
    </motion.div>
  )
}
