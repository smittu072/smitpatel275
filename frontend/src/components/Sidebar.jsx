import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const studentLinks = [
  ['Dashboard', '/'],
  ['Attendance', '/attendance'],
  ['Grades', '/grades'],
  ['Courses', '/courses'],
  ['Assignments', '/assignments'],
  ['Announcements', '/announcements'],
  ['Profile', '/profile']
];

const adminLinks = [
  ['Admin Panel', '/admin'],
  ['Assignments', '/assignments'],
  ['Announcements', '/announcements']
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const links = user?.role === 'admin' ? adminLinks : studentLinks;

  return (
    <aside className="w-full md:w-64 bg-slate-900 text-white p-4 space-y-3">
      <h1 className="text-xl font-bold">Student Portal</h1>
      <nav className="space-y-2">
        {links.map(([label, path]) => (
          <NavLink key={path} to={path} className="block rounded px-3 py-2 hover:bg-slate-700">
            {label}
          </NavLink>
        ))}
      </nav>
      <button className="w-full bg-rose-600 rounded px-3 py-2" onClick={logout}>Logout</button>
    </aside>
  );
}
