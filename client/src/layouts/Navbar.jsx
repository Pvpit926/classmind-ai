import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';
import { HiMenu, HiX } from 'react-icons/hi';
import { useState } from 'react';

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">CM</span>
            </div>
            <span className="text-lg font-bold text-navy-800 font-display group-hover:text-accent-600 transition-colors">
              ClassMind <span className="text-accent-600">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-gray-600 hover:text-accent-600 transition-colors">Home</Link>
            <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-accent-600 transition-colors">How It Works</a>
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-accent-600 transition-colors">Features</a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Button
                size="sm"
                onClick={() => navigate(user.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard')}
              >
                Dashboard
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button size="sm" onClick={() => navigate('/register')}>
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-gray-100 animate-slide-up">
          <div className="px-4 py-4 space-y-3">
            <Link to="/" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-accent-600 rounded-xl hover:bg-accent-50 transition-colors">Home</Link>
            <a href="#how-it-works" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-accent-600 rounded-xl hover:bg-accent-50 transition-colors">How It Works</a>
            <a href="#features" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-accent-600 rounded-xl hover:bg-accent-50 transition-colors">Features</a>
            <div className="pt-3 border-t border-gray-100 space-y-2">
              {user ? (
                <Button className="w-full" onClick={() => { navigate(user.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard'); setMobileOpen(false); }}>
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button variant="secondary" className="w-full" onClick={() => { navigate('/login'); setMobileOpen(false); }}>Login</Button>
                  <Button className="w-full" onClick={() => { navigate('/register'); setMobileOpen(false); }}>Get Started</Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
