"use client";
import React, { useState } from "react";
import { UserCircle2, Lock, LogIn, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { apiService } from "@/services/api";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");  // Reset errors
    setLoading(true); // Active l'indicateur de chargement

    // Validate fields
    if (!username || !password) {
      setError("Veuillez entrer un nom d'utilisateur et un mot de passe.");
      setLoading(false);
      return;
    }

    try {
      const loginData = {
        username: username,
        password: password
      };

      const response = await apiService.login(loginData);
      
      // Stocker les informations utilisateur dans localStorage
      localStorage.setItem("token", response.accessToken); // Correction: accessToken au lieu de jwt
      localStorage.setItem("userRole", JSON.stringify(response.roles));
      localStorage.setItem("userId", response.id);
      localStorage.setItem("username", response.username);
      localStorage.setItem("email", response.email);
      
      console.log("Connexion réussie:", response);
      
      // Redirection basée sur le rôle
      if (response.roles.includes("ROLE_ADMIN")) {
        router.push("/admin");
      } else if (response.roles.includes("ROLE_MODERATOR")) {
        router.push("/manager");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      // Gestion plus détaillée des erreurs
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
      setLoading(false); // Désactive l'indicateur de chargement
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <div className="text-center mb-6">
          <Building2 className="w-16 h-16 mx-auto text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">Système de Gestion de Pointage</h1>
          <p className="text-gray-600">Connectez-vous à votre compte</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
            <div className="relative">
              <UserCircle2 className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-10 p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="nom d'utilisateur"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center ${
              loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
            } text-white py-2 rounded-lg`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connexion en cours...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5 mr-2" />
                Se connecter
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Vous n'avez pas de compte? <span className="text-indigo-600">Contactez votre administrateur</span>
        </p>
      </div>
    </div>
  );
}