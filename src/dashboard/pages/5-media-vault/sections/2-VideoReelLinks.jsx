import { Play, ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"
import Button from "../../../../components/ui/Button"

const reels = [
  {
    id: "r1",
    title: "Dramatic Monologue — The River & The Moon",
    duration: "2:34",
    status: "Approved",
    url: "#",
    thumbnail: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=400&h=250&fit=crop",
  },
  {
    id: "r2",
    title: "Comedic Scene — Market Day",
    duration: "1:48",
    status: "Pending Review",
    url: "#",
    thumbnail: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400&h=250&fit=crop",
  },
  {
    id: "r3",
    title: "Commercial Reel — Product Spot",
    duration: "0:45",
    status: "Approved",
    url: "#",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=250&fit=crop",
  },
]

export default function VideoReelLinks() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-headline text-lg font-bold text-asa-text">Showreels & Recordings</h3>
        <Button size="sm" variant="outline" href="#">Request Recording Session</Button>
      </div>

      {reels.length === 0 ? (
        <div className="text-center py-12 bg-asa-surface rounded-xl border border-asa-border">
          <Play className="h-8 w-8 text-asa-muted mx-auto mb-3" />
          <p className="text-sm text-asa-muted">No showreels uploaded yet.</p>
          <p className="text-xs text-asa-muted/60 mt-1">Book a studio session to record your first reel.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reels.map((reel) => (
            <Link
              key={reel.id}
              to={reel.url}
              className="group relative rounded-xl overflow-hidden bg-asa-surface border border-asa-border block focus:outline-none focus-visible:ring-2 focus-visible:ring-asa-primary"
            >
              <div className="aspect-video overflow-hidden relative">
                <img src={reel.thumbnail} alt={reel.title} className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-asa-background/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Play className="h-10 w-10 text-asa-text drop-shadow-lg" />
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-sm font-bold text-asa-text group-hover:text-asa-primary transition-colors">{reel.title}</h4>
                <div className="flex items-center justify-between mt-2">
                  <span className="label-mono text-[8px]">{reel.duration}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    reel.status === "Approved"
                      ? "bg-asa-success/10 text-asa-success"
                      : "bg-asa-primary/10 text-asa-primary"
                  }`}>
                    {reel.status}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-6 text-right">
        <Link to="#" className="text-xs font-bold text-asa-primary hover:text-asa-primary-bright inline-flex items-center gap-1.5">
          View All Recordings <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}
