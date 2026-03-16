import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiHome, FiCalendar, FiUsers, FiBriefcase, FiFileText, FiMail, FiLogOut, FiSettings } from 'react-icons/fi';

const navItems = [
  { to: '/admin/dashboard', icon: <FiHome />, label: 'Dashboard' },
  { to: '/admin/events',    icon: <FiCalendar />, label: 'Events' },
  { to: '/admin/users',     icon: <FiUsers />, label: 'Users & Members' },
  { to: '/admin/sponsors',  icon: <FiBriefcase />, label: 'Sponsors' },
  { to: '/admin/cms',       icon: <FiFileText />, label: 'CMS Pages' },
  { to: '/admin/emails',    icon: <FiMail />, label: 'Email Logs' },
];

export default function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 bg-royal-blue text-white flex flex-col shrink-0">
        <div className="p-5 border-b border-blue-800">
          <p className="font-bold text-soft-gold text-lg">CXO Orbit</p>
          <p className="text-gray-400 text-xs">Admin Panel</p>
        </div>
        <nav className="flex-1 py-4">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 text-sm transition-colors ${isActive ? 'bg-blue-800 text-soft-gold' : 'text-gray-300 hover:bg-blue-800 hover:text-white'}`
              }>
              {item.icon} {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-blue-800">
          <p className="text-xs text-gray-400 mb-2">{user?.firstName} {user?.lastName}</p>
          <p className="text-xs text-gray-500 mb-3 capitalize">{user?.role?.replace('_', ' ')}</p>
          <button onClick={() => { logout(); navigate('/admin/login'); }}
            className="flex items-center gap-2 text-gray-300 hover:text-red-400 text-sm transition-colors">
            <FiLogOut size={14} /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
