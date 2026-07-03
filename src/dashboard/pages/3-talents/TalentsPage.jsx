import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Plus, Search, Edit3, Trash2, Star, X, Check } from "lucide-react"
import { talentDirectory as initialTalents } from "../../../data/talentDirectory"

const emptyTalent = {
  id: "",
  name: "",
  age: "",
  category: "",
  image: "",
  rating: 3,
  bio: "",
}

export default function TalentsPage() {
  const [talents, setTalents] = useState(initialTalents.map((t, i) => ({ ...t, id: String(t.id ?? i + 1) })))
  const [search, setSearch] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyTalent)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const filtered = talents.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  )

  const openCreate = () => {
    setForm({ ...emptyTalent, id: String(Date.now()) })
    setEditing(null)
    setModalOpen(true)
  }

  const openEdit = (talent) => {
    setForm({ ...talent })
    setEditing(talent.id)
    setModalOpen(true)
  }

  const save = () => {
    if (!form.name.trim()) return
    if (editing) {
      setTalents(talents.map((t) => (t.id === editing ? form : t)))
    } else {
      setTalents([form, ...talents])
    }
    setModalOpen(false)
    setEditing(null)
  }

  const remove = (id) => {
    setTalents(talents.filter((t) => t.id !== id))
    setConfirmDelete(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-2xl font-bold text-asa-text">Talents</h1>
          <p className="text-sm text-asa-muted mt-1">Manage profiles for all registered talents.</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-lg bg-asa-primary px-5 py-2.5 text-sm font-semibold text-asa-background transition-all hover:bg-asa-primary-bright hover:shadow-[0_0_20px_rgba(201,154,62,0.35)] cursor-pointer">
          <Plus className="h-4 w-4" />
          Add Talent
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-asa-muted" />
        <input
          type="text"
          placeholder="Search talents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-asa-border bg-asa-surface py-2.5 pl-10 pr-4 text-sm text-asa-text placeholder-asa-muted outline-none focus:border-asa-primary/50 transition-colors"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-asa-border bg-asa-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-asa-border text-xs text-asa-muted bg-asa-background/50">
                <th className="px-5 py-4 font-semibold">Talent</th>
                <th className="px-5 py-4 font-semibold">Category</th>
                <th className="px-5 py-4 font-semibold">Age</th>
                <th className="px-5 py-4 font-semibold">Rating</th>
                <th className="px-5 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((talent) => (
                <tr key={talent.id} className="border-b border-asa-border/50 last:border-0 hover:bg-asa-background/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 rounded-full bg-asa-border overflow-hidden">
                        <img src={talent.image} alt={talent.name} className="h-full w-full object-cover" />
                      </div>
                      <span className="font-semibold text-asa-text">{talent.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-asa-muted">{talent.category}</td>
                  <td className="px-5 py-4 text-asa-muted">{talent.age}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-asa-primary text-asa-primary" />
                      <span className="text-sm font-medium text-asa-text">{talent.rating}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(talent)} className="p-2 text-asa-muted hover:text-asa-text transition-colors cursor-pointer" title="Edit">
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button onClick={() => setConfirmDelete(talent.id)} className="p-2 text-asa-accent hover:text-red-400 transition-colors cursor-pointer" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm text-asa-muted">No talents found</p>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-xl border border-asa-border bg-asa-surface p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-headline text-lg font-bold text-asa-text">
                  {editing ? "Edit Talent" : "Add Talent"}
                </h2>
                <button onClick={() => setModalOpen(false)} className="text-asa-muted hover:text-asa-text cursor-pointer">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-mono text-[10px] text-asa-muted mb-1 block">Name</label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-asa-border bg-asa-background px-3 py-2.5 text-sm text-asa-text outline-none focus:border-asa-primary/50" placeholder="Full name" />
                  </div>
                  <div>
                    <label className="label-mono text-[10px] text-asa-muted mb-1 block">Age</label>
                    <input value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} className="w-full rounded-lg border border-asa-border bg-asa-background px-3 py-2.5 text-sm text-asa-text outline-none focus:border-asa-primary/50" placeholder="Age" />
                  </div>
                </div>
                <div>
                  <label className="label-mono text-[10px] text-asa-muted mb-1 block">Category</label>
                  <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-lg border border-asa-border bg-asa-background px-3 py-2.5 text-sm text-asa-text outline-none focus:border-asa-primary/50" placeholder="e.g. Acting, Dance, Music" />
                </div>
                <div>
                  <label className="label-mono text-[10px] text-asa-muted mb-1 block">Image URL</label>
                  <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full rounded-lg border border-asa-border bg-asa-background px-3 py-2.5 text-sm text-asa-text outline-none focus:border-asa-primary/50" placeholder="https://..." />
                </div>
                <div>
                  <label className="label-mono text-[10px] text-asa-muted mb-1 block">Bio</label>
                  <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} className="w-full rounded-lg border border-asa-border bg-asa-background px-3 py-2.5 text-sm text-asa-text outline-none focus:border-asa-primary/50 resize-none" placeholder="Brief bio..." />
                </div>
                <div className="flex items-center gap-2">
                  <label className="label-mono text-[10px] text-asa-muted">Rating</label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} onClick={() => setForm({ ...form, rating: n })} className="cursor-pointer">
                        <Star className={`h-4 w-4 ${n <= form.rating ? "fill-asa-primary text-asa-primary" : "text-asa-border"}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setModalOpen(false)} className="px-4 py-2.5 text-sm font-semibold text-asa-muted hover:text-asa-text transition-colors cursor-pointer">
                  Cancel
                </button>
                <button onClick={save} className="inline-flex items-center gap-2 rounded-lg bg-asa-primary px-5 py-2.5 text-sm font-semibold text-asa-background hover:bg-asa-primary-bright transition-colors cursor-pointer">
                  <Check className="h-4 w-4" />
                  {editing ? "Save Changes" : "Create Talent"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={() => setConfirmDelete(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-xl border border-asa-border bg-asa-surface p-6 text-center"
            >
              <Trash2 className="h-8 w-8 mx-auto text-asa-accent mb-3" />
              <h2 className="font-headline text-lg font-bold text-asa-text mb-2">Delete Talent?</h2>
              <p className="text-sm text-asa-muted mb-6">This action cannot be undone.</p>
              <div className="flex justify-center gap-3">
                <button onClick={() => setConfirmDelete(null)} className="px-4 py-2.5 text-sm font-semibold text-asa-muted hover:text-asa-text transition-colors cursor-pointer">
                  Cancel
                </button>
                <button onClick={() => remove(confirmDelete)} className="rounded-lg bg-asa-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition-colors cursor-pointer">
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
