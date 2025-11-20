"use client"

import { useState, useEffect } from "react"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()[]{}+-=<>?"

interface UseDecryptionJumbleOptions {
  active: boolean
  duration?: number
}

export default function useDecryptionJumble(
  text: string,
  { active, duration = 400 }: UseDecryptionJumbleOptions,
): string {
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (!active) {
      setDisplay(text)
      return
    }

    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime

      if (elapsed > duration) {
        setDisplay(text)
        return
      }

      const progress = elapsed / duration
      let scrambled = ""

      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          scrambled += " "
        } else if (Math.random() < progress) {
          scrambled += text[i]
        } else {
          scrambled += CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      }

      setDisplay(scrambled)
      requestAnimationFrame(animate)
    }

    animate()
  }, [active, text, duration])

  return display
}
