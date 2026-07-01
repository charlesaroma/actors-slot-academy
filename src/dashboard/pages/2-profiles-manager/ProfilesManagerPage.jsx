import { useState } from "react"
import { motion } from "motion/react"
import { Save, Plus, X, User, Languages, Award, BookOpen } from "lucide-react"
import Button from "../../../components/ui/Button"

export default function ProfilesManagerPage() {
  const [profile, setProfile] = useState({
    name: "Catherine Nantongo",
    age: "24",
    category: "Film & TV",
    location: "Kampala, Uganda",
    bio: "A fearless screen actor with a gift for raw, emotional storytelling. Catherine brings depth and vulnerability to every role, specializing in drama and historical epic projects.",
    skills: ["Method Acting", "Accents", "Stunts", "Improvisation"],
    languages: ["English", "Luganda", "Swahili"],
  })

  const [newSkill, setNewSkill] = useState("")
  const [newLang, setNewLang] = useState("")
  const [saved, setSaved] = useState(false)

  const handleTextChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const addSkill = () => {
    if (newSkill && !profile.skills.includes(newSkill)) {
      setProfile((prev) => ({ ...prev, skills: [...prev.skills, newSkill] }))
      setNewSkill("")
    }
  }

  const removeSkill = (skill) => {
    setProfile((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }))
  }

  const addLang = () => {
    if (newLang && !profile.languages.includes(newLang)) {
      setProfile((prev) => ({ ...prev, languages: [...prev.languages, newLang] }))
      setNewLang("")
    }
  }

  const removeLang = (lang) => {
    setProfile((prev) => ({ ...prev, languages: prev.languages.filter((l) => l !== lang) }))
  }

  return (
    <div className="space-y-10">
      {/* Title */}
      <div className="pb-6 border-b border-asa-border">
        <span className="label-mono text-asa-primary text-[10px]">Casting Portfolio Builder</span>
        <h1 className="font-headline text-3xl md:text-4xl font-bold text-asa-text mt-1.5">
          Edit Performer Profile
        </h1>
        <p className="text-sm text-asa-muted mt-1">
          Make changes to your public casting profile. All edits are updated to the directory immediately.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Live Card Preview */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="font-headline text-xl font-bold text-asa-text">Live Preview</h2>
          <div className="card-ticket overflow-hidden bg-asa-surface border-asa-border max-w-sm mx-auto shadow-xl">
            {/* Mock Image */}
            <div className="aspect-[3/4] bg-asa-border overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1530785602389-07594beb8b73?w=400&h=500&fit=crop"
                alt="Preview"
                className="h-full w-full object-cover"
              />
              <span className="absolute top-4 right-4 rounded-full bg-asa-primary text-asa-background text-[10px] font-bold px-2.5 py-0.5 tracking-wider uppercase">
                {profile.category}
              </span>
            </div>
            {/* Info */}
            <div className="p-5 space-y-2">
              <h3 className="font-headline text-xl font-bold text-asa-text">{profile.name || "Performer Name"}</h3>
              <p className="text-xs text-asa-muted">{profile.location || "Location"}</p>
              <p className="text-xs text-asa-muted/80 line-clamp-3 leading-relaxed mt-2 italic">
                {profile.bio || "No biography added yet."}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Edit Forms */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSave} className="card-ticket p-8 md:p-10 bg-asa-surface border-asa-border space-y-6">
            <h2 className="font-headline text-2xl font-bold text-asa-text mb-6">Profile Information</h2>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="label-mono mb-2 block text-[10px]">Full Professional Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={profile.name}
                  onChange={handleTextChange}
                  className="w-full rounded-lg border border-asa-border bg-asa-background px-4 py-3 text-sm text-asa-text focus:border-asa-primary focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="label-mono mb-2 block text-[10px]">Casting Category *</label>
                <select
                  name="category"
                  required
                  value={profile.category}
                  onChange={handleTextChange}
                  className="w-full rounded-lg border border-asa-border bg-asa-background px-4 py-3 text-sm text-asa-text focus:border-asa-primary focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="Film & TV">Film & TV</option>
                  <option value="Theatre">Theatre</option>
                  <option value="Voice Acting">Voice Acting</option>
                </select>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="label-mono mb-2 block text-[10px]">Age Range / Age *</label>
                <input
                  type="text"
                  name="age"
                  required
                  value={profile.age}
                  onChange={handleTextChange}
                  className="w-full rounded-lg border border-asa-border bg-asa-background px-4 py-3 text-sm text-asa-text focus:border-asa-primary focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="label-mono mb-2 block text-[10px]">Location *</label>
                <input
                  type="text"
                  name="location"
                  required
                  value={profile.location}
                  onChange={handleTextChange}
                  className="w-full rounded-lg border border-asa-border bg-asa-background px-4 py-3 text-sm text-asa-text focus:border-asa-primary focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="label-mono mb-2 block text-[10px]">Biographical Statement *</label>
              <textarea
                name="bio"
                required
                rows={4}
                value={profile.bio}
                onChange={handleTextChange}
                className="w-full resize-y rounded-lg border border-asa-border bg-asa-background px-4 py-3 text-sm text-asa-text focus:border-asa-primary focus:outline-none transition-colors"
              />
            </div>

            {/* Skills */}
            <div className="pt-4 border-t border-asa-border/40">
              <label className="label-mono mb-2 block text-[10px]">Skills & Technical Disciplines</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="e.g. Stage Combat, Dialect"
                  className="flex-1 rounded-lg border border-asa-border bg-asa-background px-4 py-2 text-sm text-asa-text focus:border-asa-primary focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-4 py-2 bg-asa-primary text-asa-background hover:bg-asa-primary-bright font-semibold rounded-lg text-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="h-4 w-4" /> Add
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 bg-asa-background border border-asa-border text-asa-text text-xs px-3 py-1 rounded-md"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-asa-accent hover:text-red-500 cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="pt-4 border-t border-asa-border/40">
              <label className="label-mono mb-2 block text-[10px]">Languages Spoken</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newLang}
                  onChange={(e) => setNewLang(e.target.value)}
                  placeholder="e.g. Luganda, Swahili"
                  className="flex-1 rounded-lg border border-asa-border bg-asa-background px-4 py-2 text-sm text-asa-text focus:border-asa-primary focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={addLang}
                  className="px-4 py-2 bg-asa-primary text-asa-background hover:bg-asa-primary-bright font-semibold rounded-lg text-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="h-4 w-4" /> Add
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {profile.languages.map((lang) => (
                  <span
                    key={lang}
                    className="inline-flex items-center gap-1 bg-asa-background border border-asa-border text-asa-text text-xs px-3 py-1 rounded-md"
                  >
                    {lang}
                    <button
                      type="button"
                      onClick={() => removeLang(lang)}
                      className="text-asa-accent hover:text-red-500 cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-asa-border/40 flex items-center justify-between">
              {saved ? (
                <span className="text-xs font-semibold text-asa-success">All portfolio changes saved!</span>
              ) : (
                <span className="text-xs text-asa-muted">Fields marked with * are required.</span>
              )}
              <Button type="submit" size="md" className="inline-flex items-center gap-2">
                <Save className="h-4 w-4" /> Save Profile Details
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}