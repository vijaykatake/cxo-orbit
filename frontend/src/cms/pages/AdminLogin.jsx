import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function AdminLogin() {
  const isLocal = window.location.hostname === "localhost";

  const [email, setEmail] = useState(isLocal ? "admin@cxoorbit.com" : "");
  const [password, setPassword] = useState(isLocal ? "Admin@123" : "");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email & password");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API.admin}/login`, {
        email,
        password,
      });

      localStorage.setItem("adminToken", res.data.token);

      navigate("/cms/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 shadow-md w-96 rounded"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 border rounded pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5"
          >
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className={`cursor-pointer transition ${
                showPassword
                  ? "text-red-500 hover:text-red-700"
                  : "text-black hover:text-gray-600"
              }`}
            />
          </span>
        </div>

        <button
          disabled={loading}
          className="w-full bg-black text-white p-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
