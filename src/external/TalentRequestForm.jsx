import { useState } from "react"
import { motion } from "motion/react"
import { Send, CheckCircle, User, Building2, Mail, Users, FileText, Plus, X } from "lucide-react"
import { Link } from "react-router-dom"

const STORAGE_KEY = "asaCastingRequests"

const emptyFace = { gender: "", ageRange: "", look: "", notes: "" }

export default function TalentRequestForm() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    contactName: "",
    companyName: "",
    email: "",
    phone: "",
    brief: "",
    actorCount: 1,
    faces: [{ ...emptyFace }],
  })

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const updateFace = (index, field, value) => {
    const faces = [...form.faces]
    faces[index] = { ...faces[index], [field]: value }
    setForm((prev) => ({ ...prev, faces }))
  }

  const addFace = () => {
    setForm((prev) => ({
      ...prev,
      faces: [...prev.faces, { ...emptyFace }],
      actorCount: prev.actorCount + 1,
    }))
  }

  const removeFace = (index) => {
    if (form.faces.length <= 1) return
    const faces = form.faces.filter((_, i) => i !== index)
    setForm((prev) => ({ ...prev, faces, actorCount: faces.length }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.contactName.trim() || !form.brief.trim()) return

    const request = {
      id: `EXT-${String(Date.now()).slice(-6)}`,
      directorName: form.contactName,
      companyName: form.companyName,
      contactEmail: form.email,
      contactPhone: form.phone,
      brief: form.brief,
      actorCount: form.actorCount,
      faceDescriptions: form.faces,
      submittedAt: new Date().toISOString(),
      source: "external",
      status: "Pending",
      talents: [],
    }

    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
    localStorage.setItem(STORAGE_KEY, JSON.stringify([request, ...existing]))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.4 }}
        >
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-emerald-500" />
        </motion.div>
        <h1 className="font-headline text-2xl font-bold text-asa-text">Request Submitted!</h1>
        <p className="mt-2 text-sm text-asa-muted">
          Your talent request has been received. Our team will review it and reach out with
          selected talent profiles.
        </p>
        <Link
          to="/"
          className="btn-primary mt-8 inline-flex items-center gap-2"
        >
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-asa-primary/10">
            <Users className="h-7 w-7 text-asa-primary" />
          </div>
          <h1 className="font-headline text-2xl font-bold text-asa-text">
            Talent Request
          </h1>
          <p className="mt-2 text-sm text-asa-muted">
            Tell us what you need and we'll match you with the best talent.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-xl border border-asa-border bg-asa-surface p-5 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-asa-muted">
              Contact Information
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-asa-muted">
                  <User className="h-3.5 w-3.5" />
                  Your Name <span className="text-asa-accent">*</span>
                </label>
                <input
                  type="text"
                  value={form.contactName}
                  onChange={(e) => updateField("contactName", e.target.value)}
                  placeholder="e.g. John Doe"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-asa-muted">
                  <Building2 className="h-3.5 w-3.5" />
                  Company
                </label>
                <input
                  type="text"
                  value={form.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  placeholder="e.g. Spotlight Productions"
                  className="input-field"
                />
              </div>
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-asa-muted">
                  <Mail className="h-3.5 w-3.5" />
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="you@company.com"
                  className="input-field"
                />
              </div>
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-asa-muted">
                  <User className="h-3.5 w-3.5" />
                  Phone
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="+256 XXX XXX XXX"
                  className="input-field"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-asa-border bg-asa-surface p-5 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-asa-muted">
              Face Descriptions
            </p>
            <p className="text-xs text-asa-muted">
              Describe each actor/role you need. Add as many as required.
            </p>

            <div className="space-y-4">
              {form.faces.map((face, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-asa-border bg-asa-background/50 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-asa-text">
                      Role #{i + 1}
                    </span>
                    {form.faces.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFace(i)}
                        className="text-asa-accent hover:text-red-400 transition-colors cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-asa-muted">
                        Gender
                      </label>
                      <select
                        value={face.gender}
                        onChange={(e) => updateFace(i, "gender", e.target.value)}
                        className="input-field"
                      >
                        <option value="">Any</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-binary">Non-binary</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-asa-muted">
                        Age Range
                      </label>
                      <input
                        type="text"
                        value={face.ageRange}
                        onChange={(e) => updateFace(i, "ageRange", e.target.value)}
                        placeholder="e.g. 25–35"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-asa-muted">
                        Look / Type
                      </label>
                      <input
                        type="text"
                        value={face.look}
                        onChange={(e) => updateFace(i, "look", e.target.value)}
                        placeholder="e.g. Rugged, Elegant"
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-asa-muted">
                      Special Requirements
                    </label>
                    <input
                      type="text"
                      value={face.notes}
                      onChange={(e) => updateFace(i, "notes", e.target.value)}
                      placeholder="e.g. Speaks French, dance experience"
                      className="input-field"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addFace}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-asa-border py-3 text-xs font-semibold text-asa-muted transition-colors hover:border-asa-primary/30 hover:text-asa-primary cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Another Role
            </button>
          </div>

          <div className="rounded-xl border border-asa-border bg-asa-surface p-5 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-asa-muted">
              Casting Brief
            </p>
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-asa-muted">
                <FileText className="h-3.5 w-3.5" />
                Project Details <span className="text-asa-accent">*</span>
              </label>
              <textarea
                value={form.brief}
                onChange={(e) => updateField("brief", e.target.value)}
                placeholder="Describe your project, the roles, and any specific requirements…"
                rows={5}
                className="input-field resize-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!form.contactName.trim() || !form.brief.trim()}
            className="btn-primary w-full justify-center disabled:pointer-events-none disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
            Submit Request
          </button>
        </form>
      </motion.div>
    </div>
  )
}
