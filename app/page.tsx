"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import BootScreen from "@/components/BootScreen"
import Desktop from "@/components/Desktop"

export default function Page() {
  const [bootDone, setBootDone] = useState(false)

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
