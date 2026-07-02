import { useState, useRef } from "react"
import { Upload, X, FileImage, CheckCircle } from "lucide-react"

export default function ImageUploader({ onUpload }) {
  const [dragOver, setDragOver] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const inputRef = useRef(null)

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    setUploaded(true)
    setTimeout(() => setUploaded(false), 3000)
  }

  const handleClick = () => {
    setUploaded(true)
    setTimeout(() => setUploaded(false), 3000)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-headline text-lg font-bold text-asa-text">Upload New Media</h3>
        <span className="label-mono text-[8px]">PNG, JPG, MP4 — Max 50MB</span>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick() }}
        className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-asa-primary ${
          dragOver
            ? "border-asa-primary bg-asa-primary/5"
            : "border-asa-border hover:border-asa-primary/40 bg-asa-surface"
        }`}
      >
        {uploaded ? (
          <div className="flex flex-col items-center gap-3 text-asa-success">
            <CheckCircle className="h-10 w-10" />
            <p className="text-sm font-bold">Upload successful!</p>
          </div>
        ) : dragOver ? (
          <>
            <FileImage className="h-10 w-10 text-asa-primary mb-3" />
            <p className="text-sm font-bold text-asa-primary">Drop to upload</p>
          </>
        ) : (
          <>
            <Upload className="h-10 w-10 text-asa-muted mb-3" />
            <p className="text-sm font-bold text-asa-text">Drag & drop or click to browse</p>
            <p className="text-xs text-asa-muted mt-1">Headshots, stage stills, showreel clips</p>
          </>
        )}
        <input ref={inputRef} type="file" accept="image/*,video/*" className="hidden" onChange={handleClick} />
      </div>
    </div>
  )
}
