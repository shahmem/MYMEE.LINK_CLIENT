// src/api/axios.js
import axios from "axios";

const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Create axios instance
const api = axios.create({
  baseURL: apiBase,
  withCredentials: true, // IMPORTANT: Enable sending cookies for CORS
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized - Token expired or invalid
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      // Redirect to login only if not already on login/signup/public pages
      const currentPath = window.location.pathname;
      const publicPaths = ["/login", "/signup", "/", "/register"];
      const isPublicProfile = currentPath.match(/^\/[a-zA-Z0-9_]+$/); // matches /:username
      
      if (!publicPaths.includes(currentPath) && !isPublicProfile) {
        window.location.href = "/login";
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;