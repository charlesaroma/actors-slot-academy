import { motion } from "motion/react"
import { Calendar, MapPin, Clock } from "lucide-react"
import SectionHeader from "../../../components/ui/SectionHeader"

const events = [
  {
    title: "Open Mic Night",
    date: "July 18, 2026",
    time: "6:00 PM",
    location: "ASA Performance Hall, Kampala",
    type: "Showcase",
    desc: "Students and alumni take the stage for an evening of monologues, poetry, and short scenes.",
  },
  {
    title: "Industry Masterclass",
    date: "August 8, 2026",
    time: "10:00 AM",
    location: "Virtual / Zoom",
    type: "Workshop",
    desc: "A live session with a top Ugandan casting director on navigating auditions and building a career.",
  },
  {
    title: "End of Term Showcase",
    date: "September 5, 2026",
    time: "5:00 PM",
    location: "Uganda National Cultural Centre, Kampala",
    type: "Showcase",
    desc: "The Q3 2026 cohort presents their capstone performances to industry professionals and invited guests.",
  },
  {
    title: "Schools Outreach Day",
    date: "October 12, 2026",
    time: "9:00 AM",
    location: "Multiple Partner Schools",
    type: "Outreach",
    desc: "Our team visits partner schools for a day of drama workshops, career talks, and talent scouting.",
  },
]

const typeStyles = {
  Showcase: "bg-asa-secondary/10 text-asa-secondary",
  Workshop: "bg-blue-100 text-blue-700",
  Outreach: "bg-green-100 text-green-700",
}

export default function ActiveSchedules() {
  return (
    <section className="bg-asa-ivory py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Events"
          title="Upcoming Events & Schedules"
          description="Mark your calendar — from open mic nights to industry masterclasses."
          center
        />

        <div className="mt-16 space-y-6">
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col gap-4 rounded-2xl border border-asa-black/10 bg-asa-white p-6 sm:flex-row sm:items-center"
            >
              <div className="hidden shrink-0 text-center sm:block">
                <p className="font-headline text-2xl font-bold text-asa-secondary">
                  {event.date.split(" ")[1]}
                </p>
                <p className="text-xs font-medium uppercase text-asa-grey">
                  {event.date.split(" ")[0]}
                </p>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      typeStyles[event.type]
                    }`}
                  >
                    {event.type}
                  </span>
                  <h3 className="font-headline text-lg font-bold text-asa-black">
                    {event.title}
                  </h3>
                </div>
                <div className="mt-2 flex flex-wrap gap-4 text-xs text-asa-grey">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {event.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {event.time}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {event.location}
                  </span>
                </div>
                <p className="mt-2 text-sm text-asa-grey/80">{event.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
