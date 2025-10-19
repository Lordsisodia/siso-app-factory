"use client"

import * as React from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

import { ChronicleButton } from "./chronicle-button"

interface TextStyle {
  color?: string
  fontSize?: string
  gradient?: string
}

interface ButtonStyle {
  backgroundColor?: string
  color?: string
  borderRadius?: string
  hoverColor?: string
  hoverForeground?: string
  width?: string
  outlined?: boolean
  outlinePaddingAdjustment?: string
  outlinedButtonBackgroundOnHover?: string
}

interface SlideContent {
  title: string
  image: string
}

export interface DicedHeroSectionProps {
  topText: string
  mainText: string
  subMainText: string
  buttonText: string
  slides: SlideContent[]
  onMainButtonClick?: () => void
  onGridImageHover?: (index: number) => void
  onGridImageClick?: (index: number) => void
  topTextStyle?: TextStyle
  mainTextStyle?: TextStyle
  subMainTextStyle?: TextStyle
  buttonStyle?: ButtonStyle
  componentBorderRadius?: string
  backgroundColor?: string
  separatorColor?: string
  maxContentWidth?: string
  mobileBreakpoint?: number
  fontFamily?: string
  isRTL?: boolean
  className?: string
}

const themeStyles = `
:root {
  --diced-hero-section-top-text: #2c3e50;
  --diced-hero-section-main-gradient-from: #16a085;
  --diced-hero-section-main-gradient-to: #2980b9;
  --diced-hero-section-main-gradient-foreground: #16a085;
  --diced-hero-section-separator: #005baa;
  --diced-hero-section-sub-text: #34495e;
  --diced-hero-section-button-bg: #27ae60;
  --diced-hero-section-button-fg: #ffffff;
  --diced-hero-section-button-hover-bg: #2ecc71;
  --diced-hero-section-button-hover-fg: #ffffff;
}

.dark {
  --diced-hero-section-top-text: #f7f7ff;
  --diced-hero-section-main-gradient-from: #9f4eff;
  --diced-hero-section-main-gradient-to: #00a6fb;
  --diced-hero-section-main-gradient-foreground: #9f4eff;
  --diced-hero-section-separator: #086ca2;
  --diced-hero-section-sub-text: #f7f7ff;
  --diced-hero-section-button-bg: #00a6fb;
  --diced-hero-section-button-fg: #0a0a0a;
  --diced-hero-section-button-hover-bg: #9f4eff;
  --diced-hero-section-button-hover-fg: #ffffff;
}
`

const warpedImageStyles = `
.diced-hero-warped-image {
  --r: 20px;
  --s: 40px;
  --x: 25px;
  --y: 5px;
}
.diced-hero-top-right {
  --_m:/calc(2*var(--r)) calc(2*var(--r)) radial-gradient(#000 70%,#0000 72%);
  --_g:conic-gradient(at calc(100% - var(--r)) var(--r),#0000 25%,#000 0);
  --_d:(var(--s) + var(--r));
  mask: calc(100% - var(--_d) - var(--x)) 0 var(--_m), 100% calc(var(--_d) + var(--y)) var(--_m), radial-gradient(var(--s) at 100% 0,#0000 99%,#000 calc(100% + 1px)) calc(-1*var(--r) - var(--x)) calc(var(--r) + var(--y)), var(--_g) calc(-1*var(--_d) - var(--x)) 0, var(--_g) 0 calc(var(--_d) + var(--y));
  mask-repeat: no-repeat;
}
.diced-hero-top-left {
  --_m:/calc(2*var(--r)) calc(2*var(--r)) radial-gradient(#000 70%,#0000 72%);
  --_g:conic-gradient(at var(--r) var(--r),#000 75%,#0000 0);
  --_d:(var(--s) + var(--r));
  mask: calc(var(--_d) + var(--x)) 0 var(--_m), 0 calc(var(--_d) + var(--y)) var(--_m), radial-gradient(var(--s) at 0 0,#0000 99%,#000 calc(100% + 1px)) calc(var(--r) + var(--x)) calc(var(--r) + var(--y)), var(--_g) calc(var(--_d) + var(--x)) 0, var(--_g) 0 calc(var(--_d) + var(--y));
  mask-repeat: no-repeat;
}
.diced-hero-bottom-left {
  --_m:/calc(2*var(--r)) calc(2*var(--r)) radial-gradient(#000 70%,#0000 72%);
  --_g:conic-gradient(from 180deg at var(--r) calc(100% - var(--r)),#0000 25%,#000 0);
  --_d:(var(--s) + var(--r));
  mask: calc(var(--_d) + var(--x)) 100% var(--_m), 0 calc(100% - var(--_d) - var(--y)) var(--_m), radial-gradient(var(--s) at 0 100%,#0000 99%,#000 calc(100% + 1px)) calc(var(--r) + var(--x)) calc(-1*var(--r) - var(--y)), var(--_g) calc(var(--_d) + var(--x)) 0, var(--_g) 0 calc(-1*var(--_d) - var(--y));
  mask-repeat: no-repeat;
}
.diced-hero-bottom-right {
  --_m:/calc(2*var(--r)) calc(2*var(--r)) radial-gradient(#000 70%,#0000 72%);
  --_g:conic-gradient(from 90deg at calc(100% - var(--r)) calc(100% - var(--r)),#0000 25%,#000 0);
  --_d:(var(--s) + var(--r));
  mask: calc(100% - var(--_d) - var(--x)) 100% var(--_m), 100% calc(100% - var(--_d) - var(--y)) var(--_m), radial-gradient(var(--s) at 100% 100%,#0000 99%,#000 calc(100% + 1px)) calc(-1*var(--r) - var(--x)) calc(-1*var(--r) - var(--y)), var(--_g) calc(-1*var(--_d) - var(--x)) 0, var(--_g) 0 calc(-1*var(--_d) - var(--y));
  mask-repeat: no-repeat;
}
`

