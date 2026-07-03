import { motion } from "motion/react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-asa-background pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="label-mono text-asa-primary">Legal</span>
          <h1 className="mt-4 font-headline text-4xl font-bold tracking-tight text-asa-text sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-lg text-asa-muted">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 space-y-12 prose prose-invert max-w-none"
        >
          <section>
            <h2 className="font-headline text-2xl font-bold text-asa-text mb-4">1. Information We Collect</h2>
            <p className="text-asa-muted leading-relaxed">
              At Actor&apos;s Slot Academy (ASA), we collect information that you provide directly to us when you apply for our programmes, subscribe to our newsletter, or contact us. This may include your name, email address, phone number, headshots, and performance materials.
            </p>
          </section>
          
          <section>
            <h2 className="font-headline text-2xl font-bold text-asa-text mb-4">2. How We Use Your Information</h2>
            <p className="text-asa-muted leading-relaxed">
              We use the information we collect to review applications, communicate with you about our programmes and events, and improve our services. Your performance materials (such as showreels) will only be shared with industry professionals with your explicit consent.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-2xl font-bold text-asa-text mb-4">3. Data Security</h2>
            <p className="text-asa-muted leading-relaxed">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, or disclosure. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-2xl font-bold text-asa-text mb-4">4. Contact Us</h2>
            <p className="text-asa-muted leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at: <br/>
              <a href="mailto:info@actorsslotacademy.com" className="text-asa-primary hover:text-asa-primary-bright transition-colors">info@actorsslotacademy.com</a>
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  )
}
