import { motion } from "motion/react"
import { Target, Eye } from "lucide-react"
import { MISSION_VISION } from "../../../data/brandStrategy"
import SectionHeader from "../../../components/ui/SectionHeader"

export default function MissionVision() {
  return (
    <section className="bg-asa-background py-28 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Our Purpose"
          title="Mission & Vision"
          description="The driving force behind Actor's Slot Academy."
          center
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-ticket p-8"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-asa-primary/10 text-asa-primary">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="font-headline text-2xl font-bold text-asa-text">
              Our Mission
            </h3>
            <p className="mt-3 text-base leading-relaxed text-asa-muted">
              {MISSION_VISION.mission}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-ticket p-8"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-asa-primary/10 text-asa-primary">
              <Eye className="h-6 w-6" />
            </div>
            <h3 className="font-headline text-2xl font-bold text-asa-text">
              Our Vision
            </h3>
            <p className="mt-3 text-base leading-relaxed text-asa-muted">
              {MISSION_VISION.vision}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
