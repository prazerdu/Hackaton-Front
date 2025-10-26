"use client";

import { useId, useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

import { useRouter } from "next/navigation";

type JwtPayload = {
  exp: number;
  role?: "COMMON" | "EVALUATOR" | "MANAGER" | "HUB_ADMIN";
};

type LoginModalProps = {
  open: boolean;
  onCloseAction: () => void;
};

export default function LoginModal({ open, onCloseAction }: LoginModalProps) {
  const id = useId();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);

  const redirectByRole = useCallback(
    (role?: JwtPayload["role"]) => {
      switch (role) {
        case "COMMON":
          router.push("/user");
          break;
        case "EVALUATOR":
          router.push("/evaluator");
          break;
        case "MANAGER":
          router.push("/admin");
          break;
        case "HUB_ADMIN":
          router.push("/hubadmin");
          break;
        default:
          router.push("/");
      }
    },
    [router]
  );

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        if (decoded.exp > Date.now() / 1000) {
          redirectByRole(decoded.role);
        } else {
          localStorage.removeItem("access_token");
        }
      } catch {
        localStorage.removeItem("access_token");
      }
    }
  }, [redirectByRole]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      const token = res.data.access_token;
      if (token) {
        localStorage.setItem("access_token", token);
        const decoded = jwtDecode<JwtPayload>(token);
        redirectByRole(decoded.role);
      } else {
        setError("Token não retornado pela API");
      }
    } catch (err) {
      console.error("Erro no login:", err);
      setError("Credenciais inválidas");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
        { credential: credentialResponse.credential },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      const token = res.data.token;
      if (token) {
        localStorage.setItem("access_token", token);
        const decoded = jwtDecode<JwtPayload>(token);
        redirectByRole(decoded.role);
      } else {
        console.error("Token ausente");
      }
    } catch (error) {
      console.error("Erro ao fazer login com o Google:", error);
    }
  };

  if (!isClient) return null;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onCloseAction()}>
      <DialogContent className="w-full max-w-[280px] sm:max-w-[400px] px-4 sm:px-6 py-6 sm:py-8 rounded-xl">
        <div className="flex flex-col items-center gap-2">
          <DialogHeader>
            <DialogTitle className="text-center text-lg sm:text-xl">
              Bem-vindo de volta
            </DialogTitle>
            <DialogDescription className="text-center text-sm sm:text-base">
              Introduza seus dados para entrar na sua conta.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor={`${id}-email`}>Email</Label>
              <Input
                id={`${id}-email`}
                placeholder="hi@yourcompany.com"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor={`${id}-password`}>Password</Label>
              <Input
                id={`${id}-password`}
                placeholder="Enter your password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between gap-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id={`${id}-remember`}
                checked={remember}
                onCheckedChange={(checked) => setRemember(!!checked)}
              />
              <Label htmlFor={`${id}-remember`} className="text-muted-foreground font-normal">
                Lembrar-me
              </Label>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>

          <div className="text-center text-sm mt-2">
            <a
              href="/startup-login"
              className="text-blue-700 hover:underline underline-offset-2"
            >
              Entrar como startup
            </a>
          </div>
        </form>

        <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1 my-4">
          <span className="text-muted-foreground text-xs">Ou</span>
        </div>

        <div className="w-full flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.error("Login com Google falhou")}
            logo_alignment="center"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
