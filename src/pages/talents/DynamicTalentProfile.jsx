import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Star, MapPin, Camera, Music, Mic, Instagram, Globe } from "lucide-react"
import { TALENTS } from "../../data/talentDirectory"

const iconMap = {
  Actor: Camera,
  Host: Mic,
  Dancer: Music,
  Musician: Music,
  "Film Crew": Camera,
  "Photo Crew": Camera,
  Influencer: Instagram,
  "Content Creator": Globe,
  "Voice Actor": Mic,
}

export default function DynamicTalentProfile() {
  const { id } = useParams()
  const [talent, setTalent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const found = TALENTS.find((t) => t.id === id)
    if (found) {
      setTimeout(() => {
        setTalent(found)
        setLoading(false)
      }, 300)
    } else {
      setLoading(false)
    }
  }, [id])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="loader" />
      </div>
    )
  }

  if (!talent) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-asa-text">Talent Not Found</h2>
        <p className="mt-2 text-asa-muted">No talent matches this profile.</p>
        <Link to="/" className="btn-primary mt-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Directory
        </Link>
      </div>
    )
  }

  const Icon = iconMap[talent.category] || Star

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-12">
      {/* Back */}
      <Link
        to="/"
        className="inline-flex w-fit items-center gap-2 rounded-xl bg-asa-border px-4 py-2 text-sm font-medium text-asa-text transition-colors hover:bg-asa-border/70"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Directory
      </Link>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-ticket overflow-hidden md:flex"
      >
        <div className="aspect-[3/4] w-full md:w-80 shrink-0">
          <img
            src={talent.image || "/placeholder.svg"}
            alt={talent.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="font-headline text-3xl font-bold text-asa-text">
                    {talent.name}
                  </h1>
                  <span className="rounded-full bg-asa-primary/10 px-3 py-0.5 font-mono text-xs font-semibold text-asa-primary">
                    {talent.code}
                  </span>
                </div>
                <p className="mt-1.5 flex items-center gap-2 text-sm text-asa-muted">
                  <Icon className="h-4 w-4" />
                  {talent.category}
                </p>
              </div>
              {talent.rating && (
                <div className="flex items-center gap-1 rounded-xl bg-asa-bg px-3 py-2">
                  <Star className="h-4 w-4 fill-asa-primary text-asa-primary" />
                  <span className="text-sm font-bold text-asa-text">{talent.rating}</span>
                </div>
              )}
            </div>
            {talent.location && (
              <p className="flex items-center gap-1.5 text-sm text-asa-muted">
                <MapPin className="h-4 w-4" />
                {talent.location}
              </p>
            )}
            {talent.bio && (
              <p className="max-w-lg text-sm leading-relaxed text-asa-muted">{talent.bio}</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
