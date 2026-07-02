import { NavLink, Link, useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight, LayoutDashboard, Users, Image, CalendarRange, BookOpen, Vote, Settings, LogOut } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"

const links = [
  { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { name: "Talents", path: "/dashboard/talents", icon: Users },
  { name: "Gallery", path: "/dashboard/gallery", icon: Image },
  { name: "Events", path: "/dashboard/events", icon: CalendarRange },
  { name: "Programmes", path: "/dashboard/programmes", icon: BookOpen },
  { name: "Voting", path: "/dashboard/voting", icon: Vote },
  { name: "Settings", path: "/dashboard/settings", icon: Settings },
]

export default function Sidebar({ collapsed, onToggle }) {
  const navigate = useNavigate()
  const { auth, logout } = useAuth()

  return (
    <aside className={`fixed top-0 left-0 h-screen bg-asa-surface border-r border-asa-border z-50 flex flex-col transition-all duration-300 ease-in-out ${
      collapsed ? "w-16" : "w-64"
    }`}>
      {/* Logo */}
      <div className={`flex items-center h-16 shrink-0 border-b border-asa-border px-4 ${collapsed ? "justify-center" : "justify-between"}`}>
        <Link to="/" className={`flex items-center group ${collapsed ? "justify-center w-full" : "gap-3"}`}>
          {collapsed ? (
            <span className="font-headline text-lg font-bold text-asa-primary">A</span>
          ) : (
            <div className="flex flex-col leading-none">
              <span className="font-headline text-2xl font-bold tracking-tight text-asa-primary group-hover:text-asa-primary-bright transition-colors">ASA</span>
              <span className="label-mono text-[9px] text-asa-muted tracking-[0.2em] mt-1">Admin Panel</span>
            </div>
          )}
        </Link>
        {!collapsed && (
          <button onClick={onToggle} className="p-1 text-asa-muted hover:text-asa-text transition-colors cursor-pointer" aria-label="Collapse sidebar">
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {/* Collapse button when collapsed */}
      {collapsed && (
        <div className="flex justify-center py-3 border-b border-asa-border">
          <button onClick={onToggle} className="p-1 text-asa-muted hover:text-asa-text transition-colors cursor-pointer" aria-label="Expand sidebar">
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {links.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  collapsed ? "justify-center p-3" : "px-4 py-3"
                } ${
                  isActive
                    ? "bg-asa-primary/10 text-asa-primary"
                    : "text-asa-muted hover:bg-asa-background hover:text-asa-text"
                }`
              }
              title={collapsed ? item.name : undefined}
            >
              <Icon className="h-4.5 w-4.5 shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t border-asa-border p-3">
        {collapsed ? (
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-asa-primary/20 flex items-center justify-center font-bold text-asa-primary font-headline text-xs border border-asa-primary/30">
              A
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="h-10 w-10 rounded-full bg-asa-primary/20 flex items-center justify-center font-bold text-asa-primary font-headline border border-asa-primary/30">
                A
              </div>
              <div>
                <p className="text-sm font-bold text-asa-text">{auth?.user?.name ?? "Admin"}</p>
                <p className="label-mono text-[8px] text-asa-muted">Administrator</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-xs font-semibold text-asa-accent hover:bg-asa-accent/10 transition-colors cursor-pointer"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </>
        )}
        {collapsed && (
          <div className="flex justify-center mt-2">
            <button
              onClick={logout}
              className="p-2 rounded-lg text-asa-accent hover:bg-asa-accent/10 transition-colors cursor-pointer"
              aria-label="Sign Out"
              title="Sign Out"
            >
              <LogOut size={14} />
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}
