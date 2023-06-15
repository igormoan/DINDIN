import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";

interface User {
  id: string;
  nome: string;
  email: string;
}

interface ApiLoginResponse {
  usuario: User;
  token: string;
}

interface AuthContextData {
  user: User | null;
  signIn: ({ email, senha }: { email: string; senha: string }) => Promise<void>;
  signUp: ({
    email,
    senha,
    nome,
  }: {
    email: string;
    senha: string;
    nome: string;
  }) => Promise<void>;
  signOut: () => void;
  isLogging: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [isLogging, setIsLogging] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const navigation = useNavigate();
  const location = useLocation();
  const route = location.pathname;

  useEffect(() => {
    async function revalidate() {
      try {
        const user = localStorage.getItem("@user");

        if (user) {
          setUser(JSON.parse(user));
          if (["/", "/signup"].includes(route)) {
            navigation("/dashboard");
          }
        }
      } catch (error) {
        alert("Sessão inválida");
      } finally {
        setIsLogging(false);
      }
    }
    revalidate();
  }, []);

  async function signIn({ email, senha }: { email: string; senha: string }) {
    try {
      const response = await api.post<ApiLoginResponse>("/login", {
        email,
        senha,
      });
      setUser(response.data.usuario);
      localStorage.setItem("@user", JSON.stringify(response.data.usuario));
      localStorage.setItem("@user_token", response.data.token);
      navigation("/dashboard");
    } catch (error) {
      alert("Usuário ou senha inválidos");
    }
  }

  async function signUp({
    email,
    senha,
    nome,
  }: {
    email: string;
    senha: string;
    nome: string;
  }) {
    try {
      const response = await api.post<ApiLoginResponse>("/usuario", {
        email,
        senha,
        nome,
      });
      navigation("/");
    } catch (error) {
      alert("Erro ao cadastrar");
    }
  }

  async function signOut() {
    setUser(null);
    localStorage.removeItem("@user");
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, isLogging }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
