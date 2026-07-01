import { motion } from "motion/react"
import { TARGET_AUDIENCE } from "../../../data/brandStrategy"
import SectionHeader from "../../../components/ui/SectionHeader"

// Map audience types to lucide-compatible SVG icons (inline)
const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
  </svg>
)

export default function TargetAudience() {
  return (
    <section className="relative bg-asa-background py-28 overflow-hidden">
      {/* Cinematic curtain maroon radial accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(110,42,58,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Who We Serve"
          title="Made for Every Storyteller"
          description="Whether you're taking your first bow or refining your craft, ASA has a path for you."
          center
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TARGET_AUDIENCE.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="card-ticket group p-8 text-center"
            >
              {/* Icon */}
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-asa-border bg-asa-background text-asa-primary transition-all duration-250 group-hover:border-asa-primary/40 group-hover:text-asa-primary-bright">
                <IconStar />
              </div>

              <h3 className="font-headline text-xl font-bold text-asa-text group-hover:text-asa-primary transition-colors duration-250">
                {item.title}
              </h3>
              <p className="mt-1 label-mono">Ages {item.age}</p>
              <p className="mt-3 text-sm leading-relaxed text-asa-muted">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
