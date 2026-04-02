import { useState, useEffect } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function MemberLoginPage() {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const isLocal = window.location.hostname === "localhost";

  const [form, setForm] = useState({
    email: isLocal ? "vijukatake@gmail.com" : "",
    password: isLocal ? "Vijay" : "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert("Email and password required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/api/auth/member-login", form);

      login(res.data.token, res.data.user);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/portal/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-royal-blue mb-6 text-center">
          Member Login
        </h2>

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          className="border p-2 rounded w-full mb-4"
          onChange={handleChange}
        />

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            className="border p-2 rounded w-full pr-10"
            onChange={handleChange}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 cursor-pointer text-gray-500"
          >
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className={`cursor-pointer ${
                showPassword ? "text-red-500" : "text-black"
              }`}
            />
          </span>
        </div>

        <button
          onClick={handleLogin}
          className="btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
