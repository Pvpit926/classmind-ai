import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../../components/Card';
import CircularProgress from '../../components/CircularProgress';
import ProgressBar from '../../components/ProgressBar';
import Badge from '../../components/Badge';
import { ASSESSMENT_CATEGORIES, DEMO_STUDENT_RESULTS } from '../../data/demoData';
import { HiCheckCircle, HiExclamation } from 'react-icons/hi';
import api from '../../services/api';

const StudentResults = () => {
  const location = useLocation();
  const attempt = location.state?.attempt;
  
  const [results, setResults] = useState(DEMO_STUDENT_RESULTS);
  const [recommendations, setRecommendations] = useState(null);
  const [loadingRecs, setLoadingRecs] = useState(false);

  useEffect(() => {
    if (attempt) {
      // Map attempt data to results format
      const formattedResults = {
        overall: attempt.overallScore,
        categories: attempt.categoryScores || {},
        strengths: [],
        focusAreas: [],
        date: new Date(attempt.submittedAt).toLocaleDateString(),
      };
      
      // Basic deterministic strengths/focus areas
      if (attempt.categoryScores) {
        Object.entries(attempt.categoryScores).forEach(([cat, score]) => {
          const categoryName = ASSESSMENT_CATEGORIES.find(c => c.id === cat)?.label || cat;
          if (score >= 70) formattedResults.strengths.push(`Strong ${categoryName}`);
          if (score < 50) formattedResults.focusAreas.push(`Improve ${categoryName}`);
        });
      }
      
      if (formattedResults.strengths.length === 0) formattedResults.strengths.push('Good completion effort');
      if (formattedResults.focusAreas.length === 0) formattedResults.focusAreas.push('Maintain consistency');

      setResults(formattedResults);
      
      // Fetch AI recommendations
      fetchRecommendations(attempt);
    }
  }, [attempt]);

  const fetchRecommendations = async (attemptData) => {
    setLoadingRecs(true);
    try {
      const response = await api.generateRecommendations({
        overallScore: attemptData.overallScore,
        categoryScores: attemptData.categoryScores,
        readinessLevel: attemptData.readinessLevel,
        attemptId: attemptData.id,
      });
      if (response.success && response.data) {
        setRecommendations(response.data);
      }
    } catch (err) {
      console.error('Failed to load recommendations', err);
    } finally {
      setLoadingRecs(false);
    }
  };

  const getColor = (score) => {
    if (score >= 70) return '#10b981';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const getLabel = (score) => {
    if (score >= 80) return { text: 'Excellent', variant: 'success' };
    if (score >= 65) return { text: 'Good', variant: 'primary' };
    if (score >= 50) return { text: 'Average', variant: 'warning' };
    return { text: 'Needs Focus', variant: 'danger' };
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="pt-2 lg:pt-0">
        <h1 className="text-2xl lg:text-3xl font-bold text-navy-800 font-display">Your Engineering Readiness</h1>
        <p className="text-gray-500 mt-1">Assessment completed on {results.date}</p>
      </div>

      {/* Overall Score */}
      <Card className="gradient-card border-accent-100">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <CircularProgress
            value={results.overall}
            size={160}
            strokeWidth={12}
            color={getColor(results.overall)}
          />
          <div className="text-center sm:text-left">
            <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">Overall Readiness</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-4xl font-bold text-navy-800 font-display">{results.overall}%</span>
              <Badge variant={getLabel(results.overall).variant} size="lg">
                {getLabel(results.overall).text}
              </Badge>
            </div>
            <p className="text-gray-500 text-sm mt-2 max-w-md">
              Your engineering readiness score reflects your preparedness across five key areas. Keep working on your focus areas to improve.
            </p>
          </div>
        </div>
      </Card>

      {/* Category Scores */}
      <div>
        <h2 className="text-lg font-semibold text-navy-800 mb-4 font-display">Category Performance</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ASSESSMENT_CATEGORIES.map((cat) => {
            const score = results.categories[cat.id] || 0;
            return (
              <Card key={cat.id} className="relative overflow-hidden">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{cat.icon}</span>
                    <h3 className="font-semibold text-navy-800 text-sm">{cat.label}</h3>
                  </div>
                  <Badge variant={getLabel(score).variant} size="sm">
                    {getLabel(score).text}
                  </Badge>
                </div>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-2xl font-bold font-display" style={{ color: getColor(score) }}>
                    {score}%
                  </span>
                </div>
                <ProgressBar value={score} color={getColor(score)} height="h-2" />
              </Card>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card>
          <h2 className="text-lg font-semibold text-navy-800 mb-4 font-display flex items-center gap-2">
            <HiCheckCircle className="w-5 h-5 text-success-500" />
            Strengths
          </h2>
          <ul className="space-y-3">
            {results.strengths.map((strength, i) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-success-50">
                <span className="text-success-500 mt-0.5">✓</span>
                <span className="text-sm text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Areas to Focus On */}
        <Card>
          <h2 className="text-lg font-semibold text-navy-800 mb-4 font-display flex items-center gap-2">
            <HiExclamation className="w-5 h-5 text-warning-500" />
            Areas to Focus On
          </h2>
          <ul className="space-y-3">
            {results.focusAreas.map((area, i) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-warning-50">
                <span className="text-warning-500 mt-0.5">!</span>
                <span className="text-sm text-gray-700">{area}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Personalized Guidance Preview */}
      <Card>
        <h2 className="text-lg font-semibold text-navy-800 mb-4 font-display">📌 AI Personalized Guidance</h2>
        {loadingRecs ? (
          <div className="py-8 text-center text-gray-500">
            <div className="w-8 h-8 border-2 border-accent-200 border-t-accent-600 rounded-full animate-spin mx-auto mb-2" />
            Generating personalized insights...
          </div>
        ) : recommendations ? (
          <div className="space-y-4">
            <p className="text-gray-600 mb-4">{recommendations.summary}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {recommendations.focusAreas.map((area, i) => (
                <div key={i} className={`p-4 rounded-xl border bg-accent-50 border-accent-100`}>
                  <h3 className="font-semibold text-navy-800 text-sm mb-1">{area.category}</h3>
                  <p className="text-gray-600 text-xs mb-2">{area.reason}</p>
                  <ul className="list-disc pl-4 text-xs text-gray-500 space-y-1">
                    {area.actions.map((act, j) => (
                      <li key={j}>{act}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Time Management Strategy', desc: 'Create a weekly study schedule with dedicated blocks for each subject.', color: 'bg-warning-50 border-warning-100' },
              { title: 'Learning Consistency', desc: 'Practice daily revision using spaced repetition techniques.', color: 'bg-accent-50 border-accent-100' },
            ].map((guide, i) => (
              <div key={i} className={`p-4 rounded-xl border ${guide.color}`}>
                <h3 className="font-semibold text-navy-800 text-sm mb-1">{guide.title}</h3>
                <p className="text-gray-500 text-xs">{guide.desc}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default StudentResults;
