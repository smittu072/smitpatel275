import { useEffect, useState } from 'react';
import api from '../api/client';

export default function DashboardPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/student/dashboard').then((res) => setData(res.data));
  }, []);

  if (!data) return <p>Loading dashboard...</p>;

  return (
    <div className="space-y-4">
      <div className="card">
        <h2 className="text-xl font-semibold">Welcome, {data.profile.name}</h2>
        <p>ID: {data.profile.studentId}</p>
        <p>Course: {data.profile.course}</p>
        <p>Semester: {data.profile.semester}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card"><h3 className="font-semibold">Attendance</h3><p>{data.attendance.overall.toFixed(2)}%</p></div>
        <div className="card"><h3 className="font-semibold">GPA</h3><p>{data.grades.gpa}</p></div>
        <div className="card"><h3 className="font-semibold">Overall %</h3><p>{data.grades.percentage}%</p></div>
      </div>
      <div className="card">
        <h3 className="font-semibold mb-2">Latest Announcements</h3>
        <ul className="space-y-2">
          {data.announcements.map((a) => (
            <li key={a._id} className="border-b pb-2"><p className="font-medium">{a.title}</p><p className="text-sm">{a.message}</p></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
