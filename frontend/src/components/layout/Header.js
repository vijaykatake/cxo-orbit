import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';

const navLinks = [
  { to: '/',          label: 'Home' },
  { to: '/about',     label: 'About' },
  { to: '/events',    label: 'Events' },
  { to: '/community', label: 'CXO Community' },
  { to: '/sponsors',  label: 'Sponsors' },
  { to: '/insights',  label: 'Insights' },
  { to: '/contact',   label: 'Contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-royal-blue shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-soft-gold font-bold text-xl tracking-wide">CXO Orbit</span>
          <span className="text-white text-sm font-light">Global</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-6">
          {navLinks.map(l => (
            <NavLink key={l.to} to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? 'text-soft-gold' : 'text-white hover:text-soft-gold'}`
              }>
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-white text-sm">Hi, {user.firstName}</span>
              <button onClick={() => { logout(); navigate('/'); }}
                className="text-soft-gold border border-soft-gold px-3 py-1.5 rounded text-sm hover:bg-soft-gold hover:text-royal-blue transition-all">
                Logout
              </button>
              {isAdmin() && (
                <Link to="/admin" className="btn-primary text-sm px-4 py-1.5 rounded">Admin</Link>
              )}
            </div>
          ) : (
            <>
              <Link to="/portal/login" className="text-white hover:text-soft-gold text-sm transition-colors">Member Login</Link>
              <Link to="/contact" className="btn-primary text-sm px-4 py-2 rounded">Partner With Us</Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="lg:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-royal-blue border-t border-blue-800 px-4 pb-4">
          {navLinks.map(l => (
            <NavLink key={l.to} to={l.to} onClick={() => setMenuOpen(false)}
              className="block py-2 text-white hover:text-soft-gold text-sm">
              {l.label}
            </NavLink>
          ))}
          <Link to="/portal/login" onClick={() => setMenuOpen(false)}
            className="block py-2 text-soft-gold font-medium text-sm">
            Member Login
          </Link>
        </div>
      )}
    </header>
  );
}
