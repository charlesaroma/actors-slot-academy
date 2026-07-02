import { Link } from "react-router-dom"

const variants = {
  primary:
    "bg-asa-primary text-asa-background hover:bg-asa-primary-bright shadow-sm hover:shadow-[0_0_24px_rgba(201,154,62,0.4)]",
  secondary:
    "bg-asa-surface text-asa-text hover:bg-asa-border border border-asa-border",
  outline:
    "border border-asa-primary text-asa-primary hover:bg-asa-primary hover:text-asa-background",
  ghost:
    "text-asa-primary hover:bg-asa-primary/10",
  danger:
    "bg-asa-accent text-asa-text hover:opacity-90",
}

const sizes = {
  sm: "px-4 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-wide transition-all duration-200 ease-out cursor-pointer hover:-translate-y-px active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-asa-primary focus-visible:ring-offset-2 focus-visible:ring-offset-asa-background disabled:pointer-events-none disabled:opacity-40"
  const cls = `${base} ${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.md} ${className}`

  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  }
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  )
}