"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import BootScreen from "@/components/BootScreen"
import Desktop from "@/components/Desktop"

export default function Page() {
  const [bootDone, setBootDone] = useState(false)
  const [imagesPreloaded, setImagesPreloaded] = useState(false)

  // Preload images during boot screen
  useEffect(() => {
    const preloadImages = async () => {
      try {
        // Fetch NFTs and Holdings data
        const [nftsRes, holdingsRes] = await Promise.all([
          fetch("/api/nfts"),
          fetch("/api/holdings"),
        ])

        const [nfts, holdings] = await Promise.all([
          nftsRes.json(),
          holdingsRes.json(),
        ])

        // Preload all images
        const imageUrls = [
          ...nfts.map((nft: any) => nft.image).filter(Boolean),
          ...holdings.map((h: any) => h.logo).filter(Boolean),
        ]

        // Create image elements to trigger browser caching
        const imagePromises = imageUrls.map((url: string) => {
          return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = resolve
            img.onerror = resolve // Continue even if some images fail
            img.src = url
          })
        })

        await Promise.all(imagePromises)
        setImagesPreloaded(true)
      } catch (error) {
        console.error("Error preloading images:", error)
        setImagesPreloaded(true) // Continue anyway
      }
    }

    preloadImages()
  }, [])

  return (
    <div className="min-h-screen bg-background font-sans overflow-hidden">
      <AnimatePresence mode="wait">{!bootDone && <BootScreen onFinish={() => setBootDone(true)} />}</AnimatePresence>

      {bootDone && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Desktop />
        </motion.div>
      )}
    </div>
  )
}
