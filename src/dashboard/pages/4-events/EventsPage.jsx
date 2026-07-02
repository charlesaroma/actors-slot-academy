import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Plus, Search, Edit3, Trash2, X, Check, Eye } from "lucide-react"
import { eventsData as initialEvents } from "../../../data/eventsData"

const emptyEvent = {
  id: "",
  title: "",
  date: "",
  time: "",
  location: "",
  description: "",
  capacity: "",
  status: "upcoming",
}

export default function EventsPage() {
  const [events, setEvents] = useState(initialEvents)
  const [search, setSearch] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyEvent)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const filtered = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  )

  const openCreate = () => {
    setForm({ ...emptyEvent, id: String(Date.now()) })
    setEditing(null)
    setModalOpen(true)
  }

  const openEdit = (event) => {
    setForm({ ...event })
    setEditing(event.id)
    setModalOpen(true)
  }

  const save = () => {
    if (!form.title.trim()) return
    if (editing) {
      setEvents(events.map((e) => (e.id === editing ? form : e)))
    } else {
      setEvents([form, ...events])
    }
    setModalOpen(false)
    setEditing(null)
  }

  const remove = (id) => {
    setEvents(events.filter((e) => e.id !== id))
    setConfirmDelete(null)
  }

  const statusBadge = (status) => {
    const map = {
      upcoming: "bg-emerald-500/10 text-emerald-400",
      ongoing: "bg-amber-500/10 text-amber-400",
      completed: "bg-asa-border text-asa-muted",
    }
    return `label-mono text-[10px] px-2 py-0.5 rounded-full ${map[status] || map.upcoming}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-2xl font-bold text-asa-text">Events</h1>
          <p className="text-sm text-asa-muted mt-1">Manage all ASA events and workshops.</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-lg bg-asa-primary px-5 py-2.5 text-sm font-semibold text-asa-background transition-all hover:bg-asa-primary-bright hover:shadow-[0_0_20px_rgba(201,154,62,0.35)] cursor-pointer">
          <Plus className="h-4 w-4" />
          Add Event
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-asa-muted" />
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-asa-border bg-asa-surface py-2.5 pl-10 pr-4 text-sm text-asa-text placeholder-asa-muted outline-none focus:border-asa-primary/50 transition-colors"
        />
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((event) => (
          <motion.div
            key={event.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-asa-border bg-asa-surface p-5"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-headline text-base font-bold text-asa-text truncate">{event.title}</h3>
                <span className={statusBadge(event.status)}>{event.status}</span>
              </div>
              <p className="text-xs text-asa-muted">
                {event.date}{event.time ? ` · ${event.time}` : ""}{event.location ? ` · ${event.location}` : ""}
              </p>
              {event.description && (
                <p className="text-xs text-asa-muted mt-1 line-clamp-1">{event.description}</p>
              )}
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => openEdit(event)} className="p-2 text-asa-muted hover:text-asa-text transition-colors cursor-pointer" title="Edit">
                <Edit3 className="h-4 w-4" />
              </button>
              <button onClick={() => setConfirmDelete(event.id)} className="p-2 text-asa-accent hover:text-red-400 transition-colors cursor-pointer" title="Delete">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm text-asa-muted">No events found</p>
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
                  {editing ? "Edit Event" : "Add Event"}
                </h2>
                <button onClick={() => setModalOpen(false)} className="text-asa-muted hover:text-asa-text cursor-pointer">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="label-mono text-[10px] text-asa-muted mb-1 block">Title</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-lg border border-asa-border bg-asa-background px-3 py-2.5 text-sm text-asa-text outline-none focus:border-asa-primary/50" placeholder="Event title" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-mono text-[10px] text-asa-muted mb-1 block">Date</label>
                    <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full rounded-lg border border-asa-border bg-asa-background px-3 py-2.5 text-sm text-asa-text outline-none focus:border-asa-primary/50" />
                  </div>
                  <div>
                    <label className="label-mono text-[10px] text-asa-muted mb-1 block">Time</label>
                    <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="w-full rounded-lg border border-asa-border bg-asa-background px-3 py-2.5 text-sm text-asa-text outline-none focus:border-asa-primary/50" />
                  </div>
                </div>
                <div>
                  <label className="label-mono text-[10px] text-asa-muted mb-1 block">Location</label>
                  <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full rounded-lg border border-asa-border bg-asa-background px-3 py-2.5 text-sm text-asa-text outline-none focus:border-asa-primary/50" placeholder="Venue" />
                </div>
                <div>
                  <label className="label-mono text-[10px] text-asa-muted mb-1 block">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full rounded-lg border border-asa-border bg-asa-background px-3 py-2.5 text-sm text-asa-text outline-none focus:border-asa-primary/50 resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-mono text-[10px] text-asa-muted mb-1 block">Capacity</label>
                    <input type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} className="w-full rounded-lg border border-asa-border bg-asa-background px-3 py-2.5 text-sm text-asa-text outline-none focus:border-asa-primary/50" placeholder="0" />
                  </div>
                  <div>
                    <label className="label-mono text-[10px] text-asa-muted mb-1 block">Status</label>
                    <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full rounded-lg border border-asa-border bg-asa-background px-3 py-2.5 text-sm text-asa-text outline-none focus:border-asa-primary/50">
                      <option value="upcoming">Upcoming</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setModalOpen(false)} className="px-4 py-2.5 text-sm font-semibold text-asa-muted hover:text-asa-text transition-colors cursor-pointer">Cancel</button>
                <button onClick={save} className="inline-flex items-center gap-2 rounded-lg bg-asa-primary px-5 py-2.5 text-sm font-semibold text-asa-background hover:bg-asa-primary-bright transition-colors cursor-pointer">
                  <Check className="h-4 w-4" />
                  {editing ? "Save Changes" : "Create Event"}
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
              <h2 className="font-headline text-lg font-bold text-asa-text mb-2">Delete Event?</h2>
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
