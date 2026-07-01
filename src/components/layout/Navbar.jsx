import { useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, ChevronDown } from "lucide-react"
import { NAV_LINKS } from "../../data/navigation"

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const { pathname } = useLocation()

  const closeMobile = () => {
    setMobileOpen(false)
    setMobileExpanded(null)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-asa-black/5 bg-asa-background/95 backdrop-blur supports-[backdrop-filter]:bg-asa-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2" onClick={closeMobile}>
          <span className="text-xl font-bold font-headline tracking-tight text-asa-black">
            ASA
          </span>
          <span className="hidden text-xs text-asa-grey sm:inline">
            Actor&apos;s Slot Academy
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((item) =>
            item.path ? (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-colors duration-200 ${
                    isActive
                      ? "text-asa-secondary"
                      : "text-asa-black hover:text-asa-secondary"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ) : (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="flex items-center gap-1 text-sm font-medium tracking-wide text-asa-black transition-colors duration-200 hover:text-asa-secondary">
                  {item.name}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      openDropdown === item.name ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="absolute left-0 top-full mt-1 w-52 rounded-lg border border-asa-black/5 bg-asa-background p-1 shadow-lg"
                    >
                      {item.dropdown.map((sub) => (
                        <NavLink
                          key={sub.path}
                          to={sub.path}
                          className={({ isActive }) =>
                            `block rounded-md px-3 py-2 text-sm transition-colors ${
                              isActive
                                ? "bg-asa-secondary/10 text-asa-secondary"
                                : "text-asa-black hover:bg-asa-black/5"
                            }`
                          }
                        >
                          {sub.name}
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ),
          )}
        </nav>

        <Link
          to="/auth/login"
          className="hidden rounded-md bg-asa-secondary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-asa-secondary/90 md:inline-block"
        >
          Sign In
        </Link>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-asa-black/5 md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 pb-6 pt-4">
              {NAV_LINKS.map((item) =>
                item.path ? (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    onClick={closeMobile}
                    className={({ isActive }) =>
                      `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-asa-secondary/10 text-asa-secondary"
                          : "text-asa-black hover:bg-asa-black/5"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ) : (
                  <div key={item.name}>
                    <button
                      onClick={() =>
                        setMobileExpanded(
                          mobileExpanded === item.name ? null : item.name,
                        )
                      }
                      className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-asa-black transition-colors hover:bg-asa-black/5"
                    >
                      {item.name}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          mobileExpanded === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === item.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-3 mt-1 flex flex-col gap-1 border-l border-asa-black/10 pl-3">
                            {item.dropdown.map((sub) => (
                              <NavLink
                                key={sub.path}
                                to={sub.path}
                                onClick={closeMobile}
                                className={({ isActive }) =>
                                  `rounded-md px-3 py-2 text-sm transition-colors ${
                                    isActive
                                      ? "bg-asa-secondary/10 text-asa-secondary"
                                      : "text-asa-black hover:bg-asa-black/5"
                                  }`
                                }
                              >
                                {sub.name}
                              </NavLink>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ),
              )}
              <Link
                to="/auth/login"
                onClick={closeMobile}
                className="mt-2 rounded-md bg-asa-secondary px-3 py-2 text-center text-sm font-medium text-white"
              >
                Sign In
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
