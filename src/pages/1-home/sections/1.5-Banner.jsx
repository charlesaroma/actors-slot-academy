import { motion } from "motion/react"

export default function BannerSection() {
  return (
    <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden bg-asa-background">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/asa-banner.jpeg')",
        }}
      />
      {/* Cinematic dark overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-asa-background via-asa-background/40 to-asa-background/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-asa-background/80 via-transparent to-transparent" />
      
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-4 pb-20 sm:px-6 lg:px-8">
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
    </section>
  )
}
