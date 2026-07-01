import { motion } from "motion/react"
import { TARGET_AUDIENCE } from "../../../data/brandStrategy"
import SectionHeader from "../../../components/ui/SectionHeader"

export default function TargetAudience() {
  return (
    <section className="bg-asa-black py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Who We Serve"
          title="Made for Every Storyteller"
          description="Whether you're taking your first bow or refining your craft, ASA has a path for you."
          center
          className="text-asa-white"
        />

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TARGET_AUDIENCE.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="rounded-2xl border border-asa-white/10 bg-asa-white/5 p-8 text-center backdrop-blur-sm"
            >
              <span className="inline-block text-4xl">{item.icon}</span>
              <h3 className="mt-4 font-headline text-xl font-bold text-asa-white">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-asa-grey">Ages {item.age}</p>
              <p className="mt-3 text-sm leading-relaxed text-asa-grey/80">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
