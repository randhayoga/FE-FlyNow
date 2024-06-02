import { ThemeProvider } from "@/components/theme-provider"
import router from "./routes"
import { RouterProvider } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"

function App({ children }) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster />
      {children}
    </ThemeProvider>
  )
}

export default App
