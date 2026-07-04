import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "motion/react"
import {
  MapPin,
  Star,
  Languages,
  Trophy,
  ArrowLeft,
  EyeOff,
  Users,
} from "lucide-react"
import { TALENTS } from "../data/talentDirectory"

const SHARE_TOKENS_KEY = "asa-talent-share-tokens"

export default function TalentViewPage() {
  const { token } = useParams()
  const [talents, setTalents] = useState([])
  const [requestInfo, setRequestInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [invalid, setInvalid] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem(SHARE_TOKENS_KEY)
    if (raw) {
      try {
        const tokens = JSON.parse(raw)
        const entry = tokens.find((t) => t.token === token)
        if (entry) {
          const matching = TALENTS.filter((t) => entry.talentIds.includes(t.id))
          setTalents(matching)
          setRequestInfo({
            companyName: entry.companyName || "Client",
            directorName: entry.directorName || "Casting Director",
          })
        } else {
          setInvalid(true)
        }
      } catch {
        setInvalid(true)
      }
    } else {
      setInvalid(true)
    }
    setLoading(false)
  }, [token])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="loader" />
      </div>
    )
  }

  if (invalid) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <EyeOff className="mx-auto mb-4 h-12 w-12 text-asa-muted/50" />
        <h1 className="font-headline text-2xl font-bold text-asa-text">
          Invalid or Expired Link
        </h1>
        <p className="mt-2 text-sm text-asa-muted">
          This talent view link is not valid. Please contact the sender for a new link.
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

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-asa-primary/10">
            <Users className="h-7 w-7 text-asa-primary" />
          </div>
          <h1 className="font-headline text-2xl font-bold text-asa-text">
            Selected Talents
          </h1>
          {requestInfo && (
            <p className="mt-1 text-sm text-asa-muted">
              Curated for {requestInfo.companyName}
            </p>
          )}
        </div>

        {talents.length === 0 ? (
          <div className="rounded-xl border border-asa-border bg-asa-surface p-12 text-center">
            <p className="text-sm text-asa-muted">No talents in this selection yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {talents.map((talent, i) => (
              <motion.div
                key={talent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="group overflow-hidden rounded-2xl border border-asa-border bg-asa-surface transition-all hover:shadow-lg"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={talent.image}
                    alt={talent.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-3 p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-headline text-lg font-bold text-asa-text">
                        {talent.name}
                      </h3>
                      <p className="text-xs text-asa-muted">{talent.category}</p>
                    </div>
                    {talent.rating && (
                      <div className="flex items-center gap-1 rounded-lg bg-asa-bg px-2 py-1">
                        <Star className="h-3 w-3 fill-asa-primary text-asa-primary" />
                        <span className="text-xs font-bold text-asa-text">
                          {talent.rating}
                        </span>
                      </div>
                    )}
                  </div>

                  {talent.location && (
                    <p className="flex items-center gap-1.5 text-xs text-asa-muted">
                      <MapPin className="h-3 w-3" />
                      {talent.location}
                    </p>
                  )}

                  {talent.age && (
                    <p className="text-xs text-asa-muted">Age: {talent.age}</p>
                  )}

                  {talent.bio && (
                    <p className="text-xs leading-relaxed text-asa-muted line-clamp-2">
                      {talent.bio}
                    </p>
                  )}

                  {talent.skills && talent.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {talent.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1 rounded-full bg-asa-primary/10 px-2.5 py-0.5 text-[10px] font-medium text-asa-primary"
                        >
                          <Trophy className="h-2.5 w-2.5" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {talent.languages && talent.languages.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {talent.languages.map((lang) => (
                        <span
                          key={lang}
                          className="inline-flex items-center gap-1 rounded-full bg-asa-bg px-2.5 py-0.5 text-[10px] font-medium text-asa-muted"
                        >
                          <Languages className="h-2.5 w-2.5" />
                          {lang}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
