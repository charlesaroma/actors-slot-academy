import { motion } from "motion/react"

import bannerImage from "../../../assets/images/asa-banner.jpeg"

export default function BannerSection() {
  return (
    <section className="w-full bg-asa-background overflow-hidden flex flex-col">
      {/* Intro Text */}
      <div className="mx-auto max-w-7xl w-full px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h2 className="font-headline text-3xl font-bold tracking-tight text-asa-text sm:text-4xl md:text-5xl">
            Empowering the next generation of <br/> <span className="italic text-asa-primary">African storytellers</span>
          </h2>
          <p className="mt-6 text-lg text-asa-muted sm:text-xl">
            A creative ecosystem fostering world-class performance art, right here in Kampala.
          </p>
        </motion.div>
      </div>

      {/* Full-width Image */}
      <motion.img 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        src={bannerImage} 
        alt="Actor's Slot Academy Banner" 
        className="w-full h-auto block"
      />
    </section>
  )
}
