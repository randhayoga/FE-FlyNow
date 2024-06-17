import { Provider } from "react-redux";
import store from "../redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

function App({ children }) {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
          {children}
          <Toaster />
        </ThemeProvider>
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
