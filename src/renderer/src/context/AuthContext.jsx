import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; 
// const API_BASE_URL = "https://bil-backend.onrender.com/"; // Change to your backend URL
// // Change to your backend URL
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [error, setError] = useState(null);
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error retrieving user from localStorage:", error);
      return null;
    }
  });

  // Register
  const register = async (formData) => {
    try {
      setError(null);
      const response = await axios.post(
        `${API_BASE_URL}/accounts/register/`,
        formData
      );
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.access);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      setError("Register failed. Please try again.");
      return false;
    }
  };

  // Login
  const login = async (formData) => {
    try {
      setError(null);
      const response = await axios.post(
        `${API_BASE_URL}/accounts/login/`,
        formData
      );
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError("Login failed. Please try again.");
      return false;
    }
  };

  // Logout
  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      // // Optional: logout from server
      // await axios.post(`${API_BASE_URL}accounts/logout/`, {
      //   refresh: refreshToken,
      // });

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
      return true;
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
      setError("Logout failed. Please try again.");
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
