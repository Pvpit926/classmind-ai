import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import ProgressBar from '../../components/ProgressBar';
import { HiArrowLeft, HiMail, HiAcademicCap, HiCalendar } from 'react-icons/hi';
import { DEMO_TEACHER_STUDENTS, ASSESSMENT_CATEGORIES } from '../../data/demoData';

const TeacherStudentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    // In MVP, we just find the student from demo data
    const found = DEMO_TEACHER_STUDENTS.find((s) => s.id === id) || DEMO_TEACHER_STUDENTS[0];
    setStudent(found);
  }, [id]);

  if (!student) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <div className="pt-2 lg:pt-0 mb-6">
        <button
          onClick={() => navigate('/teacher/students')}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-accent-600 mb-4 transition-colors"
        >
          <HiArrowLeft className="w-4 h-4" /> Back to Students
        </button>
        <h1 className="text-2xl lg:text-3xl font-bold text-navy-800 font-display">Student Profile</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="space-y-6">
          <Card className="text-center">
            <div className="w-24 h-24 mx-auto bg-accent-100 text-accent-600 rounded-full flex items-center justify-center text-3xl font-bold mb-4">
              {student.name.charAt(0)}
            </div>
            <h2 className="text-xl font-bold text-navy-800 font-display">{student.name}</h2>
            <p className="text-gray-500 text-sm mb-4">First Year Engineering</p>
            
            <div className="space-y-3 text-left bg-gray-50 p-4 rounded-xl">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <HiAcademicCap className="w-5 h-5 text-gray-400" />
                <span>{student.branch}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <HiMail className="w-5 h-5 text-gray-400" />
                <span>student@college.edu</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <HiCalendar className="w-5 h-5 text-gray-400" />
                <span>Enrolled: 2024</span>
              </div>
            </div>
          </Card>
          
          <Card>
            <h3 className="font-bold text-navy-800 font-display mb-4">Focus Areas</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 p-3 rounded-xl bg-warning-50">
                <span className="text-warning-500 mt-0.5">!</span>
                <span className="text-sm text-gray-700">Needs to improve Time Management</span>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-xl bg-accent-50">
                <span className="text-accent-500 mt-0.5">ℹ</span>
                <span className="text-sm text-gray-700">Recommend daily study block</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* Right Column - Results */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-navy-800 font-display text-lg">Overall Readiness</h3>
              <div className="text-right">
                <span className="text-3xl font-bold text-navy-800 font-display">{student.readiness || 0}%</span>
                <p className="text-sm text-gray-500">Latest Assessment</p>
              </div>
            </div>
            
            <h4 className="font-semibold text-gray-700 text-sm mb-4">Category Breakdown</h4>
            <div className="space-y-4">
              {ASSESSMENT_CATEGORIES.map(cat => {
                // Generate a pseudo-random score based on student id and category for demo
                const hash = cat.id.charCodeAt(0) + student.name.charCodeAt(0);
                const score = 40 + (hash % 50); // 40-90
                
                return (
                  <div key={cat.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-navy-800 flex items-center gap-2">
                        {cat.icon} {cat.label}
                      </span>
                      <span className="text-gray-600 font-semibold">{score}%</span>
                    </div>
                    <ProgressBar value={score} color={cat.color} height="h-2" />
                  </div>
                );
              })}
            </div>
          </Card>
          
          <Card>
            <h3 className="font-bold text-navy-800 font-display mb-4">Assessment History</h3>
            <div className="space-y-3">
              {[
                { title: 'First-Year Midterm Checkpoint', date: student.lastAssessment, score: student.readiness },
                { title: 'Initial Engineering Readiness Baseline', date: '1 month ago', score: (student.readiness || 60) - 5 }
              ].map((history, i) => (
                <div key={i} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100">
                  <div>
                    <h4 className="font-medium text-navy-800 text-sm">{history.title}</h4>
                    <p className="text-xs text-gray-400">{history.date}</p>
                  </div>
                  <Badge variant={history.score >= 70 ? 'success' : history.score >= 50 ? 'warning' : 'danger'}>
                    {history.score}%
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherStudentProfile;
