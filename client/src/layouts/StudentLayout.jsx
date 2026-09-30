import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const StudentLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="student" />
      <main className="flex-1 lg:pl-0">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StudentLayout;
