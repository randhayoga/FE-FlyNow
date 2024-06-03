import { ThemeProvider } from "@/components/theme-provider";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import router from "./routes";

function App({ children }) {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RouterProvider router={router} />
            {children}
            <Toaster />
            <SonnerToaster richColors />
        </ThemeProvider>
    );
}

export default App;
