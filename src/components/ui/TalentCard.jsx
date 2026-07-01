import { Link } from "react-router-dom"
import { Star, MapPin } from "lucide-react"
import Card from "./Card"

export default function TalentCard({ talent }) {
  return (
    <Link to={`/talents/${talent.id}`}>
      <Card hover padding={false} className="group h-full overflow-hidden">
        <div className="aspect-[3/4] overflow-hidden bg-asa-black/5">
          <img
            src={talent.image || "/placeholder.svg"}
            alt={talent.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="space-y-1.5 p-4">
          <h3 className="font-headline text-lg font-bold text-asa-black">
            {talent.name}
          </h3>
          <p className="text-sm text-asa-grey">{talent.category}</p>
          {talent.location && (
            <p className="flex items-center gap-1 text-xs text-asa-grey">
              <MapPin className="h-3 w-3" />
              {talent.location}
            </p>
          )}
          {talent.rating && (
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-asa-tertiary text-asa-tertiary" />
              <span className="text-xs font-medium text-asa-black">
                {talent.rating}
              </span>
            </div>
          )}
        </div>
      </Card>
    </Link>
  )
}
