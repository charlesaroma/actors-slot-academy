import { motion } from "motion/react"
import { Quote } from "lucide-react"
import { DIRECTOR } from "../../../data/brandStrategy"

export default function DirectorsMessage() {
  return (
    <section className="relative overflow-hidden bg-asa-black py-24">
      <div className="absolute right-0 top-0 h-full w-1/3 bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80')] bg-cover bg-center opacity-20" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <span className="inline-block rounded-full bg-asa-secondary/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-asa-secondary">
            Founder's Note
          </span>

          <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start">
            <img
              src={DIRECTOR.image}
              alt={DIRECTOR.name}
              className="h-32 w-32 shrink-0 rounded-2xl object-cover shadow-lg sm:h-40 sm:w-40"
            />

            <div>
              <Quote className="mb-2 h-8 w-8 text-asa-secondary/40" />
              <p className="text-base leading-relaxed text-asa-grey/90">
                {DIRECTOR.message}
              </p>
              <div className="mt-4 border-t border-asa-white/10 pt-4">
                <p className="font-headline text-lg font-bold text-asa-white">
                  {DIRECTOR.name}
                </p>
                <p className="text-sm text-asa-grey">{DIRECTOR.title}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
