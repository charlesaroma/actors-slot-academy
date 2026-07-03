import { useState } from "react"
import PublicDirectory from "./sections/1-PublicDirectory"
import CastingPortalCall from "./sections/3-CastingPortalCall"
import PhotoshootConcept from "./sections/2-PhotoshootConcept"

export default function TalentPage() {
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [castingModalOpen, setCastingModalOpen] = useState(false)

  return (
    <div className="space-y-16">
      <PublicDirectory
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        onOpenCasting={() => setCastingModalOpen(true)}
      />
      <CastingPortalCall
        modalOpen={castingModalOpen}
        onClose={() => setCastingModalOpen(false)}
        initialSelectedIds={selectedIds}
        onSelectionCleared={() => setSelectedIds(new Set())}
      />
      <PhotoshootConcept />
    </div>
  )
}
