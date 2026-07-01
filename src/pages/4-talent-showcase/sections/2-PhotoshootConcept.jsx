import { motion } from "motion/react"
import { Camera, Sparkles } from "lucide-react"
import SectionHeader from "../../../components/ui/SectionHeader"

const concepts = [
  {
    title: "Headshots",
    desc: "Professional-grade portraits for casting submissions, agencies, and personal branding.",
    image: "https://images.unsplash.com/photo-1628682814595-a3f0816b25ff?w=600&q=80",
  },
  {
    title: "Editorial",
    desc: "High-fashion editorial spreads that showcase range, style, and visual storytelling ability.",
    image: "https://images.unsplash.com/photo-1532076904124-d4e8fe7fbbec?w=600&q=80",
  },
  {
    title: "Theatrical",
    desc: "Dynamic character-driven shoots that bring monologues and personas to life through stills.",
    image: "https://images.unsplash.com/photo-1565798846807-2af22c843402?w=600&q=80",
  },
]

export default function PhotoshootConcept() {
  return (
    <section className="bg-asa-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Photoshoot"
          title="Concept Gallery"
          description="Every ASA talent leaves with a professional portfolio that opens doors."
          center
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {concepts.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6">
                <h3 className="font-headline text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-white/70">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
