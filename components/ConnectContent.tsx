"use client"

import type React from "react"
import { useState } from "react"
import { ExternalLink, Mail, Send, X, Github, Linkedin, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

const socialLinks = [
  { name: "X", url: "https://x.com/0xSarnavo", Icon: X, showName: false },
  {
    name: "Arena",
    url: "https://arena.social/0xsarnavo",
    customLogo: true,
    showName: true,
  },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/sarnavo/", Icon: Linkedin, showName: true },
  { name: "GitHub", url: "https://github.com/0xSarnavo", Icon: Github, showName: true },
  { name: "Telegram", url: "https://t.me/OxSarnavo", Icon: MessageCircle, showName: true },
]

const emailLinks = [
  { name: "Personal", email: "sssarnavo@gmail.com" },
  { name: "Work", email: "Sarnavo@team1.network" },
]

export default function ConnectContent() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", message: "" })
      setShowForm(false)
    }, 2000)
  }

  if (showForm) {
    return (
      <div className="flex flex-col h-full">
        <div className="mb-4 pb-2 border-b border-border">
          <div className="flex items-center justify-between">
            <span className="text-primary crt-glow">{">"} REACH OUT</span>
            <button onClick={() => setShowForm(false)} className="text-secondary hover:text-foreground text-xs">
              [BACK]
            </button>
          </div>
        </div>

        {submitted ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-primary crt-glow-strong text-lg mb-2">MESSAGE SENT</div>
              <div className="text-secondary text-sm">:: Await Response ::</div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-secondary mb-1 block">NAME</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-background/50 border-secondary text-foreground font-mono"
                placeholder="Enter your name..."
              />
            </div>
            <div>
              <label className="text-xs text-secondary mb-1 block">EMAIL</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-background/50 border-secondary text-foreground font-mono"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="text-xs text-secondary mb-1 block">MESSAGE (max 250 words)</label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                maxLength={1500}
                rows={6}
                className="bg-background/50 border-secondary text-foreground font-mono resize-none"
                placeholder="Your message here..."
              />
            </div>
            <Button type="submit" className="bg-primary text-background hover:bg-foreground font-mono">
              <Send className="w-4 h-4 mr-2" />
              TRANSMIT MESSAGE
            </Button>
          </form>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="text-primary crt-glow mb-3">{">"} SOCIAL LINKS</div>
        <div className="grid grid-cols-1 gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 border border-border hover:border-primary hover:bg-primary/10 rounded transition-all group"
            >
              <span className="flex items-center gap-2 text-sm">
                {link.customLogo ? (
                  <div className="w-4 h-4 relative">
                    <Image
                      src="/images/arena-logo.png"
                      alt="Arena"
                      width={16}
                      height={16}
                      className="opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                ) : link.Icon ? (
                  <link.Icon className="w-4 h-4 text-secondary group-hover:text-primary" />
                ) : null}
                {link.showName && <span className="text-foreground group-hover:text-primary">{link.name}</span>}
              </span>
              <ExternalLink className="w-3 h-3 text-secondary group-hover:text-primary" />
            </a>
          ))}
        </div>
      </div>

      <div>
        <div className="text-primary crt-glow mb-3">{">"} EMAIL</div>
        <div className="grid grid-cols-1 gap-2">
          {emailLinks.map((link) => (
            <a
              key={link.name}
              href={`mailto:${link.email}`}
              className="flex items-center justify-between p-2 border border-border hover:border-primary hover:bg-primary/10 rounded transition-all group"
            >
              <span className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-secondary group-hover:text-primary" />
                <span className="text-foreground group-hover:text-primary">{link.name}</span>
              </span>
              <span className="text-xs text-secondary group-hover:text-primary font-mono">{link.email}</span>
            </a>
          ))}
        </div>
      </div>

      <div>
        <Button
          onClick={() => setShowForm(true)}
          className="w-full bg-primary text-background hover:bg-foreground font-mono"
        >
          <Send className="w-4 h-4 mr-1" />
          REACH OUT
        </Button>
      </div>
    </div>
  )
}
