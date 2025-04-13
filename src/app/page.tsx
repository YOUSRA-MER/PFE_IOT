"use client";
import React, { useState, FormEvent } from "react";
import { UserCircle2, Lock, LogIn, Clock, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { apiService } from "@/services/api";

// Define types for API responses and data
interface LoginData {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  roles: string[];
  id: number; 
  username: string;
  email: string;
}

interface ApiError {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username || !password) {
      setError("Veuillez entrer un nom d'utilisateur et un mot de passe.");
      setLoading(false);
      return;
    }

    try {
      const loginData: LoginData = {
        username: username,
        password: password
      };

      const response: LoginResponse = await apiService.login(loginData);
      
      localStorage.setItem("token", response.accessToken);
      localStorage.setItem("userRole", JSON.stringify(response.roles));
      localStorage.setItem("userId", response.id.toString());
      localStorage.setItem("username", response.username);
      localStorage.setItem("email", response.email);
      
      console.log("Connexion réussie:", response);
      
      if (response.roles.includes("ROLE_ADMIN")) {
        router.push("/admin");
      } else if (response.roles.includes("ROLE_MODERATOR")) {
        router.push("/manager");
      } else {
        router.push("/dashboard");
      }
    } catch (error: unknown) {
      const err = error as ApiError;
      if (err.response && err.response.status === 401) {
        setError("Identifiants incorrects. Veuillez réessayer.");
      } else if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.message === "Network Error") {
        setError("Impossible de se connecter au serveur. Vérifiez votre connexion ou si le serveur est démarré.");
      } else {
        setError("Échec de connexion. Veuillez réessayer plus tard.");
      }
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lamaSkyLight via-white to-lamaPurpleLight p-4 relative overflow-hidden">
      {/* Creative Background Elements */}
      <div className="absolute w-64 h-64 rounded-full bg-lamaSky opacity-20 -top-20 -left-20 blur-xl"></div>
      <div className="absolute w-96 h-96 rounded-full bg-lamaPurple opacity-10 -bottom-40 -right-20 blur-xl"></div>
      <div className="absolute w-32 h-32 rounded-full bg-lamaYellow opacity-10 top-1/4 right-1/4 blur-lg"></div>
      <div className="absolute w-48 h-48 rounded-full border-4 border-lamaSky opacity-10 bottom-1/3 left-1/4 animate-pulse"></div>
      
      {/* Decorative floating elements */}
      <div className="absolute top-1/4 left-1/3 w-6 h-6 bg-lamaSky rounded-md opacity-20 animate-bounce" style={{ animationDuration: '3s' }}></div>
      <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-lamaPurple rounded-full opacity-30 animate-bounce" style={{ animationDuration: '2.5s' }}></div>
      <div className="absolute top-2/3 left-1/4 w-8 h-8 bg-lamaYellowLight rounded-md opacity-20 animate-bounce" style={{ animationDuration: '4s' }}></div>
      
      <div className="w-full max-w-4xl bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden flex relative z-10">
        {/* Left Side - Illustration */}
        <div className="hidden md:block w-5/12 bg-gray-50 bg-opacity-70 p-6 relative">
          <div className="absolute top-4 left-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-lamaSky flex items-center justify-center shadow-md">
                <Clock className="w-6 h-6 text-gray-700" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-800">TimeTrack</span>
            </div>
          </div>
          
          <div className="h-full flex items-center justify-center">
            <div className="w-full h-full relative">
              {/* Background Decorations */}
              <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-lamaSky rounded-md opacity-30"></div>
              <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-lamaPurple rounded-md opacity-20"></div>
              
              {/* Illustration */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="relative w-80 h-56">
                  {/* Dashboard-like elements */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-44 bg-white rounded-lg shadow-lg border border-gray-200"></div>
                  
                  {/* Header bar */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-14 w-56 h-32 bg-white rounded-lg shadow-md border border-gray-200"></div>
                  
                  {/* Dashboard elements */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-60 h-8 bg-lamaSky rounded-t-lg flex items-center px-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400 mr-1.5"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 mr-1.5"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  
                  {/* Time tracking visuals */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-18 flex space-x-3">
                    <div className="w-10 h-10 bg-lamaPurple bg-opacity-30 rounded-md flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full border-2 border-lamaPurple"></div>
                    </div>
                    <div className="w-10 h-10 bg-lamaSky bg-opacity-30 rounded-md flex items-center justify-center">
                      <div className="w-6 h-1.5 bg-lamaSky rounded"></div>
                    </div>
                    <div className="w-10 h-10 bg-lamaYellowLight bg-opacity-30 rounded-md flex items-center justify-center">
                      <div className="w-6 h-3.5 border border-lamaYellow rounded-sm"></div>
                    </div>
                  </div>
                  
                  {/* Calendar icon */}
                  <div className="absolute bottom-0 right-6 w-12 h-14 bg-white rounded-md shadow-md flex flex-col items-center border border-gray-200">
                    <div className="w-full h-2.5 bg-lamaPurple rounded-t-md"></div>
                    <div className="flex-1 flex items-center justify-center text-sm font-bold text-gray-600">10</div>
                  </div>
                  
                  {/* Clock icon */}
                  <div className="absolute bottom-0 left-6 w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-200">
                    <div className="w-10 h-10 rounded-full border-2 border-lamaSky flex items-center justify-center">
                      <div className="w-4 h-0.5 bg-gray-600 origin-left rotate-45"></div>
                      <div className="w-3 h-0.5 bg-gray-800 origin-left -rotate-45"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Login Form */}
        <div className="w-full md:w-7/12 p-8 relative">
          <button type="button" className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
          
          <div className="max-w-md mx-auto mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Système de Gestion de Pointage</h2>
            <p className="text-gray-600 mb-6 text-sm">Connectez-vous à votre compte</p>
            
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-md mb-5 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">Nom d'utilisateur</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <UserCircle2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-lamaSky transition-colors text-sm"
                    placeholder="yousra.test"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">Mot de passe</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-lamaSky transition-colors text-sm"
                    placeholder="••••••••••"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="w-4 h-4 text-lamaSky border-gray-300 rounded focus:ring-lamaSky"
                  />
                  <label htmlFor="remember-me" className="ml-2 text-xs text-gray-600">
                    Se souvenir de moi
                  </label>
                </div>
                
                <div>
                  <a href="#" className="text-xs text-lamaSky hover:underline">
                    Mot de passe oublié?
                  </a>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-lamaSky hover:bg-opacity-90 text-gray-800 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-lamaSky focus:ring-offset-2 flex items-center justify-center text-sm shadow-md"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connexion en cours...
                  </div>
                ) : (
                  <>
                    <LogIn className="mr-2 h-5 w-5" />
                    Se connecter
                  </>
                )}
              </button>
            </form>
            
            <p className="mt-8 text-center text-gray-600 text-xs">
              Vous n'avez pas de compte? <a href="#" className="text-lamaSky hover:underline">Contactez votre administrateur</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}