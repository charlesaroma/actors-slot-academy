import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Search, Users, FileText, Send, CheckSquare } from "lucide-react"
import { TALENTS } from "../../../data/talentDirectory"
import TalentCard from "../../../components/ui/TalentCard"

const STORAGE_KEY = "asaCastingRequests"

const CATEGORIES = [
  "All",
  "Actor",
  "Host",
  "Dancer",
  "Musician",
  "Influencer",
  "Content Creator",
  "Voice Actor",
  "Film Crew",
  "Photo Crew",
]

export default function CastingPortalCall({ modalOpen, onClose, initialSelectedIds, onSelectionCleared }) {
  const [show, setShow] = useState(false)
  const [step, setStep] = useState(0)
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [brief, setBrief] = useState({ director: "", role: "", description: "", deadline: "", notes: "" })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (modalOpen) {
      setSelectedIds(new Set(initialSelectedIds || []))
      setShow(true)
    }
  }, [modalOpen])

  const openFromSection = () => {
    setSelectedIds(new Set())
    setShow(true)
  }

  const close = () => {
    setShow(false)
    setStep(0)
    setSearch("")
    setCategory("All")
    setBrief({ director: "", role: "", description: "", deadline: "", notes: "" })
    setSubmitted(false)
    onClose()
  }

  const filtered = TALENTS.filter((t) => {
    const m =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      (t.code && t.code.toLowerCase().includes(search.toLowerCase()))
    const c = category === "All" || t.category === category
    return m && c
  })

  const toggleSelect = (id) => {
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedIds(next)
  }

  const handleSubmit = () => {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
    const request = {
      id: `CRQ-${String(existing.length + 1).padStart(3, "0")}`,
      date: new Date().toISOString(),
      ...brief,
      selectedTalents: Array.from(selectedIds).map((id) => {
        const t = TALENTS.find((t) => t.id === id)
        return t ? { id, code: t.code } : { id, code: id }
      }),
      status: "Pending",
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify([request, ...existing]))
    setSubmitted(true)
    setTimeout(() => {
      onSelectionCleared?.()
      close()
    }, 1500)
  }

  const briefFields = [
    { key: "director", label: "Casting Director", type: "text", placeholder: "e.g. Jane Smith" },
    { key: "role", label: "Role / Project", type: "text", placeholder: "e.g. Lead Actor — 'Echoes'" },
    { key: "description", label: "Project Description", type: "textarea", placeholder: "Describe the role, project, and requirements…" },
    { key: "deadline", label: "Submission Deadline", type: "date" },
    { key: "notes", label: "Additional Notes", type: "textarea", placeholder: "Any special instructions or requests…" },
  ]

  return (
    <>
      {/* Section Card */}
      <div className="card-ticket p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-asa-primary/10">
              <Users className="h-7 w-7 text-asa-primary" />
            </div>
            <div>
              <h2 className="section-title">Casting Portal</h2>
              <p className="mt-1 max-w-lg text-sm text-asa-muted">
                Submit a casting call to talent scouts by selecting talents from the directory and
                specifying the role requirements.
              </p>
            </div>
          </div>
          <button onClick={openFromSection} className="btn-primary shrink-0">
            <FileText className="h-4 w-4" />
            Open Casting Portal
          </button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
            onClick={close}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
              className="relative flex max-h-[90vh] w-full max-w-4xl flex-col rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-asa-border px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-asa-primary/10">
                    <Users className="h-5 w-5 text-asa-primary" />
                  </div>
                  <div>
                    <h3 className="font-headline text-lg font-bold text-asa-text">
                      Casting Request
                    </h3>
                    <p className="text-xs text-asa-muted">Step {step + 1} of 3</p>
                  </div>
                </div>
                <button
                  onClick={close}
                  className="rounded-lg p-2 text-asa-muted transition-colors hover:bg-asa-border hover:text-asa-text"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Step Indicator */}
              <div className="flex gap-1.5 px-6 pt-4">
                {[0, 1, 2].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      s <= step ? "bg-asa-primary" : "bg-asa-border"
                    }`}
                  />
                ))}
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                      <Send className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h4 className="mt-4 text-lg font-bold text-asa-text">Request Submitted!</h4>
                    <p className="mt-1 text-sm text-asa-muted">
                      Your casting request has been sent for review.
                    </p>
                  </div>
                ) : step === 0 ? (
                  /* Select Talents */
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="search-bar min-w-[200px] flex-1">
                        <Search className="h-4 w-4 text-asa-muted" />
                        <input
                          type="text"
                          placeholder="Search talent or code..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="flex-1 bg-transparent text-sm text-asa-text outline-none placeholder:text-asa-muted"
                        />
                      </div>
                      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                        {CATEGORIES.map((c) => (
                          <button
                            key={c}
                            onClick={() => setCategory(c)}
                            className={`chip whitespace-nowrap ${
                              category === c
                                ? "bg-asa-primary text-white"
                                : "bg-asa-border text-asa-muted hover:text-asa-text"
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
                      {filtered.map((t) => (
                        <TalentCard
                          key={t.id}
                          talent={t}
                          selected={selectedIds.has(t.id)}
                          onToggle={toggleSelect}
                        />
                      ))}
                    </div>
                    {filtered.length === 0 && (
                      <p className="py-12 text-center text-sm text-asa-muted">
                        No talents match your search
                      </p>
                    )}
                  </div>
                ) : step === 1 ? (
                  /* Casting Brief */
                  <div className="mx-auto max-w-xl space-y-5 py-4">
                    {briefFields.map((f) => (
                      <div key={f.key}>
                        <label className="mb-1.5 block text-sm font-medium text-asa-text">
                          {f.label}
                        </label>
                        {f.type === "textarea" ? (
                          <textarea
                            value={brief[f.key]}
                            onChange={(e) => setBrief({ ...brief, [f.key]: e.target.value })}
                            placeholder={f.placeholder}
                            rows={4}
                            className="input-field resize-none"
                          />
                        ) : (
                          <input
                            type={f.type}
                            value={brief[f.key]}
                            onChange={(e) => setBrief({ ...brief, [f.key]: e.target.value })}
                            placeholder={f.placeholder}
                            className="input-field"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Review & Submit */
                  <div className="mx-auto max-w-xl space-y-6 py-4">
                    <div>
                      <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-asa-text">
                        Selected Talents ({selectedIds.size})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {Array.from(selectedIds).map((id) => {
                          const t = TALENTS.find((t) => t.id === id)
                          return t ? (
                            <span
                              key={id}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-asa-primary/5 px-3 py-1.5 text-xs font-medium text-asa-primary ring-1 ring-asa-primary/20"
                            >
                              <CheckSquare className="h-3 w-3" />
                              {t.code} — {t.name}
                            </span>
                          ) : null
                        })}
                      </div>
                    </div>
                    <div className="space-y-3 rounded-xl bg-asa-bg p-5">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-asa-text">
                        Casting Brief
                      </h4>
                      {[
                        { label: "Director", value: brief.director },
                        { label: "Role", value: brief.role },
                        { label: "Description", value: brief.description },
                        { label: "Deadline", value: brief.deadline },
                        { label: "Notes", value: brief.notes },
                      ].map(({ label, value }) => (
                        <div key={label} className="text-sm">
                          <span className="font-medium text-asa-muted">{label}:</span>{" "}
                          <span className="text-asa-text">{value || "—"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              {!submitted && (
                <div className="flex items-center justify-between border-t border-asa-border px-6 py-4">
                  <span className="text-xs text-asa-muted">
                    {step === 0 && `${selectedIds.size} selected`}
                    {step === 1 && "Fill in the casting brief details"}
                    {step === 2 && "Review before submitting"}
                  </span>
                  <div className="flex items-center gap-3">
                    {step > 0 && (
                      <button
                        onClick={() => setStep(step - 1)}
                        className="rounded-lg border border-asa-border px-4 py-2 text-sm font-medium text-asa-text transition-colors hover:bg-asa-border"
                      >
                        Back
                      </button>
                    )}
                    {step < 2 ? (
                      <button
                        onClick={() => setStep(step + 1)}
                        disabled={step === 0 && selectedIds.size === 0}
                        className="btn-primary disabled:pointer-events-none disabled:opacity-40"
                      >
                        Continue
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        disabled={!brief.director || !brief.role}
                        className="btn-primary disabled:pointer-events-none disabled:opacity-40"
                      >
                        <Send className="h-4 w-4" />
                        Submit Casting Request
                      </button>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
