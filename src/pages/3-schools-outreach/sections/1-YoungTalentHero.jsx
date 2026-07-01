import { motion } from "motion/react"
import { ArrowRight, GraduationCap } from "lucide-react"
import Button from "../../../components/ui/Button"

export default function YoungTalentHero() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-asa-background">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571173069043-82a7a13cee9f?w=1920&q=80')] bg-cover bg-center opacity-15" />
      <div className="absolute inset-0 bg-gradient-to-r from-asa-background via-asa-background/85 to-asa-background/40" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="label-mono inline-block text-asa-primary">
            ASA for Schools
          </span>

          <h1 className="mt-6 font-headline text-4xl font-bold leading-tight text-asa-text sm:text-5xl lg:text-6xl">
            Bringing the Spotlight
            <br />
            <span className="text-asa-primary">to Young Talent</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-asa-muted sm:text-lg">
            Our Schools Outreach programme partners with primary and secondary
            institutions across Kampala to identify raw talent, build confidence,
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

          <div className="mt-12 flex items-center gap-3 text-sm text-asa-muted">
            <GraduationCap className="h-5 w-5 text-asa-primary" />
            Fully funded for partnering institutions
          </div>
        </motion.div>
      </div>
    </section>
  )
}
