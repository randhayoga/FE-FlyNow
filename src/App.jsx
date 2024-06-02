import { ThemeProvider } from "@/components/theme-provider"
import router from "./routes"
import { RouterProvider } from "react-router-dom"
import { Toaster } from "./components/ui/toaster";

function App({ children }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      {children}
      <Toaster />
    </ThemeProvider>
  );
}

export default App
