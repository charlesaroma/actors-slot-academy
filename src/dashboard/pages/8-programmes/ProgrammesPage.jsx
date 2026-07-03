import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Plus, Search, Edit3, Trash2, X, Check, ChevronDown, ChevronUp } from "lucide-react"
import { PROGRAMMES as initialProgrammes } from "../../../data/coursesData"

const emptyProgramme = {
  id: "",
  title: "",
  subtitle: "",
  duration: "",
  description: "",
  modules: [],
}

export default function ProgrammesPage() {
  const [programmes, setProgrammes] = useState(
    initialProgrammes.map((p, i) => ({ ...p, id: String(p.id ?? i + 1) }))
  )
  const [search, setSearch] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyProgramme)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [expanded, setExpanded] = useState(null)

  const filtered = programmes.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  const openCreate = () => {
    setForm({ ...emptyProgramme, id: String(Date.now()) })
    setEditing(null)
    setModalOpen(true)
  }

  const openEdit = (prog) => {
    setForm({ ...prog, modules: [...prog.modules] })
    setEditing(prog.id)
    setModalOpen(true)
  }

  const save = () => {
    if (!form.title.trim()) return
    if (editing) {
      setProgrammes(programmes.map((p) => (p.id === editing ? form : p)))
    } else {
      setProgrammes([form, ...programmes])
    }
    setModalOpen(false)
    setEditing(null)
  }

  const remove = (id) => {
    setProgrammes(programmes.filter((p) => p.id !== id))
    setConfirmDelete(null)
  }

  const addModule = () => {
    setForm({ ...form, modules: [...form.modules, { name: "", description: "" }] })
  }

  const updateModule = (index, field, value) => {
    const updated = [...form.modules]
    updated[index] = { ...updated[index], [field]: value }
    setForm({ ...form, modules: updated })
  }

  const removeModule = (index) => {
    setForm({ ...form, modules: form.modules.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-2xl font-bold text-asa-text">Programmes</h1>
          <p className="text-sm text-asa-muted mt-1">Manage programme intakes and modules.</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-lg bg-asa-primary px-5 py-2.5 text-sm font-semibold text-asa-background transition-all hover:bg-asa-primary-bright hover:shadow-[0_0_20px_rgba(201,154,62,0.35)] cursor-pointer">
          <Plus className="h-4 w-4" />
          Add Programme
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-asa-muted" />
        <input
          type="text"
          placeholder="Search programmes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-asa-border bg-asa-surface py-2.5 pl-10 pr-4 text-sm text-asa-text placeholder-asa-muted outline-none focus:border-asa-primary/50 transition-colors"
        />
      </div>

      {/* Programme Cards */}
      <div className="space-y-3">
        {filtered.map((prog) => (
          <motion.div
            key={prog.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-asa-border bg-asa-surface overflow-hidden"
          >
            <div className="flex items-center justify-between p-5">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="font-headline text-base font-bold text-asa-text">{prog.title}</h3>
                  {prog.duration && (
                    <span className="label-mono text-[10px] text-asa-primary bg-asa-primary/10 px-2 py-0.5 rounded-full">
                      {prog.duration}
                    </span>
                  )}
                </div>
                {prog.subtitle && <p className="text-xs text-asa-muted mt-1">{prog.subtitle}</p>}
                <p className="text-xs text-asa-muted mt-1 line-clamp-1">{prog.description}</p>
                <p className="text-xs text-asa-muted mt-1">{prog.modules?.length || 0} module{(prog.modules?.length || 0) !== 1 ? "s" : ""}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0 ml-4">
                <button
                  onClick={() => setExpanded(expanded === prog.id ? null : prog.id)}
                  className="p-2 text-asa-muted hover:text-asa-text transition-colors cursor-pointer"
                  title={expanded === prog.id ? "Collapse" : "Expand"}
                >
                  {expanded === prog.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                <button onClick={() => openEdit(prog)} className="p-2 text-asa-muted hover:text-asa-text transition-colors cursor-pointer" title="Edit">
                  <Edit3 className="h-4 w-4" />
                </button>
                <button onClick={() => setConfirmDelete(prog.id)} className="p-2 text-asa-accent hover:text-red-400 transition-colors cursor-pointer" title="Delete">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Expandable modules */}
            <AnimatePresence>
              {expanded === prog.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-asa-border px-5 py-4 space-y-2">
                    {prog.modules?.length > 0 ? (
                      prog.modules.map((mod, i) => (
                        <div key={i} className="rounded-lg bg-asa-background p-3">
                          <p className="text-xs font-bold text-asa-text">{mod.name}</p>
                          {mod.description && <p className="text-[11px] text-asa-muted mt-0.5">{mod.description}</p>}
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-asa-muted">No modules configured</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm text-asa-muted">No programmes found</p>
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
              className="w-full max-w-lg rounded-xl border border-asa-border bg-asa-surface p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-headline text-lg font-bold text-asa-text">
                  {editing ? "Edit Programme" : "Add Programme"}
                </h2>
                <button onClick={() => setModalOpen(false)} className="text-asa-muted hover:text-asa-text cursor-pointer">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="label-mono text-[10px] text-asa-muted mb-1 block">Title</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-lg border border-asa-border bg-asa-background px-3 py-2.5 text-sm text-asa-text outline-none focus:border-asa-primary/50" placeholder="Programme title" />
                </div>
                <div>
                  <label className="label-mono text-[10px] text-asa-muted mb-1 block">Subtitle</label>
                  <input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="w-full rounded-lg border border-asa-border bg-asa-background px-3 py-2.5 text-sm text-asa-text outline-none focus:border-asa-primary/50" placeholder="Short subtitle" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-mono text-[10px] text-asa-muted mb-1 block">Duration</label>
                    <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="w-full rounded-lg border border-asa-border bg-asa-background px-3 py-2.5 text-sm text-asa-text outline-none focus:border-asa-primary/50" placeholder="e.g. 12 weeks" />
                  </div>
                </div>
                <div>
                  <label className="label-mono text-[10px] text-asa-muted mb-1 block">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full rounded-lg border border-asa-border bg-asa-background px-3 py-2.5 text-sm text-asa-text outline-none focus:border-asa-primary/50 resize-none" />
                </div>

                {/* Modules */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="label-mono text-[10px] text-asa-muted">Modules</label>
                    <button onClick={addModule} className="text-xs font-semibold text-asa-primary hover:text-asa-primary-bright transition-colors cursor-pointer">
                      + Add Module
                    </button>
                  </div>
                  <div className="space-y-2">
                    {form.modules.map((mod, i) => (
                      <div key={i} className="flex gap-2 items-start">
                        <div className="flex-1 space-y-1.5">
                          <input
                            value={mod.name}
                            onChange={(e) => updateModule(i, "name", e.target.value)}
                            className="w-full rounded-lg border border-asa-border bg-asa-background px-3 py-2 text-xs text-asa-text outline-none focus:border-asa-primary/50"
                            placeholder="Module name"
                          />
                          <input
                            value={mod.description || ""}
                            onChange={(e) => updateModule(i, "description", e.target.value)}
                            className="w-full rounded-lg border border-asa-border bg-asa-background px-3 py-2 text-xs text-asa-text outline-none focus:border-asa-primary/50"
                            placeholder="Brief description"
                          />
                        </div>
                        <button onClick={() => removeModule(i)} className="p-2 text-asa-accent hover:text-red-400 transition-colors mt-1 cursor-pointer">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setModalOpen(false)} className="px-4 py-2.5 text-sm font-semibold text-asa-muted hover:text-asa-text transition-colors cursor-pointer">Cancel</button>
                <button onClick={save} className="inline-flex items-center gap-2 rounded-lg bg-asa-primary px-5 py-2.5 text-sm font-semibold text-asa-background hover:bg-asa-primary-bright transition-colors cursor-pointer">
                  <Check className="h-4 w-4" />
                  {editing ? "Save Changes" : "Create Programme"}
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
              <h2 className="font-headline text-lg font-bold text-asa-text mb-2">Delete Programme?</h2>
              <p className="text-sm text-asa-muted mb-6">This cannot be undone.</p>
              <div className="flex justify-center gap-3">
                <button onClick={() => setConfirmDelete(null)} className="px-4 py-2.5 text-sm font-semibold text-asa-muted hover:text-asa-text transition-colors cursor-pointer">Cancel</button>
                <button onClick={() => remove(confirmDelete)} className="rounded-lg bg-asa-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition-colors cursor-pointer">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
