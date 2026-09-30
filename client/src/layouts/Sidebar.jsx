import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import {
  HiHome, HiClipboardList, HiChartBar, HiLightBulb, HiTrendingUp,
  HiUser, HiCog, HiLogout, HiMenu, HiX, HiCamera
} from 'react-icons/hi';

const studentLinks = [
  { to: '/student/dashboard', label: 'Dashboard', icon: HiHome },
  { to: '/student/assessments', label: 'Assessments', icon: HiClipboardList },
  { to: '/student/results', label: 'Results', icon: HiChartBar },
  { to: '/student/recommendations', label: 'Recommendations', icon: HiLightBulb },
  { to: '/student/progress', label: 'Progress', icon: HiTrendingUp },
  { to: '/student/facial-analysis', label: 'Expression Analysis', icon: HiCamera },
  { to: '/student/profile', label: 'Profile', icon: HiUser },
];

const Sidebar = ({ role = 'student' }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = studentLinks;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const NavContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-xs">CM</span>
          </div>
          {!collapsed && (
            <span className="text-base font-bold text-navy-800 font-display">
              ClassMind <span className="text-accent-600">AI</span>
            </span>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <HiMenu className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-accent-50 text-accent-600 font-semibold'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`
            }
          >
            <link.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm">{link.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-3 border-t border-gray-100">
        <div className={`flex items-center gap-3 px-3 py-3 rounded-xl bg-gray-50 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 rounded-full bg-accent-100 flex items-center justify-center flex-shrink-0">
            <span className="text-accent-600 font-semibold text-sm">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-navy-800 truncate">{user?.name || 'Student'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
            </div>
          )}
        </div>
        <div className="mt-2 space-y-1">
          <button
            onClick={() => { navigate('/student/profile'); setMobileOpen(false); }}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-gray-500 text-sm hover:bg-gray-50 hover:text-gray-700 transition-colors"
          >
            <HiCog className="w-4 h-4" />
            {!collapsed && 'Settings'}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-danger-500 text-sm hover:bg-danger-50 transition-colors"
          >
            <HiLogout className="w-4 h-4" />
            {!collapsed && 'Logout'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Trigger */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-white shadow-card text-gray-600 hover:bg-gray-50 transition-colors"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation"
      >
        {mobileOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-navy-950/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-40 w-72 bg-white shadow-xl transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <NavContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col h-screen bg-white border-r border-gray-100 sticky top-0 transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <NavContent />
      </aside>
    </>
  );
};

export default Sidebar;
