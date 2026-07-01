import { motion } from "motion/react"
import { CORE_VALUES } from "../../../data/brandStrategy"
import SectionHeader from "../../../components/ui/SectionHeader"

export default function CorePillars() {
  return (
    <section className="bg-asa-ivory py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Our Pillars"
          title="What We Stand For"
          description="Five principles that guide everything we do at Actor's Slot Academy."
          center
        />

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_VALUES.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl border border-asa-black/10 bg-asa-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="font-headline text-xl font-bold text-asa-black">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-asa-grey">
                {pillar.description}
              </p>
              {pillar.proverb && (
                <blockquote className="mt-4 border-l-2 border-asa-secondary pl-3 text-xs italic text-asa-grey/80">
                  "{pillar.proverb}"
                </blockquote>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
