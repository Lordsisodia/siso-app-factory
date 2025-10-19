"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

interface Star {
  angle: number
  radius: number
  speed: number
  size: number
  depth: number
}

const STAR_COUNT = 600

export function SpiralAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = dimensions.width * dpr
    canvas.height = dimensions.height * dpr
    canvas.style.width = `${dimensions.width}px`
    canvas.style.height = `${dimensions.height}px`
    ctx.scale(dpr, dpr)

    const stars: Star[] = Array.from({ length: STAR_COUNT }).map((_, index) => ({
      angle: Math.random() * Math.PI * 2,
      radius: 20 + index * 1.5 + Math.random() * 20,
      speed: 0.001 + Math.random() * 0.004,
      size: 0.5 + Math.random() * 1.5,
      depth: 0.4 + Math.random() * 0.6,
    }))

    const render = () => {
      const { width, height } = dimensions
      if (width === 0 || height === 0) {
        return
      }

      ctx.fillStyle = "rgba(0,0,0,0.2)"
      ctx.fillRect(0, 0, width, height)

      ctx.save()
      ctx.translate(width / 2, height / 2)
      ctx.rotate(Date.now() * 0.00002)

      stars.forEach((star) => {
        star.angle += star.speed
        star.radius += Math.sin(star.angle * 0.25) * 0.12

        const x = star.radius * Math.cos(star.angle)
        const y = star.radius * Math.sin(star.angle)

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, star.size * 6)
        gradient.addColorStop(0, `rgba(255,255,255,${star.depth})`)
        gradient.addColorStop(1, "rgba(255,255,255,0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, star.size * 6, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.restore()
    }

    gsap.ticker.add(render)

    return () => {
      gsap.ticker.remove(render)
    }
  }, [dimensions])

  return <canvas ref={canvasRef} className="h-full w-full" />
}
