import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import * as authAPI from "../api/auth";

export const useAuth = () => {
  const { user, setUser, loading, error, setError, clearUser } =
    useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  const login = async (credentials) => {
    try {
      setError(null);
      const userData = await authAPI.login(credentials);
      setUser(userData.user || { email: credentials.email, ...userData });
      return userData;
    } catch (error) {
      const errorMessage = error.message || "Failed to login";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const result = await authAPI.register(userData);
      setUser(result.user);
      return result;
    } catch (error) {
      const errorMessage = error.message || "Failed to register";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    authAPI.logout();
    clearUser();
    navigate("/login");
  };

  const refreshUserToken = async () => {
    try {
      setError(null);
      return await authAPI.refreshToken();
    } catch (error) {
      clearUser();
      const errorMessage =
        error.message || "Session expired. Please login again.";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const forgotPassword = async (email) => {
    try {
      setError(null);
      return await authAPI.forgotPassword(email);
    } catch (error) {
      const errorMessage = error.message || "Failed to send reset email";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const resetPassword = async (resetData) => {
    try {
      setError(null);
      return await authAPI.resetPassword(resetData);
    } catch (error) {
      const errorMessage = error.message || "Failed to reset password";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    refreshUserToken,
    forgotPassword,
    resetPassword,
  };
};
