import { useState, useEffect } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, ChevronDown } from "lucide-react"
import { NAV_LINKS } from "../../data/navigation"

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const closeMobile = () => {
    setMobileOpen(false)
    setMobileExpanded(null)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-asa-background/90 backdrop-blur-md border-asa-border shadow-lg shadow-black/20"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group" onClick={closeMobile}>
          <div className="flex flex-col leading-none">
            <span className="font-headline text-xl font-bold tracking-tight text-asa-primary group-hover:text-asa-primary-bright transition-colors duration-200">
              ASA
            </span>
            <span className="label-mono text-[9px] text-asa-muted tracking-[0.2em]">
              Actor&apos;s Slot Academy
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((item) =>
            item.path ? (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-colors duration-200 relative group ${
                    isActive
                      ? "text-asa-primary"
                      : "text-asa-muted hover:text-asa-text"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-asa-primary transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ) : (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="flex items-center gap-1 text-sm font-medium tracking-wide text-asa-muted transition-colors duration-200 hover:text-asa-text cursor-pointer">
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
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full mt-2 w-52 rounded-xl border border-asa-border bg-asa-surface/95 backdrop-blur-md p-1.5 shadow-xl shadow-black/40"
                    >
                      {item.dropdown.map((sub) => (
                        <NavLink
                          key={sub.path}
                          to={sub.path}
                          className={({ isActive }) =>
                            `block rounded-lg px-3 py-2 text-sm transition-colors duration-150 cursor-pointer ${
                              isActive
                                ? "bg-asa-primary/10 text-asa-primary"
                                : "text-asa-muted hover:bg-asa-border hover:text-asa-text"
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

        {/* CTA */}
        <Link
          to="/auth/login"
          className="hidden rounded-lg bg-asa-primary px-5 py-2 text-sm font-semibold text-asa-background transition-all duration-200 hover:bg-asa-primary-bright hover:shadow-[0_0_20px_rgba(201,154,62,0.35)] md:inline-block"
        >
          Sign In
        </Link>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-asa-text cursor-pointer p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu — Fullscreen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-18 z-40 bg-asa-background/97 backdrop-blur-xl md:hidden h-dvh"
            onClick={() => setMobileOpen(false)}
          >
            <nav
              className="flex flex-col gap-1 px-6 pb-12 pt-8"
              onClick={(e) => e.stopPropagation()}
            >
              {NAV_LINKS.map((item) =>
                item.path ? (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <NavLink
                      to={item.path}
                      end={item.path === "/"}
                      onClick={closeMobile}
                      className={({ isActive }) =>
                        `block rounded-lg px-3 py-3 text-base font-medium transition-colors duration-150 cursor-pointer ${
                          isActive
                            ? "bg-asa-primary/10 text-asa-primary"
                            : "text-asa-muted hover:bg-asa-border hover:text-asa-text"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </motion.div>
                ) : (
                  <div key={item.name}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <button
                        onClick={() =>
                          setMobileExpanded(
                            mobileExpanded === item.name ? null : item.name,
                          )
                        }
                        className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-asa-muted transition-colors hover:bg-asa-border hover:text-asa-text cursor-pointer"
                      >
                        {item.name}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            mobileExpanded === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </motion.div>
                    <AnimatePresence>
                      {mobileExpanded === item.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-asa-border pl-3">
                            {item.dropdown.map((sub) => (
                              <NavLink
                                key={sub.path}
                                to={sub.path}
                                onClick={closeMobile}
                                className={({ isActive }) =>
                                  `block rounded-lg px-3 py-2.5 text-sm transition-colors cursor-pointer ${
                                    isActive
                                      ? "text-asa-primary"
                                      : "text-asa-muted hover:text-asa-text"
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
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: 0.15 }}
                className="mt-6"
              >
                <Link
                  to="/auth/login"
                  onClick={closeMobile}
                  className="block rounded-lg bg-asa-primary px-3 py-3 text-center text-base font-semibold text-asa-background"
                >
                  Sign In
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
