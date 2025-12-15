import React, { createContext, useState, useEffect, useContext } from "react";
import {
  getUsers,
  getCurrentUser,
  saveCurrentUser,
  clearCurrentUser,
} from "../utils/storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const login = (username, password) => {
    const users = getUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      const userData = { username: user.username, role: user.role };
      setCurrentUser(userData);
      saveCurrentUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    clearCurrentUser();
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
