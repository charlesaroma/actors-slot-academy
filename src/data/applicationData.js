const STORAGE_KEY = "asa_applications"

const seedApplications = [
  {
    id: "app-001",
    fullName: "Aisha Nakato",
    email: "aisha.nakato@example.com",
    phone: "+256-700-111-222",
    dateOfBirth: "2000-05-15",
    location: "Kampala, Uganda",
    experience: "2 years in community theatre with Kampala City Players",
    skills: "Voice projection, character improvisation, basic stage combat",
    whyJoin: "I want to turn my passion for storytelling into a professional acting career.",
    headshotUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    status: "pending",
    createdAt: "2026-03-01T10:00:00Z",
  },
  {
    id: "app-002",
    fullName: "Daniel Okello",
    email: "daniel.okello@example.com",
    phone: "+256-700-333-444",
    dateOfBirth: "1999-11-20",
    location: "Jinja, Uganda",
    experience: "Lead role in university drama festival 2025",
    skills: "Script analysis, accent work, physical theatre",
    whyJoin: "To refine my craft and connect with industry professionals.",
    headshotUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    status: "approved",
    createdAt: "2026-02-15T08:30:00Z",
  },
  {
    id: "app-003",
    fullName: "Grace Nambooze",
    email: "grace.n@example.com",
    phone: "+256-700-555-666",
    dateOfBirth: "2001-03-08",
    location: "Entebbe, Uganda",
    experience: "Voice-over artist for 3 local radio commercials",
    skills: "Voice acting, singing, improvisation",
    whyJoin: "I want to bridge my voice-over skills with on-camera acting.",
    headshotUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    status: "paid",
    createdAt: "2026-02-20T14:00:00Z",
  },
]

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedApplications))
  return seedApplications
}

function save(all) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
}

export function getApplications() {
  return load()
}

export function getApplication(id) {
  return load().find((a) => a.id === id) ?? null
}

export function createApplication(data) {
  const all = load()
  const app = {
    ...data,
    id: `app-${Date.now()}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  }
  all.unshift(app)
  save(all)
  return app
}

export function updateApplicationStatus(id, status) {
  const all = load()
  const idx = all.findIndex((a) => a.id === id)
  if (idx === -1) return null
  all[idx] = { ...all[idx], status }
  save(all)
  return all[idx]
}
