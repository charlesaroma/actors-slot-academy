import { motion } from "motion/react"
import { Ticket } from "lucide-react"
import SectionHeader from "../../../components/ui/SectionHeader"
import Button from "../../../components/ui/Button"

const tiers = [
  {
    name: "General Admission",
    price: "₦5,000",
    perks: ["Standard seating", "Event programme"],
  },
  {
    name: "VIP",
    price: "₦15,000",
    perks: ["Reserved front rows", "Meet & greet with performers", "Complimentary drinks"],
  },
  {
    name: "Industry Pass",
    price: "₦25,000",
    perks: ["All VIP benefits", "Networking reception access", "Talent directory download"],
  },
]

export default function TicketBooking() {
  return (
    <section className="bg-asa-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Tickets"
          title="Book Your Seat"
          description="Secure your place at our showcase events and workshops."
          center
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`rounded-2xl border p-8 text-center ${
                i === 1
                  ? "border-asa-secondary bg-asa-ivory shadow-md"
                  : "border-asa-white/20 bg-asa-ivory"
              }`}
            >
              <Ticket className="mx-auto h-8 w-8 text-asa-secondary" />
              <h3 className="mt-4 font-headline text-xl font-bold text-asa-black">
                {tier.name}
              </h3>
              <p className="mt-2 font-headline text-3xl font-bold text-asa-secondary">
                {tier.price}
              </p>
              <ul className="mt-6 space-y-2 text-left text-sm text-asa-grey">
                {tier.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-asa-secondary" />
                    {p}
                  </li>
                ))}
              </ul>
              <Button
                variant={i === 1 ? "primary" : "outline"}
                size="sm"
                className="mt-8 w-full"
              >
                Book Now
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
