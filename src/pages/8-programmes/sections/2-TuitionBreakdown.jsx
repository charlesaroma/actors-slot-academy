import { motion } from "motion/react"
import { TUITION } from "../../../data/coursesData"
import SectionHeader from "../../../components/ui/SectionHeader"
import { Check, CreditCard } from "lucide-react"

export default function TuitionBreakdown() {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-asa-primary/[0.02] to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Investment"
          title="Tuition & What's Included"
          description="Everything you need to succeed — no hidden fees."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {/* Price card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-ticket p-8 text-center lg:text-left"
          >
            <p className="label-mono mb-2">Programme Fee</p>
            <p className="font-headline text-5xl font-bold text-asa-primary">
              {TUITION.amount}
            </p>
            <p className="mt-1 text-sm text-asa-muted">Full 16-week programme</p>

            <div className="mt-8 space-y-3">
              {TUITION.whatIsCovered.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-asa-text">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-asa-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Payment options */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card-ticket p-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <CreditCard className="h-5 w-5 text-asa-primary" />
              <h3 className="font-headline text-xl font-semibold text-asa-text">
                Payment Plans
              </h3>
            </div>

            <div className="space-y-4">
              {TUITION.paymentOptions.map((option) => (
                <div
                  key={option}
                  className="rounded-lg border border-asa-border bg-asa-background/50 px-4 py-3 text-sm text-asa-text"
                >
                  {option}
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-asa-muted leading-relaxed">
              Need a custom payment arrangement?{" "}
              <a href="/contact" className="text-asa-primary hover:underline">
                Contact us
              </a>{" "}
              and we'll work something out.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
