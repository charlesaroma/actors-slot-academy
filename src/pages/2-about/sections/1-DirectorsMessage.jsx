import { motion } from "motion/react"
import { Quote } from "lucide-react"
import { DIRECTOR } from "../../../data/brandStrategy"

export default function DirectorsMessage() {
  return (
    <section className="relative overflow-hidden bg-asa-surface py-28">
      {/* Cinematic side photo backdrop */}
      <div className="absolute right-0 top-0 h-full w-1/3 bg-[url('https://images.unsplash.com/photo-1510736769521-207ed84f191e?w=800&q=80')] bg-cover bg-center opacity-10" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="label-mono inline-block text-asa-primary">
            Founder's Note
          </span>

          <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start">
            <img
              src={DIRECTOR.image}
              alt={DIRECTOR.name}
              className="h-32 w-32 shrink-0 rounded-2xl object-cover shadow-xl border border-asa-border sm:h-40 sm:w-40"
            />

            <div>
              <Quote className="mb-3 h-8 w-8 text-asa-primary/30" />
              <p className="text-base leading-relaxed text-asa-text/90 italic font-medium">
                {DIRECTOR.message}
              </p>
              <div className="mt-6 border-t border-asa-border pt-4">
                <p className="font-headline text-lg font-bold text-asa-primary">
                  {DIRECTOR.name}
                </p>
                <p className="text-xs uppercase tracking-widest text-asa-muted">{DIRECTOR.title}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
