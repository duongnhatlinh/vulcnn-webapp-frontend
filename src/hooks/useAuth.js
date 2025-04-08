import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import * as authAPI from "../api/auth";

export const useAuth = () => {
  const { user, setUser, loading } = useContext(AuthContext);
  const [authError, setAuthError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  const login = async (credentials) => {
    try {
      setAuthError(null);
      const userData = await authAPI.login(credentials);
      setUser(userData.user);
      return userData;
    } catch (error) {
      setAuthError(error.message || "Failed to login");
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      setAuthError(null);
      const result = await authAPI.register(userData);
      setUser(result.user);
      return result;
    } catch (error) {
      setAuthError(error.message || "Failed to register");
      throw error;
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
  };

  const forgotPassword = async (email) => {
    try {
      setAuthError(null);
      return await authAPI.forgotPassword(email);
    } catch (error) {
      setAuthError(error.message || "Failed to send reset email");
      throw error;
    }
  };

  const resetPassword = async (resetData) => {
    try {
      setAuthError(null);
      return await authAPI.resetPassword(resetData);
    } catch (error) {
      setAuthError(error.message || "Failed to reset password");
      throw error;
    }
  };

  return {
    user,
    loading,
    authError,
    isAuthenticated,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
  };
};
