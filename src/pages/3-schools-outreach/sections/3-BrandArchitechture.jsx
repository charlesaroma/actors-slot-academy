import { motion } from "motion/react"
import { Building2, GraduationCap, Megaphone } from "lucide-react"
import { BRAND } from "../../../data/brandStrategy"
import SectionHeader from "../../../components/ui/SectionHeader"

const entities = [
  {
    name: BRAND.name,
    tagline: BRAND.tagline,
    icon: GraduationCap,
    desc: "The flagship performance training arm — equipping talent with stage and screen craft.",
  },
  {
    name: BRAND.sisterBrands[0],
    icon: Building2,
    desc: "A talent management agency connecting ASA graduates and industry professionals to global opportunities.",
  },
  {
    name: BRAND.sisterBrands[1],
    icon: Megaphone,
    desc: "A full production house bringing African stories to screen, from concept to distribution.",
  },
]

export default function BrandArchitechture() {
  return (
    <section className="bg-asa-background py-28 relative overflow-hidden">
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-asa-border to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Ecosystem"
          title="The Furaha Kreative Family"
          description="ASA works in concert with sister organisations under the Furaha Kreative Factory umbrella."
          center
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {entities.map((entity, i) => {
            const Icon = entity.icon
            return (
              <motion.div
                key={entity.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                className="card-ticket p-8 text-center"
              >
                <Icon className="mx-auto h-10 w-10 text-asa-primary" />
                <h3 className="mt-4 font-headline text-xl font-bold text-asa-text group-hover:text-asa-primary transition-colors duration-250">
                  {entity.name}
                </h3>
                {entity.tagline && (
                  <p className="mt-1 label-mono text-[9px] text-asa-muted">{entity.tagline}</p>
                )}
                <p className="mt-3 text-sm leading-relaxed text-asa-muted">
                  {entity.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
