import { useState, useMemo } from "react"
import { motion } from "motion/react"
import { Search, SlidersHorizontal } from "lucide-react"
import { TALENTS } from "../../../data/talentDirectory"
import TalentCard from "../../../components/ui/TalentCard"
import SectionHeader from "../../../components/ui/SectionHeader"

const categories = ["All", ...new Set(TALENTS.map((t) => t.category))]
const categoryLabels = { Direction: "Director" }

export default function PublicDirectory() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    return TALENTS.filter((t) => {
      const matchCategory = activeCategory === "All" || t.category === activeCategory
      const matchSearch =
        !search ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))
      return matchCategory && matchSearch
    })
  }, [activeCategory, search])

  return (
    <section className="bg-asa-background py-28 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Directory"
          title="Our Talent Roster"
          description="Browse our curated roster of trained performers ready for castings, collaborations, and bookings."
          center
        />

        <div className="mt-12 space-y-4">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-asa-muted" />
            <input
              type="text"
              placeholder="Search by name or skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-asa-border bg-asa-surface py-2.5 pl-10 pr-4 text-sm text-asa-text placeholder:text-asa-muted/55 focus:border-asa-primary focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-asa-primary text-asa-background shadow-[0_0_12px_rgba(201,154,62,0.25)]"
                    : "bg-asa-background border border-asa-border text-asa-muted hover:bg-asa-border hover:text-asa-text"
                }`}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-16 text-center py-12 border border-dashed border-asa-border rounded-xl bg-asa-surface/50">
            <SlidersHorizontal className="mx-auto h-8 w-8 text-asa-muted/40" />
            <p className="mt-4 text-sm text-asa-muted">No talents match your search.</p>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((talent, i) => (
              <motion.div
                key={talent.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <TalentCard talent={talent} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
