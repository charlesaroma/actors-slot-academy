import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Link } from "react-router-dom"
import { Users, Image, CalendarRange, BookOpen, Vote, TrendingUp, UserPlus, Eye } from "lucide-react"
import { talentDirectory } from "../../../data/talentDirectory"
import { coursesData } from "../../../data/coursesData"
import { eventsData } from "../../../data/eventsData"

const statCards = [
  { label: "Total Talents", icon: Users, color: "bg-blue-500/10 text-blue-400", path: "/dashboard/talents" },
  { label: "Gallery Items", icon: Image, color: "bg-emerald-500/10 text-emerald-400", path: "/dashboard/gallery" },
  { label: "Upcoming Events", icon: CalendarRange, color: "bg-amber-500/10 text-amber-400", path: "/dashboard/events" },
  { label: "Active Programmes", icon: BookOpen, color: "bg-purple-500/10 text-purple-400", path: "/dashboard/programmes" },
]

export default function OverviewPage() {
  const [stats, setStats] = useState({ talents: 0, gallery: 0, events: 0, programmes: 0 })
  const [recentTalents, setRecentTalents] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])

  useEffect(() => {
    setStats({
      talents: talentDirectory.length,
      gallery: 28,
      events: eventsData.filter(e => e.status !== "completed").length,
      programmes: coursesData.length,
    })
    setRecentTalents(talentDirectory.slice(0, 4))
    setUpcomingEvents(eventsData.slice(0, 4))
  }, [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-headline text-2xl font-bold text-asa-text">Dashboard</h1>
        <p className="text-sm text-asa-muted mt-1">Welcome back, Admin. Here&apos;s what&apos;s happening at ASA.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((item) => {
          const count = stats[item.label.toLowerCase().includes("talents") ? "talents" :
                         item.label.toLowerCase().includes("gallery") ? "gallery" :
                         item.label.toLowerCase().includes("events") ? "events" : "programmes"]
          const Icon = item.icon
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                to={item.path}
                className="block rounded-xl border border-asa-border bg-asa-surface p-5 transition-all duration-200 hover:border-asa-primary/30 hover:shadow-[0_0_25px_rgba(201,154,62,0.08)]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-asa-text font-headline">{count}</p>
                    <p className="text-xs text-asa-muted mt-1 font-medium">{item.label}</p>
                  </div>
                  <div className={`rounded-lg p-3 ${item.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Middle Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Talents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-xl border border-asa-border bg-asa-surface p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-headline text-lg font-bold text-asa-text">Recent Talents</h2>
            <Link to="/dashboard/talents" className="flex items-center gap-1 text-xs font-semibold text-asa-primary hover:text-asa-primary-bright transition-colors">
              <Eye className="h-3.5 w-3.5" />
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentTalents.map((talent) => (
              <div key={talent.id} className="flex items-center gap-3 rounded-lg bg-asa-background p-3">
                <div className="h-10 w-10 shrink-0 rounded-full bg-asa-border overflow-hidden">
                  <img src={talent.image} alt={talent.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-asa-text truncate">{talent.name}</p>
                  <p className="text-xs text-asa-muted">{talent.category} · Age {talent.age}</p>
                </div>
                <span className="label-mono text-[10px] text-asa-primary">{talent.rating}/5</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-xl border border-asa-border bg-asa-surface p-6"
        >
          <h2 className="font-headline text-lg font-bold text-asa-text mb-5">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/dashboard/talents" className="flex flex-col items-center gap-2 rounded-lg border border-asa-border bg-asa-background p-4 text-center transition-all hover:border-asa-primary/30 hover:bg-asa-primary/5">
              <UserPlus className="h-5 w-5 text-asa-primary" />
              <span className="text-xs font-semibold text-asa-text">Add Talent</span>
            </Link>
            <Link to="/dashboard/events" className="flex flex-col items-center gap-2 rounded-lg border border-asa-border bg-asa-background p-4 text-center transition-all hover:border-asa-primary/30 hover:bg-asa-primary/5">
              <CalendarRange className="h-5 w-5 text-asa-primary" />
              <span className="text-xs font-semibold text-asa-text">New Event</span>
            </Link>
            <Link to="/dashboard/programmes" className="flex flex-col items-center gap-2 rounded-lg border border-asa-border bg-asa-background p-4 text-center transition-all hover:border-asa-primary/30 hover:bg-asa-primary/5">
              <BookOpen className="h-5 w-5 text-asa-primary" />
              <span className="text-xs font-semibold text-asa-text">New Programme</span>
            </Link>
            <Link to="/dashboard/voting" className="flex flex-col items-center gap-2 rounded-lg border border-asa-border bg-asa-background p-4 text-center transition-all hover:border-asa-primary/30 hover:bg-asa-primary/5">
              <Vote className="h-5 w-5 text-asa-primary" />
              <span className="text-xs font-semibold text-asa-text">Open Voting</span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Upcoming Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="rounded-xl border border-asa-border bg-asa-surface p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-headline text-lg font-bold text-asa-text">Upcoming Events</h2>
          <Link to="/dashboard/events" className="flex items-center gap-1 text-xs font-semibold text-asa-primary hover:text-asa-primary-bright transition-colors">
            <Eye className="h-3.5 w-3.5" />
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs text-asa-muted border-b border-asa-border">
                <th className="pb-3 font-semibold">Event</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {upcomingEvents.map((event) => (
                <tr key={event.id} className="border-b border-asa-border/50 last:border-0">
                  <td className="py-3 text-sm font-medium text-asa-text">{event.title}</td>
                  <td className="py-3 text-sm text-asa-muted">{event.date}</td>
                  <td className="py-3">
                    <span className={`label-mono text-[10px] px-2 py-0.5 rounded-full ${
                      event.status === "upcoming"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : event.status === "ongoing"
                        ? "bg-amber-500/10 text-amber-400"
                        : "bg-asa-border text-asa-muted"
                    }`}>
                      {event.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
