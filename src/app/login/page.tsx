"use client";

import Image from "next/image";
import { useState } from "react";
import { FaGoogle, FaFacebookF, FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      {/* Card */}
      <div className="w-[360px] bg-white rounded-3xl overflow-hidden">
        {/* Top Illustration */}
        <div className="relative w-full mt-5 h-52 flex items-center justify-center">
          <Image
            src="/Free Vector_ Flat Design Illustration of Customer Support-Photoroom.png"
            alt="Logo"
            width={310}
            height={100}
            className="mb-4"
          />
        </div>
        {/* Form Container */}
        <div className="px-6">
          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 text-center">
            Bem-vindo de volta!
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Faça login para continuar
          </p>

          {/* Social Buttons */}
          <div className="flex gap-3 mb-6">
            {/* Google */}
            <button className="flex-1 flex items-center justify-center gap-2 shadow-lg rounded-4xl py-2 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition">
              <Image
                src="/logo.png"
                alt="Google Logo"
                width={20}
                height={20}
                className="object-contain"
              />
              <span>Google</span>
            </button>

            {/* Facebook */}
            <button className="flex-1 flex items-center bg-blue-600 justify-center gap-2 rounded-4xl py-2 text-white font-medium hover:bg-blue-600 transition shadow-lg">
              <Image
                src="/facebook-logo.png"
                alt="Facebook Logo"
                width={19}
                height={19}
                className="object-contain"
              />
              <span>Facebook</span>
            </button>
          </div>


          {/* Divider */}
          <div className="relative mb-6">
            <hr className="border-gray-300" />
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 text-gray-400 text-sm">
              or sign with
            </span>
          </div>

          {/* Inputs */}
          <form className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder=""
                  className="mt-1 w-full rounded-lg border border-gray-400 px-3 py-2 text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                {/* Check icon */}
                <span className="absolute right-3 top-3 text-green-500">✔</span>
              </div>
            </div>
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative text-black">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder=""
                  className="mt-1 w-full rounded-lg border border-gray-400 px-3 py-2 text-black focus:border-blue-500 focus:ring-blue-500"
                />

              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full rounded-full bg-blue-600 py-3 text-white font-semibold shadow-md hover:bg-blue-700 transition"
            >
              Entrar
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Não tem uma conta?{" "}
            <a href="/cadastro" className="text-blue-600 font-medium hover:underline">
              cadastrar
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
