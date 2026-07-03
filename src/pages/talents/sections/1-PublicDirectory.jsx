import { useState, useEffect } from "react"
import { Search, Filter, X, CheckSquare } from "lucide-react"
import { TALENTS } from "../../../data/talentDirectory"
import TalentCard from "../../../components/ui/TalentCard"

const CATEGORIES = ["All", "Actor", "Host", "Dancer", "Musician", "Influencer", "Content Creator", "Voice Actor", "Film Crew", "Photo Crew"]

export default function PublicDirectory({ selectedIds, setSelectedIds, onOpenCasting }) {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const filtered = TALENTS.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      (t.code && t.code.toLowerCase().includes(search.toLowerCase()))
    const matchesCategory = activeCategory === "All" || t.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const toggleSelect = (id) => {
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedIds(next)
  }

  return (
    <section id="public-directory" className="space-y-6 scroll-mt-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="section-title">Public Directory</h2>
          <p className="mt-1 text-sm text-asa-muted">
            Browse and select talent for casting opportunities
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="search-bar min-w-[240px] flex-1">
          <Search className="h-4 w-4 text-asa-muted" />
          <input
            type="text"
            placeholder="Search talent or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-asa-text outline-none placeholder:text-asa-muted"
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-asa-muted hover:text-asa-text">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <Filter className="h-4 w-4 shrink-0 text-asa-muted" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`chip whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? "bg-asa-primary text-white"
                  : "bg-asa-border text-asa-muted hover:text-asa-text"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div
        className={`transition-all duration-500 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((talent) => (
            <TalentCard
              key={talent.id}
              talent={talent}
              selected={selectedIds.has(talent.id)}
              onToggle={toggleSelect}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="py-16 text-center text-asa-muted">No talents found</p>
        )}
      </div>

      {/* Floating Selection Bar */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-[slideUp_0.3s_ease-out]">
          <div className="flex items-center gap-4 rounded-2xl bg-asa-text px-6 py-4 shadow-xl">
            <span className="whitespace-nowrap text-sm font-medium text-white">
              <CheckSquare className="mr-2 inline-block h-4 w-4" />
              {selectedIds.size} talent{selectedIds.size > 1 ? "s" : ""} selected
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenCasting}
                className="rounded-lg bg-asa-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-asa-primary/90"
              >
                Submit Casting Request
              </button>
              <button
                onClick={() => setSelectedIds(new Set())}
                className="rounded-lg bg-white/10 px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/20"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
