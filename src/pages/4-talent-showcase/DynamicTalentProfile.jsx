import { useParams, Link } from "react-router-dom"
import { motion } from "motion/react"
import { ArrowLeft, Star, MapPin, Play } from "lucide-react"
import { TALENTS } from "../../data/talentDirectory"
import Button from "../../components/ui/Button"

export default function DynamicTalentProfile() {
  const { id } = useParams()
  const talent = TALENTS.find((t) => t.id === id)

  if (!talent) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <h2 className="font-headline text-2xl font-bold text-asa-black">Talent Not Found</h2>
        <p className="text-asa-grey">No performer matches this profile.</p>
        <Button to="/talents" variant="outline">
          <ArrowLeft className="h-4 w-4" /> Back to Directory
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        to="/talents"
        className="mb-8 inline-flex items-center gap-1 text-sm text-asa-grey transition-colors hover:text-asa-secondary"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Directory
      </Link>

      <div className="grid gap-12 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <div className="aspect-[3/4] overflow-hidden rounded-2xl">
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
          className="lg:col-span-3"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-asa-secondary/10 px-3 py-0.5 text-xs font-medium text-asa-secondary">
              {talent.category}
            </span>
            <span className="inline-flex items-center gap-1 text-sm text-asa-grey">
              <MapPin className="h-3.5 w-3.5" />
              {talent.location}
            </span>
            <span className="inline-flex items-center gap-1 text-sm">
              <Star className="h-3.5 w-3.5 fill-asa-secondary text-asa-secondary" />
              {talent.rating}
            </span>
          </div>

          <h1 className="mt-4 font-headline text-3xl font-bold text-asa-black sm:text-4xl">
            {talent.name}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-asa-grey">
            {talent.bio}
          </p>

          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-asa-black">
              Skills
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {talent.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-asa-black/5 px-3 py-1 text-xs text-asa-grey"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg">Book {talent.name.split(" ")[0]}</Button>
            <Button variant="outline" size="lg">
              <Play className="h-4 w-4" /> Watch Showreel
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
          className="mt-16"
        >
          <h2 className="font-headline text-2xl font-bold text-asa-black">Media Gallery</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {talent.gallery.map((img, i) => (
              <div key={i} className="aspect-[4/5] overflow-hidden rounded-xl">
                <img
                  src={img}
                  alt={`${talent.name} gallery ${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
