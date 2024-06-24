import Login from "@/components/Login";
import LoginBg from "../assets/images/login-bg.svg";
import { redirect } from "react-router-dom";

export const loader = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    return redirect("/");
  }

  return null;
}

const LoginPage = () => {
  return (
    <div className="flex h-screen">
      <Login />
    </div>
  );
};

export default LoginPage;
