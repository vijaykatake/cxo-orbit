import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const adminName = "Admin";

  const [crmOpen, setCrmOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(false); // ✅ NEW

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // ✅ MUST MATCH
    window.location.href = "/#/cms/login";
  };

  return (
    <div
      className={`h-screen ${
        collapsed ? "w-20" : "w-64"
      } bg-white/80 backdrop-blur-lg border-r border-gray-200 flex flex-col justify-between transition-all duration-300`}
    >
      {/* TOP */}
      <div>
        {/* Header / Profile */}
        <div className="p-4 border-b flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-user-shield text-xl text-blue-600"></i>
              <div>
                <p className="text-xs text-gray-500">Welcome</p>
                <p className="font-semibold text-sm">{adminName}</p>
              </div>
            </div>
          )}

          {/* Pin Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-500 hover:text-black"
          >
            <i className="fa-solid fa-thumbtack"></i>
          </button>
        </div>

        {/* MENU */}
        <div className="p-2">
          {/* CRM CONTENT */}
          <button
            onClick={() => setCrmOpen(!crmOpen)}
            className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
          >
            <span className="flex items-center gap-3">
              <i className="fa-solid fa-layer-group"></i>
              {!collapsed && "CRM"}
            </span>

            {!collapsed && (
              <i
                className={`fa-solid fa-chevron-${crmOpen ? "down" : "right"} text-xs`}
              ></i>
            )}
          </button>

          {/* SUB MENU */}
          {crmOpen && (
            <div className={`mt-2 space-y-1 ${collapsed ? "" : "ml-6"}`}>
              <MenuItem
                to="/cms/events"
                icon="fa-calendar"
                label="Events"
                collapsed={collapsed}
              />
              <MenuItem
                to="/cms/about"
                icon="fa-circle-info"
                label="About"
                collapsed={collapsed}
              />
              <MenuItem
                to="/cms/contact"
                icon="fa-address-book"
                label="Contact"
                collapsed={collapsed}
              />
              <MenuItem
                to="/cms/sponsors"
                icon="fa-handshake"
                label="Sponsors"
                collapsed={collapsed}
              />
              <MenuItem
                to="/cms/insights"
                icon="fa-chart-line"
                label="Insights"
                collapsed={collapsed}
              />
            </div>
          )}

          {/* TERMS */}
          <MenuItem
            to="/cms/terms"
            icon="fa-file-lines"
            label="Terms"
            collapsed={collapsed}
            extraClass="mt-4"
          />
        </div>
      </div>

      {/* BOTTOM */}
      <div className="p-3 border-t">
        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded mb-3"
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          {!collapsed && "Logout"}
        </button>

        {/* Copyright */}
        {!collapsed && (
          <p className="text-xs text-gray-400 text-center">
            © {new Date().getFullYear()} CXO Orbit
          </p>
        )}
      </div>
    </div>
  );
}

/* ✅ Reusable Menu Item */
function MenuItem({ to, icon, label, collapsed, extraClass = "" }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded text-sm ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-gray-600 hover:bg-gray-100"
        } ${extraClass}`
      }
    >
      <i className={`fa-solid ${icon}`}></i>
      {!collapsed && label}
    </NavLink>
  );
}
