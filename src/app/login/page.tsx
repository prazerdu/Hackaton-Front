"use client";
import { useState } from "react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Senha:", senha);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white px-4">
            {/* Card do login */}
            <div className="bg-white rounded-3xl sm:shadow-2xl w-full max-w-md p-8 sm:p-10 relative overflow-hidden">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img
                        src=""
                        alt="Logo"
                        className="w-32 sm:w-36 transform hover:scale-105 transition duration-500"
                    />
                </div>

                {/* Título */}
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 text-center mb-8">
                    Entre na sua conta
                </h1>



                {/* Formulário */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <input
                        type="email"
                        placeholder="EMAIL"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-5 py-3 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition duration-300 shadow-sm"
                    />

                    <input
                        type="password"
                        placeholder="SENHA"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="w-full px-5 py-3 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition duration-300 shadow-sm"
                    />

                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold shadow-lg hover:from-green-600 hover:to-green-700 hover:shadow-2xl transition-all duration-300"
                    >
                        Entrar
                    </button>

                    {/* <a
            href="#"
            className="text-right text-sm text-gray-500 hover:text-green-500 transition"
          >
            Esqueceu a senha?
          </a> */}
                </form>
                {/* Separador */}
                <div className="flex items-center gap-3 mt-4 mb-3">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="text-gray-500 font-medium">ou</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>
                {/* Botões Sociais apenas com ícones */}
                <div className="flex justify-center gap-6 mb-6">
                    <button className="w-12 h-12 flex items-center justify-center rounded-full cursor-pointer bg-white text-white shadow-lg transform hover:shadow-lg hover:scale-105 transition duration-500">
                        <img src="/logo.png" alt="Google" width={28} height={28} />
                    </button>
                    <button className="w-11 h-11 mt-1 flex items-center justify-center rounded-full cursor-pointer text-white tranform hover:shadow-lg hover:scale-105 transition duration-500">
                        <img src="/facebook.png" alt="Facebook" width={44} height={44} />
                    </button>
                </div>

                <p className="mt-8 text-center text-sm text-gray-600">
                    Não tem uma conta?{" "}
                    <a
                        href="/cadastro"
                        className="text-green-600 font-medium hover:underline"
                    >
                        Crie uma
                    </a>
                </p>
            </div>
        </div>
    );
}
