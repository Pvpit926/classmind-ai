import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import ChartCard from '../../components/ChartCard';
import ProgressBar from '../../components/ProgressBar';
import Button from '../../components/Button';
import { ASSESSMENT_CATEGORIES } from '../../data/demoData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HiTrendingUp, HiArrowUp, HiArrowRight } from 'react-icons/hi';
import api from '../../services/api';

const StudentProgress = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await api.getMyResults();
        if (response.success && response.data) {
          // Sort ascending for chart (oldest to newest)
          const sorted = [...response.data].sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt));
          setResults(sorted);
        }
      } catch (err) {
        console.error('Failed to fetch results', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading progress...</div>;

  if (results.length === 0) {
    return (
      <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
        <div className="pt-2 lg:pt-0">
          <h1 className="text-2xl lg:text-3xl font-bold text-navy-800 font-display">Progress</h1>
          <p className="text-gray-500 mt-1">Track your engineering readiness over time.</p>
        </div>
        <Card className="text-center py-12 bg-gray-50">
          <div className="w-16 h-16 bg-accent-100 text-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <HiTrendingUp className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-navy-800 font-display mb-2">No progress data yet</h2>
          <p className="text-gray-500 max-w-sm mx-auto mb-6">
            Complete your first assessment to start tracking your engineering readiness over time.
          </p>
          <Button onClick={() => navigate('/student/assessments')} iconRight={HiArrowRight}>
            Take an Assessment
          </Button>
        </Card>
      </div>
    );
  }

  const chartData = results.map((r, i) => ({
    name: `Assessment ${i + 1}`,
    score: r.overallScore,
    date: new Date(r.submittedAt).toLocaleDateString(),
  }));

  const latestResult = results[results.length - 1];
  const firstResult = results[0];
  const improvement = latestResult.overallScore - firstResult.overallScore;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="pt-2 lg:pt-0">
        <h1 className="text-2xl lg:text-3xl font-bold text-navy-800 font-display">Progress</h1>
        <p className="text-gray-500 mt-1">Track your engineering readiness over time.</p>
      </div>

      {results.length === 1 && (
        <div className="p-4 bg-accent-50 border border-accent-100 rounded-xl text-sm text-accent-800 font-medium">
          💡 Complete another assessment to see your progress over time.
        </div>
      )}

      {/* Progress Summary */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="text-center">
          <p className="text-sm text-gray-500">Assessments Taken</p>
          <p className="text-3xl font-bold text-navy-800 font-display mt-1">{results.length}</p>
        </Card>
        <Card className="text-center">
          <p className="text-sm text-gray-500">Latest Score</p>
          <p className="text-3xl font-bold text-accent-600 font-display mt-1">{latestResult.overallScore}%</p>
        </Card>
        <Card className="text-center">
          <p className="text-sm text-gray-500">Overall Change</p>
          <div className="flex items-center justify-center gap-1 mt-1">
            {improvement > 0 && <HiArrowUp className="w-5 h-5 text-success-500" />}
            <span className={`text-3xl font-bold font-display ${improvement >= 0 ? 'text-success-500' : 'text-danger-500'}`}>
              {improvement > 0 ? '+' : ''}{improvement}%
            </span>
          </div>
        </Card>
      </div>

      {/* Readiness Over Time Chart */}
      <ChartCard title="Overall Readiness" subtitle="Your assessment scores across multiple evaluations">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                formatter={(value) => [`${value}%`, 'Score']}
                labelFormatter={(label, payload) => payload[0]?.payload.date || label}
              />
              <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} fill="url(#colorScore)" dot={{ fill: '#6366f1', strokeWidth: 2, r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Assessment History */}
        <Card>
          <h2 className="text-lg font-semibold text-navy-800 mb-4 font-display">Assessment History</h2>
          <div className="space-y-3">
            {[...results].reverse().map((r, i) => {
              const previousScore = i < results.length - 1 ? [...results].reverse()[i + 1].overallScore : null;
              
              return (
                <div key={r.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center">
                      <HiTrendingUp className="w-5 h-5 text-accent-600" />
                    </div>
                    <div>
                      <p className="font-medium text-navy-800 text-sm">Attempt {results.length - i}</p>
                      <p className="text-xs text-gray-400">{new Date(r.submittedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-accent-600 font-display">{r.overallScore}%</span>
                    {previousScore !== null && (
                      <p className={`text-xs ${r.overallScore > previousScore ? 'text-success-500' : r.overallScore < previousScore ? 'text-danger-500' : 'text-gray-400'}`}>
                        {r.overallScore > previousScore ? '+' : ''}{r.overallScore - previousScore}%
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Latest Category Performance */}
        <Card>
          <h2 className="text-lg font-semibold text-navy-800 mb-4 font-display">Latest Category Performance</h2>
          <div className="space-y-4">
            {ASSESSMENT_CATEGORIES.map((cat) => {
              const score = latestResult.categoryScores?.[cat.id] || 0;
              return (
                <ProgressBar
                  key={cat.id}
                  value={score}
                  color={cat.color}
                  label={cat.label}
                  showLabel
                  height="h-3"
                />
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentProgress;
