import { useEffect, useState } from 'react';
import api from '../api/client';

export default function AttendancePage() {
  const [data, setData] = useState({ summary: [], overall: 0 });

  useEffect(() => {
    api.get('/student/attendance').then((res) => setData(res.data));
  }, []);

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-3">Attendance</h2>
      <table className="w-full text-left">
        <thead><tr><th>Subject</th><th>Attended</th><th>Total</th><th>%</th></tr></thead>
        <tbody>
          {data.summary.map((s) => (
            <tr key={s.subjectCode} className="border-t"><td>{s.subjectCode}</td><td>{s.attendedClasses}</td><td>{s.totalClasses}</td><td>{s.percentage.toFixed(2)}</td></tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 font-semibold">Overall: {data.overall.toFixed(2)}%</p>
    </div>
  );
}
