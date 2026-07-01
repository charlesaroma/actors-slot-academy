import { motion } from "motion/react"
import { TALENTS } from "../../../data/talentDirectory"
import TalentCard from "../../../components/ui/TalentCard"
import SectionHeader from "../../../components/ui/SectionHeader"
import Button from "../../../components/ui/Button"

export default function TalentSpotlight() {
  const featured = TALENTS.slice(0, 3)

  return (
    <section className="relative bg-asa-surface py-28 overflow-hidden">
      {/* Subtle horizontal rule top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-asa-primary/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Meet Our Talents"
          title="Spotlight Performers"
          description="Exceptional artists trained at ASA, ready for their next role."
          center
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((talent, i) => (
            <motion.div
              key={talent.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <TalentCard talent={talent} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <Button to="/talents" variant="outline" size="lg">
            View Full Directory
          </Button>
        </motion.div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-asa-border to-transparent" />
    </section>
  )
}
