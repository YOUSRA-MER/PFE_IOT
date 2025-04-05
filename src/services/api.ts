import axios from 'axios';

const API_URL = 'http://localhost:8085/api/auth';

export const apiService = {
  async login(loginData: { username: string, password: string }) {
    try {
      const response = await axios.post(`${API_URL}/signin`, loginData);
      // Vous pouvez également ajouter un intercepteur ici pour stocker les tokens
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
    
  // Ajout de fonctions supplémentaires pour les autres endpoints
  async register(userData: any, profileSecret: string) {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData, {
        headers: {
          'profile-secret': profileSecret
        }
      });
      return response.data;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  },
    
  // Fonction utilitaire pour obtenir les headers d'authentification
  getAuthHeader() {
    const token = localStorage.getItem('token');
    if (token) {
      return { Authorization: `Bearer ${token}` };
    } else {
      return {};
    }
  },

  // Added methods for authentication checking
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  getUserRoles() {
    const rolesStr = localStorage.getItem('userRole');
    return rolesStr ? JSON.parse(rolesStr) : [];
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    window.location.href = '/login';
  }
};

// Créer une instance axios avec les headers d'authentification pour les requêtes protégées
export const protectedApi = axios.create({
  baseURL: 'http://localhost:8085/api'
});

// Ajouter un intercepteur pour injecter le token automatiquement
protectedApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);