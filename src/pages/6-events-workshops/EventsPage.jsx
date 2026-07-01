import { useState } from "react"
import { motion } from "motion/react"
import { Calendar, Clock, MapPin, Film, Star, AlertCircle } from "lucide-react"
import SectionHeader from "../../components/ui/SectionHeader"
import Button from "../../components/ui/Button"

const EVENTS = [
  {
    id: "e1",
    title: "Audition Prep Masterclass",
    date: "July 12, 2026",
    time: "10:00 AM – 3:00 PM",
    location: "Kololo Rehearsal Room, Kampala",
    category: "Masterclass",
    price: "UGX 80,000",
    instructor: "Amina Nantongo",
    description: "Learn how to command the room, analyze callback scenes under pressure, and refine your screen casting monologue.",
    spotsLeft: 5,
  },
  {
    id: "e2",
    title: "Physical Theatre & Voice Intensive",
    date: "August 1-2, 2026",
    time: "9:00 AM – 4:00 PM (2 Days)",
    location: "ASA Main Studio, Kampala",
    category: "Workshop",
    price: "UGX 150,000",
    instructor: "Sarah Nakato",
    description: "Unlock vocal freedom and physical command using traditional African movement patterns and standard vocal training methods.",
    spotsLeft: 12,
  },
  {
    id: "e3",
    title: "Meisner Technique Foundations",
    date: "August 22, 2026",
    time: "1:00 PM – 6:00 PM",
    location: "ASA Main Studio, Kampala",
    category: "Masterclass",
    price: "UGX 90,000",
    instructor: "Michael Kato",
    description: "Focus on spontaneous performance, active listening, and repetition-driven acting structures for screen realism.",
    spotsLeft: 0, // Sold out
  },
  {
    id: "e4",
    title: "Screen Auditions with Global Casting Agencies",
    date: "September 15, 2026",
    time: "2:00 PM – 5:00 PM",
    location: "Online (Virtual Casting Session)",
    category: "Industry Event",
    price: "Free for ASA Alumni",
    instructor: "Furaha Talent Managers",
    description: "A panel discussion and live screen evaluation with international agents from South Africa, Nigeria, and Europe.",
    spotsLeft: 25,
  },
]

export default function EventsPage() {
  const [filter, setFilter] = useState("All")

  const filtered = filter === "All" ? EVENTS : EVENTS.filter((e) => e.category === filter)

  return (
    <div className="bg-asa-background min-h-screen py-24 relative overflow-hidden">
      {/* Background radial highlight */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(110,42,58,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          label="Events & Masterclasses"
          title="Industry Workshops"
          description="Refine your skills, prepare for upcoming auditions, and connect with global casting resources."
          center
        />

        {/* Filter tabs */}
        <div className="mt-12 flex justify-center gap-2 flex-wrap">
          {["All", "Masterclass", "Workshop", "Industry Event"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-5.5 py-2 text-xs font-semibold tracking-wide uppercase transition-all duration-250 cursor-pointer ${
                filter === cat
                  ? "bg-asa-primary text-asa-background shadow-[0_0_15px_rgba(201,154,62,0.25)]"
                  : "bg-asa-surface border border-asa-border text-asa-muted hover:border-asa-primary hover:text-asa-text"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Event List */}
        <div className="mt-16 space-y-8">
          {filtered.map((item, i) => {
            const isSoldOut = item.spotsLeft === 0
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="card-ticket p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 bg-asa-surface border border-asa-border rounded-xl"
              >
                {/* Event Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-asa-primary/10 border border-asa-primary/20 px-3 py-1 text-xs font-semibold tracking-wide uppercase text-asa-primary">
                      {item.category}
                    </span>
                    {isSoldOut ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-asa-accent">
                        <AlertCircle className="h-3.5 w-3.5" /> Sold Out
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-asa-success">
                        {item.spotsLeft} slots remaining
                      </span>
                    )}
                  </div>

                  <h3 className="font-headline text-2xl font-bold text-asa-text">
                    {item.title}
                  </h3>

                  <p className="text-sm text-asa-muted leading-relaxed max-w-2xl">
                    {item.description}
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2 text-xs text-asa-muted pt-2 border-t border-asa-border/40">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-asa-primary shrink-0" />
                      <span className="font-semibold text-asa-text">{item.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-asa-primary shrink-0" />
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-asa-primary shrink-0" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-asa-primary shrink-0" />
                      <span>Instructor: <strong className="text-asa-text">{item.instructor}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="shrink-0 flex flex-col justify-center items-stretch md:items-end gap-3 min-w-[200px] border-t md:border-t-0 md:border-l border-asa-border/60 pt-6 md:pt-0 md:pl-8">
                  <div className="text-center md:text-right">
                    <span className="label-mono text-[9px] block mb-1">Tuition Fee</span>
                    <span className="font-headline text-2xl font-bold text-asa-text">
                      {item.price}
                    </span>
                  </div>
                  {isSoldOut ? (
                    <Button variant="outline" className="w-full opacity-40 cursor-not-allowed" disabled>
                      Sold Out
                    </Button>
                  ) : (
                    <Button to="/auth" className="w-full">
                      Book a Seat
                    </Button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}