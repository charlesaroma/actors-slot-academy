import { motion } from "motion/react"
import { Image } from "lucide-react"

export default function GalleryHero() {
  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden bg-asa-black">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576544403918-c47d52572a9a?w=1920&q=80')] bg-cover bg-center opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-r from-asa-black/95 via-asa-black/80 to-asa-black/60" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="inline-block rounded-full bg-asa-secondary/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-asa-secondary">
            Media
          </span>
          <h1 className="mt-6 font-headline text-4xl font-bold leading-tight text-asa-white sm:text-5xl lg:text-6xl">
            Our Media <span className="text-asa-secondary">Gallery</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-asa-grey sm:text-lg">
            Moments captured from performances, workshops, photoshoots, and events
            across the ASA ecosystem.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
