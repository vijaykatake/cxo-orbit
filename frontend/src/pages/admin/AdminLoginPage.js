import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api";
import { useAuth } from "../../context/AuthContext";

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/admin/login", data);

      // Added success check before attempting login
      if (res.data.success && res.data.token) {
        login(res.data.token, res.data.user);
        toast.success("Logged in successfully!");
        navigate("/admin/dashboard", { replace: true });
      } else {
        toast.error("Login failed - invalid response");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-royal-blue flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-royal-blue font-bold text-2xl">
            CXO Orbit Admin
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Internal panel — authorized access only
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              className="w-full border rounded px-4 py-2.5 text-sm focus:outline-none focus:border-royal-blue"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              className="w-full border rounded px-4 py-2.5 text-sm focus:outline-none focus:border-royal-blue"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-royal-blue text-white w-full py-3 rounded font-medium hover:bg-opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer Note */}
        <p className="text-xs text-gray-400 text-center mt-6">
          Authorized access only
        </p>
      </div>
    </div>
  );
}
