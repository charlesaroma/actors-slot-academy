import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Camera, Image as ImageIcon, Film, SlidersHorizontal } from "lucide-react"
import SectionHeader from "../../components/ui/SectionHeader"

const GALLERY_ITEMS = [
  {
    id: "g1",
    category: "Headshots",
    title: "Catherine Nantongo — Film & TV Portfolio",
    image: "https://images.unsplash.com/photo-1530785602389-07594beb8b73?w=600&q=80",
    photographer: "M. Kato",
  },
  {
    id: "g2",
    category: "Productions",
    title: "Opening Night: 'Shadows of Kampala'",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
    photographer: "A. Okello",
  },
  {
    id: "g3",
    category: "Behind the Scenes",
    title: "Blocking rehearsals for the Harmattan showcase",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80",
    photographer: "D. Ssewankambo",
  },
  {
    id: "g4",
    category: "Headshots",
    title: "Sarah Nakato — Classical Portrait",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=80",
    photographer: "M. Kato",
  },
  {
    id: "g5",
    category: "Productions",
    title: "Main Stage Performance: 'The Griot's Legacy'",
    image: "https://images.unsplash.com/photo-1513829096900-ee825ba00a16?w=600&q=80",
    photographer: "A. Okello",
  },
  {
    id: "g6",
    category: "Behind the Scenes",
    title: "Sound checks and microphone placement, Uganda National Theatre",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=600&q=80",
    photographer: "D. Ssewankambo",
  },
  {
    id: "g7",
    category: "Headshots",
    title: "Michael Wasswa — Cinematic Headshot",
    image: "https://images.unsplash.com/photo-1593351799227-75df2026356b?w=600&q=80",
    photographer: "M. Kato",
  },
  {
    id: "g8",
    category: "Productions",
    title: "Workshop performance showcase, Dry Season Cohort 2025",
    image: "https://images.unsplash.com/photo-1460889687773-43400015951d?w=600&q=80",
    photographer: "A. Okello",
  },
]

const categories = ["All", "Headshots", "Productions", "Behind the Scenes"]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered = useMemo(() => {
    if (activeCategory === "All") return GALLERY_ITEMS
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  return (
    <div className="bg-asa-background min-h-screen py-24 relative overflow-hidden">
      {/* Background spotlights */}
      <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full bg-asa-primary/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-asa-accent/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          label="Media Gallery"
          title="Faces of the Story"
          description="Explore portraits, live performance showcases, and behind-the-scenes moments from Actor's Slot Academy."
          center
        />

        {/* Categories filters */}
        <div className="mt-12 flex flex-wrap justify-center gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-250 cursor-pointer ${
                activeCategory === cat
                  ? "bg-asa-primary text-asa-background shadow-[0_0_20px_rgba(201,154,62,0.25)] border border-transparent"
                  : "bg-asa-surface border border-asa-border text-asa-muted hover:border-asa-primary hover:text-asa-text"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <motion.div
          layout
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="card-ticket group overflow-hidden bg-asa-surface border border-asa-border rounded-xl cursor-zoom-in"
              >
                <div className="aspect-[4/5] overflow-hidden bg-asa-background relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-asa-background via-asa-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <span className="label-mono text-[9px] text-asa-primary">{item.category}</span>
                    <h3 className="mt-2 font-headline text-base font-bold text-asa-text line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[10px] text-asa-muted">Photo: {item.photographer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}