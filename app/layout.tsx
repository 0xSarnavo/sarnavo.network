import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"

export const viewport: Viewport = {
  themeColor: "#020202",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "SARNAVO.SYS - Terminal Portfolio",
  description: "Retro CRT terminal portfolio system - Access the classified archives of 0xSarnavo",
  keywords: ["portfolio", "terminal", "CRT", "retro", "blockchain", "web3", "developer"],
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased font-mono">
        <div className="min-h-screen relative">
          {/* main app content */}
          <div className="relative z-10">{children}</div>
        </div>
      </body>
    </html>
  )
}
