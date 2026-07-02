import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import AppRoutes from "./routes/AppRoutes"
import ScrollToTop from "./components/layout/ScrollToTop"
import DynamicTitle from "./components/layout/DynamicTitle"

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <DynamicTitle />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
