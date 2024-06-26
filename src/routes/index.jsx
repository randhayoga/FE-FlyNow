import { createBrowserRouter } from "react-router-dom";

import Navbar from "@/components/Navbar";
import BookingPage, { loader as BookingPageLoader } from "@/pages/BookingPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import HomePage from "@/pages/HomePage";
import LoginPage, { loader as loginPageLoader } from "@/pages/LoginPage";
import OtpPage, {
  loader as otpPageLoader,
  action as otpPageAction,
} from "@/pages/OtpPage";
import PaymentPage from "@/pages/PaymentPage";
import PaymentStatusPage from "@/pages/PaymentStatusPage";
import RegisterPage, {
  loader as registerPageLoader,
} from "@/pages/RegisterPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import SearchFlightPage from "@/pages/SearchFlightPage";

import Protected from "@/components/Protected";
import HistoryPage from "@/pages/HistoryPage";
import ProfilePage, { loader as ProfilePageLoader } from "@/pages/ProfilePage";
import NotFoundPage from "@/pages/NotFoundPage";

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
    loader: loginPageLoader,
    element: <LoginPage />,
  },
  {
    path: "/register",
    loader: registerPageLoader,
    element: <RegisterPage />,
  },
  {
    path: "/otp",
    loader: otpPageLoader,
    action: otpPageAction,
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
    path: "/flight/payment/:id",
    element: (
      <Protected>
        <Navbar />
        <PaymentPage />
      </Protected>
    ),
  },
  {
    path: "/flight/payment/status",
    element: (
      <>
        <Navbar />
        <PaymentStatusPage />
      </>
    ),
  },
  // Add this route as the last route to catch unmatched paths
  {
    path: "*",
    element: <NotFoundPage />, // Render the NotFoundPage component for unmatched routes
  },
]);

export default router;
