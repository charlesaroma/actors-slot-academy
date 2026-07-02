import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes"
import ScrollToTop from "./components/layout/ScrollToTop"
import DynamicTitle from "./components/layout/DynamicTitle"

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <DynamicTitle />
      <AppRoutes />
    </BrowserRouter>
  )
}
