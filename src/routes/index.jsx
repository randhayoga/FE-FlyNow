import { createBrowserRouter } from "react-router-dom";

import Navbar from "@/components/Navbar";
import BookingPage, { loader as BookingPageLoader } from "@/pages/BookingPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import OtpPage, {loader as OtpPageLoader} from "@/pages/OtpPage";
import PaymentPage from "@/pages/PaymentPage";
import RegisterPage from "@/pages/RegisterPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import SearchFlightPage from "@/pages/SearchFlightPage";

import NavbarComponent from "@/components/Navbar";
import NonProtected from "@/components/Nonprotected";
import Protected from "@/components/Protected";
import HistoryPage from "@/pages/HistoryPage";
import ProfilePage, { loader as ProfilePageLoader } from "@/pages/ProfilePage";

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
    loader: OtpPageLoader,
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
    loader: ProfilePageLoader,
    element: (
      <Protected>
        <Navbar />
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
    loader: BookingPageLoader,
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
