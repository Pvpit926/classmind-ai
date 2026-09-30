import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { ToastProvider } from './hooks/useToast';
import ToastContainer from './components/ToastContainer';
import { ProtectedRoute, PublicOnlyRoute } from './routes/ProtectedRoute';
import StudentLayout from './layouts/StudentLayout';
import TeacherLayout from './layouts/TeacherLayout';

// Public Pages
import Landing from './pages/public/Landing';
import Login from './pages/public/Login';
import Register from './pages/public/Register';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentAssessments from './pages/student/StudentAssessments';
import TakeAssessment from './pages/student/TakeAssessment';
import StudentResults from './pages/student/StudentResults';
import StudentProgress from './pages/student/StudentProgress';
import StudentRecommendations from './pages/student/StudentRecommendations';
import FacialAnalysis from './pages/student/FacialAnalysis';

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherAssessments from './pages/teacher/TeacherAssessments';
import CreateAssessment from './pages/teacher/CreateAssessment';
import ManualAssessment from './pages/teacher/ManualAssessment';
import AIAssessment from './pages/teacher/AIAssessment';
import TeacherStudents from './pages/teacher/TeacherStudents';
import TeacherStudentProfile from './pages/teacher/TeacherStudentProfile';
import TeacherAnalytics from './pages/teacher/TeacherAnalytics';

import NotFound from './pages/public/NotFound';

// Shared Pages
import Profile from './pages/shared/Profile';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ToastContainer />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
          <Route path="/register" element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />

          {/* Student Routes */}
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRole="student">
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/student/dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="assessments" element={<StudentAssessments />} />
            <Route path="assessment/:id" element={<TakeAssessment />} />
            <Route path="results" element={<StudentResults />} />
            <Route path="progress" element={<StudentProgress />} />
            <Route path="recommendations" element={<StudentRecommendations />} />
            <Route path="facial-analysis" element={<FacialAnalysis />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Teacher Routes */}
          <Route
            path="/teacher"
            element={
              <ProtectedRoute allowedRole="teacher">
                <TeacherLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/teacher/dashboard" replace />} />
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="assessments" element={<TeacherAssessments />} />
            <Route path="create" element={<CreateAssessment />} />
            <Route path="create/manual" element={<ManualAssessment />} />
            <Route path="create/ai" element={<AIAssessment />} />
            <Route path="students" element={<TeacherStudents />} />
            <Route path="students/:id" element={<TeacherStudentProfile />} />
            <Route path="analytics" element={<TeacherAnalytics />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
