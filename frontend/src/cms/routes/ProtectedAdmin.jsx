import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedAdmin({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("adminToken");

  // ❌ If not logged in → redirect to login
  if (!token) {
    return (
      <Navigate
        to="/cms/login"
        replace
        state={{ from: location }} // 🔥 useful for future redirect back
      />
    );
  }

  // ✅ If logged in → allow access
  return children;
}
