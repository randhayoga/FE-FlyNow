import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import Navbar from "@/components/Navbar";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import OtpPage from "@/pages/OtpPage";
import RegisterPage from "@/pages/RegisterPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import SearchFlightPage from "@/pages/SearchFlightPage";
import { createBrowserRouter } from "react-router-dom";
import Protected from "@/components/Protected";
import NonProtected from "@/components/Nonprotected";
import ProfilePage from "@/pages/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <HomePage />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <NonProtected>
        <LoginPage />,
      </NonProtected>
    ),
  },
  {
    path: "/register",
    element: (
      <NonProtected>
        <RegisterPage />,
      </NonProtected>
    ),
  },
  {
    path: "/otp",
    element: <OtpPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPasswordPage />,
  },
  {
    path: "/flight/search",

    element: (
      <Protected>
        <Navbar />
        <SearchFlightPage />,
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <Navbar />
        <ProfilePage />
      </Protected>
    ),
  },
]);

export default router;
