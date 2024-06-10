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

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <div className="mt-16">
          <HomePage />
        </div>
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
        <SearchFlightPage />,
      </Protected>
    ),
  },
]);

export default router;
