import { motion } from "motion/react"
import { ArrowRight, Upload } from "lucide-react"
import Button from "../../../components/ui/Button"

export default function GalleryCTA() {
  return (
    <section className="bg-asa-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <Upload className="mx-auto h-10 w-10 text-asa-secondary" />
          <h2 className="mt-4 font-headline text-3xl font-bold text-asa-black sm:text-4xl">
            Share Your Moments
          </h2>
          <p className="mt-4 text-base leading-relaxed text-asa-grey">
            ASA students and alumni can submit their performance photos and videos
            for a chance to be featured in our official gallery.
          </p>
          <Button
            to="/contact"
            size="lg"
            className="mt-8 inline-flex items-center gap-2"
          >
            Submit Media <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
