import { createBrowserRouter } from "react-router-dom";

import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import Navbar from "@/components/Navbar";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import OtpPage from "@/pages/OtpPage";
import RegisterPage from "@/pages/RegisterPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import SearchFlightPage from "@/pages/SearchFlightPage";
import BookingPage from "@/pages/BookingPage";
import PaymentPage from "@/pages/PaymentPage";

import Protected from "@/components/Protected";
import NonProtected from "@/components/Nonprotected";
import ProfilePage from "@/pages/ProfilePage";
import HistoryPage from "@/pages/HistoryPage";
import NavbarComponent from "@/components/Navbar";

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
    path: "/reset-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPasswordPage />,
  },
  {
    path: "/flight/search",
    element: (
      <>
        <Navbar />
        <SearchFlightPage />,
      </>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <NavbarComponent />
        <ProfilePage />
      </Protected>
    ),
  },
  {
    path: "/history",
    element: (
      <Protected>
        <Navbar />
        <HistoryPage />
      </Protected>
    ),
  },
  {
    path: "/flight/booking/",
    element: (
      <Protected>
        <Navbar />
        <BookingPage />
      </Protected>
    ),
  },
  {
    path: "/flight/payment/",
    element: (
      <Protected>
        <Navbar />
        <PaymentPage />
      </Protected>
    ),
  },
]);

export default router;
