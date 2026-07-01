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
      <section className="bg-asa-ivory py-24">
        <div className="mx-auto max-w-xl px-4 text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-600" />
          <h2 className="mt-4 font-headline text-2xl font-bold text-asa-black">
            Message Sent!
          </h2>
          <p className="mt-2 text-asa-grey">
            Thank you for reaching out. We'll get back to you within 48 hours.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-6"
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
    <section className="bg-asa-ivory py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <h2 className="font-headline text-2xl font-bold text-asa-black">
            Send Us a Message
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-asa-black">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-asa-black/10 bg-asa-white px-4 py-2.5 text-sm text-asa-black placeholder:text-asa-grey/60 focus:border-asa-secondary focus:outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-asa-black">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-asa-black/10 bg-asa-white px-4 py-2.5 text-sm text-asa-black placeholder:text-asa-grey/60 focus:border-asa-secondary focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-asa-black">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-asa-black/10 bg-asa-white px-4 py-2.5 text-sm text-asa-black placeholder:text-asa-grey/60 focus:border-asa-secondary focus:outline-none"
                placeholder="+256 XXX XXX XXX"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-asa-black">
                Subject *
              </label>
              <select
                name="subject"
                required
                value={form.subject}
                onChange={handleChange}
                className="w-full rounded-xl border border-asa-black/10 bg-asa-white px-4 py-2.5 text-sm text-asa-black focus:border-asa-secondary focus:outline-none"
              >
                <option value="">Select a subject</option>
                <option value="Programme Enquiry">Programme Enquiry</option>
                <option value="Partnership">Partnership</option>
                <option value="Media Submission">Media Submission</option>
                <option value="Casting Brief">Casting Brief</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-asa-black">
              Message *
            </label>
            <textarea
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="w-full resize-y rounded-xl border border-asa-black/10 bg-asa-white px-4 py-2.5 text-sm text-asa-black placeholder:text-asa-grey/60 focus:border-asa-secondary focus:outline-none"
              placeholder="Tell us how we can help..."
            />
          </div>

          <Button type="submit" size="lg" className="inline-flex items-center gap-2">
            <Send className="h-4 w-4" /> Send Message
          </Button>
        </motion.form>
      </div>
    </section>
  )
}
