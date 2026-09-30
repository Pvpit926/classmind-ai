import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AssessmentCard from '../../components/AssessmentCard';
import { DEMO_ASSESSMENTS } from '../../data/demoData';
import api from '../../services/api';

const StudentAssessments = () => {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await api.getAssessments();
        if (response.success && response.data.length > 0) {
          setAssessments(response.data);
        } else {
          setAssessments(DEMO_ASSESSMENTS); // fallback to demo data
        }
      } catch (error) {
        console.error(error);
        setAssessments(DEMO_ASSESSMENTS);
      } finally {
        setLoading(false);
      }
    };
    fetchAssessments();
  }, []);

  const handleStart = (assessment) => {
    navigate(`/student/assessment/${assessment.id}`);
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading assessments...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="pt-2 lg:pt-0">
        <h1 className="text-2xl lg:text-3xl font-bold text-navy-800 font-display">Assessments</h1>
        <p className="text-gray-500 mt-1">View and take your assigned assessments.</p>
      </div>

      <div className="space-y-4">
        {assessments.map((assessment) => (
          <AssessmentCard
            key={assessment.id}
            assessment={assessment}
            onAction={handleStart}
            actionLabel="Start"
          />
        ))}
        {assessments.length === 0 && (
          <div className="p-8 text-center text-gray-500 card">
            No assessments assigned to you right now.
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAssessments;
