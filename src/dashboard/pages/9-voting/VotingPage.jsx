import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Plus, Search, Edit3, Trash2, X, Check, ToggleLeft, ToggleRight, Users, BarChart3, Link, CheckCheck } from "lucide-react"

const emptyCampaign = {
  id: "",
  title: "",
  description: "",
  candidates: [{ name: "" }],
  startDate: "",
  endDate: "",
  active: false,
  results: {},
}

export default function VotingPage() {
  const [campaigns, setCampaigns] = useState(() => {
    const saved = localStorage.getItem("asa-voting-campaigns")
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        return []
      }
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem("asa-voting-campaigns", JSON.stringify(campaigns))
  }, [campaigns])
  const [search, setSearch] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyCampaign)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [tab, setTab] = useState("campaigns")
  const [copiedLink, setCopiedLink] = useState(null)

  const votes = JSON.parse(localStorage.getItem("asa-votes") || "[]")

  const getVoteCounts = (campaignId) => {
    const campaignVotes = votes.filter((v) => v.campaignId === campaignId)
    const counts = {}
    campaignVotes.forEach((v) => {
      counts[v.candidate] = (counts[v.candidate] || 0) + 1
    })
    return { total: campaignVotes.length, counts }
  }

  const shareVoteLink = (campaignId) => {
    const url = `${window.location.origin}/vote/${campaignId}`
    navigator.clipboard.writeText(url)
    setCopiedLink(campaignId)
    setTimeout(() => setCopiedLink(null), 2500)
  }

  const filtered = campaigns.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  )

  const openCreate = () => {
    setForm({ ...emptyCampaign, id: String(Date.now()), candidates: [{ name: "" }] })
    setEditing(null)
    setModalOpen(true)
  }

  const openEdit = (campaign) => {
    setForm({ ...campaign, candidates: [...campaign.candidates] })
    setEditing(campaign.id)
    setModalOpen(true)
  }

  const save = () => {
    if (!form.title.trim()) return
    const validCandidates = form.candidates.filter((c) => c.name.trim())
    const payload = { ...form, candidates: validCandidates }
    if (editing) {
      setCampaigns(campaigns.map((c) => (c.id === editing ? payload : c)))
    } else {
      setCampaigns([payload, ...campaigns])
    }
    setModalOpen(false)
    setEditing(null)
  }

  const remove = (id) => {
    setCampaigns(campaigns.filter((c) => c.id !== id))
    setConfirmDelete(null)
  }

  const toggleActive = (id) => {
    setCampaigns(campaigns.map((c) => (c.id === id ? { ...c, active: !c.active } : c)))
  }

  const addCandidate = () => {
    setForm({ ...form, candidates: [...form.candidates, { name: "" }] })
  }

  const updateCandidate = (index, value) => {
    const updated = [...form.candidates]
    updated[index] = { name: value }
    setForm({ ...form, candidates: updated })
  }

  const removeCandidate = (index) => {
    setForm({ ...form, candidates: form.candidates.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-asa-border bg-asa-surface p-1 w-fit">
        <button
          onClick={() => setTab("campaigns")}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
            tab === "campaigns"
              ? "bg-asa-primary text-asa-background shadow-[0_0_12px_rgba(201,154,62,0.25)]"
              : "text-asa-muted hover:text-asa-text"
          }`}
        >
          <Users className="h-3.5 w-3.5" />
          Campaigns
        </button>
        <button
          onClick={() => setTab("results")}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
            tab === "results"
              ? "bg-asa-primary text-asa-background shadow-[0_0_12px_rgba(201,154,62,0.25)]"
              : "text-asa-muted hover:text-asa-text"
          }`}
        >
          <BarChart3 className="h-3.5 w-3.5" />
          Results
        </button>
      </div>

      {tab === "campaigns" && (
        <>
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="font-headline text-2xl font-bold text-asa-text">Voting Campaigns</h1>
              <p className="text-sm text-asa-muted mt-1">Create and manage audience voting for events.</p>
            </div>
            <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-lg bg-asa-primary px-5 py-2.5 text-sm font-semibold text-asa-background transition-all hover:bg-asa-primary-bright hover:shadow-[0_0_20px_rgba(201,154,62,0.35)] cursor-pointer">
              <Plus className="h-4 w-4" />
              New Campaign
            </button>
          </div>

          {/* Search */}
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-asa-muted" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-asa-border bg-asa-surface py-2.5 pl-10 pr-4 text-sm text-asa-text placeholder-asa-muted outline-none focus:border-asa-primary/50 transition-colors"
            />
          </div>

          {/* Campaigns */}
          {filtered.length === 0 && !search && (
            <div className="rounded-xl border border-dashed border-asa-border p-16 text-center">
              <Users className="h-10 w-10 mx-auto mb-4 text-asa-muted" />
              <h3 className="font-headline text-lg font-bold text-asa-text mb-1">No Campaigns Yet</h3>
              <p className="text-sm text-asa-muted mb-6">Create your first voting campaign to engage your audience.</p>
              <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-lg bg-asa-primary px-5 py-2.5 text-sm font-semibold text-asa-background hover:bg-asa-primary-bright transition-colors cursor-pointer">
                <Plus className="h-4 w-4" />
                Create Campaign
              </button>
            </div>
          )}

          {filtered.length > 0 && (
            <div className="space-y-3">
              {filtered.map((campaign) => (
                <motion.div
                  key={campaign.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-asa-border bg-asa-surface p-5"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-headline text-base font-bold text-asa-text">{campaign.title}</h3>
                      <span className={`label-mono text-[10px] px-2 py-0.5 rounded-full ${
                        campaign.active
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-asa-border text-asa-muted"
                      }`}>
                        {campaign.active ? "Active" : "Draft"}
                      </span>
                    </div>
                    {campaign.description && (
                      <p className="text-xs text-asa-muted line-clamp-1">{campaign.description}</p>
                    )}
                    <p className="text-xs text-asa-muted mt-1">
                      {campaign.candidates?.length || 0} candidate{(campaign.candidates?.length || 0) !== 1 ? "s" : ""}
                      {campaign.startDate && ` · ${campaign.startDate}`}
                      {campaign.endDate && ` → ${campaign.endDate}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => shareVoteLink(campaign.id)}
                      className="p-2 text-asa-muted hover:text-emerald-400 transition-colors cursor-pointer"
                      title="Copy public vote link"
                    >
                      {copiedLink === campaign.id ? <CheckCheck className="h-4 w-4 text-emerald-400" /> : <Link className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => toggleActive(campaign.id)}
                      className={`p-2 transition-colors cursor-pointer ${campaign.active ? "text-emerald-400" : "text-asa-muted hover:text-asa-text"}`}
                      title={campaign.active ? "Deactivate" : "Activate"}
                    >
                      {campaign.active ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                    </button>
                    <button onClick={() => openEdit(campaign)} className="p-2 text-asa-muted hover:text-asa-text transition-colors cursor-pointer" title="Edit">
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button onClick={() => setConfirmDelete(campaign.id)} className="p-2 text-asa-accent hover:text-red-400 transition-colors cursor-pointer" title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}

      {tab === "results" && (
        <div className="space-y-6">
          <div>
            <h2 className="font-headline text-xl font-bold text-asa-text">Vote Results</h2>
            <p className="text-sm text-asa-muted mt-1">View and analyze votes received per campaign.</p>
          </div>
          {campaigns.length === 0 ? (
            <div className="rounded-xl border border-dashed border-asa-border p-16 text-center">
              <BarChart3 className="mx-auto mb-4 h-10 w-10 text-asa-muted" />
              <h3 className="font-headline text-lg font-bold text-asa-text mb-1">No Data</h3>
              <p className="text-sm text-asa-muted">No campaigns created to show results.</p>
            </div>
          ) : (
            campaigns.map((campaign) => {
              const { total, counts } = getVoteCounts(campaign.id)
              return (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-asa-border bg-asa-surface p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-headline text-base font-bold text-asa-text">{campaign.title}</h3>
                    <span className="label-mono text-[10px] px-2 py-0.5 rounded-full bg-asa-bg text-asa-muted">
                      {total} vote{total !== 1 ? "s" : ""}
                    </span>
                  </div>
                  {total === 0 ? (
                    <p className="text-xs text-asa-muted py-4 text-center">No votes received yet.</p>
                  ) : (
                    <div className="space-y-2">
                      {campaign.candidates.map((candidate) => {
                        const count = counts[candidate.name] || 0
                        const pct = total > 0 ? Math.round((count / total) * 100) : 0
                        return (
                          <div key={candidate.name} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-semibold text-asa-text">{candidate.name}</span>
                              <span className="text-asa-muted">
                                {count} ({pct}%)
                              </span>
                            </div>
                            <div className="h-2 rounded-full bg-asa-bg overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="h-full rounded-full bg-asa-primary"
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </motion.div>
              )
            })
          )}
        </div>
      )}

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
                  {editing ? "Edit Campaign" : "New Campaign"}
                </h2>
                <button onClick={() => setModalOpen(false)} className="text-asa-muted hover:text-asa-text cursor-pointer">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="label-mono text-[10px] text-asa-muted mb-1 block">Title</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-lg border border-asa-border bg-asa-background px-3 py-2.5 text-sm text-asa-text outline-none focus:border-asa-primary/50" placeholder="Campaign title" />
                </div>
                <div>
                  <label className="label-mono text-[10px] text-asa-muted mb-1 block">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full rounded-lg border border-asa-border bg-asa-background px-3 py-2.5 text-sm text-asa-text outline-none focus:border-asa-primary/50 resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-mono text-[10px] text-asa-muted mb-1 block">Start Date</label>
                    <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="w-full rounded-lg border border-asa-border bg-asa-background px-3 py-2.5 text-sm text-asa-text outline-none focus:border-asa-primary/50" />
                  </div>
                  <div>
                    <label className="label-mono text-[10px] text-asa-muted mb-1 block">End Date</label>
                    <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="w-full rounded-lg border border-asa-border bg-asa-background px-3 py-2.5 text-sm text-asa-text outline-none focus:border-asa-primary/50" />
                  </div>
                </div>

                {/* Candidates */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="label-mono text-[10px] text-asa-muted">Candidates</label>
                    <button onClick={addCandidate} className="text-xs font-semibold text-asa-primary hover:text-asa-primary-bright transition-colors cursor-pointer">
                      + Add Candidate
                    </button>
                  </div>
                  <div className="space-y-2">
                    {form.candidates.map((candidate, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <input
                          value={candidate.name}
                          onChange={(e) => updateCandidate(i, e.target.value)}
                          className="flex-1 rounded-lg border border-asa-border bg-asa-background px-3 py-2 text-xs text-asa-text outline-none focus:border-asa-primary/50"
                          placeholder={`Candidate ${i + 1}`}
                        />
                        <button onClick={() => removeCandidate(i)} className="p-2 text-asa-accent hover:text-red-400 transition-colors cursor-pointer">
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
                  {editing ? "Save Changes" : "Create Campaign"}
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
              <h2 className="font-headline text-lg font-bold text-asa-text mb-2">Delete Campaign?</h2>
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
