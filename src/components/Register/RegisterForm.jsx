import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  MdCheckCircle,
  MdCancel,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
} from "react-icons/md";

import "./RegisterForm.css";
import { set } from "date-fns";

const RegisterForm = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [noTelp, setNoTelp] = useState("");
  const [isValidNoTelp, setIsValidNoTelp] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordVis, setIsPasswordVis] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPasswordVis, setIsConfirmPasswordVis] = useState(false);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(false);
  const [image, setImage] = useState(null);

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
      setConfirmPassword("");
    }
  };

  const toggleVisPassword = () => {
    setIsPasswordVis(!isPasswordVis);
  };

  const confirmPasswordChangeHandler = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value === password) {
      setIsValidConfirmPassword(true);
    } else {
      setIsValidConfirmPassword(false);
    }
  };

  const toggleConfirmPasswordVis = () => {
    setIsConfirmPasswordVis(!isConfirmPasswordVis);
  };

  const imageChangeHandler = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name" className="font-medium text-xs">
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
        <Label htmlFor="email" className="font-medium text-xs">
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
              email !== "" && !isValidEmail ? "border-red-700 border-2" : ""
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
        <Label htmlFor="phone" className="font-medium text-xs">
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
              noTelp !== "" && !isValidNoTelp ? "border-red-700 border-2" : ""
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
          <Label htmlFor="password" className="font-medium text-xs">
            Buat Password (min. 6 karakter)
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
              password !== "" && !isValidPassword
                ? "border-red-700 border-2"
                : ""
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
        <div className="flex items-center">
          <Label htmlFor="password" className="font-medium text-xs">
            Konfirmasi Password
          </Label>
        </div>
        <div className="input-pass-icon-form">
          <Input
            id="confirmPassword"
            type={isConfirmPasswordVis ? "text" : "password"}
            value={confirmPassword}
            onChange={confirmPasswordChangeHandler}
            placeholder="Pastikan Password Sama"
            required
            disabled={!isValidPassword}
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVis}
            className="pass-toggle-icon"
          >
            {confirmPassword === "" ? null : isConfirmPasswordVis ? (
              <MdOutlineVisibilityOff className="text-xl" />
            ) : (
              <MdOutlineVisibility className="text-xl" />
            )}
          </button>
          {confirmPassword === "" ? null : isValidConfirmPassword ? (
            <MdCheckCircle className="check-icon text-xl" />
          ) : (
            <MdCancel className="error-icon text-xl" />
          )}
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="image" className="font-medium text-xs">
          Foto Profil
        </Label>
        <div className="relative border border-slate-200 rounded-md">
          <button className="file-upload text-sm py-2.5 px-4 bg-slate-50 rounded-s-md">
            Pilih foto
          </button>
          <span
            id="file-chosen"
            className={`text-sm ps-3 ${image ? "" : "text-slate-300"}`}
          >
            {image ? image.name : "Tidak ada file yang dipilih"}
          </span>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={imageChangeHandler}
            required
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>
      <Button type="submit" className="w-full mt-2">
        Daftar
      </Button>
    </div>
  );
};

export default RegisterForm;
