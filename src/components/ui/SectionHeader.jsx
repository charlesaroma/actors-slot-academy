export default function SectionHeader({
  label,
  title,
  description,
  center = false,
  light = false,
  className = "",
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""} ${className}`}>
      {label && (
        <span className="label-mono inline-block text-asa-primary">
          {label}
        </span>
      )}
      {title && (
        <h2 className={`mt-3 font-headline text-3xl font-bold leading-tight sm:text-4xl ${
          light ? "text-asa-background" : "text-asa-text"
        }`}>
          {title}
        </h2>
      )}
      {description && (
        <p className="mt-4 text-base leading-relaxed text-asa-muted">
          {description}
        </p>
      )}
    </div>
  )
}
