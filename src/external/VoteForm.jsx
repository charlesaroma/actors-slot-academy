import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "motion/react"
import { CheckCircle, ArrowLeft, Vote, User, Mail } from "lucide-react"

const VOTES_KEY = "asa-votes"
const CAMPAIGNS_KEY = "asa-voting-campaigns"

export default function VoteForm() {
  const { campaignId } = useParams()
  const [campaign, setCampaign] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(CAMPAIGNS_KEY)
    if (saved) {
      try {
        const campaigns = JSON.parse(saved)
        const found = campaigns.find((c) => c.id === campaignId)
        setCampaign(found || null)
      } catch {
        setCampaign(null)
      }
    }
    setLoading(false)
  }, [campaignId])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selected) return

    const vote = {
      campaignId,
      candidate: selected,
      name: name.trim() || null,
      email: email.trim() || null,
      timestamp: new Date().toISOString(),
    }

    const existing = JSON.parse(localStorage.getItem(VOTES_KEY) || "[]")
    localStorage.setItem(VOTES_KEY, JSON.stringify([vote, ...existing]))
    setSubmitted(true)
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="loader" />
      </div>
    )
  }

  if (!campaign) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <Vote className="mx-auto mb-4 h-12 w-12 text-asa-muted/50" />
        <h1 className="font-headline text-2xl font-bold text-asa-text">Voting Not Found</h1>
        <p className="mt-2 text-sm text-asa-muted">
          This voting link is invalid or the campaign has ended.
        </p>
        <Link
          to="/"
          className="btn-primary mt-6 inline-flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Home
        </Link>
      </div>
    )
  }

  if (!campaign.active) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <Vote className="mx-auto mb-4 h-12 w-12 text-asa-muted/50" />
        <h1 className="font-headline text-2xl font-bold text-asa-text">Voting Closed</h1>
        <p className="mt-2 text-sm text-asa-muted">
          This campaign is no longer accepting votes.
        </p>
        <Link
          to="/"
          className="btn-primary mt-6 inline-flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Home
        </Link>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.4 }}
        >
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-emerald-500" />
        </motion.div>
        <h1 className="font-headline text-2xl font-bold text-asa-text">Vote Submitted!</h1>
        <p className="mt-2 text-sm text-asa-muted">
          Thank you for casting your vote in "{campaign.title}".
        </p>
        <Link
          to="/"
          className="btn-primary mt-8 inline-flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-asa-primary/10">
            <Vote className="h-7 w-7 text-asa-primary" />
          </div>
          <h1 className="font-headline text-2xl font-bold text-asa-text">
            {campaign.title}
          </h1>
          {campaign.description && (
            <p className="mt-2 text-sm text-asa-muted">{campaign.description}</p>
          )}
          {campaign.endDate && (
            <p className="mt-1 text-xs text-asa-muted">
              Voting ends {new Date(campaign.endDate).toLocaleDateString()}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-asa-text">
              Select your candidate
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              {campaign.candidates.map((candidate, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setSelected(candidate.name)}
                  className={`rounded-xl border-2 p-4 text-left transition-all cursor-pointer ${
                    selected === candidate.name
                      ? "border-asa-primary bg-asa-primary/5 shadow-[0_0_15px_rgba(201,154,62,0.15)]"
                      : "border-asa-border bg-asa-surface hover:border-asa-primary/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors ${
                        selected === candidate.name
                          ? "border-asa-primary bg-asa-primary text-asa-background"
                          : "border-asa-border text-asa-muted"
                      }`}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span className="font-semibold text-asa-text">
                      {candidate.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-asa-border bg-asa-surface p-5 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-asa-muted">
              Your details <span className="font-normal normal-case">(optional)</span>
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-asa-muted">
                  <User className="h-3.5 w-3.5" />
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="input-field"
                />
              </div>
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-asa-muted">
                  <Mail className="h-3.5 w-3.5" />
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="input-field"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!selected}
            className="btn-primary w-full justify-center disabled:pointer-events-none disabled:opacity-40"
          >
            <CheckCircle className="h-4 w-4" />
            Submit Vote
          </button>
        </form>
      </motion.div>
    </div>
  )
}
