import { Link } from "react-router-dom"
import { motion } from "motion/react"

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-headline text-8xl font-bold text-asa-primary"
        >
          404
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-xl text-asa-text"
        >
          Scene not found.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-sm text-asa-muted"
        >
          This page didn't make the final cut. Let's get you back to the main stage.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Link
            to="/"
            className="inline-block rounded-lg bg-asa-primary px-6 py-3 text-sm font-semibold text-asa-background transition-all duration-200 hover:bg-asa-primary-bright"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
