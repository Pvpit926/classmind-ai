import { useState } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import { DEMO_RECOMMENDATIONS } from '../../data/demoData';
import { HiCheck, HiPlay, HiClock } from 'react-icons/hi';
import { useToast } from '../../hooks/useToast';

const StudentRecommendations = () => {
  const { success } = useToast();
  
  // Local state to track recommendation status for MVP
  const [statuses, setStatuses] = useState(
    DEMO_RECOMMENDATIONS.reduce((acc, rec) => {
      acc[rec.id] = 'not-started';
      return acc;
    }, {})
  );

  const handleUpdateStatus = (id, newStatus) => {
    setStatuses(prev => ({ ...prev, [id]: newStatus }));
    
    if (newStatus === 'in-progress') {
      success('Recommendation marked as started. Good luck!');
    } else if (newStatus === 'completed') {
      success('Recommendation marked as completed. Great job!');
    }
  };

  const priorityColors = {
    high: 'danger',
    medium: 'warning',
    low: 'primary',
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <div className="pt-2 lg:pt-0">
        <h1 className="text-2xl lg:text-3xl font-bold text-navy-800 font-display">Personalized Action Plan</h1>
        <p className="text-gray-500 mt-1">Actionable recommendations to improve your engineering readiness.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {DEMO_RECOMMENDATIONS.map((rec, i) => {
          const status = statuses[rec.id];
          
          return (
            <Card key={rec.id} className="flex flex-col h-full animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-xl">
                    {rec.icon}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Focus Area</span>
                    <h3 className="font-bold text-navy-800 font-display">{rec.title}</h3>
                  </div>
                </div>
                <Badge variant={priorityColors[rec.priority]} size="sm">
                  {rec.priority} Priority
                </Badge>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-navy-800 mb-1">Why it matters</h4>
                  <p className="text-sm text-gray-600">{rec.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-navy-800 mb-2">Recommended Actions</h4>
                  <ul className="space-y-2">
                    {[
                      "Plan tomorrow's tasks in advance.",
                      "Reserve a fixed daily study block.",
                      "Track assignment deadlines."
                    ].map((action, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-accent-500 mt-0.5">•</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-gray-500 font-medium">
                  <HiClock className="w-4 h-4" />
                  Suggested: 7 days
                </div>
                
                <div className="flex gap-2">
                  {status === 'not-started' && (
                    <Button size="sm" onClick={() => handleUpdateStatus(rec.id, 'in-progress')} icon={HiPlay}>
                      Mark as Started
                    </Button>
                  )}
                  {status === 'in-progress' && (
                    <Button size="sm" variant="success" onClick={() => handleUpdateStatus(rec.id, 'completed')} icon={HiCheck}>
                      Complete
                    </Button>
                  )}
                  {status === 'completed' && (
                    <Badge variant="success" className="px-3 py-1.5">
                      <HiCheck className="w-4 h-4 mr-1 inline" /> Completed
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* AI Guidance Note */}
      <Card className="bg-accent-50 border-accent-100">
        <div className="flex items-start gap-3">
          <span className="text-2xl">✨</span>
          <div>
            <h3 className="font-semibold text-accent-800 mb-1">AI-Powered Action Plan</h3>
            <p className="text-sm text-accent-700 leading-relaxed">
              These recommendations are generated based on your assessment results. They are personalized to help you build a strong foundation for your engineering studies.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StudentRecommendations;
