import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/Card';
import Button from '../../components/Button';
import CircularProgress from '../../components/CircularProgress';
import Badge from '../../components/Badge';
import { ASSESSMENT_CATEGORIES, DEMO_ASSESSMENTS, DEMO_STUDENT_ACTIVITIES } from '../../data/demoData';
import { HiArrowRight, HiClock, HiQuestionMarkCircle } from 'react-icons/hi';
import api from '../../services/api';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assRes, resRes] = await Promise.all([
          api.getAssessments().catch(() => ({ data: [] })),
          api.getMyResults().catch(() => ({ data: [] }))
        ]);

        if (assRes.data && assRes.data.length > 0) setAssessments(assRes.data);
        else setAssessments(DEMO_ASSESSMENTS);

        if (resRes.data && resRes.data.length > 0) setResults(resRes.data);
      } catch (err) {
        setAssessments(DEMO_ASSESSMENTS);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const upcomingAssessment = assessments.find((a) => a.status === 'published' || a.status === 'not_started');
  const latestResult = results.length > 0 ? results[0] : null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="pt-2 lg:pt-0">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-navy-800 font-display">
              {greeting()}, {user?.name?.split(' ')[0] || 'Student'} 👋
            </h1>
            <p className="text-gray-500 mt-1">Let's understand your engineering readiness.</p>
          </div>
          <Button variant="secondary" onClick={() => navigate('/student/facial-analysis')} iconRight={HiArrowRight} className="hidden sm:flex">
            Camera Prototype
          </Button>
        </div>
      </div>

      {/* Main Readiness Card */}
      {latestResult ? (
        <Card className="gradient-card border-accent-100">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <CircularProgress value={latestResult.overallScore} size={140} color={latestResult.overallScore >= 70 ? '#10b981' : latestResult.overallScore >= 50 ? '#f59e0b' : '#ef4444'} />
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-xl font-bold text-navy-800 font-display">Your Engineering Readiness</h2>
              <div className="flex items-center gap-3 mt-1 justify-center sm:justify-start">
                <span className="text-3xl font-bold text-navy-800 font-display">{latestResult.overallScore}%</span>
                <Badge variant={latestResult.overallScore >= 70 ? 'success' : latestResult.overallScore >= 50 ? 'warning' : 'danger'} size="lg">
                  {latestResult.readinessLevel || 'Ready'}
                </Badge>
              </div>
              <p className="text-sm text-gray-500 mt-2">Based on your latest assessment completed on {new Date(latestResult.submittedAt).toLocaleDateString()}</p>
              <Button className="mt-4" onClick={() => navigate('/student/results', { state: { attempt: latestResult } })} iconRight={HiArrowRight}>
                View Full Profile
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="gradient-card border-accent-100">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <CircularProgress value={0} size={140} color="#6366f1" />
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-xl font-bold text-navy-800 font-display">Your Engineering Readiness</h2>
              <p className="text-gray-500 mt-1">Not assessed yet</p>
              <p className="text-sm text-gray-400 mt-2">Take your first assessment to see your readiness score.</p>
              <Button className="mt-4" onClick={() => navigate('/student/assessments')} iconRight={HiArrowRight}>
                Take Assessment
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Category Cards */}
      <div>
        <h2 className="text-lg font-semibold text-navy-800 mb-4 font-display">Readiness Profile</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {ASSESSMENT_CATEGORIES.map((cat, i) => {
            const score = latestResult?.categoryScores?.[cat.id];
            const hasScore = score !== undefined && score !== null;
            
            let label = 'Not assessed';
            let color = 'text-gray-400';
            
            if (hasScore) {
              if (score >= 70) { label = 'Strong area'; color = 'text-success-600'; }
              else if (score >= 50) { label = 'Building readiness'; color = 'text-warning-600'; }
              else { label = 'Focus area'; color = 'text-danger-600'; }
            }

            return (
              <Card key={cat.id} hover className="text-center animate-slide-up relative overflow-hidden" style={{ animationDelay: `${i * 80}ms` }}>
                <span className="text-2xl mb-2 block">{cat.icon}</span>
                <h3 className="text-sm font-semibold text-navy-800 mb-1">{cat.label}</h3>
                
                {hasScore ? (
                  <>
                    <div className="text-xl font-bold font-display mb-1" style={{ color: score >= 70 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444' }}>{score}%</div>
                    <p className={`text-xs font-medium ${color}`}>{label}</p>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${score}%`, backgroundColor: score >= 70 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444' }} />
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-gray-400">Not assessed</p>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Assessment */}
        <Card>
          <h2 className="text-lg font-semibold text-navy-800 mb-4 font-display">Upcoming Assessment</h2>
          {upcomingAssessment ? (
            <div className="p-4 rounded-xl bg-accent-50 border border-accent-100">
              <h3 className="font-semibold text-navy-800">{upcomingAssessment.title}</h3>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                  <HiQuestionMarkCircle className="w-3.5 h-3.5" />
                  {upcomingAssessment.questions} questions
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                  <HiClock className="w-3.5 h-3.5" />
                  {upcomingAssessment.duration}
                </span>
                <Badge variant="warning" size="sm">Due: {upcomingAssessment.dueDate}</Badge>
              </div>
              <Button size="sm" className="mt-3" onClick={() => navigate(`/student/assessment/${upcomingAssessment.id}`)}>
                Start Assessment
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <span className="text-3xl block mb-2">📋</span>
              <p className="text-gray-500 text-sm">No assessments assigned yet.</p>
            </div>
          )}
        </Card>

        {/* Recent Activity */}
        <Card>
          <h2 className="text-lg font-semibold text-navy-800 mb-4 font-display">Recent Activity</h2>
          <div className="space-y-3">
            {DEMO_STUDENT_ACTIVITIES.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <span className="text-lg">{activity.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-navy-800 truncate">{activity.text}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
