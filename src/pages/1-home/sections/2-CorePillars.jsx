import { motion } from "motion/react"
import { CORE_VALUES } from "../../../data/brandStrategy"
import SectionHeader from "../../../components/ui/SectionHeader"

export default function CorePillars() {
  return (
    <section className="relative bg-asa-background py-28 overflow-hidden">
      {/* Subtle gold radial bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(201,154,62,0.04) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Our Pillars"
          title="What We Stand For"
          description="Five principles that guide everything we do at Actor's Slot Academy."
          center
        />

        <div className="filmstrip-divider is-lit mt-14">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_VALUES.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="card-ticket group p-8"
            >
              {/* Scene slate label — reads like a shot log, not a decorative counter */}
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-asa-border" />
                <span className="label-mono text-asa-primary text-[9px]">
                  Scene {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-headline text-xl font-bold text-asa-text group-hover:text-asa-primary transition-colors duration-250">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-asa-muted">
                {pillar.description}
              </p>
              {pillar.proverb && (
                <blockquote className="mt-5 text-xs italic text-asa-muted/70">
                  &ldquo;{pillar.proverb}&rdquo;
                </blockquote>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}