import { motion } from "motion/react"
import { Calendar, Video, BookOpen, Clock, AlertCircle, ArrowRight, ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"
import Button from "../../../components/ui/Button"

export default function OverviewPage() {
  const stats = [
    { label: "Active Cohort Progress", value: "Week 12 of 16", icon: Clock },
    { label: "Showreels Recorded", value: "2 Clips", icon: Video },
    { label: "Monologues Selected", value: "3 Scripts", icon: BookOpen },
    { label: "Class Attendance", value: "95%", icon: Calendar },
  ]

  const upcomingClass = {
    title: "Screen Acting & Camera Techniques",
    time: "Saturdays, 9:00 AM – 4:00 PM",
    instructor: "Amina Nantongo",
    location: "Studio 2 (Main Stage)",
    deadline: "Showreel recordings start next week.",
  }

  const castingCalls = [
    {
      id: "cc-1",
      title: "Feature Film: 'Gulu Chronicles'",
      role: "Lead & Supporting (Ages 18-25)",
      deadline: "Closes in 2 days",
      urgency: true,
    },
    {
      id: "cc-2",
      title: "Commercial: 'MTN Uganda' Campaign",
      role: "Narrator & Dynamic Extras",
      deadline: "Closes in 5 days",
      urgency: false,
    },
  ]

  return (
    <div className="space-y-10">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-asa-border">
        <div>
          <span className="label-mono text-asa-primary text-[10px]">Student Dashboard</span>
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-asa-text mt-1.5">
            Welcome Back, Catherine
          </h1>
          <p className="text-sm text-asa-muted mt-1">
            Dry Season Cohort &middot; Screen & Stage Acting Specialty
          </p>
        </div>
        <Button to="/dashboard/profiles" variant="primary" size="md">
          Edit Casting Profile <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card-ticket p-6 flex items-center gap-5"
            >
              <div className="h-12 w-12 rounded-xl bg-asa-primary/10 border border-asa-primary/20 flex items-center justify-center text-asa-primary shrink-0">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="label-mono text-[9px] text-asa-muted">{stat.label}</p>
                <p className="text-xl font-headline font-bold text-asa-text mt-1">{stat.value}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Content Layout */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Upcoming Class & Academy Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-ticket p-8 bg-asa-surface border-asa-border">
            <h2 className="font-headline text-2xl font-bold text-asa-text flex items-center gap-3">
              <Calendar className="h-5 w-5 text-asa-primary" />
              Next Scheduled Performance Class
            </h2>
            <div className="mt-6 space-y-4">
              <div className="p-5 rounded-xl bg-asa-background border border-asa-border">
                <span className="label-mono text-asa-primary text-[10px]">Active Topic</span>
                <h3 className="text-lg font-bold text-asa-text mt-1">{upcomingClass.title}</h3>
                <div className="grid gap-2 sm:grid-cols-2 text-sm text-asa-muted mt-4 pt-4 border-t border-asa-border/40">
                  <p>Instructor: <strong className="text-asa-text">{upcomingClass.instructor}</strong></p>
                  <p>Location: <span className="text-asa-text">{upcomingClass.location}</span></p>
                  <p>Schedule: <span className="text-asa-text">{upcomingClass.time}</span></p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-asa-primary/5 border border-asa-primary/10 text-xs text-asa-muted">
                <AlertCircle className="h-5 w-5 text-asa-primary shrink-0" />
                <span>{upcomingClass.deadline} Make sure your monologues are memorized and camera-ready.</span>
              </div>
            </div>
          </div>

          {/* Monologue Lab Progress */}
          <div className="card-ticket p-8 bg-asa-surface border-asa-border">
            <h2 className="font-headline text-2xl font-bold text-asa-text flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-asa-primary" />
              Monologue Portfolio Progress
            </h2>
            <p className="text-xs text-asa-muted mt-1.5">Track your monologue certification status for final casting directory listing.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4 text-center">
              {[
                { step: "1. Selection", status: "Approved", current: true },
                { step: "2. Rehearsal", status: "Certified", current: true },
                { step: "3. Recording", status: "Recorded", current: true },
                { step: "4. Cast Ready", status: "Pending Review", current: false },
              ].map((item, idx) => (
                <div key={item.step} className={`p-4 rounded-xl border ${
                  item.current
                    ? "bg-asa-primary/5 border-asa-primary/30 text-asa-primary"
                    : "bg-asa-background border-asa-border text-asa-muted"
                }`}>
                  <p className="label-mono text-[8px]">{item.step}</p>
                  <p className="text-xs font-semibold mt-1.5">{item.status}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-right">
              <Link to="/dashboard/monologue-lab" className="text-xs font-bold text-asa-primary hover:text-asa-primary-bright inline-flex items-center gap-1.5">
                Go to Monologue Lab <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Casting Board & Announcements */}
        <div className="space-y-6">
          <div className="card-ticket p-8 bg-asa-surface border-asa-border">
            <h2 className="font-headline text-2xl font-bold text-asa-text flex items-center gap-3">
              Casting Board
            </h2>
            <p className="text-xs text-asa-muted mt-1">Direct auditions for verified student performers.</p>

            <div className="mt-6 space-y-4">
              {castingCalls.map((call) => (
                <div key={call.id} className="p-4 rounded-xl bg-asa-background border border-asa-border flex flex-col justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-asa-text">{call.title}</h4>
                    <p className="text-xs text-asa-muted mt-1">{call.role}</p>
                  </div>
                  <div className="flex justify-between items-center text-[10px] pt-3 border-t border-asa-border/40">
                    <span className={`font-semibold ${call.urgency ? "text-asa-accent" : "text-asa-primary"}`}>
                      {call.deadline}
                    </span>
                    <Link to="/dashboard/profiles" className="text-asa-primary hover:underline font-semibold">
                      Apply Portfolio
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}