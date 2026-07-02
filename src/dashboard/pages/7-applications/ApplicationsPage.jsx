import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Search, Check, X, DollarSign, Eye, ChevronDown, ChevronUp } from "lucide-react"
import { getApplications, updateApplicationStatus } from "../../../data/applicationData"

const statusStyles = {
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  rejected: "bg-red-500/10 text-red-400 border-red-500/20",
  paid: "bg-blue-500/10 text-blue-400 border-blue-500/20",
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([])
  const [search, setSearch] = useState("")
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    setApplications(getApplications())
  }, [])

  const filtered = applications.filter(
    (a) =>
      a.fullName.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase())
  )

  const handleStatus = (id, status) => {
    updateApplicationStatus(id, status)
    setApplications(getApplications())
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-headline text-2xl font-bold text-asa-text">Applications</h1>
        <p className="text-sm text-asa-muted mt-1">Review and manage student applications.</p>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-asa-muted" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-asa-border bg-asa-surface py-2.5 pl-10 pr-4 text-sm text-asa-text placeholder-asa-muted outline-none focus:border-asa-primary/50 transition-colors"
        />
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((app, i) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="rounded-xl border border-asa-border bg-asa-surface overflow-hidden"
          >
            <div className="flex items-center gap-4 p-5">
              <div className="h-12 w-12 shrink-0 rounded-full bg-asa-border overflow-hidden">
                {app.headshotUrl ? (
                  <img src={app.headshotUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-asa-muted font-bold text-lg">
                    {app.fullName.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-headline text-sm font-bold text-asa-text">{app.fullName}</h3>
                <p className="text-xs text-asa-muted truncate">{app.email} · {app.location}</p>
              </div>
              <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${statusStyles[app.status] || statusStyles.pending}`}>
                {app.status}
              </span>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => setExpanded(expanded === app.id ? null : app.id)}
                  className="p-2 text-asa-muted hover:text-asa-text transition-colors cursor-pointer"
                  title="View details"
                >
                  {expanded === app.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {app.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleStatus(app.id, "approved")}
                      className="p-2 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                      title="Approve"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleStatus(app.id, "rejected")}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                      title="Reject"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </>
                )}
                {app.status === "approved" && (
                  <button
                    onClick={() => handleStatus(app.id, "paid")}
                    className="p-2 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                    title="Mark as Paid"
                  >
                    <DollarSign className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Expanded details */}
            {expanded === app.id && (
              <div className="border-t border-asa-border px-5 py-4 space-y-3 text-sm">
                <DetailRow label="Phone" value={app.phone} />
                <DetailRow label="Date of Birth" value={app.dateOfBirth} />
                <DetailRow label="Experience" value={app.experience} />
                <DetailRow label="Skills" value={app.skills} />
                <div>
                  <span className="label-mono text-[10px] text-asa-muted block mb-1">Why Join</span>
                  <p className="text-asa-text">{app.whyJoin}</p>
                </div>
                <DetailRow label="Applied" value={new Date(app.createdAt).toLocaleDateString()} />
              </div>
            )}
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm text-asa-muted">No applications found</p>
          </div>
        )}
      </div>
    </div>
  )
}

function DetailRow({ label, value }) {
  return (
    <div>
      <span className="label-mono text-[10px] text-asa-muted block mb-0.5">{label}</span>
      <p className="text-asa-text">{value || "—"}</p>
    </div>
  )
}
