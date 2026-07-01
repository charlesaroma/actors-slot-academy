import { motion } from "motion/react"
import SectionHeader from "../../../components/ui/SectionHeader"

const galleryItems = [
  {
    src: "https://images.unsplash.com/photo-1603647228752-7637a91fc9c7?w=800&q=80",
    alt: "Stage Performance",
    label: "End of Term Showcase",
  },
  {
    src: "https://images.unsplash.com/photo-1576724196706-3f23f51ea351?w=800&q=80",
    alt: "Workshop Session",
    label: "Monologue Workshop",
  },
  {
    src: "https://images.unsplash.com/photo-1542775846-e6c1e8aba884?w=800&q=80",
    alt: "Photoshoot",
    label: "Portrait Session",
  },
  {
    src: "https://images.unsplash.com/photo-1579539760267-b2e78d9d735e?w=800&q=80",
    alt: "Audience",
    label: "Open Mic Night",
  },
  {
    src: "https://images.unsplash.com/photo-1603647284638-60268b672f55?w=800&q=80",
    alt: "Behind the Scenes",
    label: "Rehearsal Week",
  },
  {
    src: "https://images.unsplash.com/photo-1556300219-2d2fdd6266d3?w=800&q=80",
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
