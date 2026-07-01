import { useState, useMemo } from "react"
import { motion } from "motion/react"
import { Search, SlidersHorizontal } from "lucide-react"
import { TALENTS } from "../../../data/talentDirectory"
import TalentCard from "../../../components/ui/TalentCard"
import SectionHeader from "../../../components/ui/SectionHeader"

const categories = ["All", ...new Set(TALENTS.map((t) => t.category))]

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
    <section className="bg-asa-ivory py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Directory"
          title="Our Talent Roster"
          description="Browse our curated roster of trained performers ready for castings, collaborations, and bookings."
          center
        />

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-asa-grey" />
            <input
              type="text"
              placeholder="Search by name or skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-asa-black/10 bg-asa-white py-2.5 pl-10 pr-4 text-sm text-asa-black placeholder:text-asa-grey/60 focus:border-asa-secondary focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-asa-secondary text-white"
                    : "bg-asa-white text-asa-grey hover:bg-asa-secondary/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-16 text-center">
            <SlidersHorizontal className="mx-auto h-8 w-8 text-asa-grey/40" />
            <p className="mt-4 text-sm text-asa-grey">No talents match your search.</p>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((talent, i) => (
              <motion.div
                key={talent.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
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
