import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext(null)

const ADMIN_USER = {
  id: "admin-001",
  name: "Admin User",
  email: "admin@actorsslotacademy.com",
  avatar: null,
}

function getStoredAuth() {
  try {
    const token = localStorage.getItem("asa_admin_token")
    const user = localStorage.getItem("asa_admin_user")
    if (token && user) return { token, user: JSON.parse(user) }
  } catch {}
  return null
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(getStoredAuth)
  const navigate = useNavigate()

  useEffect(() => {
    const stored = getStoredAuth()
    if (stored) setAuth(stored)
  }, [])

  function login(email, password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate: any email/password works except empty
        if (!email || !password) {
          resolve({ ok: false, error: "Email and password are required." })
          return
        }
        const token = "asa_token_" + Date.now()
        const authData = { token, user: { ...ADMIN_USER, email } }
        localStorage.setItem("asa_admin_token", token)
        localStorage.setItem("asa_admin_user", JSON.stringify(authData.user))
        setAuth(authData)
        resolve({ ok: true })
      }, 1000)
    })
  }

  function logout() {
    localStorage.removeItem("asa_admin_token")
    localStorage.removeItem("asa_admin_user")
    setAuth(null)
    navigate("/")
  }

  function isAuthenticated() {
    return !!auth?.token
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
