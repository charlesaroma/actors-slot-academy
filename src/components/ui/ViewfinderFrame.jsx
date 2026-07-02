/**
 * ViewfinderFrame
 * Corner brackets and a technical readout, framing whatever's inside
 * its `relative` parent like footage on a director's monitor. Use it
 * tight around a single "shot" (an image, a card) rather than an
 * entire section — that's what makes it read as intentional framing
 * instead of a decal.
 */
export default function ViewfinderFrame({
  takeLabel = "REC",
  rollLabel,
  size = 22,
  offset = 28,
  className = "",
}) {
  const corner = (vert, horiz) => ({
    position: "absolute",
    width: size,
    height: size,
    borderColor: "var(--asa-marquee)",
    opacity: 0.55,
    [vert]: offset,
    [horiz]: offset,
    borderTop: vert === "top" ? "1.5px solid" : undefined,
    borderBottom: vert === "bottom" ? "1.5px solid" : undefined,
    borderLeft: horiz === "left" ? "1.5px solid" : undefined,
    borderRight: horiz === "right" ? "1.5px solid" : undefined,
  })

  return (
    <div className={`pointer-events-none absolute inset-0 z-20 ${className}`}>
      <span style={corner("top", "left")} />
      <span style={corner("top", "right")} />
      <span style={corner("bottom", "left")} />
      <span style={corner("bottom", "right")} />

      <span
        className="label-mono absolute flex items-center gap-2 text-asa-primary/70"
        style={{ top: offset + 6, left: offset + 6 }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-asa-accent shadow-[0_0_6px_rgba(110,42,58,0.8)]" />
      </span>
      {rollLabel && (
        <span
          className="label-mono absolute text-asa-text/40"
          style={{ top: offset + 6, right: offset + 6 }}
        >
          {rollLabel}
        </span>
      )}
    </div>
  )
}