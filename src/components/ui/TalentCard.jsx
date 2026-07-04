import { Link } from "react-router-dom"
import { Star, MapPin } from "lucide-react"

export default function TalentCard({ talent }) {
  return (
    <Link to={`/talents/${talent.id}`} className="block group cursor-pointer">
      <div className="card-ticket h-full overflow-hidden">
        {/* Portrait */}
        <div className="aspect-square overflow-hidden bg-asa-border">
          <img
            src={talent.image || "/placeholder.svg"}
            alt={talent.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Info */}
        <div className="space-y-1.5 p-5">
          <h3 className="font-headline text-lg font-bold text-asa-text group-hover:text-asa-primary transition-colors duration-200">
            {talent.name}
          </h3>
          <p className="text-sm text-asa-muted">{talent.category}</p>
          {talent.location && (
            <p className="flex items-center gap-1.5 text-xs text-asa-muted">
              <MapPin className="h-3 w-3 shrink-0" />
              {talent.location}
            </p>
          )}
          {talent.rating && (
            <div className="flex items-center gap-1 pt-1">
              <Star className="h-3.5 w-3.5 fill-asa-primary text-asa-primary" />
              <span className="text-xs font-medium text-asa-text">
                {talent.rating}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
