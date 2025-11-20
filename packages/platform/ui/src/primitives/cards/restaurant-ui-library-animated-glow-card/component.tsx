"use client"

import { useEffect } from "react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type CardCanvasProps = {
  children: ReactNode
  className?: string
}

type CardProps = {
  children: ReactNode
  className?: string
}

const STYLE_ID = "animated-glow-card-styles"

const ensureStylesInjected = () => {
  if (typeof document === "undefined") return
  if (document.getElementById(STYLE_ID)) return

  const style = document.createElement("style")
  style.id = STYLE_ID
  style.textContent = `
    .card-canvas {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .card-backdrop {
      position: absolute;
      inset: 0;
      border-radius: 1.75rem;
      filter: url(#unopaq);
      pointer-events: none;
    }

    .glow-card {
      position: relative;
      padding: 1.5rem;
      border-radius: 1.5rem;
      background: rgba(0, 0, 0, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.08);
      overflow: hidden;
      box-shadow: 0 15px 45px rgba(0, 0, 0, 0.45);
    }

    .glow-card .border-element {
      position: absolute;
      pointer-events: none;
      background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0));
      opacity: 0.7;
    }

    .glow-card .border-top,
    .glow-card .border-bottom {
      height: 1px;
      width: 120%;
      left: -10%;
      background-size: 200% 100%;
      animation: glow-horizontal 6s linear infinite;
    }

    .glow-card .border-top { top: 1.25rem; }
    .glow-card .border-bottom { bottom: 1.25rem; }

    .glow-card .border-left,
    .glow-card .border-right {
      width: 1px;
      height: 120%;
      top: -10%;
      background-size: 100% 200%;
      animation: glow-vertical 6s linear infinite;
    }

    .glow-card .border-left { left: 1.25rem; }
    .glow-card .border-right { right: 1.25rem; }

    @keyframes glow-horizontal {
      0% { background-position: 0 0; }
      50% { background-position: 100% 0; }
      100% { background-position: 0 0; }
    }

    @keyframes glow-vertical {
      0% { background-position: 0 0; }
      50% { background-position: 0 100%; }
      100% { background-position: 0 0; }
    }
  `
  document.head.appendChild(style)
}

const CardCanvas = ({ children, className }: CardCanvasProps) => {
  useEffect(() => {
    ensureStylesInjected()
  }, [])

  return (
    <div className={cn("card-canvas", className)}>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter width="3000%" x="-1000%" height="3000%" y="-1000%" id="unopaq">
          <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 3 0" />
        </filter>
      </svg>
      <div className="card-backdrop" />
      {children}
    </div>
  )
}

const Card = ({ children, className }: CardProps) => {
  useEffect(() => {
    ensureStylesInjected()
  }, [])

  return (
    <div className={cn("glow-card", className)}>
      <div className="border-element border-left" />
      <div className="border-element border-right" />
      <div className="border-element border-top" />
      <div className="border-element border-bottom" />
      <div className="card-content relative z-10">{children}</div>
    </div>
  )
}

export { CardCanvas, Card }
