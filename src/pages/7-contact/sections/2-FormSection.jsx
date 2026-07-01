import { useState } from "react"
import { motion } from "motion/react"
import { Send, CheckCircle } from "lucide-react"
import Button from "../../../components/ui/Button"

const initial = { name: "", email: "", phone: "", subject: "", message: "" }

export default function FormSection() {
  const [form, setForm] = useState(initial)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="bg-asa-surface py-28 relative overflow-hidden">
        <div className="mx-auto max-w-xl px-4 text-center card-ticket p-10 md:p-14 glow-gold bg-asa-surface border-asa-border">
          <CheckCircle className="mx-auto h-14 w-14 text-asa-primary" />
          <h2 className="mt-5 font-headline text-3xl font-bold text-asa-text">
            Message Sent!
          </h2>
          <p className="mt-4 text-asa-muted leading-relaxed">
            Thank you for reaching out. We will read your message and get back to you within 48 hours.
          </p>
          <Button
            variant="outline"
            size="md"
            className="mt-8 w-full"
            onClick={() => {
              setForm(initial)
              setSubmitted(false)
            }}
          >
            Send Another Message
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-asa-surface py-28 relative overflow-hidden">
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-asa-border to-transparent" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card-ticket p-8 md:p-12 bg-asa-background border-asa-border"
        >
          <h2 className="font-headline text-3xl font-bold text-asa-text mb-8">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="label-mono mb-2 block text-xs">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-asa-border bg-asa-surface px-4 py-3 text-sm text-asa-text placeholder:text-asa-muted/50 focus:border-asa-primary focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="label-mono mb-2 block text-xs">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-asa-border bg-asa-surface px-4 py-3 text-sm text-asa-text placeholder:text-asa-muted/50 focus:border-asa-primary focus:outline-none transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="label-mono mb-2 block text-xs">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-asa-border bg-asa-surface px-4 py-3 text-sm text-asa-text placeholder:text-asa-muted/50 focus:border-asa-primary focus:outline-none transition-colors"
                  placeholder="+256 XXX XXX XXX"
                />
              </div>
              <div>
                <label className="label-mono mb-2 block text-xs">
                  Subject *
                </label>
                <select
                  name="subject"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-asa-border bg-asa-surface px-4 py-3 text-sm text-asa-text focus:border-asa-primary focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="" className="bg-asa-surface">Select a subject</option>
                  <option value="Programme Enquiry" className="bg-asa-surface">Programme Enquiry</option>
                  <option value="Partnership" className="bg-asa-surface">Partnership</option>
                  <option value="Media Submission" className="bg-asa-surface">Media Submission</option>
                  <option value="Casting Brief" className="bg-asa-surface">Casting Brief</option>
                  <option value="General" className="bg-asa-surface">General</option>
                </select>
              </div>
            </div>

            <div>
              <label className="label-mono mb-2 block text-xs">
                Message *
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full resize-y rounded-lg border border-asa-border bg-asa-surface px-4 py-3 text-sm text-asa-text placeholder:text-asa-muted/50 focus:border-asa-primary focus:outline-none transition-colors"
                placeholder="Tell us how we can help..."
              />
            </div>

            <Button type="submit" size="lg" className="w-full sm:w-auto inline-flex items-center justify-center gap-2">
              <Send className="h-4 w-4" /> Send Message
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
