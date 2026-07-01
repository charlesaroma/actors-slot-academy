import { motion } from "motion/react"
import { Clock, Users, BookOpen, Star, Shield, HeartHandshake } from "lucide-react"
import { SCHOOLS_OUTREACH } from "../../../data/coursesData"
import SectionHeader from "../../../components/ui/SectionHeader"

const icons = {
  duration: Clock,
  classSize: Users,
  modules: BookOpen,
  certification: Star,
  mentorship: Shield,
  support: HeartHandshake,
}

export default function OutreachOfferings() {
  const highlights = [
    { label: "Duration", key: "duration", icon: icons.duration },
    { label: "Class Size", key: "classSize", icon: icons.classSize },
    { label: "Modules", key: "modules", icon: icons.modules },
    { label: "Certification", key: "certification", icon: icons.certification },
    { label: "Mentorship", key: "mentorship", icon: icons.mentorship },
    { label: "Post-Programme", key: "support", icon: icons.support },
  ]

  return (
    <section className="bg-asa-ivory py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Programme"
          title="What We Offer Schools"
          description="A structured curriculum delivered at no cost to partnering institutions."
          center
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item, i) => {
            const value = SCHOOLS_OUTREACH[item.key]
            const Icon = item.icon
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-xl bg-asa-white p-6 shadow-sm"
              >
                <Icon className="h-6 w-6 text-asa-secondary" />
                <p className="mt-3 text-sm font-medium text-asa-black">
                  {item.label}
                </p>
                <p className="mt-1 text-sm text-asa-grey">{value}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
