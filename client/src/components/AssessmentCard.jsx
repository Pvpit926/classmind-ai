import Badge from './Badge';
import Button from './Button';
import { HiClock, HiQuestionMarkCircle, HiArrowRight } from 'react-icons/hi';

const AssessmentCard = ({ assessment, onAction, actionLabel = 'Start', className = '' }) => {
  const statusVariant = {
    not_started: 'default',
    in_progress: 'warning',
    completed: 'success',
  };

  const statusLabel = {
    not_started: 'Not Started',
    in_progress: 'In Progress',
    completed: 'Completed',
  };

  return (
    <div className={`card p-5 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center text-accent-600 flex-shrink-0">
              📋
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-navy-800 text-base">{assessment.title}</h3>
              <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{assessment.description}</p>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                  <HiQuestionMarkCircle className="w-3.5 h-3.5" />
                  {assessment.questions} questions
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                  <HiClock className="w-3.5 h-3.5" />
                  {assessment.duration}
                </span>
                {assessment.dueDate && (
                  <span className="text-xs text-gray-400">Due: {assessment.dueDate}</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:flex-col sm:items-end">
          <Badge variant={statusVariant[assessment.status] || 'default'}>
            {statusLabel[assessment.status] || assessment.status}
          </Badge>
          {assessment.status !== 'completed' ? (
            <Button size="sm" onClick={() => onAction?.(assessment)} iconRight={HiArrowRight}>
              {assessment.status === 'in_progress' ? 'Continue' : actionLabel}
            </Button>
          ) : (
            assessment.score !== undefined && (
              <span className="text-lg font-bold text-accent-600">{assessment.score}%</span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentCard;
