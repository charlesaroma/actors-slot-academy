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
  "/dashboard/talents": "Talents — Dashboard",
  "/dashboard/gallery": "Gallery — Dashboard",
  "/dashboard/events": "Events — Dashboard",
  "/dashboard/programmes": "Programmes — Dashboard",
  "/dashboard/voting": "Voting — Dashboard",
  "/dashboard/settings": "Settings — Dashboard",
  "/dashboard/login": "Admin Login",
}

export default function DynamicTitle() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = titles[pathname] || `Actors Slot Academy — Page`
  }, [pathname])

  return null
}
