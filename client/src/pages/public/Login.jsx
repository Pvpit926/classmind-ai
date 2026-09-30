import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { HiMail, HiLockClosed } from 'react-icons/hi';

const Login = () => {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, clearError } = useAuth();
  const { success } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    try {
      const user = await login(email, password, role);
      success(`Welcome back, ${user.name}!`);
      navigate(role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard');
    } catch (err) {
      // Error handled by auth context
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent-400 rounded-full filter blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        </div>
        <div className="relative text-center max-w-md">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">CM</span>
            </div>
            <span className="text-2xl font-bold text-white font-display">ClassMind AI</span>
          </div>
          <h2 className="text-3xl font-bold text-white font-display mb-4">
            Understand. Assess. Guide.
          </h2>
          <p className="text-gray-300 leading-relaxed">
            AI-powered readiness assessment for first-year engineering students. Help your students succeed from day one.
          </p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2.5 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-sm">
              <span className="text-white font-bold">CM</span>
            </div>
            <span className="text-xl font-bold text-navy-800 font-display">ClassMind AI</span>
          </div>

          <h1 className="text-2xl font-bold text-navy-800 font-display">Welcome to ClassMind AI</h1>
          <p className="text-gray-500 mt-2 mb-8">Sign in to continue to your dashboard.</p>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">I am a</label>
            <div className="grid grid-cols-2 gap-3">
              {['student', 'teacher'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${
                    role === r
                      ? 'border-accent-500 bg-accent-50 text-accent-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {r === 'student' ? '🎓 Student' : '👩‍🏫 Teacher'}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={HiMail}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={HiLockClosed}
              required
            />

            {error && (
              <div className="p-3 rounded-xl bg-danger-50 border border-danger-200 text-danger-600 text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" loading={loading}>
              Login
            </Button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <Link to="/register" className="text-sm text-accent-600 hover:text-accent-700 font-medium">
              Create Account
            </Link>
            <span className="text-gray-300 mx-3">•</span>
            <button className="text-sm text-gray-500 hover:text-gray-700">
              Forgot Password?
            </button>
          </div>

          {/* Demo Hint */}
          <div className="mt-8 p-4 rounded-xl bg-accent-50 border border-accent-100">
            <p className="text-xs text-accent-700 font-medium mb-1">🎮 Demo Mode</p>
            <p className="text-xs text-accent-600">Enter any email and password. Select your role and click Login to explore.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
