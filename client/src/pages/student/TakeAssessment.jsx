import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import QuestionCard from '../../components/QuestionCard';
import ConfirmationModal from '../../components/ConfirmationModal';
import ProgressBar from '../../components/ProgressBar';
import { useToast } from '../../hooks/useToast';
import { DEMO_ASSESSMENT_QUESTIONS, DEMO_ASSESSMENTS } from '../../data/demoData';
import { HiArrowLeft, HiArrowRight, HiCheck, HiClock } from 'react-icons/hi';
import api from '../../services/api';

const TakeAssessment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { success, error: showError } = useToast();
  
  const [assessment, setAssessment] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const response = await api.getAssessmentById(id);
        if (response.success && response.data) {
          setAssessment(response.data);
          setQuestions(response.data.questions || []);
          // Default 1 min per question if not specified
          setTimeLeft(response.data.questions?.length * 60 || 600);
        } else {
          throw new Error('Assessment not found');
        }
      } catch (err) {
        console.error(err);
        // Fallback to demo
        setAssessment(DEMO_ASSESSMENTS[0]);
        setQuestions(DEMO_ASSESSMENT_QUESTIONS);
        setTimeLeft(DEMO_ASSESSMENT_QUESTIONS.length * 60);
      } finally {
        setLoading(false);
      }
    };
    fetchAssessment();
  }, [id]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || showConfirm || submitting) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(true); // Auto submit on timeout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showConfirm, submitting]);

  const handleSelectAnswer = (questionId, optionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = async (auto = false) => {
    setSubmitting(true);
    try {
      // Send both answers and questions (for MVP backend scoring without re-fetching)
      const payload = {
        answers,
        questions
      };
      
      const response = await api.submitAssessment(id, payload);
      
      setShowConfirm(false);
      success(auto ? 'Time is up! Assessment submitted automatically.' : 'Assessment submitted successfully!');
      
      if (response.success && response.data) {
        // Pass the attemptId to results page
        navigate('/student/results', { state: { attempt: response.data } });
      } else {
        navigate('/student/results');
      }
    } catch (err) {
      showError(err.message || 'Failed to submit assessment');
      setSubmitting(false);
      setShowConfirm(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading assessment...</div>;
  if (!assessment || questions.length === 0) return <div className="p-8 text-center text-gray-500">Assessment not found or has no questions.</div>;

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;
  
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-6 pt-2 lg:pt-0">
        <div className="flex justify-between items-start">
          <div>
            <button
              onClick={() => navigate('/student/assessments')}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-accent-600 mb-3 transition-colors"
            >
              <HiArrowLeft className="w-4 h-4" /> Back to Assessments
            </button>
            <h1 className="text-xl font-bold text-navy-800 font-display">{assessment.title}</h1>
          </div>
          {timeLeft !== null && (
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium ${
              timeLeft < 120 ? 'bg-danger-50 text-danger-600' : 'bg-gray-100 text-gray-700'
            }`}>
              <HiClock className="w-5 h-5" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>
        <div className="mt-3">
          <ProgressBar value={progress} color="#6366f1" height="h-2" />
          <div className="flex justify-between mt-1.5">
            <span className="text-xs text-gray-500">Question {currentIndex + 1} of {questions.length}</span>
            <span className="text-xs text-gray-500">{answeredCount} answered</span>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="card p-6 sm:p-8 mb-6">
        <QuestionCard
          question={currentQuestion}
          index={currentIndex}
          total={questions.length}
          selectedAnswer={answers[currentQuestion.id]}
          onSelectAnswer={handleSelectAnswer}
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="secondary"
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          icon={HiArrowLeft}
        >
          Previous
        </Button>

        <div className="flex gap-1.5">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === currentIndex
                  ? 'bg-accent-600 w-6'
                  : answers[questions[i].id]
                    ? 'bg-accent-300'
                    : 'bg-gray-200'
              }`}
              aria-label={`Go to question ${i + 1}`}
            />
          ))}
        </div>

        {currentIndex < questions.length - 1 ? (
          <Button
            onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
            iconRight={HiArrowRight}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="success"
            onClick={() => setShowConfirm(true)}
            icon={HiCheck}
          >
            Submit Assessment
          </Button>
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleSubmit}
        title="Submit Assessment?"
        message={`You have answered ${answeredCount} out of ${questions.length} questions. Are you sure you want to submit?`}
        confirmLabel="Submit"
        variant="primary"
        loading={submitting}
      />
    </div>
  );
};

export default TakeAssessment;
