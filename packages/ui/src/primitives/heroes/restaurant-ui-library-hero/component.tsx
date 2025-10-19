"use client"

import { useEffect, useRef, useState } from "react"
import { MeshGradient, PulsingBorder } from "@paper-design/shaders-react"
import { motion } from "framer-motion"

type NullableDiv = HTMLDivElement | null

function ShaderShowcase() {
  const containerRef = useRef<NullableDiv>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-black">
      <svg className="absolute inset-0 h-0 w-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
          <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
          <filter id="text-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <MeshGradient
        className="absolute inset-0 h-full w-full"
        colors={["#000000", "#06b6d4", "#0891b2", "#164e63", "#f97316"]}
        speed={0.3}
        backgroundColor="#000000"
      />
      <MeshGradient
        className="absolute inset-0 h-full w-full opacity-60"
        colors={["#000000", "#ffffff", "#06b6d4", "#f97316"]}
        speed={0.2}
        wireframe
        backgroundColor="transparent"
      />

      <header className="relative z-20 flex items-center justify-between p-6">
        <motion.div
          className="group flex cursor-pointer items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.svg
            fill="currentColor"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="size-10 text-white transition-all duration-300 group-hover:drop-shadow-lg"
            style={{ filter: "url(#logo-glow)" }}
            whileHover={{
              fill: "url(#logo-gradient)",
              rotate: [0, -2, 2, 0],
              transition: {
                fill: { duration: 0.3 },
                rotate: { duration: 0.6, ease: "easeInOut" },
              },
            }}
          >
            <motion.path
              d="M15 85V15h12l18 35 18-35h12v70h-12V35L45 70h-10L17 35v50H15z"
              initial={{ pathLength: 1 }}
              whileHover={{
                pathLength: [1, 0, 1],
                transition: { duration: 1.2, ease: "easeInOut" },
              }}
            />
          </motion.svg>
        </motion.div>

        <nav className="flex items-center space-x-2 text-xs font-light">
          {[
            { label: "Features", href: "#" },
            { label: "Pricing", href: "#" },
            { label: "Docs", href: "#" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-full px-3 py-2 text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div id="gooey-btn" className="relative flex items-center" style={{ filter: "url(#gooey-filter)" }}>
          <button className="absolute right-0 z-0 flex h-8 translate-x-[-2.5rem] items-center justify-center rounded-full bg-white px-2.5 py-2 text-xs text-black transition-all duration-300 hover:bg-white/90">
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </button>
          <button className="relative z-10 flex h-8 items-center rounded-full bg-white px-6 py-2 text-xs font-medium text-black transition duration-300 hover:bg-white/90">
            Login
          </button>
        </div>
      </header>

      <main className="absolute bottom-8 left-8 z-20 max-w-2xl">
        <motion.div
          className="relative mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm"
          style={{ filter: "url(#glass-effect)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          ✨ New Paper Shaders Experience
        </motion.div>

        <motion.h1
          className="mb-6 text-6xl font-bold leading-none tracking-tight text-white md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.span
            className="mb-2 block text-4xl font-light tracking-wider text-white/90 md:text-5xl lg:text-6xl"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #06b6d4 30%, #f97316 70%, #ffffff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "url(#text-glow)",
            }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            Beautiful
          </motion.span>
          <span className="block font-black text-white drop-shadow-2xl">Shader</span>
          <span className="block font-light italic text-white/80">Experiences</span>
        </motion.h1>

        <motion.p
          className="mb-8 max-w-xl text-lg font-light leading-relaxed text-white/70"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Create stunning visual experiences with our advanced shader technology. Interactive lighting, smooth animations,
          and beautiful effects that respond to your every move.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <motion.button
            className="rounded-full border-2 border-white/30 bg-transparent px-10 py-4 text-sm font-medium text-white transition hover:border-cyan-400/50 hover:bg-white/10 hover:text-cyan-100"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Pricing
          </motion.button>
          <motion.button
            className="rounded-full px-10 py-4 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
            style={{ background: "linear-gradient(90deg, #06b6d4, #f97316)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </motion.div>
      </main>

      <div className="absolute bottom-8 right-8 z-30">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <PulsingBorder
            colors={["#06b6d4", "#0891b2", "#f97316", "#00FF88", "#FFD700", "#FF6B35", "#ffffff"]}
            colorBack="#00000000"
            speed={1.5}
            roundness={1}
            thickness={0.1}
            softness={0.2}
            intensity={5}
            spotsPerColor={5}
            spotSize={0.1}
            pulse={0.1}
            smoke={0.5}
            smokeSize={4}
            scale={0.65}
            rotation={0}
            frame={0}
            style={{ width: "60px", height: "60px", borderRadius: "50%" }}
          />

          <motion.svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            style={{ transform: "scale(1.6)" }}
          >
            <defs>
              <path id="circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
            </defs>
            <text className="text-sm fill-white/80 font-medium uppercase tracking-[0.3em]">
              <textPath href="#circle" startOffset="0%">
                Loxt · Mozzi · 21st.dev is amazing · 21st.dev is amazing ·
              </textPath>
            </text>
          </motion.svg>
        </div>
      </div>
    </div>
  )
}

export default ShaderShowcase
