import { useState } from "react";
import axios from "../utils/axios"; // uses axiosInstance with baseURL + cookies
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");

    try {
      const res = await axios.post("/auth/login", { email, password });
      console.log(res.data);
      setMessage("Login successful");
      navigate("/");
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="p-6 shadow-lg border rounded w-96 space-y-4">
        <h2 className="text-xl font-bold text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600">{message}</p>

        <p className="text-center text-sm text-blue-600">
          Don't have an account?{" "}
          <Link to="/register" className="underline text-blue-800 hover:text-blue-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
