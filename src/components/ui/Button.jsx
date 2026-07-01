import { Link } from "react-router-dom"

const variants = {
  primary:
    "bg-asa-secondary text-white hover:bg-asa-secondary/90 shadow-sm",
  secondary:
    "bg-asa-black text-white hover:bg-asa-black/90 shadow-sm",
  outline:
    "border-2 border-asa-secondary text-asa-secondary hover:bg-asa-secondary hover:text-white",
  ghost: "text-asa-secondary hover:bg-asa-secondary/10",
}

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
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
    "inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-asa-secondary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`

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
