import axios from 'axios';

// Base API URL for all requests
const API_URL = 'http://localhost:8085/api';
const AUTH_URL = `${API_URL}/auth`;

// Define types for auth responses
interface AuthResponse {
  id: number;
  username: string;
  email: string;
  roles: string[];
  tokenType: string;
  accessToken: string;
}

interface LoginData {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  role: string[];
  departmentDTO: {
    name?: string;
    code: string;
  };
  manager?: string;
}

// Auth service for public endpoints
export const apiService = {
  // Login function - handles user authentication
  async login(loginData: LoginData): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(`${AUTH_URL}/signin`, loginData);
      
      // Store authentication data in localStorage
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('userRole', JSON.stringify(response.data.roles));
      localStorage.setItem('userId', response.data.id.toString());
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('email', response.data.email);
      
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
  
  // Register function - creates new user accounts
  async register(userData: RegisterData, profileSecret: string) {
    try {
      const response = await axios.post(`${AUTH_URL}/signup`, userData, {
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
  
  // Helper function to generate auth headers
  getAuthHeader() {
    const token = localStorage.getItem('token');
    if (token) {
      return { Authorization: `Bearer ${token}` };
    } else {
      return {};
    }
  },
  
  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },
  
  // Get user roles
  getUserRoles() {
    const rolesStr = localStorage.getItem('userRole');
    return rolesStr ? JSON.parse(rolesStr) : [];
  },
  
  // Logout user and clear storage
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    window.location.href = '/login';
  },
  
  // Check if user has admin role
  isAdmin() {
    const roles = this.getUserRoles();
    return roles.includes('ROLE_ADMIN');
  },
  
  // Check if user has moderator role
  isModerator() {
    const roles = this.getUserRoles();
    return roles.includes('ROLE_MODERATOR') || roles.includes('ROLE_MOD');
  }
};

// Create an axios instance with auth header for protected API calls
export const protectedApi = axios.create({
  baseURL: API_URL
});

// Add request interceptor to inject auth token
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

// Add response interceptor to handle common errors
protectedApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);