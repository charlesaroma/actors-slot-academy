import { motion } from "motion/react"
import { MODULES } from "../../../data/coursesData"
import SectionHeader from "../../../components/ui/SectionHeader"
import { BookOpen, Clock } from "lucide-react"

export default function CurriculumOverview() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Curriculum"
          title="What You'll Learn"
          description="16 weeks across 5 intensive modules, designed to take you from foundation to showcase-ready."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((mod, i) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="card-ticket p-6"
            >
              <div className="flex items-center gap-2 text-asa-primary mb-3">
                <BookOpen className="h-4 w-4" />
                <span className="label-mono text-asa-primary">Module {i + 1}</span>
              </div>
              <h3 className="font-headline text-lg font-semibold text-asa-text mb-2">
                {mod.title}
              </h3>
              <p className="text-sm text-asa-muted leading-relaxed mb-4">
                {mod.description}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-asa-muted">
                <Clock className="h-3.5 w-3.5" />
                <span>{mod.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
