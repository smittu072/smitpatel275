import { Navigate, Route, Routes } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useAuth } from './context/AuthContext';
import AppLayout from './layouts/AppLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AttendancePage from './pages/AttendancePage';
import GradesPage from './pages/GradesPage';
import CoursesPage from './pages/CoursesPage';
import AssignmentsPage from './pages/AssignmentsPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const rootClass = useMemo(() => (darkMode ? 'dark' : ''), [darkMode]);
  const { user } = useAuth();

  return (
    <div className={rootClass}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={<PrivateRoute><AppLayout darkMode={darkMode} setDarkMode={setDarkMode} /></PrivateRoute>}
        >
          {user?.role === 'admin' ? <Route index element={<AdminPage />} /> : <Route index element={<DashboardPage />} />}
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="grades" element={<GradesPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="assignments" element={<AssignmentsPage />} />
          <Route path="announcements" element={<AnnouncementsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </div>
  );
}
