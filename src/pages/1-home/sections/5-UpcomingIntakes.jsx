import { motion } from "motion/react"
import { Calendar, MapPin, Users } from "lucide-react"
import { INTAKES } from "../../../data/coursesData"
import SectionHeader from "../../../components/ui/SectionHeader"
import Button from "../../../components/ui/Button"

const statusStyles = {
  open: "bg-green-100 text-green-700",
  upcoming: "bg-asa-secondary/10 text-asa-secondary",
  closed: "bg-asa-grey/10 text-asa-grey",
}

export default function UpcomingIntakes() {
  return (
    <section className="bg-asa-ivory py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Intakes"
          title="Upcoming Cohorts"
          description="Our signature 16-week programme runs three times a year. Pick your season and begin your journey."
          center
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {INTAKES.map((intake, i) => (
            <motion.div
              key={intake.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`rounded-2xl border p-8 transition-all duration-300 ${
                intake.status === "open"
                  ? "border-asa-secondary bg-asa-white shadow-md"
                  : "border-asa-black/10 bg-asa-white"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-headline text-lg font-bold text-asa-black">
                    {intake.label}
                  </h3>
                  <p className="text-sm text-asa-grey">{intake.season}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-3 py-0.5 text-xs font-semibold capitalize ${
                    statusStyles[intake.status]
                  }`}
                >
                  {intake.status === "open" ? `${intake.spotsLeft} spots` : intake.status}
                </span>
              </div>

              <div className="mt-6 space-y-2.5 text-sm text-asa-grey">
                <p className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-asa-secondary" />
                  {intake.startDate} – {intake.endDate}
                </p>
                <p className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-asa-secondary" />
                  {intake.capacity} seats · {intake.schedule}
                </p>
              </div>

              <div className="mt-6">
                {intake.status === "open" ? (
                  <Button to="/auth?mode=signup" size="sm" className="w-full">
                    Apply Now
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="w-full" disabled>
                    Applications Opening Soon
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
