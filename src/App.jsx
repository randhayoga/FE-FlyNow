import { ThemeProvider } from "@/components/theme-provider"
import router from "./routes"
import { RouterProvider } from "react-router-dom"

function App({ children }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      {children}
    </ThemeProvider>
  )
}

export default App
