"use client"

import * as React from "react"
import Image, { type ImageProps } from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Quote, X } from "lucide-react"

import { cn } from "@/lib/utils"

export interface Testimonial {
  name: string
  designation: string
  description: string
  profileImage: string
}

interface CarouselProps {
  items: React.ReactElement<TestimonialCardProps>[]
  initialScroll?: number
}

const useOutsideClick = (ref: React.RefObject<HTMLDivElement>, handler: () => void) => {
  React.useEffect(() => {
    function onPointerDown(event: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler()
      }
    }

    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("touchstart", onPointerDown)

    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("touchstart", onPointerDown)
    }
  }, [handler, ref])
}

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const scrollerRef = React.useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(true)

  const updateScrollButtons = React.useCallback(() => {
    const node = scrollerRef.current
    if (!node) return
    const { scrollLeft, scrollWidth, clientWidth } = node
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
  }, [])

  const scrollBy = (delta: number) => {
    const node = scrollerRef.current
    if (!node) return
    node.scrollBy({ left: delta, behavior: "smooth" })
  }

  const isMobile = () => (typeof window !== "undefined" ? window.innerWidth < 768 : false)

  const handleCardClose = React.useCallback(
    (cardIndex: number) => {
      const node = scrollerRef.current
      if (!node) return
      const cardWidth = isMobile() ? 230 : 384
      const gap = isMobile() ? 4 : 8
      const target = (cardWidth + gap) * cardIndex
      node.scrollTo({ left: target, behavior: "smooth" })
    },
    [],
  )

  const enhancedItems = React.useMemo(
    () =>
      items.map((item, index) =>
        React.cloneElement(item, {
          key: item.key ?? index,
          layout: true,
          onCardClose: () => handleCardClose(index),
        }),
      ),
    [handleCardClose, items],
  )

  React.useEffect(() => {
    const node = scrollerRef.current
    if (!node) return
    node.scrollLeft = initialScroll
    updateScrollButtons()
  }, [initialScroll, updateScrollButtons])

  return (
    <div className="relative mt-10 w-full">
      <div
        ref={scrollerRef}
        onScroll={updateScrollButtons}
        className="flex w-full overflow-x-scroll overscroll-x-contain scroll-smooth py-5 [scrollbar-width:none]"
      >
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />
        <div className="mx-auto flex max-w-5xl flex-row justify-start gap-4 pl-3">
          {enhancedItems}
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollBy(-300)}
          disabled={!canScrollLeft}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4b3f33] transition-colors duration-200 disabled:opacity-40 hover:bg-[#4b3f33]/80"
        >
          <ArrowLeft className="h-6 w-6 text-[#f2f0eb]" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(300)}
          disabled={!canScrollRight}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4b3f33] transition-colors duration-200 disabled:opacity-40 hover:bg-[#4b3f33]/80"
        >
          <ArrowRight className="h-6 w-6 text-[#f2f0eb]" />
        </button>
      </div>
    </div>
  )
}

export interface TestimonialCardProps {
  testimonial: Testimonial
  index: number
  layout?: boolean
  onCardClose?: () => void
  backgroundImage?: string
}

