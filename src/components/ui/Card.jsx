const variants = {
  default:  "bg-asa-surface border border-asa-border",
  elevated: "bg-asa-surface shadow-lg shadow-black/30 border border-asa-border",
  bordered: "bg-transparent border border-asa-border",
  ticket:   "card-ticket",
}

export default function Card({
  children,
  variant = "default",
  padding = true,
  hover = false,
  className = "",
  ...props
}) {
  return (
    <div
      className={`rounded-xl transition-all duration-250 ${
        padding ? "p-6" : ""
      } ${variants[variant]} ${
        hover && variant !== "ticket"
          ? "hover:shadow-xl hover:shadow-black/40 hover:-translate-y-1 cursor-pointer"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
