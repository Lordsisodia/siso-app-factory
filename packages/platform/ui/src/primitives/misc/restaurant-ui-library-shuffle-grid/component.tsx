"use client"

import * as React from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

type Square = {
  id: number
  src: string
}

const SQUARES: Square[] = [
  { id: 1, src: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1740&q=80" },
  { id: 2, src: "https://images.unsplash.com/photo-1510925758641-869d353cecc7?auto=format&fit=crop&w=687&q=80" },
  { id: 3, src: "https://images.unsplash.com/photo-1629901925121-8a141c2a42f4?auto=format&fit=crop&w=687&q=80" },
  { id: 4, src: "https://images.unsplash.com/photo-1580238053495-b9720401fd45?auto=format&fit=crop&w=687&q=80" },
  { id: 5, src: "https://images.unsplash.com/photo-1569074187119-c87815b476da?auto=format&fit=crop&w=1325&q=80" },
  { id: 6, src: "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?auto=format&fit=crop&w=1740&q=80" },
  { id: 7, src: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&w=1740&q=80" },
  { id: 8, src: "https://plus.unsplash.com/premium_photo-1671436824833-91c0741e89c9?auto=format&fit=crop&w=1740&q=80" },
  { id: 9, src: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1740&q=80" },
  { id: 10, src: "https://images.unsplash.com/photo-1610768764270-790fbec18178?auto=format&fit=crop&w=687&q=80" },
  { id: 11, src: "https://images.unsplash.com/photo-1507034589631-9433cc6bc453?auto=format&fit=crop&w=684&q=80" },
  { id: 12, src: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?auto=format&fit=crop&w=882&q=80" },
  { id: 13, src: "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?auto=format&fit=crop&w=870&q=80" },
  { id: 14, src: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=686&q=80" },
  { id: 15, src: "https://images.unsplash.com/photo-1606244864456-8bee63fce472?auto=format&fit=crop&w=681&q=80" },
  { id: 16, src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1820&q=80" },
]

const shuffle = (items: Square[]) => {
  const array = [...items]
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const generateSquares = () =>
  shuffle(SQUARES).map((square) => (
    <motion.div
      key={square.id}
      layout
      transition={{ duration: 1.2, type: "spring" }}
      className="h-full w-full overflow-hidden rounded-md bg-muted"
      style={{
        backgroundImage: `url(${square.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  ))

export function ShuffleGrid(props: React.ComponentProps<"div">) {
  const [squares, setSquares] = React.useState(() => generateSquares())

  React.useEffect(() => {
    const id = setInterval(() => {
      setSquares(generateSquares())
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="grid h-[450px] grid-cols-4 grid-rows-4 gap-1" {...props}>
      {squares}
    </div>
  )
}

export function ShuffleHero() {
  return (
    <section className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-8 py-12 md:grid-cols-2">
      <div className="space-y-6">
        <span className="text-xs font-medium uppercase tracking-wide text-primary md:text-sm">
          Better every day
        </span>
        <h3 className="text-4xl font-semibold text-foreground md:text-6xl">Let's change it up a bit</h3>
        <p className="text-base text-muted-foreground md:text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam nobis in error repellat voluptatibus ad.
        </p>
        <button
          type="button"
          className={cn(
            "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-all",
            "hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          )}
        >
          Find a class
        </button>
      </div>
      <ShuffleGrid />
    </section>
  )
}
