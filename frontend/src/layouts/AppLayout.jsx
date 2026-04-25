import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function AppLayout({ darkMode, setDarkMode }) {
  return (
    <div className="min-h-screen md:flex dark:bg-slate-950 dark:text-slate-100">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 space-y-4">
        <div className="flex justify-end">
          <button
            onClick={() => setDarkMode((d) => !d)}
            className="px-3 py-1 rounded bg-slate-200 dark:bg-slate-700"
          >
            {darkMode ? 'Light' : 'Dark'} Mode
          </button>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
