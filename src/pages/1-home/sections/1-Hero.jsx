import { motion } from "motion/react"
import { ArrowRight, Play } from "lucide-react"
import Button from "../../../components/ui/Button"

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-asa-black">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&q=80')] bg-cover bg-center opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-r from-asa-black/95 via-asa-black/80 to-asa-black/60" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="inline-block rounded-full bg-asa-secondary/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-asa-secondary">
            Est. 2024 · Lagos, Nigeria
          </span>

          <h1 className="mt-6 font-headline text-5xl font-bold leading-tight text-asa-white sm:text-6xl lg:text-7xl">
            Where African
            <br />
            <span className="text-asa-secondary">Talent Comes Alive</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-asa-grey sm:text-xl">
            Actor's Slot Academy is a premier performance training institution
            dedicated to discovering, developing, and showcasing African talent
            for global screens and stages.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button to="/auth?mode=signup" size="lg">
              Apply Now <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-asa-white/30 text-asa-white hover:bg-asa-white/10"
            >
              <Play className="h-4 w-4" /> Watch Showreel
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-asa-white/10 pt-8">
            {[
              { label: "Trained", value: "200+" },
              { label: "Placement Rate", value: "85%" },
              { label: "Workshops", value: "48+" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-headline text-2xl font-bold text-asa-white sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-asa-grey">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
