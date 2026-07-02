import { motion } from "motion/react"
import SectionHeader from "../../../components/ui/SectionHeader"
import Button from "../../../components/ui/Button"

const SCRIPT_SAMPLE = {
  title: "Finding the Authentic Voice",
  subtitle: "Module 2 — Script Analysis & Character Building",
  credit: "ASA Curriculum · Week 1 of 4",
  lines: [
    { speaker: "INSTRUCTOR", dialogue: "Stand up. Feet shoulder-width apart. Hands at your sides." },
    { speaker: "", dialogue: "" },
    { speaker: "INSTRUCTOR", dialogue: "Before you can become someone else, you must know who you are. Where does your voice live? Not your throat. Your voice." },
    { speaker: "", dialogue: "" },
    { speaker: "STUDENT", dialogue: "I think it lives in my chest? When I speak from there it feels... heavier." },
    { speaker: "", dialogue: "" },
    { speaker: "INSTRUCTOR", dialogue: "Good. Now tell me why you're afraid to use it." },
    { speaker: "", dialogue: "" },
    { speaker: "STUDENT", dialogue: "Because if I speak from my chest — if I really let it out — everyone will hear me. Truly hear me. And what if who I am is not enough?" },
    { speaker: "", dialogue: "" },
    { speaker: "INSTRUCTOR", dialogue: "That, right there, is your first authentic line. Hold onto it." },
    { speaker: "", dialogue: "" },
    { speaker: "INSTRUCTOR", dialogue: "This is what we do at ASA. We stop performing. We start being." },
  ],
}

const PERF_STRIP = {
  backgroundImage: "radial-gradient(circle at 50% 0, transparent 4px, #FDFBF7 4px)",
  backgroundSize: "18px 12px",
  backgroundRepeat: "repeat-x",
}

export default function ScriptPreview() {
  return (
    <section className="relative bg-asa-surface py-28 overflow-hidden">
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-asa-primary/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Inside Our Programme"
          title="What a Class Looks Like"
          description="Every ASA session is crafted to strip away pretense and uncover the performer beneath. Here is an excerpt from Module 2."
        />

        {/* Screenplay paper card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-14 mx-auto max-w-3xl"
        >
          {/* Wrapper to let the perforation strip sit above the card */}
          <div className="relative -top-[1px]">
            {/* Spiral perforation strip */}
            <div
              className="absolute -top-0 left-0 right-0 h-3 z-10"
              style={PERF_STRIP}
            />

            {/* Paper card with flat-top, rounded-bottom only */}
            <div
              className="relative border-x border-b border-asa-border bg-[#FDFBF7] p-8 sm:p-10 shadow-2xl rounded-b-xl -rotate-[0.4deg]"
              style={{ fontFamily: "var(--font-script)" }}
            >
              {/* Header metadata */}
              <div className="mb-6 text-center border-b border-dashed border-black/10 pb-4">
                <p className="text-[11px] tracking-[0.15em] uppercase text-black/50 font-semibold">
                  {SCRIPT_SAMPLE.credit}
                </p>
                <h3 className="mt-1.5 text-lg font-bold text-black/85" style={{ fontFamily: "var(--font-script)" }}>
                  {SCRIPT_SAMPLE.title}
                </h3>
                <p className="text-[12px] italic text-black/60">
                  {SCRIPT_SAMPLE.subtitle}
                </p>
              </div>

              {/* Dialogue lines */}
              <div className="space-y-1">
                {SCRIPT_SAMPLE.lines.map((line, i) => {
                  if (!line.dialogue) {
                    return <div key={i} className="h-3" />
                  }
                  return (
                    <div key={i} className="leading-relaxed">
                      <span className="text-[12px] font-bold uppercase tracking-wider text-black/70">
                        {line.speaker}
                      </span>
                      <p className="text-[12px] text-black/80 indent-4 -mt-0.5">
                        {line.dialogue}
                      </p>
                    </div>
                  )
                })}
              </div>

              {/* Page number */}
              <div className="mt-8 text-center">
                <span className="text-[11px] tracking-[0.15em] uppercase text-black/40">
                  Excerpt — Week 1 of Module 2
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Button to="/programmes" variant="primary">
            View Full Curriculum
          </Button>
        </div>
      </div>
    </section>
  )
}
