import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "motion/react"
import { ArrowLeft, Star, MapPin, Play } from "lucide-react"
import { TALENTS } from "../../data/talentDirectory"
import Button from "../../components/ui/Button"
import ImageModal from "../../components/ui/ImageModal"

export default function DynamicTalentProfile() {
  const { id } = useParams()
  const talent = TALENTS.find((t) => t.id === id)
  const [modalImage, setModalImage] = useState(null)

  if (!talent) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 bg-asa-background">
        <h2 className="font-headline text-2xl font-bold text-asa-text">Talent Not Found</h2>
        <p className="text-asa-muted">No performer matches this profile.</p>
        <Button to="/talents" variant="outline">
          <ArrowLeft className="h-4 w-4" /> Back to Directory
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-asa-background min-h-screen py-24">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          to="/talents"
          className="mb-8 inline-flex items-center gap-2 text-sm text-asa-muted transition-colors hover:text-asa-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Directory
        </Link>

        <div className="grid gap-12 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-asa-border shadow-2xl">
              <img
                src={talent.image}
                alt={talent.name}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 flex flex-col justify-center"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-asa-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-asa-primary border border-asa-primary/20">
                {talent.category}
              </span>
              <span className="inline-flex items-center gap-1 text-sm text-asa-muted">
                <MapPin className="h-4 w-4 text-asa-primary" />
                {talent.location}
              </span>
              <span className="inline-flex items-center gap-1 text-sm text-asa-text font-medium">
                <Star className="h-4 w-4 fill-asa-primary text-asa-primary" />
                {talent.rating}
              </span>
            </div>

            <h1 className="mt-6 font-headline text-4xl font-bold text-asa-text sm:text-5xl">
              {talent.name}
            </h1>

            <p className="mt-6 text-base leading-relaxed text-asa-muted font-medium">
              {talent.bio}
            </p>

            <div className="mt-8">
              <h3 className="label-mono mb-3">
                Key Skills & Attributes
              </h3>
              <div className="flex flex-wrap gap-2">
                {talent.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-lg bg-asa-surface border border-asa-border px-3.5 py-1.5 text-xs text-asa-text font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="label-mono mb-3">
                Languages Spoken
              </h3>
              <div className="flex flex-wrap gap-2">
                {talent.languages.map((lang) => (
                  <span
                    key={lang}
                    className="rounded-lg bg-asa-surface border border-asa-border px-3.5 py-1.5 text-xs text-asa-text font-medium"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg">Book Performance Slot</Button>
              <Button variant="outline" size="lg">
                <Play className="h-4 w-4" /> Watch Audition Reel
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Gallery */}
        {talent.gallery && talent.gallery.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 border-t border-asa-border pt-16"
          >
            <h2 className="font-headline text-3xl font-bold text-asa-text">Media Portfolio</h2>
            <p className="mt-2 text-sm text-asa-muted mb-8">Professional editorial & headshot captures.</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {talent.gallery.map((img, i) => (
                <div
                  key={i}
                  className="aspect-[4/5] overflow-hidden rounded-xl border border-asa-border bg-asa-surface shadow-lg group cursor-zoom-in"
                  onClick={() => setModalImage(img)}
                >
                  <img
                    src={img}
                    alt={`${talent.name} portfolio ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg"
                    }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {modalImage && (
        <ImageModal
          src={modalImage}
          alt={`${talent.name} portfolio`}
          onClose={() => setModalImage(null)}
        />
      )}
    </div>
  )
}
