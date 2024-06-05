import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import OtpPage from "@/pages/OtpPage";
import RegisterPage from "@/pages/RegisterPage";
import HistoryPage from "@/pages/HistoryPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/otp",
    element: <OtpPage />,
  },
  {
    path: "/history",
    element: <HistoryPage />,
  },
]);

export default router;
