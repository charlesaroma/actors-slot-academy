import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const titles = {
  "/": "Home",
  "/about": "About",
  "/schools-outreach": "Outreach",
  "/talents": "Talents",
  "/gallery": "Gallery",
  "/events": "Events",
  "/programmes": "Programmes",
  "/contact": "Contact",
  "/auth": "Sign In",
  "/dashboard": "Dashboard",
  "/dashboard/profiles": "Profiles",
  "/dashboard/media-vault": "Media Vault",
  "/dashboard/monologue-lab": "Monologue Lab",
  "/dashboard/settings": "Settings",
}

export default function DynamicTitle() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = titles[pathname] || `${base} — Page`
  }, [pathname])

  return null
}
