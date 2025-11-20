"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const FONT_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
.cta-one, .cta-one * { font-family: 'Poppins', sans-serif; }
`

export interface CallToActionOneProps extends React.ComponentProps<"section"> {}

export function CallToActionOne({ className, ...props }: CallToActionOneProps) {
  return (
    <section
      className={cn(
        "cta-one mx-2 flex max-w-5xl flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-[#5524B7] to-[#380B60] p-10 text-center text-white md:mx-auto md:w-full",
        "py-16",
        className,
      )}
      {...props}
    >
      <style>{FONT_STYLES}</style>
      <div className="flex flex-wrap items-center justify-center rounded-full border border-purple-500/40 bg-purple-600/10 p-1 text-sm backdrop-blur">
        <div className="flex items-center">
          <img
            className="size-6 rounded-full border-4 border-white md:size-7"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50"
            alt="Community member 1"
          />
          <img
            className="-translate-x-2 size-6 rounded-full border-4 border-white md:size-7"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50"
            alt="Community member 2"
          />
          <img
            className="-translate-x-4 size-6 rounded-full border-4 border-white md:size-7"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50&h=50&auto=format&fit=crop"
            alt="Community member 3"
          />
        </div>
        <p className="-translate-x-2 font-medium">Join community of 1m+ founders</p>
      </div>

      <h1 className="mt-5 max-w-xl bg-gradient-to-r from-white to-[#CAABFF] text-4xl font-semibold uppercase leading-tight text-transparent md:text-5xl md:leading-[60px]">
        <span className="bg-clip-text">Unlock your next big opportunity.</span>
      </h1>

      <button className="mt-8 rounded-full bg-violet-600 px-8 py-3 text-sm font-medium uppercase transition-all hover:bg-violet-700">
        Join Discord
      </button>
    </section>
  )
}
