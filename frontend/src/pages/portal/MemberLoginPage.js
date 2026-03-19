import { useState, useEffect } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function MemberLoginPage() {
  const navigate = useNavigate();
  const { login, user } = useAuth(); // ✅ ADD THIS

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

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

      const res = await api.post("/auth/member-login", form);

      // ✅ USE CONTEXT LOGIN
      login(res.data.token, res.data.user);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ HANDLE NAVIGATION AFTER USER SET
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
          className="border p-2 rounded w-full mb-4"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 rounded w-full mb-6"
          onChange={handleChange}
        />

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
