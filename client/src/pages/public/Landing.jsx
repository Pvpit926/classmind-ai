import { useNavigate } from 'react-router-dom';
import Navbar from '../../layouts/Navbar';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { ASSESSMENT_CATEGORIES } from '../../data/demoData';
import { HiArrowRight, HiLightningBolt, HiAcademicCap, HiChartBar, HiUserGroup } from 'react-icons/hi';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent-400 rounded-full filter blur-3xl animate-float" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-white/80 text-sm font-medium mb-6 backdrop-blur-sm border border-white/10">
                ✨ AI-Powered Student Assessment
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight font-display">
                Know How Ready Your Students Are for{' '}
                <span className="bg-gradient-to-r from-accent-300 to-purple-300 bg-clip-text text-transparent">
                  Engineering.
                </span>
              </h1>
              <p className="text-lg text-gray-300 mt-6 max-w-xl leading-relaxed">
                Assess first-year students, identify learning gaps, and provide personalized academic guidance — all powered by AI.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Button
                  size="lg"
                  onClick={() => navigate('/register')}
                  iconRight={HiArrowRight}
                  className="!bg-white !text-navy-800 hover:!bg-gray-100"
                >
                  Get Started
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="!text-white hover:!bg-white/10"
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  How It Works
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-10">
                <div className="flex -space-x-2">
                  {['A', 'S', 'R', 'M'].map((initial, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-accent-400 border-2 border-navy-800 flex items-center justify-center text-white text-xs font-semibold">
                      {initial}
                    </div>
                  ))}
                </div>
                <span className="text-gray-400 text-sm">Trusted by engineering colleges</span>
              </div>
            </div>
            <div className="hidden lg:block animate-slide-up">
              <div className="relative">
                {/* Dashboard Preview Card */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 shadow-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent-500/30 flex items-center justify-center">
                        <span className="text-white text-lg">📊</span>
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">Engineering Readiness</p>
                        <p className="text-gray-400 text-xs">Overall Score</p>
                      </div>
                      <span className="ml-auto text-2xl font-bold text-accent-300 font-display">78%</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Curriculum', value: '82%', color: 'bg-accent-500/30' },
                        { label: 'Academic', value: '75%', color: 'bg-purple-500/30' },
                        { label: 'Learning', value: '71%', color: 'bg-cyan-500/30' },
                        { label: 'Time Mgmt', value: '68%', color: 'bg-amber-500/30' },
                      ].map((item) => (
                        <div key={item.label} className={`${item.color} rounded-xl p-3 border border-white/10`}>
                          <p className="text-white/60 text-xs">{item.label}</p>
                          <p className="text-white font-bold text-lg font-display">{item.value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                      <p className="text-white/60 text-xs mb-2">Category Performance</p>
                      <div className="space-y-2">
                        {[82, 75, 71, 68, 85].map((val, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-full bg-white/10 rounded-full h-1.5">
                              <div className="h-1.5 rounded-full bg-accent-400" style={{ width: `${val}%` }} />
                            </div>
                            <span className="text-white/60 text-xs w-8">{val}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-lg animate-float border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-success-50 flex items-center justify-center">
                      <span className="text-success-500">✓</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-navy-800">45 Students</p>
                      <p className="text-xs text-gray-500">Assessed today</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center px-3 py-1 bg-accent-50 text-accent-600 text-sm font-semibold rounded-full mb-4">
              Simple Process
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-800 font-display">
              How ClassMind Works
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              A simple three-step process to understand and support your students.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Assess', desc: 'Understand student readiness with tailored AI-generated assessments.', icon: '📝', color: 'bg-accent-50 text-accent-600' },
              { step: '02', title: 'Identify', desc: 'Find areas requiring academic support across multiple dimensions.', icon: '🔍', color: 'bg-purple-50 text-purple-600' },
              { step: '03', title: 'Guide', desc: 'Provide personalized next steps and actionable recommendations.', icon: '🎯', color: 'bg-success-50 text-success-600' },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="card-hover p-8 text-center h-full">
                  <span className="text-xs font-bold text-gray-300 tracking-widest">{item.step}</span>
                  <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center mx-auto mt-4 mb-5 text-2xl group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-navy-800 mb-3 font-display">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 text-gray-300">
                    <HiArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment Areas */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center px-3 py-1 bg-accent-50 text-accent-600 text-sm font-semibold rounded-full mb-4">
              Comprehensive Assessment
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-800 font-display">
              Assessment Areas
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              ClassMind evaluates students across five key readiness dimensions.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {ASSESSMENT_CATEGORIES.map((cat, i) => (
              <div
                key={cat.id}
                className="card-hover p-6 text-center animate-fade-in bg-white rounded-2xl shadow-sm border border-gray-100"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="text-3xl mb-3 block">{cat.icon}</span>
                <h3 className="font-semibold text-navy-800 text-sm mb-2">{cat.label}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center px-3 py-1 bg-accent-50 text-accent-600 text-sm font-semibold rounded-full mb-4">
              Features
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-800 font-display">
              Why ClassMind AI?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <HiAcademicCap className="w-6 h-6" />, title: 'Student Readiness Profile', desc: 'ClassMind converts assessment responses into a multi-dimensional readiness profile.', color: 'bg-accent-50 text-accent-600' },
              { icon: <HiLightningBolt className="w-6 h-6" />, title: 'AI Assessment Generator', desc: 'Teacher creates a complete assessment without writing a prompt.', color: 'bg-purple-50 text-purple-600' },
              { icon: <HiChartBar className="w-6 h-6" />, title: 'Personalized Guidance', desc: 'Students receive practical recommendations based on their results.', color: 'bg-cyan-50 text-cyan-600' },
              { icon: <HiUserGroup className="w-6 h-6" />, title: 'Teacher Class Insights', desc: 'Teachers can identify common areas where students need academic support.', color: 'bg-success-50 text-success-600' },
            ].map((feature, i) => (
              <div key={i} className="card-hover p-6">
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="font-bold text-navy-800 mb-2 font-display">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Next? */}
      <section className="py-20 lg:py-28 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center px-3 py-1 bg-accent-50 text-accent-600 text-sm font-semibold rounded-full mb-4">
              Roadmap
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-800 font-display">
              What's Next?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-accent-100 bg-white">
              <h3 className="text-xl font-bold text-navy-800 font-display mb-4">Current Features</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3"><span className="text-success-500">✅</span> Readiness Assessment</li>
                <li className="flex items-center gap-3"><span className="text-success-500">✅</span> AI Test Generation</li>
                <li className="flex items-center gap-3"><span className="text-success-500">✅</span> Personalized Guidance</li>
                <li className="flex items-center gap-3"><span className="text-success-500">✅</span> Teacher Analytics</li>
              </ul>
            </Card>
            <Card className="border-gray-200 bg-white">
              <h3 className="text-xl font-bold text-navy-800 font-display mb-4">Future Innovation</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-accent-500 mt-1">🔵</span>
                  <div>
                    <strong className="block text-navy-800">Camera Interaction Module</strong>
                    <span className="text-xs text-gray-500 leading-tight">Explore additional interaction signals during assessments. Current prototype demonstrates camera experience.</span>
                  </div>
                </li>
                <li className="flex items-center gap-3"><span className="text-accent-500">🔵</span> Advanced Learning Analytics</li>
                <li className="flex items-center gap-3"><span className="text-accent-500">🔵</span> Long-Term Progress Tracking</li>
                <li className="flex items-center gap-3"><span className="text-accent-500">🔵</span> College Resource Recommendations</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 bg-accent-400 rounded-full filter blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white font-display mb-6">
            Ready to Understand Your Students Better?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
            Start assessing your first-year engineering students today with ClassMind AI.
          </p>
          <Button
            size="xl"
            onClick={() => navigate('/register')}
            iconRight={HiArrowRight}
            className="!bg-white !text-navy-800 hover:!bg-gray-100"
          >
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-950 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">CM</span>
              </div>
              <span className="text-lg font-bold text-white font-display">
                ClassMind <span className="text-accent-400">AI</span>
              </span>
            </div>
            <p className="text-sm">Understand. Assess. Guide.</p>
            <p className="text-sm">© {new Date().getFullYear()} ClassMind AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
