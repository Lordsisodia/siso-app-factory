"use client"

import * as React from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

export interface ColumnTestimonial {
  text: string
  image: string
  name: string
  role: string
}

export interface TestimonialsColumnProps {
  className?: string
  testimonials: ColumnTestimonial[]
  duration?: number
}

export function TestimonialsColumn({ className, testimonials, duration = 12 }: TestimonialsColumnProps) {
  const items = React.useMemo(() => [...testimonials, ...testimonials], [testimonials])

  return (
    <div className={cn("bg-background", className)}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        className="flex flex-col gap-6 pb-6"
      >
        {items.map((testimonial, index) => (
          <div key={`${testimonial.name}-${index}`} className="w-full max-w-xs rounded-3xl border p-6 shadow-lg shadow-primary/10">
            <p className="text-left text-sm text-foreground/80">{testimonial.text}</p>
            <div className="mt-5 flex items-center gap-3">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
                loading="lazy"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium tracking-tight text-foreground">{testimonial.name}</span>
                <span className="text-xs tracking-tight text-foreground/60">{testimonial.role}</span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export interface TestimonialsColumnsShowcaseProps {
  testimonials: ColumnTestimonial[]
}

export function TestimonialsColumnsShowcase({ testimonials }: TestimonialsColumnsShowcaseProps) {
  const firstColumn = testimonials.slice(0, 3)
  const secondColumn = testimonials.slice(3, 6)
  const thirdColumn = testimonials.slice(6, 9)

  return (
    <section className="relative my-20 bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto flex max-w-[540px] flex-col items-center text-center"
        >
          <div className="rounded-lg border px-4 py-1 text-sm font-medium">Testimonials</div>
          <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">What our users say</h2>
          <p className="mt-4 text-base text-muted-foreground">
            See how teams are shipping faster with our component library.
          </p>
        </motion.div>

        <div className="mt-10 flex max-h-[740px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn className="hidden md:block" testimonials={secondColumn} duration={19} />
          <TestimonialsColumn className="hidden lg:block" testimonials={thirdColumn} duration={17} />
        </div>
      </div>
    </section>
  )
}
