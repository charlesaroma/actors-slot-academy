import { motion } from "motion/react"
import { CORE_VALUES } from "../../../data/brandStrategy"
import SectionHeader from "../../../components/ui/SectionHeader"

export default function OurValues() {
  return (
    <section className="bg-asa-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Our Values"
          title="The Principles That Shape Us"
          description="Every decision, curriculum, and relationship at ASA is guided by these five values."
          center
        />

        <div className="mt-16 space-y-6">
          {CORE_VALUES.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col gap-4 rounded-2xl border border-asa-black/10 bg-asa-ivory p-6 sm:flex-row sm:items-center"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-asa-secondary/10 font-headline text-lg font-bold text-asa-secondary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <h3 className="font-headline text-lg font-bold text-asa-black">
                  {value.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-asa-grey">
                  {value.description}
                </p>
              </div>
              {value.proverb && (
                <blockquote className="hidden max-w-xs border-l-2 border-asa-secondary pl-4 text-xs italic text-asa-grey/70 sm:block">
                  "{value.proverb}"
                </blockquote>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
