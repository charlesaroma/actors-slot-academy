import { useState } from "react"
import { Outlet, NavLink, Link, useNavigate, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { LayoutDashboard, UserSquare2, FolderHeart, FileAudio, Settings, LogOut, Menu, X } from "lucide-react"
import Sidebar from "./Sidebar"

const sidebarLinks = [
  { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { name: "Casting Profile", path: "/dashboard/profiles", icon: UserSquare2 },
  { name: "Media Vault", path: "/dashboard/media-vault", icon: FolderHeart },
  { name: "Monologue Lab", path: "/dashboard/monologue-lab", icon: FileAudio },
  { name: "Settings", path: "/dashboard/settings", icon: Settings },
]

export default function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const currentLink = sidebarLinks.find((link) => link.path === location.pathname) ?? sidebarLinks[0]

  return (
    <div className="min-h-screen bg-asa-background text-asa-text flex relative">
      {/* Film grain noise overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9999]" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        backgroundSize: "200px 200px",
        opacity: 0.025,
      }} />

      {/* Desktop Sidebar (fixed, no scroll) */}
      <div className="hidden md:block">
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      </div>

      {/* Mobile Top Bar */}
      <header className="md:hidden flex h-16 items-center justify-between px-4 bg-asa-surface border-b border-asa-border fixed top-0 left-0 right-0 z-50">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-headline text-xl font-bold text-asa-primary">ASA</span>
          <span className="label-mono text-[8px] text-asa-muted">Student</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-asa-muted">{currentLink.name}</span>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1 text-asa-text cursor-pointer"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-asa-surface border-b border-asa-border overflow-hidden fixed top-16 left-0 right-0 z-40 shadow-xl"
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              {sidebarLinks.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/dashboard"}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                        isActive
                          ? "bg-asa-primary/10 text-asa-primary"
                          : "text-asa-muted hover:bg-asa-background hover:text-asa-text"
                      }`
                    }
                  >
                    <Icon className="h-4.5 w-4.5" />
                    {item.name}
                  </NavLink>
                )
              })}
              <button
                onClick={() => { setMobileOpen(false); navigate("/") }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-asa-accent hover:bg-asa-accent/10 transition-colors cursor-pointer mt-3 border-t border-asa-border pt-4"
              >
                <LogOut className="h-4 w-4" />
                Exit Dashboard
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`flex-1 overflow-y-auto min-h-screen transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? "md:ml-16" : "md:ml-64"
      } pt-16 md:pt-0`}>
        <div className="px-4 py-8 md:p-12">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
