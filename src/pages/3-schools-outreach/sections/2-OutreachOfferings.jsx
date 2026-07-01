import { motion } from "motion/react"
import { Clock, Users, BookOpen, Star, Shield, HeartHandshake } from "lucide-react"
import { SCHOOLS_OUTREACH } from "../../../data/coursesData"
import SectionHeader from "../../../components/ui/SectionHeader"

const icons = {
  duration: Clock,
  classSize: Users,
  modules: BookOpen,
  certification: Star,
  mentorship: Shield,
  support: HeartHandshake,
}

export default function OutreachOfferings() {
  return (
    <section className="bg-asa-surface py-28 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Offerings"
          title="What We Offer Schools"
          description="Structured drama and performance programmes delivered by the academy."
          center
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {SCHOOLS_OUTREACH.programmes.map((program, i) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="card-ticket p-8 flex flex-col justify-between"
            >
              <div>
                <span className="label-mono text-asa-primary text-[10px]">
                  {program.duration}
                </span>
                <h3 className="mt-3 font-headline text-xl font-bold text-asa-text">
                  {program.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-asa-muted">
                  {program.description}
                </p>
              </div>

              <div className="mt-6 border-t border-asa-border pt-4 text-xs text-asa-muted">
                <span className="font-semibold text-asa-primary">Suitable for: </span>
                {program.适合}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
