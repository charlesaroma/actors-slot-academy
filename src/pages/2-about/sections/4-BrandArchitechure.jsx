import { motion } from "motion/react"
import { Building2, Film, Megaphone, GraduationCap } from "lucide-react"
import { BRAND } from "../../../data/brandStrategy"
import SectionHeader from "../../../components/ui/SectionHeader"

const sisterIcons = [GraduationCap, Building2, Megaphone]

export default function BrandArchitecture() {
  return (
    <section className="bg-asa-background py-28 relative overflow-hidden">
      {/* Top gradient rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-asa-primary/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Ecosystem"
          title={BRAND.parentBrand}
          description="ASA is part of a larger creative ecosystem dedicated to telling African stories across every medium."
          center
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-16 max-w-2xl card-ticket p-8 text-center"
        >
          <Film className="mx-auto h-10 w-10 text-asa-primary" />
          <h3 className="mt-4 font-headline text-2xl font-bold text-asa-text">
            {BRAND.name}
          </h3>
          <p className="mt-1 text-sm text-asa-muted">{BRAND.tagline}</p>
        </motion.div>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {BRAND.sisterBrands.map((name, i) => {
            const Icon = sisterIcons[i] || Building2
            return (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="card-ticket p-6 text-center"
              >
                <Icon className="mx-auto h-6 w-6 text-asa-primary" />
                <p className="mt-3 text-sm font-semibold text-asa-text">{name}</p>
              </motion.div>
            )
          })}
        </div>

        <p className="mx-auto mt-10 max-w-lg text-center text-xs text-asa-muted/70">
          Together, we form Furaha Kreative Factory — a full-service creative
          powerhouse built for the African century.
        </p>
      </div>
    </section>
  )
}
