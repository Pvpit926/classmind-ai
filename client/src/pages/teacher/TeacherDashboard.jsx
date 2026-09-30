import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/Card';
import Button from '../../components/Button';
import StatCard from '../../components/StatCard';
import Badge from '../../components/Badge';
import EmptyState from '../../components/EmptyState';
import { DEMO_TEACHER_ASSESSMENTS, DEMO_TEACHER_ANALYTICS, ASSESSMENT_CATEGORIES } from '../../data/demoData';
import { HiPlus, HiEye, HiPencil } from 'react-icons/hi';
import api from '../../services/api';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(DEMO_TEACHER_ANALYTICS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.getTeacherAnalytics();
        if (response.success && response.data) {
          setAnalytics(response.data);
        }
      } catch (err) {
        console.error('Failed to fetch analytics', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="pt-2 lg:pt-0">
        <h1 className="text-2xl lg:text-3xl font-bold text-navy-800 font-display">Teacher Dashboard</h1>
        <p className="text-gray-500 mt-1">Understand how your students are adapting to engineering.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="👥" label="Total Students" value={analytics.totalStudents} color="accent" />
        <StatCard icon="📋" label="Assessments Created" value="3" color="purple" />
        <StatCard icon="✅" label="Completion Rate" value={`${analytics.completionRate}%`} color="success" />
        <StatCard icon="📊" label="Average Readiness" value={`${analytics.averageReadiness}%`} color="cyan" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Create Assessment CTA */}
          <Card
            hover
            onClick={() => navigate('/teacher/create')}
            className="gradient-card border-accent-100 cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-accent-100 flex items-center justify-center text-accent-600 group-hover:scale-110 transition-transform">
                <HiPlus className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-navy-800 font-display">+ Create Assessment</h2>
                <p className="text-gray-500 text-sm mt-0.5">Build a new readiness assessment for your students.</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Areas Requiring Attention */}
        <Card className="bg-warning-50 border-warning-100">
          <h2 className="text-lg font-semibold text-warning-800 mb-4 font-display">Areas Requiring Attention</h2>
          <div className="space-y-4">
            {Object.entries(analytics.categoryAverages || {})
              .map(([id, score]) => {
                const category = ASSESSMENT_CATEGORIES.find((c) => c.id === id);
                return { id, label: category?.label || id, score };
              })
              .sort((a, b) => a.score - b.score)
              .slice(0, 3)
              .map((area, i) => (
                <div key={i} className="flex justify-between items-center bg-white/60 p-3 rounded-lg border border-warning-200/50">
                  <span className="font-medium text-navy-800 text-sm">{area.label}</span>
                  <span className="font-bold text-danger-600 text-sm">{area.score}%</span>
                </div>
              ))}
            {Object.keys(analytics.categoryAverages || {}).length === 0 && (
              <p className="text-sm text-warning-700">Not enough data to identify focus areas.</p>
            )}
          </div>
        </Card>
      </div>

      {/* Recent Assessments */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-navy-800 font-display">Recent Assessments</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate('/teacher/assessments')}>
            View All
          </Button>
        </div>

        {DEMO_TEACHER_ASSESSMENTS.length > 0 ? (
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Assessment</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Students</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Completed</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Avg Score</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {DEMO_TEACHER_ASSESSMENTS.map((a) => (
                  <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-medium text-navy-800 text-sm">{a.title}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">{a.students}</td>
                    <td className="py-3 px-4 text-sm text-gray-500">{a.completed}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-navy-800">
                      {a.avgScore !== null ? `${a.avgScore}%` : '—'}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={a.status === 'Active' ? 'success' : a.status === 'Published' ? 'primary' : 'default'} size="sm">
                        {a.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-accent-600 hover:bg-accent-50 transition-colors" aria-label="View">
                          <HiEye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-accent-600 hover:bg-accent-50 transition-colors" aria-label="Edit">
                          <HiPencil className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            icon="📋"
            title="No assessments created yet"
            message="Create your first assessment to start evaluating student readiness."
            action={<Button onClick={() => navigate('/teacher/create')}>Create Your First Assessment</Button>}
          />
        )}
      </Card>
    </div>
  );
};

export default TeacherDashboard;
