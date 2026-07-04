import { useEffect } from "react"
import { motion } from "motion/react"
import { X } from "lucide-react"

export default function ImageModal({ src, alt, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
<motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
        className="relative max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -right-3 -top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-asa-surface shadow-lg hover:bg-asa-border transition-colors cursor-pointer"
        >
          <X className="h-4 w-4 text-asa-text" />
        </button>
        <img
          src={src}
          alt={alt}
          className="max-h-[85vh] w-auto rounded-xl shadow-2xl"
          onError={(e) => {
            e.target.src = "/placeholder.svg"
          }}
        />
      </motion.div>
    </motion.div>
  )
}
