const variants = {
  default:  "bg-asa-surface border border-asa-border",
  elevated: "bg-asa-surface shadow-lg shadow-black/30 border border-asa-border",
  bordered: "bg-transparent border border-asa-border",
  ticket:   "card-ticket",
  // True admit-one stub: same card-ticket treatment plus punched
  // side notches. Pass `notchBg` (a hex or var) if the card sits on
  // a surface color other than --asa-surface, so the notches blend in.
  "ticket-perforated": "card-ticket card-ticket--perforated",
}

export default function Card({
  children,
  variant = "default",
  padding = true,
  hover = false,
  notchBg,
  className = "",
  style,
  ...props
}) {
  const isTicket = variant === "ticket" || variant === "ticket-perforated"
  return (
    <div
      className={`rounded-xl transition-all duration-250 ${
        padding ? "p-6" : ""
      } ${variants[variant]} ${
        hover && !isTicket
          ? "hover:shadow-xl hover:shadow-black/40 hover:-translate-y-1 cursor-pointer"
          : ""
      } ${className}`}
      style={notchBg ? { "--notch-bg": notchBg, ...style } : style}
      {...props}
    >
      {children}
    </div>
  )
}