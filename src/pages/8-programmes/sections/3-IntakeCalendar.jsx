import { motion } from "motion/react"
import { INTAKES } from "../../../data/coursesData"
import SectionHeader from "../../../components/ui/SectionHeader"
import { CalendarDays, Users, MapPin } from "lucide-react"

const statusConfig = {
  open: {
    label: "Open for Applications",
    badge: "bg-asa-success/20 text-asa-success border-asa-success/30",
    dot: "bg-asa-success",
  },
  upcoming: {
    label: "Upcoming Cohort",
    badge: "bg-asa-primary/10 text-asa-primary border-asa-primary/20",
    dot: "bg-asa-primary",
  },
}

export default function IntakeCalendar() {
  return (
    <section className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="Schedule"
          title="Upcoming Intakes"
          description="Three cohorts a year. Small class sizes for personalised mentorship."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {INTAKES.map((intake, i) => {
            const cfg = statusConfig[intake.status]
            return (
              <motion.div
                key={intake.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="card-ticket p-6"
              >
                {/* Status badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${cfg.badge}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                    {cfg.label}
                  </span>
                  {intake.spotsLeft > 0 && intake.spotsLeft <= 8 && (
                    <span className="label-mono text-asa-warning">
                      {intake.spotsLeft} spots left
                    </span>
                  )}
                </div>

                <h3 className="font-headline text-lg font-semibold text-asa-text mb-1">
                  {intake.label}
                </h3>
                <p className="label-mono mb-4">{intake.season}</p>

                <div className="space-y-2 text-sm text-asa-muted">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 shrink-0" />
                    <span>
                      {intake.startDate} – {intake.endDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 shrink-0" />
                    <span>Max {intake.capacity} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span>Kampala, Uganda</span>
                  </div>
                </div>

                {intake.status === "open" && (
                  <a
                    href="/auth/signup"
                    className="mt-6 block rounded-lg bg-asa-primary px-4 py-2.5 text-center text-sm font-semibold text-asa-background transition-all duration-200 hover:bg-asa-primary-bright"
                  >
                    Apply Now
                  </a>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