function useStyleInjection(id: string, css: string) {
  React.useEffect(() => {
    if (typeof document === "undefined") return
    if (document.getElementById(id)) return
    const style = document.createElement("style")
    style.id = id
    style.textContent = css
    document.head.appendChild(style)
  }, [id, css])
}

const CORNER_CLASSES = [
  "diced-hero-bottom-right",
  "diced-hero-bottom-left",
  "diced-hero-top-right",
  "diced-hero-top-left",
]

export function DicedHeroSection({
  topText,
  mainText,
  subMainText,
  buttonText,
  slides,
  onMainButtonClick,
  onGridImageHover,
  onGridImageClick,
  topTextStyle,
  mainTextStyle,
  subMainTextStyle,
  buttonStyle = {},
  componentBorderRadius = "0px",
  backgroundColor,
  separatorColor = "#005baa",
  maxContentWidth = "1536px",
  mobileBreakpoint = 1000,
  fontFamily = "inherit",
  isRTL = false,
  className,
}: DicedHeroSectionProps) {
  useStyleInjection("diced-hero-section-theme", themeStyles)
  useStyleInjection("diced-hero-section-warp", warpedImageStyles)

  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      if (!containerRef.current) return
      setIsMobile(containerRef.current.offsetWidth < mobileBreakpoint)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [mobileBreakpoint])

  const isRTLCheck = React.useCallback((text: string) => {
    return /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F]/.test(text)
  }, [])

  const getGradientStyle = React.useCallback((gradient?: string) => {
    if (!gradient) return {}
    return {
      backgroundImage: gradient,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }
  }, [])

  const gridSlides = React.useMemo(() => {
    if (!slides.length) {
      return [
        { title: "", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80" },
        { title: "", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80" },
        { title: "", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80" },
        { title: "", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80" },
      ]
    }

    const items = slides.slice(-4)
    if (items.length < 4) {
      const [first] = items
      const fill = Array.from({ length: 4 - items.length }, (_, index) => first ?? slides[index % slides.length])
      return [...items, ...fill].reverse()
    }

    return [...items].reverse()
  }, [slides])

  return (
    <main
      ref={containerRef}
      className={cn("diced-hero-section", className)}
      style={{
        borderRadius: componentBorderRadius,
        backgroundColor,
        padding: "2rem",
        overflow: "hidden",
        display: "flex",
        flexDirection: isMobile ? "column" : isRTL ? "row-reverse" : "row",
        justifyContent: "center",
        alignItems: "stretch",
        width: "100%",
        maxWidth: maxContentWidth,
        margin: "0 auto",
        minHeight: "auto",
        height: "auto",
        fontFamily,
        position: "relative",
        gap: "2rem",
      }}
    >
      <div
        style={{
          flex: 1,
          marginRight: isMobile ? 0 : isRTL ? 0 : "2rem",
          marginLeft: isMobile ? 0 : isRTL ? "2rem" : 0,
          textAlign: isMobile ? "center" : isRTL ? "right" : "left",
          alignItems: isMobile ? "center" : isRTL ? "flex-end" : "flex-start",
          maxWidth: isMobile ? "100%" : "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingBottom: isMobile ? "2rem" : 0,
          gap: "1.5rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              ...topTextStyle,
              ...getGradientStyle(topTextStyle?.gradient),
              direction: isRTLCheck(topText) ? "rtl" : "ltr",
              textAlign: isRTLCheck(topText) ? "right" : "left",
              color: topTextStyle?.color ?? "var(--diced-hero-section-top-text)",
              fontSize: topTextStyle?.fontSize ?? "1rem",
              fontWeight: 600,
            }}
          >
            {topText}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              ...mainTextStyle,
              direction: isRTLCheck(mainText) ? "rtl" : "ltr",
              textAlign: isMobile ? "center" : isRTLCheck(mainText) ? "right" : "left",
              fontSize: mainTextStyle?.fontSize ?? "3.5rem",
              lineHeight: 1.1,
              fontWeight: 700,
            }}
          >
            <span
              style={{
                ...getGradientStyle(mainTextStyle?.gradient ?? "linear-gradient(45deg, var(--diced-hero-section-main-gradient-from), var(--diced-hero-section-main-gradient-to))"),
                color: mainTextStyle?.color ?? "var(--diced-hero-section-main-gradient-foreground)",
                display: "inline-block",
              }}
            >
              {mainText}
            </span>
          </motion.h1>
          <motion.hr
            initial={{ width: 0 }}
            animate={{ width: "6.25rem" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              height: "0.25rem",
              background: separatorColor,
              border: "none",
              margin: isMobile ? "1.125rem auto 1.875rem" : isRTL ? "1.125rem 0 1.875rem auto" : "1.125rem 0 1.875rem",
              alignSelf: isMobile ? "center" : isRTL ? "flex-end" : "flex-start",
              borderRadius: "999px",
              width: "6.25rem",
            }}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              ...subMainTextStyle,
              ...getGradientStyle(subMainTextStyle?.gradient),
              direction: isRTLCheck(subMainText) ? "rtl" : "ltr",
              textAlign: isRTLCheck(subMainText) ? "right" : "left",
              color: subMainTextStyle?.color ?? "var(--diced-hero-section-sub-text)",
              fontSize: subMainTextStyle?.fontSize ?? "1.05rem",
              lineHeight: 1.6,
            }}
          >
            {subMainText}
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            display: "flex",
            justifyContent: isMobile ? "center" : isRTL ? "flex-end" : "flex-start",
          }}
        >
          <ChronicleButton
            text={buttonText}
            onClick={onMainButtonClick}
            hoverColor={buttonStyle?.hoverColor}
            hoverForeground={buttonStyle?.hoverForeground ?? "#ffffff"}
            borderRadius={buttonStyle?.borderRadius}
            width={buttonStyle?.width}
            outlined={buttonStyle?.outlined}
            outlinePaddingAdjustment={buttonStyle?.outlinePaddingAdjustment}
            outlinedButtonBackgroundOnHover={buttonStyle?.outlinedButtonBackgroundOnHover}
            customBackground={buttonStyle?.backgroundColor ?? "var(--diced-hero-section-button-bg)"}
            customForeground={buttonStyle?.color ?? "var(--diced-hero-section-button-fg)"}
            fontFamily={fontFamily}
          />
        </motion.div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: isRTL ? "flex-start" : "flex-end",
          position: "relative",
          width: isMobile ? "100%" : "50%",
          paddingLeft: isMobile ? 0 : isRTL ? 0 : "2rem",
          paddingRight: isMobile ? 0 : isRTL ? "2rem" : 0,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
            width: "100%",
            aspectRatio: "1 / 1",
          }}
        >
          {gridSlides.map((slide, index) => (
            <div
              key={`${slide.title}-${index}`}
              style={{
                position: "relative",
                width: "100%",
                paddingBottom: "100%",
                overflow: "hidden",
                borderRadius: "20px",
              }}
            >
              <img
                src={slide.image}
                alt={slide.title || `Slide ${index + 1}`}
                className={cn(
                  "diced-hero-warped-image",
                  CORNER_CLASSES[index % CORNER_CLASSES.length],
                )}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => onGridImageClick?.(index)}
                onMouseEnter={() => onGridImageHover?.(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
