import { motion } from "motion/react"
import { ArrowRight, Users } from "lucide-react"
import Button from "../../../components/ui/Button"

export default function CastingPortalCall() {
  return (
    <section className="bg-asa-background py-24 relative overflow-hidden">
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-asa-border to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center card-ticket p-10 md:p-14 bg-asa-surface border-asa-border glow-gold"
        >
          <Users className="mx-auto h-12 w-12 text-asa-primary" />
          <h2 className="mt-5 font-headline text-3xl font-bold text-asa-text sm:text-4xl">
            Casting Directors & Agents
          </h2>
          <p className="mt-4 text-base leading-relaxed text-asa-muted max-w-xl mx-auto">
            Access our full talent roster, filter by skills and availability, and
            submit casting briefs directly through our casting portal.
          </p>
          <Button
            to="/apply"
            size="lg"
            className="mt-8 inline-flex items-center gap-2"
          >
            Access Casting Portal <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
