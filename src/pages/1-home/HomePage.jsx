import Hero from "./sections/1-Hero"
import CorePillars from "./sections/2-CorePillars"
import TalentSpotlight from "./sections/3-TalentSpotlight"
import ScriptPreview from "./sections/4-ScriptPreview"
import TargetAudience from "./sections/5-TargetAudience"
import UpcomingIntakes from "./sections/6-UpcomingIntakes"

export default function HomePage() {
  return (
    <>
      <Hero />
      <CorePillars />
      <TalentSpotlight />
      <ScriptPreview />
      <TargetAudience />
      <UpcomingIntakes />
    </>
  )
}
