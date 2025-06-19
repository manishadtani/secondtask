import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../utils/axios";

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/tasks"); // Dummy auth check
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

  return auth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
