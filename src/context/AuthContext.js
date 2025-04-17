import React, { createContext, useState, useEffect } from "react";
import { getCurrentUser } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userData = await getCurrentUser();
          setUser(userData);
          setError(null);
        } catch (err) {
          console.error("Authentication error:", err);
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          setError(err.message || "Authentication failed");
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  const clearUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        error,
        setError,
        clearUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
