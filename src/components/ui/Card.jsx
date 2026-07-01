const variants = {
  default: "bg-asa-white border border-asa-black/10",
  elevated: "bg-asa-white shadow-md border border-asa-black/5",
  bordered: "bg-transparent border-2 border-asa-black/10",
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
      className={`rounded-xl transition-all duration-200 ${
        padding ? "p-6" : ""
      } ${variants[variant]} ${
        hover
          ? "hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
