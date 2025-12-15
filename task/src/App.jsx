import React from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LoginForm from "./components/LoginForm";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";

const AppContent = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <LoginForm />;
  }

  return currentUser.role === "admin" ? <AdminDashboard /> : <UserDashboard />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
