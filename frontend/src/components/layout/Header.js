import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/COX_Logo01.jpeg";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/events", label: "Conferences & Events" },
  { to: "/community", label: "CXO Community" },
  { to: "/sponsors", label: "Sponsors" },
  { to: "/insights", label: "Insights" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-royal-blue shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
        {/* LOGO */}
        <Link
          to="/"
          className="flex flex-col items-center justify-center leading-tight"
        >
          <img
            src={logo}
            alt="CXO Orbit Global"
            className="h-10 w-auto object-contain"
          />

          <span className="text-soft-gold font-bold text-sm tracking-wide mt-1 hidden sm:block">
            CXO ORBIT GLOBAL
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-soft-gold"
                    : "text-white hover:text-soft-gold"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* DESKTOP RIGHT SECTION */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <>
              <span className="text-white text-sm">Hi, {user.firstName}</span>

              <button
                onClick={handleLogout}
                className="text-soft-gold border border-soft-gold px-3 py-1.5 rounded text-sm hover:bg-soft-gold hover:text-royal-blue transition-all"
              >
                Logout
              </button>

              {isAdmin() && (
                <Link
                  to="/admin"
                  className="bg-soft-gold text-royal-blue font-medium text-sm px-4 py-1.5 rounded hover:opacity-90"
                >
                  Admin
                </Link>
              )}
            </>
          ) : (
            <>
              <Link
                to="/portal/login"
                className="text-white hover:text-soft-gold text-sm transition-colors"
              >
                Member Login
              </Link>

              <Link
                to="/contact"
                className="bg-soft-gold text-royal-blue text-sm px-4 py-2 rounded font-medium hover:opacity-90"
              >
                Partner With Us
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="lg:hidden bg-royal-blue border-t border-blue-800 px-4 pb-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-white hover:text-soft-gold text-sm"
            >
              {link.label}
            </NavLink>
          ))}

          {user ? (
            <>
              <div className="text-white py-2 text-sm">
                Hi, {user.firstName}
              </div>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="block w-full text-left py-2 text-soft-gold text-sm"
              >
                Logout
              </button>

              {isAdmin() && (
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-soft-gold text-sm"
                >
                  Admin Panel
                </Link>
              )}
            </>
          ) : (
            <>
              <Link
                to="/portal/login"
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-soft-gold text-sm"
              >
                Member Login
              </Link>

              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-soft-gold text-sm"
              >
                Partner With Us
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
