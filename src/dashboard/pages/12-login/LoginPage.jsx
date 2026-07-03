import { useState } from "react"
import { motion } from "motion/react"
import { LogIn, Eye, EyeOff, Loader2, Shield } from "lucide-react"
import { useAuth } from "../../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("admin@actorsslotacademy.com")
  const [password, setPassword] = useState("password")
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setLoading(true)
    const res = await login(email, password)
    setLoading(false)
    if (res.ok) {
      navigate("/dashboard")
    } else {
      setError(res.error)
    }
  }

  return (
    <div className="min-h-screen bg-asa-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        {/* Logo / Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-asa-primary/10 mb-4">
            <Shield className="h-7 w-7 text-asa-primary" />
          </div>
          <h1 className="font-headline text-2xl font-bold text-asa-text">Admin Dashboard</h1>
          <p className="text-sm text-asa-muted mt-1">Sign in to manage Actors Slot Academy</p>
        </div>

        <form onSubmit={handleSubmit} className="card-ticket p-8 bg-asa-surface border-asa-border space-y-5">
          <div>
            <label className="label-mono text-[10px] text-asa-muted mb-1.5 block">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-asa-border bg-asa-background px-4 py-3 text-sm text-asa-text focus:border-asa-primary focus:outline-none transition-colors"
              placeholder="admin@actorsslotacademy.com"
            />
          </div>

          <div>
            <label className="label-mono text-[10px] text-asa-muted mb-1.5 block">Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-asa-border bg-asa-background px-4 py-3 pr-10 text-sm text-asa-text focus:border-asa-primary focus:outline-none transition-colors"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPw((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-asa-muted hover:text-asa-text cursor-pointer"
              >
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-500 bg-red-500/10 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-asa-primary text-asa-background font-semibold text-sm hover:bg-asa-primary-bright disabled:opacity-60 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4" /> Sign In
              </>
            )}
          </button>

          <p className="text-[10px] text-asa-muted text-center pt-2 border-t border-asa-border/40">
            Simulated auth — any non-empty credentials work
          </p>
        </form>
      </motion.div>
    </div>
  )
}
