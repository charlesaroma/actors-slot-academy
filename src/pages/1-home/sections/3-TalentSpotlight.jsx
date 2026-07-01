import { motion } from "motion/react"
import { Link } from "react-router-dom"
import { TALENTS } from "../../../data/talentDirectory"
import TalentCard from "../../../components/ui/TalentCard"
import SectionHeader from "../../../components/ui/SectionHeader"
import Button from "../../../components/ui/Button"

export default function TalentSpotlight() {
  const featured = TALENTS.slice(0, 3)

  return (
    <section className="bg-asa-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Meet Our Talents"
          title="Spotlight Performers"
          description="Exceptional artists trained at ASA, ready for their next role."
          center
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((talent, i) => (
            <motion.div
              key={talent.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <TalentCard talent={talent} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button to="/talents" variant="outline" size="lg">
            View Full Directory
          </Button>
        </div>
      </div>
    </section>
  )
}