export const TestimonialCard = ({
  testimonial,
  index,
  layout = false,
  onCardClose,
  backgroundImage = "https://images.unsplash.com/photo-1686806372726-388d03ff49c8?q=80&w=3087&auto=format&fit=crop",
}: TestimonialCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleCollapse = React.useCallback(() => {
    setIsExpanded(false)
    onCardClose?.()
  }, [onCardClose])

  const handleEscapeKey = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCollapse()
      }
    },
    [handleCollapse],
  )

  useOutsideClick(containerRef, handleCollapse)

  React.useEffect(() => {
    if (typeof document === "undefined") return

    if (isExpanded) {
      const scrollY = window.scrollY
      const { style } = document.body
      style.position = "fixed"
      style.top = `-${scrollY}px`
      style.left = "0"
      style.right = "0"
      style.width = "100%"
      style.overflow = "hidden"
      document.body.dataset.scrollY = scrollY.toString()
      window.addEventListener("keydown", handleEscapeKey)
      return () => {
        window.removeEventListener("keydown", handleEscapeKey)
        const stored = document.body.dataset.scrollY
        style.position = ""
        style.top = ""
        style.left = ""
        style.right = ""
        style.width = ""
        style.overflow = ""
        if (stored) {
          window.scrollTo(0, parseInt(stored, 10))
        }
      }
    }

    return undefined
  }, [handleEscapeKey, isExpanded])

  const preview = (
    <motion.button
      type="button"
      layoutId={layout ? `card-${testimonial.name}` : undefined}
      onClick={() => setIsExpanded(true)}
      whileHover={{ rotateX: 2, rotateY: 2, rotate: 2, scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }}
      className="relative"
    >
      <div
        className={cn(
          "relative flex h-[500px] w-80 flex-col items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-[#f2f0eb] to-[#fff9eb] p-6 shadow-md md:h-[550px] md:w-96",
          index % 2 ? "-rotate-0" : "rotate-0",
        )}
      >
        <div className="absolute inset-0 opacity-30">
          <Image fill className="object-cover" src={backgroundImage} alt="Background" />
        </div>
        <ProfileImage src={testimonial.profileImage} alt={testimonial.name} />
        <motion.p
          layoutId={layout ? `excerpt-${testimonial.name}` : undefined}
          className="mt-4 px-3 text-center text-2xl font-light text-neutral-700"
        >
          {testimonial.description.length > 120 ? `${testimonial.description.slice(0, 120)}…` : testimonial.description}
        </motion.p>
        <motion.p
          layoutId={layout ? `name-${testimonial.name}` : undefined}
          className="mt-5 text-center text-xl font-medium text-neutral-700"
        >
          {testimonial.name}
        </motion.p>
        <motion.p
          layoutId={layout ? `role-${testimonial.name}` : undefined}
          className="mt-1 text-center text-base font-light italic text-neutral-600 underline underline-offset-4"
        >
          {testimonial.designation}
        </motion.p>
      </div>
      </motion.button>
  )

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 z-50 h-screen w-screen overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur"
            />
            <motion.div
              ref={containerRef}
              layoutId={layout ? `card-${testimonial.name}` : undefined}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-[60] mx-auto mt-10 h-full max-w-5xl rounded-3xl bg-gradient-to-b from-[#f2f0eb] to-[#fff9eb] p-6 md:p-10"
            >
              <button
                type="button"
                onClick={handleCollapse}
                className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#4b3f33]"
              >
                <X className="h-6 w-6 text-white" />
              </button>
              <motion.p
                layoutId={layout ? `role-${testimonial.name}` : undefined}
                className="px-0 pt-4 text-lg font-light uppercase tracking-wide text-neutral-700 md:px-20"
              >
                {testimonial.designation}
              </motion.p>
              <motion.h3
                layoutId={layout ? `name-${testimonial.name}` : undefined}
                className="px-0 text-3xl font-semibold text-neutral-800 md:px-20 md:text-4xl"
              >
                {testimonial.name}
              </motion.h3>
              <div className="px-0 pt-8 text-2xl font-light leading-loose text-neutral-700 md:px-20">
                <Quote className="mb-4 h-8 w-8 text-neutral-600" />
                {testimonial.description}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {preview}
    </>
  )
}

export const ProfileImage = ({ className, alt, ...rest }: ImageProps) => {
  const [isLoading, setIsLoading] = React.useState(true)

  return (
    <div className="relative h-[90px] w-[90px] flex-none overflow-hidden rounded-full border-4 border-neutral-400/60 saturate-[0.2] sepia-[0.46] md:h-[150px] md:w-[150px]">
      <Image
        {...rest}
        alt={alt ?? "Profile"}
        width={160}
        height={160}
        onLoadingComplete={() => setIsLoading(false)}
        className={cn(
          "absolute inset-0 h-full w-full rounded-full object-cover transition duration-300",
          isLoading ? "blur-sm" : "blur-0",
          className,
        )}
      />
    </div>
  )
}
