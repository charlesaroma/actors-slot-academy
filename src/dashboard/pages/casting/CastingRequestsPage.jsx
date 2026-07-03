import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, Calendar, User, FileText, Trash2, Check, ChevronDown, ChevronUp } from "lucide-react"
import { Link } from "react-router-dom"

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
    </div>
  )
}
