<<<<<<< HEAD
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import OtpPage from "@/pages/OtpPage";
import RegisterPage from "@/pages/RegisterPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/otp",
    element: <OtpPage />
  }
])

export default router
=======
import LoginPage from "@/pages/LoginPage";
import OtpPage from "@/pages/OtpPage";
import RegisterPage from "@/pages/RegisterPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1 className="text-3xl font-bold">Home Page</h1>,
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
]);

export default router;
>>>>>>> 293af5ef5fed1e49ded1c9d665b5a0ced0292413
