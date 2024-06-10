import { Link } from "react-router-dom";
import React from "react";
import RegisterForm from "@/components/Register/RegisterForm";

import bgAuth from "@/assets/images/bgauth.png";

const RegisterPage = () => {
  return (
    <div className="w-full lg:grid lg:h-[100vh] lg:grid-cols-2 xl:h-[100vh]">
      <div className="hidden bg-muted lg:block">
        <img
          src={bgAuth}
          alt="Register Image"
          className="object-cover w-full h-screen"
        />
      </div>
      <div className="flex items-center justify-center">
        <div className="mx-auto grid w-[325px] sm:w-[600px] md:w-[700px] lg:w-[450px] xl:w-[500px]">
          <div className="grid gap-4 my-5">
            <h1 className="text-3xl font-bold">Daftar</h1>
          </div>
          <RegisterForm />
          <div className="mt-4 text-center text-md">
            Sudah punya akun?{" "}
            <Link to="/login" className="font-sans text-ColorPrimary font-bold">
              Masuk di sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
