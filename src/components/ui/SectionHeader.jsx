export default function SectionHeader({
  label,
  title,
  description,
  center = false,
  className = "",
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""} ${className}`}>
      {label && (
        <span className="inline-block rounded-full bg-asa-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-asa-secondary">
          {label}
        </span>
      )}
      {title && (
        <h2 className="mt-3 font-headline text-3xl font-bold leading-tight text-asa-black sm:text-4xl">
          {title}
        </h2>
      )}
      {description && (
        <p className="mt-3 text-base leading-relaxed text-asa-grey">
          {description}
        </p>
      )}
    </div>
  )
}
