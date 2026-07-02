import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Upload, Trash2, ImageIcon, X } from "lucide-react"
import { galleryData } from "../../../data/galleryData"

export default function GalleryPage() {
  const [items, setItems] = useState(galleryData.map((item, i) => ({
    ...item,
    id: String(item.id ?? i + 1),
    url: item.image || item.url,
    category: item.category || "General",
  })))
  const [dragOver, setDragOver] = useState(false)
  const [preview, setPreview] = useState(null)

  const remove = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file)
        setItems((prev) => [
          { id: String(Date.now()), url, title: file.name, category: "Uploaded" },
          ...prev,
        ])
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-headline text-2xl font-bold text-asa-text">Gallery</h1>
        <p className="text-sm text-asa-muted mt-1">Manage images and media assets.</p>
      </div>

      {/* Dropzone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`rounded-xl border-2 border-dashed p-10 text-center transition-all duration-200 ${
          dragOver
            ? "border-asa-primary bg-asa-primary/5"
            : "border-asa-border hover:border-asa-primary/30"
        }`}
      >
        <Upload className="h-8 w-8 mx-auto mb-3 text-asa-muted" />
        <p className="text-sm font-medium text-asa-text">Drop images here to upload</p>
        <p className="text-xs text-asa-muted mt-1">or click to browse files</p>
        <input type="file" accept="image/*" multiple className="hidden" id="gallery-upload" />
        <label htmlFor="gallery-upload" className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-asa-primary px-5 py-2.5 text-sm font-semibold text-asa-background hover:bg-asa-primary-bright transition-colors">
          <Upload className="h-4 w-4" />
          Browse Files
        </label>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="group relative aspect-square overflow-hidden rounded-lg border border-asa-border bg-asa-surface"
          >
            <img
              src={item.url}
              alt={item.title || "Gallery image"}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
              onClick={() => setPreview(item)}
              onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex" }}
            />
            <div style={{ display: "none" }} className="absolute inset-0 items-center justify-center bg-asa-surface">
              <ImageIcon className="h-6 w-6 text-asa-muted" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-xs font-medium text-white truncate">{item.title || "Untitled"}</p>
                <p className="text-[10px] text-white/60">{item.category}</p>
              </div>
              <button
                onClick={() => remove(item.id)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 hover:bg-asa-accent transition-all cursor-pointer"
                title="Delete"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Preview Lightbox */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setPreview(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full"
            >
              <button onClick={() => setPreview(null)} className="absolute -top-10 right-0 text-white/60 hover:text-white cursor-pointer">
                <X className="h-6 w-6" />
              </button>
              <img src={preview.url} alt={preview.title} className="w-full rounded-lg" />
              <p className="text-sm text-white/80 mt-3 text-center">{preview.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
