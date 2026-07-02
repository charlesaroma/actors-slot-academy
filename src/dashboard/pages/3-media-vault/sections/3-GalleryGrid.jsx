import { useState } from "react"
import { motion } from "motion/react"

const categories = ["All", "Headshots", "Stage", "Behind the Scenes", "Showreels"]

const mediaItems = [
  { id: "m1", src: "https://images.unsplash.com/photo-1530785602389-07594beb8b73?w=600&h=800&fit=crop", alt: "Dramatic headshot", category: "Headshots", label: "Dramatic Studio Headshot — 2025" },
  { id: "m2", src: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=400&fit=crop", alt: "Stage performance", category: "Stage", label: "The River & The Moon — Dress Rehearsal" },
  { id: "m3", src: "https://images.unsplash.com/photo-1549451371-de1bc02b1270?w=600&h=600&fit=crop", alt: "Backstage candid", category: "Behind the Scenes", label: "Cast Huddle — Act II Prep" },
  { id: "m4", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop", alt: "Natural light portrait", category: "Headshots", label: "Natural Light Close-Up — Portfolio Update" },
  { id: "m5", src: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&h=400&fit=crop", alt: "Theatre stage", category: "Stage", label: "Macbeth — Opening Night" },
  { id: "m6", src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=600&fit=crop", alt: "Behind the scenes", category: "Behind the Scenes", label: "Lighting Check — Studio B" },
  { id: "m7", src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&h=800&fit=crop", alt: "Professional headshot", category: "Headshots", label: "Commercial Headshot — Corporate Reel" },
  { id: "m8", src: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=600&h=400&fit=crop", alt: "Stage wide shot", category: "Stage", label: "Ensemble Scene — Nalongo's Garden" },
]

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedImage, setSelectedImage] = useState(null)

  const filtered = activeCategory === "All" ? mediaItems : mediaItems.filter((m) => m.category === activeCategory)

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              activeCategory === cat
                ? "bg-asa-primary text-asa-background"
                : "bg-asa-background border border-asa-border text-asa-muted hover:text-asa-text hover:border-asa-primary/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-asa-surface rounded-xl border border-asa-border">
          <p className="text-asa-muted text-sm">No media in this category yet.</p>
          <p className="text-asa-muted/60 text-xs mt-1">Upload your first headshot or stage still below.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              onClick={() => setSelectedImage(selectedImage === item.id ? null : item.id)}
              className="group relative rounded-xl overflow-hidden bg-asa-surface border border-asa-border cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-asa-primary"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                />
              </div>
              {selectedImage === item.id && (
                <div className="absolute inset-0 bg-asa-background/80 backdrop-blur-sm flex items-center justify-center p-4">
                  <img src={item.src} alt={item.alt} className="max-h-full max-w-full rounded-lg shadow-2xl object-contain" />
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-asa-background/90 to-transparent p-3 pt-8">
                <p className="text-xs font-semibold text-asa-text">{item.label}</p>
                <span className="label-mono text-[8px]">{item.category}</span>
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  )
}
