import { useState, useEffect, useRef } from "react"
import { useInView } from "motion/react"

export default function AnimatedCounter({ target, suffix = "", label }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true

    const duration = 1800
    const start = performance.now()

    function tick(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [inView, target])

  return (
    <div ref={ref}>
      <p className="font-headline text-2xl font-bold text-asa-primary sm:text-3xl tabular-nums">
        {count}{suffix}
      </p>
      <p className="mt-1 label-mono">{label}</p>
    </div>
  )
}
