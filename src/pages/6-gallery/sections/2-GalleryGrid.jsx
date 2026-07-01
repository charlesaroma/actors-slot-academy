import { motion } from "motion/react"
import SectionHeader from "../../../components/ui/SectionHeader"

const galleryItems = [
  {
    src: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&q=80",
    alt: "Stage Performance",
    label: "End of Term Showcase",
  },
  {
    src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80",
    alt: "Workshop Session",
    label: "Monologue Workshop",
  },
  {
    src: "https://images.unsplash.com/photo-1540039155733-5bb30b53e14c?w=800&q=80",
    alt: "Photoshoot",
    label: "Portrait Session",
  },
  {
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
    alt: "Audience",
    label: "Open Mic Night",
  },
  {
    src: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80",
    alt: "Behind the Scenes",
    label: "Rehearsal Week",
  },
  {
    src: "https://images.unsplash.com/photo-1582196016295-f2e6f792b33e?w=800&q=80",
    alt: "Group Photo",
    label: "Q1 2026 Cohort",
  },
]

export default function GalleryGrid() {
  return (
    <section className="bg-asa-ivory py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Gallery"
          title="Captured Moments"
          description="A visual journey through life at Actor's Slot Academy."
          center
        />

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.08 }}
              className="group relative mb-4 overflow-hidden rounded-2xl break-inside-avoid"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-sm font-medium text-white">
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
