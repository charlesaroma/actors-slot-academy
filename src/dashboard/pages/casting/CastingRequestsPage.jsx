import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, Calendar, User, FileText, Trash2, Check, ChevronDown, ChevronUp, Link as LinkIcon, CheckCheck, Search } from "lucide-react"
import { TALENTS } from "../../../data/talentDirectory"

const STORAGE_KEY = "asaCastingRequests"

function loadRequests() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
  } catch {
    return []
  }
}

export default function CastingRequestsPage() {
  const [requests, setRequests] = useState(loadRequests)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    const onStorage = () => setRequests(loadRequests())
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const clearAll = () => {
    localStorage.removeItem(STORAGE_KEY)
    setRequests([])
  }

  const removeRequest = (idx) => {
    const next = requests.filter((_, i) => i !== idx)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setRequests(next)
    if (expanded === idx) setExpanded(null)
  }

  const [shareModal, setShareModal] = useState(null)
  const [selectedShareTalentIds, setSelectedShareTalentIds] = useState([])
  const [talentSearch, setTalentSearch] = useState("")
  const [copiedToken, setCopiedToken] = useState(null)

  const openShareModal = (req, idx) => {
    setShareModal({ req, idx })
    setSelectedShareTalentIds(req.selectedTalentIds || [])
    setTalentSearch("")
  }

  const toggleShareTalent = (id) => {
    setSelectedShareTalentIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const generateShareLink = () => {
    if (!shareModal || selectedShareTalentIds.length === 0) return
    const token = crypto.randomUUID()
    const stored = JSON.parse(localStorage.getItem("asa-talent-share-tokens") || "{}")
    stored[token] = {
      talentIds: selectedShareTalentIds,
      directorName: shareModal.req.directorName,
      createdAt: new Date().toISOString(),
    }
    localStorage.setItem("asa-talent-share-tokens", JSON.stringify(stored))
    const url = `${window.location.origin}/talent-request/view/${token}`
    navigator.clipboard.writeText(url).catch(() => {})
    setCopiedToken(token)
    setTimeout(() => {
      setCopiedToken(null)
      setShareModal(null)
    }, 2000)
  }

  const talentList = TALENTS.filter((t) =>
    t.name.toLowerCase().includes(talentSearch.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-2xl font-bold text-asa-text">Casting Requests</h1>
          <p className="mt-1 text-sm text-asa-muted">
            Review all casting requests submitted via the public portal.
          </p>
        </div>
        {requests.length > 0 && (
          <button
            onClick={clearAll}
            className="inline-flex items-center gap-2 rounded-lg border border-asa-accent/30 px-4 py-2 text-sm font-semibold text-asa-accent transition-colors hover:bg-asa-accent/10 cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
            Clear All
          </button>
        )}
      </div>

      {requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-asa-border bg-asa-surface py-24">
          <FileText className="mb-4 h-10 w-10 text-asa-muted/50" />
          <p className="text-sm font-semibold text-asa-muted">No casting requests yet</p>
          <p className="mt-1 text-xs text-asa-muted/70">
            Requests will appear here once submitted through the Casting Portal.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req, idx) => {
            const isOpen = expanded === idx
            const talentCount = req.selectedIds?.size || req.selectedTalentIds?.length || 0

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="rounded-xl border border-asa-border bg-asa-surface overflow-hidden"
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-asa-primary/10">
                      <FileText className="h-5 w-5 text-asa-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-asa-text">
                        {req.directorName || "Unnamed"}
                      </p>
                      <p className="text-xs text-asa-muted">
                        {talentCount} talent{talentCount !== 1 ? "s" : ""} &middot;{" "}
                        {req.brief?.substring(0, 60)}
                        {(req.brief?.length || 0) > 60 ? "…" : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden text-xs text-asa-muted sm:inline">
                      {new Date(req.submittedAt).toLocaleDateString()}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-asa-muted" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-asa-muted" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-asa-border px-5 py-4 space-y-4">
                        {/* Director & Role */}
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="flex items-center gap-3 rounded-lg bg-asa-background/50 px-4 py-3">
                            <User className="h-4 w-4 text-asa-muted" />
                            <div>
                              <p className="text-[10px] font-semibold text-asa-muted uppercase tracking-wider">
                                Director
                              </p>
                              <p className="text-sm font-semibold text-asa-text">
                                {req.directorName}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 rounded-lg bg-asa-background/50 px-4 py-3">
                            <Calendar className="h-4 w-4 text-asa-muted" />
                            <div>
                              <p className="text-[10px] font-semibold text-asa-muted uppercase tracking-wider">
                                Submitted
                              </p>
                              <p className="text-sm font-semibold text-asa-text">
                                {new Date(req.submittedAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Brief */}
                        {req.brief && (
                          <div>
                            <p className="text-[10px] font-semibold text-asa-muted uppercase tracking-wider mb-1.5">
                              Casting Brief
                            </p>
                            <p className="text-sm leading-relaxed text-asa-muted">{req.brief}</p>
                          </div>
                        )}

                        {/* Selected Talents */}
                        <div>
                          <p className="text-[10px] font-semibold text-asa-muted uppercase tracking-wider mb-2">
                            Selected Talents
                          </p>
                          {req.talents && req.talents.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {req.talents.map((t, ti) => (
                                <span
                                  key={ti}
                                  className="inline-flex items-center gap-1.5 rounded-full border border-asa-border bg-asa-background px-3 py-1 text-xs font-semibold text-asa-text"
                                >
                                  <Check className="h-3 w-3 text-asa-primary" />
                                  {t.name || `Talent #${t.id}`}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-asa-muted/70">
                              Talent details not available
                            </p>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-2">
                          <button
                            onClick={() => openShareModal(req, idx)}
                            className="inline-flex items-center gap-2 rounded-lg border border-asa-border px-4 py-2 text-xs font-semibold text-asa-text transition-colors hover:bg-asa-primary/10 cursor-pointer"
                          >
                            <LinkIcon className="h-3.5 w-3.5" />
                            Generate Share Link
                          </button>
                          <button
                            onClick={() => removeRequest(idx)}
                            className="inline-flex items-center gap-2 rounded-lg border border-asa-accent/30 px-4 py-2 text-xs font-semibold text-asa-accent transition-colors hover:bg-asa-accent/10 cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      )}
      {/* Share Modal */}
      <AnimatePresence>
        {shareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShareModal(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="w-full max-w-lg rounded-2xl border border-asa-border bg-asa-surface p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-headline text-lg font-bold text-asa-text">
                  {copiedToken ? "Link Copied!" : "Generate Talent View Link"}
                </h2>
                <button
                  onClick={() => setShareModal(null)}
                  className="p-1.5 text-asa-muted hover:text-asa-text transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {copiedToken ? (
                <div className="flex flex-col items-center gap-3 py-8">
                  <CheckCheck className="h-10 w-10 text-emerald-400" />
                  <p className="text-sm text-asa-muted">
                    Link copied — share it with {shareModal.req.directorName}.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-xs text-asa-muted mb-4">
                    Select which talents this link should display. Only the checked talents will be visible.
                  </p>

                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-asa-muted" />
                    <input
                      type="text"
                      placeholder="Search talents..."
                      value={talentSearch}
                      onChange={(e) => setTalentSearch(e.target.value)}
                      className="w-full rounded-lg border border-asa-border bg-asa-background py-2 pl-9 pr-3 text-xs text-asa-text placeholder-asa-muted outline-none focus:border-asa-primary/50"
                    />
                  </div>

                  <div className="max-h-56 overflow-y-auto space-y-1 mb-4 rounded-lg border border-asa-border bg-asa-background p-2">
                    {talentList.length === 0 ? (
                      <p className="py-6 text-center text-xs text-asa-muted">No talents match.</p>
                    ) : (
                      talentList.map((t) => (
                        <label
                          key={t.id}
                          className="flex items-center gap-3 rounded-md px-3 py-2 text-xs text-asa-text hover:bg-asa-surface transition-colors cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedShareTalentIds.includes(t.id)}
                            onChange={() => toggleShareTalent(t.id)}
                            className="accent-asa-primary h-3.5 w-3.5"
                          />
                          {t.name}
                        </label>
                      ))
                    )}
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setShareModal(null)}
                      className="rounded-lg border border-asa-border px-4 py-2 text-xs font-semibold text-asa-muted hover:text-asa-text transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={generateShareLink}
                      disabled={selectedShareTalentIds.length === 0}
                      className="inline-flex items-center gap-2 rounded-lg bg-asa-primary px-4 py-2 text-xs font-semibold text-asa-background transition-all hover:bg-asa-primary-bright disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <LinkIcon className="h-3.5 w-3.5" />
                      Generate & Copy Link
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
