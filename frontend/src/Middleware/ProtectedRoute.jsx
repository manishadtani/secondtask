// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Dashboard from "../pages/Dashboard";

const ProtectedRoute = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/tasks");
        setAuth(true);
      } catch (err) {
        setAuth(false);
      }
    };
    checkAuth();
  }, []);

  if (auth === null) return <p>Checking authentication...</p>;
  console.log("Protected Route triggered");
   console.log("Auth state:", auth);

  return auth ?  <Dashboard /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
