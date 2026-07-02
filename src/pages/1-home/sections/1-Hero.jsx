import { motion } from "motion/react"
import { ArrowRight, Play } from "lucide-react"
import Button from "../../../components/ui/Button"


export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-asa-background">
      {/* Background image — slow Ken Burns drift, the room is never quite still */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 animate-ken-burns bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1558970439-add78fc68990?w=1920&q=80')",
            opacity: 0.22,
          }}
        />
      </div>

      {/* Cinematic gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-asa-background via-asa-background/85 to-asa-background/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-asa-background via-transparent to-transparent" />

      {/* Gold spotlight vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(201,154,62,0.06) 0%, transparent 70%)",
        }}
      />

      {/* One-time light sweep, like a lens catching a flare on take one */}
      <div className="light-sweep" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-36 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-3xl"
        >
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="label-mono inline-flex items-center gap-2 text-asa-primary"
          >
            <span className="h-px w-6 bg-asa-primary" />
            Now Casting · Applications Open
          </motion.span>

          {/* Headline */}
          <h1 className="mt-6 font-headline text-5xl font-bold leading-[1.05] tracking-tight text-asa-text sm:text-6xl lg:text-7xl">
            Where African
            <br />
            <span className="italic text-asa-primary">Talent Comes Alive</span>
          </h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-asa-muted sm:text-xl"
          >
            Actor&apos;s Slot Academy is a premier performance training institution
            dedicated to discovering, developing, and showcasing African talent
            for global screens and stages.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button to="/auth?mode=signup" size="lg">
              Apply Now <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-asa-text/20 text-asa-text hover:bg-asa-text/5 hover:border-asa-text/40"
            >
              <Play className="h-4 w-4" /> Watch Showreel
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-20 grid grid-cols-3 gap-8 border-t border-asa-border pt-8"
          >
            {[
              { label: "Talents Trained", value: "200+" },
              { label: "Placement Rate", value: "85%" },
              { label: "Workshops Run", value: "48+" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 + i * 0.1 }}
              >
                <p className="font-headline text-2xl font-bold text-asa-primary sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 label-mono">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-asa-background to-transparent" />
    </section>
  )
}