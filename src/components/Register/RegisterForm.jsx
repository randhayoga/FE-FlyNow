import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../../redux/actions/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { MdCheckCircle, MdCancel } from "react-icons/md";

import {
  Eye as MdOutlineVisibility,
  EyeOff as MdOutlineVisibilityOff,
} from "lucide-react";

import "./RegisterForm.css";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [noTelp, setNoTelp] = useState("");
  const [isValidNoTelp, setIsValidNoTelp] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordVis, setIsPasswordVis] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const emailChangeHandler = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Check if the email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  const noTelpChangeHandler = (e) => {
    const value = e.target.value;

    // Ignore if the value is not a number or the length is more than 15
    if (isNaN(value.replace("+62 ", "")) || value.length > 16) {
      return;
    }

    // This is so unncessary but cool as it will always keep +62 as the prefix and it cant be removed
    if (value === "+62 ") {
      setNoTelp("");
    } else if (value.startsWith("+62 ")) {
      setNoTelp(value);
    } else if (value.length > 0) {
      setNoTelp("+62 " + value);
    }

    // Check if the phone number is valid
    if (value.length >= 14 && value.length <= 16) {
      setIsValidNoTelp(true);
    } else {
      setIsValidNoTelp(false);
    }
  };

  const passwordChangeHandler = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Check if the password is valid
    if (value.length >= 6) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  };

  const toggleVisPassword = () => {
    setIsPasswordVis(!isPasswordVis);
  };

  const imageChangeHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(register(navigate, nama, email, noTelp, password, image));
    setIsLoading(false);
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name" className="text-black text-md">
          Nama
        </Label>
        <Input
          id="name"
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama Lengkap"
          required
        />
      </div>
      <div className="grid gap-2 email-input">
        <Label htmlFor="email" className="text-black text-md">
          Email
        </Label>
        <div className="input-icon-form">
          <Input
            id="email"
            type="email"
            value={email}
            onChange={emailChangeHandler}
            placeholder="Contoh: johndoe@gmail.com"
            className={`input-field ${
              email !== "" && !isValidEmail ? "border-red-700" : ""
            }`}
            required
          />
          {email === "" ? null : isValidEmail ? (
            <MdCheckCircle className="check-icon text-xl" />
          ) : (
            <MdCancel className="error-icon text-xl" />
          )}
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone" className="text-black text-md">
          Nomor Telepon
        </Label>
        <div className="input-icon-form">
          <Input
            id="phone"
            type="tel"
            value={noTelp}
            onChange={noTelpChangeHandler}
            placeholder="+62 ."
            className={`input-field ${
              noTelp !== "" && !isValidNoTelp ? "border-red-700" : ""
            }`}
            required
          />
          {noTelp === "" ? null : isValidNoTelp ? (
            <MdCheckCircle className="check-icon text-xl" />
          ) : (
            <MdCancel className="error-icon text-xl" />
          )}
        </div>
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password" className="text-black text-md">
            Buat Password (minimal 6 karakter)
          </Label>
        </div>
        <div className="input-pass-icon-form">
          <Input
            id="password"
            type={isPasswordVis ? "text" : "password"}
            value={password}
            onChange={passwordChangeHandler}
            placeholder="Buat Password"
            className={`input-field ${
              password !== "" && !isValidPassword ? "border-red-700" : ""
            }`}
            required
          />
          <button
            type="button"
            onClick={toggleVisPassword}
            className="pass-toggle-icon"
          >
            {password === "" ? null : isPasswordVis ? (
              <MdOutlineVisibilityOff className="text-xl" />
            ) : (
              <MdOutlineVisibility className="text-xl" />
            )}
          </button>
          {password === "" ? null : isValidPassword ? (
            <MdCheckCircle className="check-icon text-xl" />
          ) : (
            <MdCancel className="error-icon text-xl" />
          )}
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="image" className="text-black text-md">
          Foto Profil
        </Label>
        <div className="relative border-3 border-slate-200 rounded-xl">
          <button className="file-upload text-sm py-3.5 px-4 bg-slate-50 rounded-l-lg text-uxl">
            Pilih foto
          </button>
          <span
            id="file-chosen"
            className={`text-uxl ps-3 ${image ? "" : "text-slate-300"}`}
          >
            {image ? image.name : "Tidak ada file yang dipilih"}
          </span>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={imageChangeHandler}
            className="absolute inset-0 opacity-0 cursor-pointer"
            required
          />
        </div>
      </div>
      <Button
        type="submit"
        className="w-full bg-ColorPrimary mt-2"
        disabled={
          !(
            isValidEmail &&
            isValidNoTelp &&
            isValidPassword &&
            nama !== "" &&
            image != null
          ) || isLoading
        }
      >
        Daftar
      </Button>
    </form>
  );
};

export default RegisterForm;
