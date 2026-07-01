import { useField } from "formik"

export default function Input({ label, name, helperText, ...props }) {
  const [field, meta] = useField(name)
  const hasError = meta.touched && meta.error

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-asa-black"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        {...field}
        {...props}
        className={`rounded-lg border bg-asa-white px-4 py-2.5 text-sm text-asa-black placeholder:text-asa-grey/60 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
          hasError
            ? "border-asa-error focus:ring-asa-error/40"
            : "border-asa-black/20 focus:border-asa-secondary focus:ring-asa-secondary/30"
        }`}
      />
      {hasError && (
        <p className="text-xs text-asa-error">{meta.error}</p>
      )}
      {helperText && !hasError && (
        <p className="text-xs text-asa-grey">{helperText}</p>
      )}
    </div>
  )
}
