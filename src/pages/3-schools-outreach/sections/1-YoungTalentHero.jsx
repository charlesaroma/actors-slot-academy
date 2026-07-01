import { motion } from "motion/react"
import { ArrowRight, GraduationCap } from "lucide-react"
import Button from "../../../components/ui/Button"

export default function YoungTalentHero() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-asa-black">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&q=80')] bg-cover bg-center opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-r from-asa-black/95 via-asa-black/80 to-asa-black/60" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="inline-block rounded-full bg-asa-secondary/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-asa-secondary">
            ASA for Schools
          </span>

          <h1 className="mt-6 font-headline text-4xl font-bold leading-tight text-asa-white sm:text-5xl lg:text-6xl">
            Bringing the Spotlight
            <br />
            <span className="text-asa-secondary">to Young Talent</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-asa-grey sm:text-lg">
            Our Schools Outreach programme partners with primary and secondary
            institutions across Lagos to identify raw talent, build confidence,
            and plant seeds for future careers in the creative industries.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              to="/contact"
              size="lg"
              className="inline-flex items-center gap-2"
            >
              Partner Your School <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-12 flex items-center gap-3 text-sm text-asa-grey">
            <GraduationCap className="h-5 w-5 text-asa-secondary" />
            Fully funded for partnering institutions
          </div>
        </motion.div>
      </div>
    </section>
  )
}
