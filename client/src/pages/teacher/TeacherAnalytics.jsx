import { useState, useEffect } from 'react';
import Card from '../../components/Card';
import StatCard from '../../components/StatCard';
import ChartCard from '../../components/ChartCard';
import ProgressBar from '../../components/ProgressBar';
import { ASSESSMENT_CATEGORIES, DEMO_TEACHER_ANALYTICS } from '../../data/demoData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import api from '../../services/api';

const TeacherAnalytics = () => {
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

  const categoryData = ASSESSMENT_CATEGORIES.map((cat) => ({
    name: cat.label.replace(' ', '\n'),
    shortName: cat.label.split(' ')[0],
    score: analytics.categoryAverages?.[cat.id] || 0,
    fullMark: 100,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="pt-2 lg:pt-0">
        <h1 className="text-2xl lg:text-3xl font-bold text-navy-800 font-display">Analytics</h1>
        <p className="text-gray-500 mt-1">Overview of student readiness across your assessments.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="📊" label="Avg Readiness" value={`${analytics.averageReadiness}%`} color="accent" />
        <StatCard icon="👥" label="Students Assessed" value={analytics.assessed} subtitle={`of ${analytics.totalStudents} total`} color="purple" />
        <StatCard icon="✅" label="Completion Rate" value={`${analytics.completionRate}%`} color="success" />
        <StatCard icon="📋" label="Total Students" value={analytics.totalStudents} color="cyan" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <ChartCard title="Category Averages" subtitle="Average readiness score per category">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="shortName" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                  formatter={(value) => [`${value}%`, 'Average Score']}
                />
                <Bar dataKey="score" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Radar Chart */}
        <ChartCard title="Readiness Profile" subtitle="Overall category performance radar">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={categoryData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="shortName" tick={{ fontSize: 11, fill: '#64748b' }} />
                <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Radar name="Average" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Category Breakdown */}
      <Card>
        <h2 className="text-lg font-semibold text-navy-800 mb-5 font-display">Category Performance Breakdown</h2>
        <div className="space-y-5">
          {ASSESSMENT_CATEGORIES.map((cat) => {
            const score = analytics.categoryAverages?.[cat.id] || 0;
            return (
              <div key={cat.id}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{cat.icon}</span>
                  <span className="text-sm font-semibold text-navy-800">{cat.label}</span>
                </div>
                <ProgressBar value={score} color={cat.color} height="h-3" showLabel label="" />
                <div className="flex justify-end">
                  <span className="text-sm font-semibold text-gray-700">{score}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Insights */}
      <Card className="bg-accent-50 border-accent-100">
        <h2 className="text-lg font-semibold text-accent-800 mb-3 font-display">💡 Key Insights</h2>
        <ul className="space-y-2">
          <li className="text-sm text-accent-700">• <strong>College Adaptation</strong> is the strongest category among students (72%).</li>
          <li className="text-sm text-accent-700">• <strong>Time Management</strong> is the weakest area and may need focused support (51%).</li>
          <li className="text-sm text-accent-700">• Overall completion rate is high at {analytics.completionRate}%, indicating good student engagement.</li>
          <li className="text-sm text-accent-700">• Consider creating targeted assessments for Learning Habits to improve outcomes.</li>
        </ul>
      </Card>
    </div>
  );
};

export default TeacherAnalytics;
