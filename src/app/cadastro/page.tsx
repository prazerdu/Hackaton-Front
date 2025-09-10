"use client"
import Image from "next/image";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function SignUpPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Nome:", nome);
    console.log("Email:", email);
    console.log("Senha:", senha);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      
      {/* Botão Voltar */}
      <div className="absolute top-4 left-4">
        <a href="/login" className="text-green-600 text-2xl">
          <FaArrowLeft />
        </a>
      </div>

      {/* Logo */}
      <Image
        src="/logo.png" 
        alt="Logo" 
        className="w-36 mb-8"
      />

      {/* Título */}
      <h1 className="text-black font-bold mb-6 text-center">
        Crie sua conta
      </h1>

      {/* Formulário */}
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-xs flex flex-col gap-4"
      >
        {/* Nome */}
        <input
          type="text"
          placeholder="NOME"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full px-4 py-3 rounded-md bg-gray-300 text-gray-700 placeholder-gray-600 focus:outline-none"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="EMAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-md bg-gray-300 text-gray-700 placeholder-gray-600 focus:outline-none"
        />

        {/* Senha */}
        <input
          type="password"
          placeholder="SENHA"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full px-4 py-3 rounded-md bg-gray-300 text-gray-700 placeholder-gray-600 focus:outline-none"
        />

        {/* Botão Criar */}
        <button 
          type="submit"
          className="w-full py-3 rounded-md bg-blue-700 text-white font-bold hover:bg-blue-800 transition"
        >
          Criar
        </button>
      </form>

      {/* Link para Login */}
      <p className="mt-6 text-sm text-gray-600">
        Já registrado?{" "}
        <a href="/login" className="text-green-600 font-medium">
          fazer login
        </a>
      </p>
    </div>
  );
}
