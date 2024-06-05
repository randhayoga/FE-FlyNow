import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

function App({ children }) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      {children}
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
