import { motion } from "motion/react"
import { ArrowRight, Users } from "lucide-react"
import Button from "../../../components/ui/Button"

export default function CastingPortalCall() {
  return (
    <section className="bg-asa-black py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <Users className="mx-auto h-10 w-10 text-asa-secondary" />
          <h2 className="mt-4 font-headline text-3xl font-bold text-asa-white sm:text-4xl">
            Casting Directors & Agents
          </h2>
          <p className="mt-4 text-base leading-relaxed text-asa-grey">
            Access our full talent roster, filter by skills and availability, and
            submit casting briefs directly through our casting portal.
          </p>
          <Button
            to="/auth?mode=signup"
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
