import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "motion/react"
import { Lock, Mail, Eye, EyeOff, Shield } from "lucide-react"
import Button from "../../../components/ui/Button"
import { useAuth } from "../../../contexts/AuthContext"

export default function AdminLoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    const res = await login(form.email, form.password)
    setLoading(false)
    if (res.ok) {
      navigate("/dashboard")
    } else {
      setError(res.error)
    }
  }

  return (
    <div className="bg-asa-background min-h-screen flex items-center justify-center px-4 py-28 relative overflow-hidden">
      {/* Spotlight accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle 50vw at 50% 50%, rgba(201,154,62,0.05) 0%, transparent 80%)",
        }}
      />

      <div className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 rounded-2xl border border-asa-border bg-asa-surface overflow-hidden shadow-2xl glow-gold">
        {/* Light Sweep */}
        <motion.div
          initial={{ x: "-150%" }}
          animate={{ x: "250%" }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
          className="absolute inset-y-0 left-0 z-50 pointer-events-none w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
        />

        {/* Left column: Admin Branding */}
        <div className="relative hidden md:flex flex-col justify-between p-12 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-t from-asa-background via-asa-background/70 to-transparent" />
          <div className="absolute inset-0 bg-asa-accent/20 mix-blend-multiply" />

          <div className="relative z-10">
            <span className="label-mono text-asa-primary text-[10px]">Actor&apos;s Slot Academy</span>
            <h2 className="font-headline text-3xl font-bold text-asa-text mt-2">
              Admin Portal
            </h2>
          </div>

          <div className="relative z-10 mt-20">
            <p className="text-sm text-asa-text/90 italic font-medium">
              &ldquo;Behind every great performance is the discipline of the unseen hours.&rdquo;
            </p>
            <p className="mt-2 text-xs label-mono text-asa-primary">&#8212; ASA Leadership</p>
          </div>
        </div>

        {/* Right column: Admin Login Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-asa-surface">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-asa-primary">
              <Shield className="h-6 w-6" />
              <span className="font-headline text-xl font-bold">ASA</span>
            </div>
            <h1 className="font-headline text-2xl font-bold text-asa-text mt-4">
              Administrator Access
            </h1>
            <p className="text-xs text-asa-muted mt-1.5">
              Sign in to manage talents, events & applications.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-mono block text-[10px] mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-asa-muted" />
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-asa-border bg-asa-background py-2.5 pl-10 pr-4 text-sm text-asa-text focus:border-asa-primary focus:outline-none"
                  placeholder="admin@actorsslotacademy.com"
                />
              </div>
            </div>

            <div>
              <label className="label-mono block text-[10px] mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-asa-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-asa-border bg-asa-background py-2.5 pl-10 pr-4 text-sm text-asa-text focus:border-asa-primary focus:outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-asa-muted hover:text-asa-text cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                to="/dashboard/auth/forgot-password"
                className="text-xs text-asa-muted hover:text-asa-primary transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {error && (
              <p className="text-xs text-red-500 bg-red-500/10 rounded-lg px-3 py-2">{error}</p>
            )}

            <Button type="submit" size="md" className="w-full" disabled={loading}>
              {loading ? "Authenticating..." : "Access Dashboard"}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-asa-muted">
            <Link to="/" className="hover:text-asa-primary transition-colors">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
