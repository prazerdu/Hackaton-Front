"use client"
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Senha:", senha);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      
      {/* Logo */}
      <img 
        src="/logo.png" 
        alt="Logo" 
        className="w-36 mb-8"
      />

      {/* Título */}
      <h1 className="text-black font-bold mb-6 text-center">
        Entre na sua conta
      </h1>

      {/* Formulário */}
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-xs flex flex-col gap-4"
      >
        {/* Campo Email */}
        <input
          type="email"
          placeholder="EMAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-md bg-gray-300 text-gray-700 placeholder-gray-600 focus:outline-none"
        />

        {/* Campo Senha */}
        <input
          type="password"
          placeholder="SENHA"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full px-4 py-3 rounded-md bg-gray-300 text-gray-700 placeholder-gray-600 focus:outline-none"
        />

        {/* Botão */}
        <button 
          type="submit"
          className="w-full py-3 rounded-md bg-blue-700 text-white font-bold hover:bg-blue-800 transition"
        >
          Entrar
        </button>
      </form>

      {/* Link Sign Up */}
      <p className="mt-6 text-sm text-gray-600">
        Não tem uma conta?{" "}
        <a href="/cadastro" className="text-green-600 font-medium">
          Crie uma
        </a>
      </p>
    </div>
  );
}
