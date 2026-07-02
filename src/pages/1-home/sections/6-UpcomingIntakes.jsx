import { motion } from "motion/react"
import { Calendar, Users, MapPin } from "lucide-react"
import { INTAKES } from "../../../data/coursesData"
import SectionHeader from "../../../components/ui/SectionHeader"
import Button from "../../../components/ui/Button"

const statusConfig = {
  open: {
    label: (intake) => `${intake.spotsLeft} spots left`,
    className: "bg-asa-success/15 text-asa-success border border-asa-success/30",
  },
  upcoming: {
    label: () => "Opening Soon",
    className: "bg-asa-primary/10 text-asa-primary border border-asa-primary/20",
  },
  closed: {
    label: () => "Closed",
    className: "bg-asa-muted/10 text-asa-muted border border-asa-border",
  },
}

export default function UpcomingIntakes() {
  return (
    <section className="relative bg-asa-surface py-28 overflow-hidden">
      {/* Gold top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-asa-primary/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Intakes"
          title="Upcoming Cohorts"
          description="Our signature 16-week programme runs three times a year. Pick your season and begin your journey."
          center
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {INTAKES.map((intake, i) => {
            const status = statusConfig[intake.status] ?? statusConfig.closed
            const isOpen = intake.status === "open"
            return (
              <motion.div
                key={intake.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`card-ticket card-ticket--perforated p-8 ${isOpen ? "glow-gold" : ""}`}
              >
                {/* Ticket header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="label-mono text-asa-primary/60">Admit One</p>
                    <h3 className="mt-1 font-headline text-lg font-bold text-asa-text">
                      {intake.label}
                    </h3>
                    <p className="mt-1 label-mono">{intake.season}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}>
                    {status.label(intake)}
                  </span>
                </div>

                {/* Perforated tear line */}
                <div
                  className="my-6 h-px"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg, var(--asa-ink-border) 0 6px, transparent 6px 12px)",
                  }}
                />

                {/* Meta */}
                <div className="space-y-2.5 text-sm text-asa-muted">
                  <p className="flex items-center gap-2.5">
                    <Calendar className="h-4 w-4 text-asa-primary shrink-0" />
                    {intake.startDate} – {intake.endDate}
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Users className="h-4 w-4 text-asa-primary shrink-0" />
                    {intake.capacity} seats · {intake.schedule}
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-8">
                  {isOpen ? (
                    <Button to="/apply" size="sm" className="w-full">
                      Apply Now
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="w-full opacity-50" disabled>
                      Applications Opening Soon
                    </Button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-asa-border to-transparent" />
    </section>
  )
}