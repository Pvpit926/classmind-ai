import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import { DEMO_TEACHER_STUDENTS } from '../../data/demoData';
import { HiEye, HiChartBar, HiSearch } from 'react-icons/hi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherStudents = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredStudents = DEMO_TEACHER_STUDENTS.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.branch.toLowerCase().includes(search.toLowerCase())
  );

  const getReadinessColor = (score) => {
    if (score === null) return 'default';
    if (score >= 70) return 'success';
    if (score >= 50) return 'warning';
    return 'danger';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 lg:pt-0">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-navy-800 font-display">Students</h1>
          <p className="text-gray-500 mt-1">Manage and view student readiness profiles.</p>
        </div>
        <div className="relative">
          <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-navy-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent w-full sm:w-64 transition-all"
          />
        </div>
      </div>

      <Card padding="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Branch</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Readiness</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Assessment</th>
                <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-accent-600 font-semibold text-xs">{student.name.charAt(0)}</span>
                      </div>
                      <span className="font-medium text-navy-800 text-sm">{student.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">{student.branch}</td>
                  <td className="py-4 px-6">
                    <Badge
                      variant={student.status === 'Completed' ? 'success' : student.status === 'In Progress' ? 'warning' : 'default'}
                      size="sm"
                    >
                      {student.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    {student.readiness !== null ? (
                      <span className="text-sm font-semibold" style={{ color: student.readiness >= 70 ? '#10b981' : student.readiness >= 50 ? '#f59e0b' : '#ef4444' }}>
                        {student.readiness}%
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">—</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">{student.lastAssessment}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => navigate(`/teacher/students/${student.id}`)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-accent-600 hover:bg-accent-50 transition-colors" 
                        aria-label="View Profile"
                      >
                        <HiEye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-accent-600 hover:bg-accent-50 transition-colors" aria-label="View Results">
                        <HiChartBar className="w-4 h-4" />
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

export default TeacherStudents;
