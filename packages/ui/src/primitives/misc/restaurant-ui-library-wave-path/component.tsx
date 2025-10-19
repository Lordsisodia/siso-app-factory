"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type WavePathProps = React.ComponentProps<"div">

export function WavePath({ className, ...props }: WavePathProps) {
  const pathRef = React.useRef<SVGPathElement>(null)
  const progressRef = React.useRef(0)
  const xRef = React.useRef(0.2)
  const timeRef = React.useRef(Math.PI / 2)
  const requestRef = React.useRef<number | null>(null)

  const setPath = React.useCallback(
    (progress: number) => {
      if (typeof window === "undefined") return
      const width = window.innerWidth * 0.7
      const path = pathRef.current
      if (!path) return

      path.setAttributeNS(
        null,
        "d",
        `M0 100 Q${width * xRef.current} ${100 + progress * 0.6}, ${width} 100`,
      )
    },
    [],
  )

  const lerp = React.useCallback((start: number, end: number, fraction: number) => {
    return start * (1 - fraction) + end * fraction
  }, [])

  const resetAnimation = React.useCallback(() => {
    timeRef.current = Math.PI / 2
    progressRef.current = 0
    setPath(0)
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current)
      requestRef.current = null
    }
  }, [setPath])

  const animateOut = React.useCallback(() => {
    const progress = progressRef.current
    const newProgress = progress * Math.sin(timeRef.current)
    progressRef.current = lerp(progress, 0, 0.025)
    timeRef.current += 0.2
    setPath(newProgress)

    if (Math.abs(progressRef.current) > 0.75) {
      requestRef.current = requestAnimationFrame(animateOut)
    } else {
      resetAnimation()
    }
  }, [lerp, resetAnimation, setPath])

  const manageMouseEnter = React.useCallback(() => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current)
      requestRef.current = null
    }
    resetAnimation()
  }, [resetAnimation])

  const manageMouseMove = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const path = pathRef.current
      if (!path) return

      const { movementY = 0, clientX } = event
      const bounds = path.getBoundingClientRect()
      if (!bounds.width) return

      xRef.current = (clientX - bounds.left) / bounds.width
      progressRef.current += movementY
      setPath(progressRef.current)
    },
    [setPath],
  )

  const manageMouseLeave = React.useCallback(() => {
    animateOut()
  }, [animateOut])

  React.useEffect(() => {
    setPath(progressRef.current)

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [setPath])

  return (
    <div className={cn("relative h-px w-[70vw]", className)} {...props}>
      <div
        onMouseEnter={manageMouseEnter}
        onMouseMove={manageMouseMove}
        onMouseLeave={manageMouseLeave}
        className="relative -top-5 z-10 h-10 w-full hover:-top-[150px] hover:h-[300px]"
      />
      <svg className="absolute -top-[100px] h-[300px] w-full">
        <path ref={pathRef} className="fill-none stroke-current" strokeWidth={2} />
      </svg>
    </div>
  )
}
