import Badge from '../../components/Badge';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { DEMO_TEACHER_ASSESSMENTS } from '../../data/demoData';
import { useNavigate } from 'react-router-dom';
import { HiPlus, HiEye, HiPencil } from 'react-icons/hi';

const TeacherAssessments = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 lg:pt-0">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-navy-800 font-display">Assessments</h1>
          <p className="text-gray-500 mt-1">Manage all your assessments.</p>
        </div>
        <Button onClick={() => navigate('/teacher/create')} icon={HiPlus}>
          Create Assessment
        </Button>
      </div>

      <Card padding="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Assessment</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Students</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Completed</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Avg Score</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {DEMO_TEACHER_ASSESSMENTS.map((a) => (
                <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-medium text-navy-800 text-sm">{a.title}</span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">{a.date}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{a.students}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{a.completed}</td>
                  <td className="py-4 px-6 text-sm font-semibold text-navy-800">{a.avgScore !== null ? `${a.avgScore}%` : '—'}</td>
                  <td className="py-4 px-6">
                    <Badge variant={a.status === 'Active' ? 'success' : a.status === 'Published' ? 'primary' : 'default'} size="sm">
                      {a.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-right">
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
      </Card>
    </div>
  );
};

export default TeacherAssessments;
