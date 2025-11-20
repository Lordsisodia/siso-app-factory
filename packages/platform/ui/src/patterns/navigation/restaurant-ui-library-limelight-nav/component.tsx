"use client"

import React, { cloneElement, useLayoutEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

const DefaultHomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
)

const DefaultCompassIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
  </svg>
)

const DefaultBellIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
)

export type NavItem = {
  id: string | number
  icon: React.ReactElement
  label?: string
  onClick?: () => void
}

const defaultNavItems: NavItem[] = [
  { id: "default-home", icon: <DefaultHomeIcon />, label: "Home" },
  { id: "default-explore", icon: <DefaultCompassIcon />, label: "Explore" },
  { id: "default-notifications", icon: <DefaultBellIcon />, label: "Notifications" },
]

export interface LimelightNavProps {
  items?: NavItem[]
  defaultActiveIndex?: number
  onTabChange?: (index: number) => void
  className?: string
  limelightClassName?: string
  iconContainerClassName?: string
  iconClassName?: string
}

export const LimelightNav = ({
  items = defaultNavItems,
  defaultActiveIndex = 0,
  onTabChange,
  className = "",
  limelightClassName = "",
  iconContainerClassName = "",
  iconClassName = "",
}: LimelightNavProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex)
  const [isReady, setIsReady] = useState(false)

  const navItemRefs = useRef<Array<HTMLAnchorElement | null>>([])
  const limelightRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const limelight = limelightRef.current
    const activeItem = navItemRefs.current[activeIndex]

    if (!limelight || !activeItem) return

    const updatePosition = () => {
      const newLeft = activeItem.offsetLeft + activeItem.offsetWidth / 2 - limelight.offsetWidth / 2
      limelight.style.left = `${newLeft}px`
      if (!isReady) {
        setTimeout(() => setIsReady(true), 50)
      }
    }

    updatePosition()

    const resizeObserver = new ResizeObserver(() => updatePosition())
    resizeObserver.observe(activeItem)

    return () => resizeObserver.disconnect()
  }, [activeIndex, isReady, items.length])

  if (items.length === 0) return null

  const handleItemClick = (index: number, onItemClick?: () => void) => {
    setActiveIndex(index)
    onTabChange?.(index)
    onItemClick?.()
  }

  return (
    <nav
      className={
        "relative inline-flex h-16 items-center rounded-lg border bg-card px-2 text-foreground shadow-sm " +
        className
      }
    >
      {items.map(({ id, icon, label, onClick }, index) => (
        <a
          key={id}
          ref={(node) => {
            navItemRefs.current[index] = node
          }}
        className={cn(
          "relative z-20 flex h-full cursor-pointer items-center justify-center px-5",
          iconContainerClassName,
        )}
          onClick={() => handleItemClick(index, onClick)}
          aria-label={label}
        >
          {cloneElement(icon, {
            className: cn(
              "h-6 w-6 transition-opacity duration-150",
              icon.props.className,
              iconClassName,
              activeIndex === index ? "opacity-100" : "opacity-40",
            ),
          })}
        </a>
      ))}

      <div
        ref={limelightRef}
        className={cn(
          "absolute top-0 z-10 h-[5px] w-11 rounded-full bg-primary shadow-[0_50px_15px_var(--primary)]",
          isReady ? "transition-[left] duration-300 ease-in-out" : "",
          limelightClassName,
        )}
        style={{ left: "-999px" }}
      >
        <div className="pointer-events-none absolute left-[-30%] top-[5px] h-14 w-[160%] bg-gradient-to-b from-primary/30 to-transparent [clip-path:polygon(5%_100%,25%_0,75%_0,95%_100%)]" />
      </div>
    </nav>
  )
}

export default LimelightNav
