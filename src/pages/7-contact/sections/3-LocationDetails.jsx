import { motion } from "motion/react"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { CONTACT_INFO } from "../../../data/brandStrategy"

const details = [
  { icon: MapPin, label: "Address", value: CONTACT_INFO.address },
  { icon: Phone, label: "Phone", value: CONTACT_INFO.phone },
  { icon: Mail, label: "Email", value: CONTACT_INFO.email },
  { icon: Clock, label: "Office Hours", value: CONTACT_INFO.hours },
]

export default function LocationDetails() {
  return (
    <section className="bg-asa-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {details.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-xl border border-asa-black/10 bg-asa-ivory p-6 text-center"
              >
                <Icon className="mx-auto h-6 w-6 text-asa-secondary" />
                <h3 className="mt-3 text-sm font-semibold text-asa-black">
                  {item.label}
                </h3>
                <p className="mt-1 text-sm text-asa-grey">{item.value}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
