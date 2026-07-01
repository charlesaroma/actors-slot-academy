import { useState, useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { Lock, Mail, User, Eye, EyeOff, Film } from "lucide-react"
import Button from "../../components/ui/Button"

export default function AuthPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const modeParam = searchParams.get("mode")

  const [isLogin, setIsLogin] = useState(modeParam !== "signup")
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setIsLogin(modeParam !== "signup")
  }, [modeParam])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API delay
    setTimeout(() => {
      setLoading(false)
      navigate("/dashboard")
    }, 1200)
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
        {/* Left column: Cinematic Promo */}
        <div className="relative hidden md:flex flex-col justify-between p-12 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-t from-asa-background via-asa-background/70 to-transparent" />
          <div className="absolute inset-0 bg-asa-accent/20 mix-blend-multiply" />

          <div className="relative z-10">
            <span className="label-mono text-asa-primary text-[10px]">Actor&apos;s Slot Academy</span>
            <h2 className="font-headline text-3xl font-bold text-asa-text mt-2">
              Where African Storytellers Rise
            </h2>
          </div>

          <div className="relative z-10 mt-20">
            <p className="text-sm text-asa-text/90 italic font-medium">
              &ldquo;The stage is not just a platform; it is a mirror reflecting the soul of our continent.&rdquo;
            </p>
            <p className="mt-2 text-xs label-mono text-asa-primary">&#8212; Amina Nantongo</p>
          </div>
        </div>

        {/* Right column: Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-asa-surface">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-asa-primary">
              <Film className="h-6 w-6" />
              <span className="font-headline text-xl font-bold">ASA</span>
            </div>
            <h1 className="font-headline text-2xl font-bold text-asa-text mt-4">
              {isLogin ? "Welcome Back, Artist" : "Create Your Performer Slot"}
            </h1>
            <p className="text-xs text-asa-muted mt-1.5">
              {isLogin ? "Sign in to access showreels & monologue lab." : "Join our next intake cohort."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <label className="label-mono block text-[10px] mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-asa-muted" />
                    <input
                      type="text"
                      name="name"
                      required={!isLogin}
                      value={form.name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-asa-border bg-asa-background py-2.5 pl-10 pr-4 text-sm text-asa-text focus:border-asa-primary focus:outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

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
                  placeholder="name@email.com"
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

            <Button type="submit" size="md" className="w-full mt-4" disabled={loading}>
              {loading ? "Accessing Stage..." : isLogin ? "Enter Stage" : "Claim Performer Slot"}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-asa-muted">
            {isLogin ? (
              <p>
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-asa-primary hover:underline cursor-pointer font-semibold"
                >
                  Sign Up
                </button>
              </p>
            ) : (
              <p>
                Already registered?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-asa-primary hover:underline cursor-pointer font-semibold"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}