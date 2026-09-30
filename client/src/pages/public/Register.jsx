import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { BRANCHES } from '../../data/demoData';
import { HiMail, HiLockClosed, HiUser, HiAcademicCap, HiArrowLeft } from 'react-icons/hi';

const Register = () => {
  const [step, setStep] = useState('role'); // 'role' | 'form'
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', college: '', branch: '', year: 'First Year', department: '',
  });
  const { register, loading } = useAuth();
  const { success } = useToast();
  const navigate = useNavigate();

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ ...formData, role });
      success('Account created successfully!');
      navigate(role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard');
    } catch (err) {
      // Error handled by context
    }
  };

  if (step === 'role') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md animate-fade-in">
          <div className="flex items-center justify-center gap-2.5 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-sm">
              <span className="text-white font-bold">CM</span>
            </div>
            <span className="text-xl font-bold text-navy-800 font-display">ClassMind AI</span>
          </div>
          <div className="card p-8">
            <h1 className="text-2xl font-bold text-navy-800 font-display text-center mb-2">
              Create Your Account
            </h1>
            <p className="text-gray-500 text-center mb-8">Choose your role to get started.</p>
            <div className="space-y-4">
              {[
                { id: 'student', icon: '🎓', label: 'Student', desc: 'Take assessments and track your engineering readiness.' },
                { id: 'teacher', icon: '👩‍🏫', label: 'Teacher', desc: 'Create assessments and monitor student readiness.' },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => { setRole(r.id); setStep('form'); }}
                  className="w-full text-left p-5 rounded-2xl border-2 border-gray-200 hover:border-accent-500 hover:bg-accent-50 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{r.icon}</span>
                    <div>
                      <h3 className="font-semibold text-navy-800 group-hover:text-accent-700">{r.label}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">{r.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-center mt-6 text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-accent-600 font-medium hover:text-accent-700">Login</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md animate-fade-in">
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-sm">
            <span className="text-white font-bold">CM</span>
          </div>
          <span className="text-xl font-bold text-navy-800 font-display">ClassMind AI</span>
        </div>
        <div className="card p-8">
          <button
            onClick={() => setStep('role')}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-accent-600 mb-4 transition-colors"
          >
            <HiArrowLeft className="w-4 h-4" /> Change role
          </button>
          <h1 className="text-2xl font-bold text-navy-800 font-display">
            {role === 'student' ? '🎓 Student' : '👩‍🏫 Teacher'} Registration
          </h1>
          <p className="text-gray-500 mt-1 mb-6">Fill in your details to create your account.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              icon={HiUser}
              required
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@college.edu"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              icon={HiMail}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => updateField('password', e.target.value)}
              icon={HiLockClosed}
              required
            />
            <Input
              label="College"
              placeholder="Enter your college name"
              value={formData.college}
              onChange={(e) => updateField('college', e.target.value)}
              icon={HiAcademicCap}
              required
            />

            {role === 'student' ? (
              <>
                <Select
                  label="Engineering Branch"
                  options={BRANCHES}
                  value={formData.branch}
                  onChange={(e) => updateField('branch', e.target.value)}
                  placeholder="Select your branch"
                  required
                />
                <Select
                  label="Engineering Year"
                  options={['First Year', 'Second Year', 'Third Year', 'Fourth Year']}
                  value={formData.year}
                  onChange={(e) => updateField('year', e.target.value)}
                  required
                />
              </>
            ) : (
              <Input
                label="Department"
                placeholder="e.g. Computer Science"
                value={formData.department}
                onChange={(e) => updateField('department', e.target.value)}
                required
              />
            )}

            <Button type="submit" className="w-full" size="lg" loading={loading}>
              Create Account
            </Button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-accent-600 font-medium hover:text-accent-700">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
