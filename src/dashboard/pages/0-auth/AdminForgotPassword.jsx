import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { Mail, Shield, ArrowLeft } from "lucide-react"
import Button from "../../../components/ui/Button"

export default function AdminForgotPassword() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    // Simulate sending reset email
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSent(true)
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
              Password Recovery
            </h2>
          </div>

          <div className="relative z-10 mt-20">
            <p className="text-sm text-asa-text/90 italic font-medium">
              &ldquo;Every setback is a setup for a comeback. Reset, refocus, return.&rdquo;
            </p>
            <p className="mt-2 text-xs label-mono text-asa-primary">&#8212; ASA Admin</p>
          </div>
        </div>

        {/* Right column: Forgot Password Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-asa-surface">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-asa-primary">
              <Shield className="h-6 w-6" />
              <span className="font-headline text-xl font-bold">ASA</span>
            </div>
            <h1 className="font-headline text-2xl font-bold text-asa-text mt-4">
              Reset Password
            </h1>
            <p className="text-xs text-asa-muted mt-1.5">
              {sent
                ? "Check your inbox for the reset link."
                : "Enter your email and we&apos;ll send you a reset link."}
            </p>
          </div>

          {sent ? (
            <div className="space-y-4">
              <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                Reset link sent! If the account exists, you&apos;ll receive it shortly.
              </div>
              <Link to="/dashboard/auth/login">
                <Button variant="outline" size="md" className="w-full">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label-mono block text-[10px] mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-asa-muted" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-asa-border bg-asa-background py-2.5 pl-10 pr-4 text-sm text-asa-text focus:border-asa-primary focus:outline-none"
                    placeholder="admin@actorsslotacademy.com"
                  />
                </div>
              </div>

              {error && (
                <p className="text-xs text-red-500 bg-red-500/10 rounded-lg px-3 py-2">{error}</p>
              )}

              <Button type="submit" size="md" className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>

              <div className="text-center">
                <Link
                  to="/dashboard/auth/login"
                  className="inline-flex items-center gap-1 text-xs text-asa-muted hover:text-asa-primary transition-colors"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
